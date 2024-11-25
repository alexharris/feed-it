'use client'

import React, { useState, useEffect } from 'react'
import supabase from '@/lib/supabaseClient'


export default function NumberOfFeeds(packId) {

  const [error, setError] = useState(null);
  const [numberOfFeeds, setNumberOfFeeds] = useState(null);

  async function getNumberOfFeeds() {
    console.log(packId.packId)
    const { data, error } = await supabase
      .from('packs')
      .select('feed_ids')
      .eq('id', packId.packId)
  
    if (error) {
      console.error('Error getting number of feeds:', error);
      setError('Error getting number of feeds');
      return;
    } else {
      setNumberOfFeeds(data[0].feed_ids.length)
    }
  }     

  getNumberOfFeeds()


  return (
    <div className="flex flex-col">
      <div className="text-7xl">
        {numberOfFeeds}
      </div>
      <div>Number of Feeds</div>
    </div>
  )
}