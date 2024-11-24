'use client'

import React, { useState, useEffect } from 'react';
import supabase from '@/lib/supabaseClient'


export default function Page(data) {

  const [user, setUser] = useState(null);

  const packId = data.packId
  const feedId = data.feedId

  async function getExistingFeedArrayInPack(feedId) {
    const { data, error } = await supabase
    .from('packs')
    .select('feed_ids')
    .eq('id', packId);

    if (error) {
      console.error('Error adding new feed:', error);
      setError('Error adding new feed');
      return;
    } else {
      deleteFeedFromPack(data[0].feed_ids)
    }
  }

  async function deleteFeedFromPack(existingFeeds) {

    // Delete the feed from the pack
    const updatedFeeds = Array.isArray(existingFeeds) 
    ? existingFeeds.filter(id => id !== feedId) 
    : [];

    console.log(updatedFeeds)
    const { data, error } = await supabase
      .from('packs')
      .update({ feed_ids: updatedFeeds })
      .eq('id', packId);

    if (error) {
      console.error('Error updating pack:', error);
      setError('Error updating pack');
      return;
    } else {
      location.reload();
    }
  }   

    

  useEffect(() => {
    setUser(user)
  }, [user])


  async function handleSubmit(e) {
    e.preventDefault();
    deleteFeedFromPack(feedUrl)
  }

  return (
    <div className="inline">
      <button onClick={() => (getExistingFeedArrayInPack())}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
      </button>
    </div>
  );
}