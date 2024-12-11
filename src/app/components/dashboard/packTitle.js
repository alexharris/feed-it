'use client'

import React, { useState, useEffect } from 'react'
import { createClient } from "@/utils/supabase/client"



export default function Page(data) {

  const [editTitle, setEditTitle] = useState(false)
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);


  const userId = data.user.id
  const packId = data.packId

  const supabase = createClient()

  useEffect(() => {

    async function getUser() {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        console.log('no user')
      }
      else {
        setUser(data.user)
      }
      setLoading(false)
    }

    getUser()

    getPackTitle()
  }, [])


  async function getPackTitle() {
    console.log('get pack title')

    const { data, error } = await supabase
      .from('packs')
      .select('title')
      .eq('id', packId)

    if (error) {
      console.error('Error getting pack title:', error);
      setError('Error getting pack title');
      return;
    } else {
      setTitle(data[0].title)
    }
  }   

  
  async function updatePackTitle(newTitle) {
    
    console.log(packId)

    const { data, error } = await supabase
      .from('packs')
      .update({title: newTitle})
      .eq('id', packId)
      .select()

      console.log(data)

    if (error) {
      console.error('Error updating pack title:', error);
      setError('Error updating pack title');
      return;
    } else {
      setTitle(newTitle)
      setEditTitle(!editTitle)
    }
  }   




  async function handleSubmit(e) {
    e.preventDefault(); 
    updatePackTitle(e.target[0].value);
    
  }

  return (
    <div className="flex flex-row w-1/2">
      {!editTitle && (
      <h1>
        {title} 
      </h1>
      )}
      {editTitle && (
     
        <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit} noValidate>
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex flex-col items-start gap-2">
            <textarea
              rows="1"
              id="title"
              defaultValue={title}
              className="rounded w-full"
            />
            <button className="button" type="submit">Save</button>
          </div>
        </form>
     
      )}
      <span className="icon-link" onClick={() => setEditTitle(!editTitle)}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon><line x1="3" y1="22" x2="21" y2="22"></line></svg></span>
    </div>
  );
}