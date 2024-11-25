'use client'

import React, { useState, useEffect } from 'react'
import supabase from '@/lib/supabaseClient'



export default function Page(data) {

  const [editDescription, setEditDescription] = useState(false)
  const [description, setDescription] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);


  const userId = data.user.id
  const packId = data.packId



  async function getPackDescription() {
    console.log('getpackdescriptiuon')
    // Add the new feed to the feeds table
    const { data, error } = await supabase
      .from('packs')
      .select('description')
      .eq('id', packId)

    if (error) {
      console.error('Error getting pack description:', error);
      setError('Error getting pack description');
      return;
    } else {
      setDescription(data[0].description)
    }
  }   

  
  async function updatePackDescription(newDescription) {
    
    console.log(newDescription)

    const { data, error } = await supabase
      .from('packs')
      .update({description: newDescription})
      .eq('id', packId)
      .select()

    if (error) {
      console.error('Error updating pack description:', error);
      setError('Error updating pack description');
      return;
    } else {
      setDescription(newDescription)
      setEditDescription(!editDescription)
    }
  }   

  useEffect(() => {
    setUser(user)
    getPackDescription()
  }, [user])


  async function handleSubmit(e) {
    e.preventDefault(); 
    updatePackDescription(e.target[0].value);
    
  }

  return (
    <div className="">
      {!editDescription && (
      <div>
        {description} 
      </div>
      )}
      {editDescription && (
      <div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit} noValidate>
          
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex flex-col items-start gap-2">
            <textarea
              rows="4"
              id="description"
              defaultValue={description}
              // onChange={(e) => setDescription(e.target.value)}
              className="rounded w-full"
            />
            <button className="button" type="submit">Save</button>
          </div>
        </form>
      </div>
      )}
      <span className="icon-link" onClick={() => setEditDescription(!editDescription)}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon><line x1="3" y1="22" x2="21" y2="22"></line></svg></span>
    </div>
  );
}