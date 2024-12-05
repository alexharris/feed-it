'use client'

import React, { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient'
import {fetchPostsFromFeeds} from '@/app/components/widgets/adpServer'
import { useRouter } from 'next/navigation';
import { calculateAverageDailyPosts } from '@/utils/tools';




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
      console.log('Calculate Frequency')
      calculateFrequency(fetchedFeeds)
      
    }
  }     

  let totalPosts = 0

  function calculateFrequency(fetchedFeeds) {
    //go througheach of the fetched feeds
    for (const feedId in fetchedFeeds) {
   
      const feed = fetchedFeeds[feedId];
      const itemDates = Object.values(feed.itemDates);
      const dailyPosts = calculateAverageDailyPosts(itemDates)      
      
      totalPosts += parseFloat(dailyPosts);
      
      setAverage(totalPosts);

    }
  }
  
  useEffect(() => {
    getFeedIdsFromPack()
    calculateFrequency()
  }, []);

  return (
    <div className="flex flex-row-reverse md:flex-col justify-between border-none md:border-b border-gray-300 py-2">
      <div className="md:text-7xl">
        {average}
      </div>
      <div className="font-bold">Posts Per Day</div>
    </div>
  )
}