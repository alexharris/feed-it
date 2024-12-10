'use client'

import React, { useState, useEffect } from 'react'
import supabase from '@/lib/supabaseClient'


export default function NumberOfFeeds(packId) {

  const [error, setError] = useState(null);
  const [numberOfFeeds, setNumberOfFeeds] = useState(0);

  async function getNumberOfFeeds() {
    
    const { data, error } = await supabase
      .from('packs')
      .select('feed_ids')
      .eq('id', packId.packId)
  
    if (error) {
      console.error('Error getting number of feeds:', error);
      setError('Error getting number of feeds');
      return;
    } else {
      if(data[0].feed_ids && data[0].feed_ids.length > 0) {
        setNumberOfFeeds(data[0].feed_ids.length)
      } else {
        setNumberOfFeeds(0)
      }
      
    }
  }     

  getNumberOfFeeds()


  return (
    <div className="flex flex-row-reverse md:flex-col justify-between border-none md:border-b border-gray-300 py-2 text-center">
      <div className="md:text-4xl">
        {numberOfFeeds}
      </div>
      <div className="font-bold">Feed Count</div>
    </div>
  )
}