'use client'

import React, { useState, useEffect } from 'react';
import supabase from '@/lib/supabaseClient'
import { createClient } from "@/utils/supabase/client"



export default function Page() {

  const [user, setUser] = useState(null);
  const [packTitle, setPackTitle] = useState('');
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getUser() {
      const supabase = await createClient()
  
      const { data, error } = await supabase.auth.getUser()
  
      if (error || !data?.user) {
        console.log('no user')
      }
      else {
        console.log(data)
        setUser(data.user)
      }
      setLoading(false)
    }

    getUser()

  }, [])

  async function addPackToPacksTable(packTitle) {
    const { data, error } = await supabase
    .from('packs')
    .insert([
      { title: packTitle },
    ])
    .select()

    if (error) {
      console.error('Error adding new pack:', error);
      setError('Error adding new feed');
      return;
    } else {
      getExistingPackArrayForUser(data[0].id)
    }   
  }

  async function getExistingPackArrayForUser(packId) {
    console.log(packId)
    console.log(user.id)

    const { data, error } = await supabase
    .from('user_packs')
    .select('pack_ids')
    .eq('user_id', user.id);

    console.log(data)
    
    if (error) {
      console.error('Error getting existing packs:', error);
      setError('Error getting existing packs');
      return;
    } else {
      if(data.length < 1) {
        //need to make a row for this user
        console.log('user has no user_packs row')

        const { data, error } = await supabase
        .from('user_packs')
        .insert([
          { user_id: user.id},
        ])
        .select()

        if (error) {
          console.error('Error adding new user row to user_packs:', error);
          setError('Error adding new user row to user_packs');
          return;
        } else {
          addPackToUserPacksTable(packId, data[0].pack_ids)
        }
                

      } else {
        // proceed
        addPackToUserPacksTable(packId, data[0].pack_ids)
      }
  
      
    }
  }

  async function addPackToUserPacksTable(packId, existingPacks) {
    const updatedPacks = Array.isArray(existingPacks) ? [...existingPacks, packId] : [packId]

    const { data, error } = await supabase
      .from('user_packs')
      .update({ pack_ids: updatedPacks })
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating pack:', error);
      setError('Error updating pack');
      return;
    } else {
      location.reload();
    }

            
  }



  async function handleSubmit(e) {
    e.preventDefault();
    addPackToPacksTable(packTitle)
  }

  

  return (
    <div className="border border-black p-4 my-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={packTitle}
          onChange={(e) => setPackTitle(e.target.value)}
          placeholder="Enter pack title"
        />
        <button type="submit">Add Pack</button>
      </form>
    </div>
  );
}