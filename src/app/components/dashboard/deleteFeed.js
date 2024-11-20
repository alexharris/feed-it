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

    console.log(existingFeeds)
    console.log(packId)
    console.log(feedId)
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
      <button onClick={() => (getExistingFeedArrayInPack())}> x </button>
    </div>
  );
}