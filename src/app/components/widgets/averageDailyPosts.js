'use client'

import React, { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient'
import {fetchPostsFromFeeds} from '@/app/components/widgets/adpServer'
import { useRouter } from 'next/navigation';




let totalAverage = ''

export default function AverageDailyPosts(packId) {

  const router = useRouter();

  const [average, setAverage] = useState(0)

  async function getFeedIdsFromPack() {

    let { data: feedIds, error } = await supabase
      .from('packs')
      .select('feed_ids')
      .eq('id', packId.packId)

    if (error) {
      console.error('Error getting number of feeds:', error);
      setError('Error getting number of feeds');
      return;
    } else {
      let fetchedFeeds = await fetchPostsFromFeeds(feedIds[0].feed_ids)
      calculateFrequency(fetchedFeeds)
      
    }
  }     

  function calculateFrequency(fetchedFeeds) {

    const averages = {}
    
    //go througheach of the fetched feeds
    for (const feedId in fetchedFeeds) {
   
      const feed = fetchedFeeds[feedId];
      const itemDates = Object.values(feed.itemDates);

      const dateCounts = itemDates.reduce((acc, date) => {
        const day = new Date(date).toDateString();
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {});

      const totalDays = Object.keys(dateCounts).length;
      const totalPosts = itemDates.length;

      averages[feedId] = totalPosts / totalDays;
    }

    totalAverage = Object.values(averages).reduce((acc, avg) => acc + avg, 0) / Object.keys(averages).length;
    totalAverage = totalAverage.toFixed(2);
    setAverage(totalAverage)
  
  }
  


  useEffect(() => {
    getFeedIdsFromPack()
    calculateFrequency()
  }, []);




  return (
    <div className="flex flex-row-reverse md:flex-col justify-between border-none md:border-b border-gray-300 py-2">
      <div className="md:text-7xl">
        {totalAverage}
      </div>
      <div className="font-bold">Average Daily Posts</div>
    </div>
  )
}