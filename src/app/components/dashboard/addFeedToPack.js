'use client'

import React, { useState, useEffect } from 'react';
import supabase from '@/lib/supabaseClient'


export default function Page(data) {

  const [feedUrl, setFeedUrl] = useState('');
  const [feeds, setFeeds] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const id = data.packId

  async function addNewFeedToFeedsTable(feedUrl) {
    // Add the new feed to the feeds table
    const { data, error } = await supabase
      .from('feeds')
      .insert([{ rss: feedUrl }])
      .select()

    if (error) {
      console.error('Error adding new feed:', error);
      setError('Error adding new feed');
      return;
    } else {
      getExistingFeedArrayInPack(data[0].id)
    }
  }   

  async function getExistingFeedArrayInPack(feedId) {
    const { data, error } = await supabase
    .from('packs')
    .select('feed_ids')
    .eq('id', id);

    if (error) {
      console.error('Error adding new feed:', error);
      setError('Error adding new feed');
      return;
    } else {
      addFeedIdToPack(feedId, data[0].feed_ids)
    }
  }
  
  async function addFeedIdToPack(feedId, existingFeeds) {
    const updatedFeeds = Array.isArray(existingFeeds) ? [...existingFeeds, feedId] : [feedId]
    const { data, error } = await supabase
      .from('packs')
      .update({ feed_ids: updatedFeeds })
      .eq('id', id);

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
    if(feedUrl !== '') {
      addNewFeedToFeedsTable(feedUrl)
    } else {
      console.log('need to enter something')
    }
    


  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={feedUrl}
          onChange={(e) => setFeedUrl(e.target.value)}
          placeholder="Enter feed URL"
        />
        <button type="submit">Add Feed</button>
      </form>
    </div>
  );
}