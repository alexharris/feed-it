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

      <div className="">
        {numberOfFeeds} feeds
      </div>

  )
}