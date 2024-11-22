'use client'

import React, { useState, useEffect } from 'react';
import supabase from '@/lib/supabaseClient'
import { createClient } from "@/utils/supabase/client"
import { redirect } from 'next/navigation';

export default function Page({id}) {

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

  async function removePackFromPacksTable(packId) {
    const { data, error } = await supabase
    .from('packs')
    .delete()
    .eq('id', packId)

    if (error) {
      console.error('Error adding new pack:', error);
      setError('Error adding new feed');
      return;
    } else {
      getExistingPackArrayForUser(packId)
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
      removePackFromUserPacksTable(packId, data[0].pack_ids)
    }
  }

  async function removePackFromUserPacksTable(packId, existingPacks) {
    console.log(packId, existingPacks[3])
    const updatedPacks = existingPacks.filter(pack => parseInt(pack) !== parseInt(packId));
    console.log(existingPacks, updatedPacks);

    const { data, error } = await supabase
      .from('user_packs')
      .update({ pack_ids: updatedPacks })
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating pack:', error);
      setError('Error updating pack');
      return;
    } else {
      redirect('/dashboard')
    }

            
  }



  async function handleSubmit(e) {
    e.preventDefault();
    
    removePackFromPacksTable(id)
  }

  

  return (
    <div className="border border-red-400 p-4 my-4">
      <form onSubmit={handleSubmit}>
        <button type="submit">Delete Pack</button>
      </form>
    </div>
  );
}