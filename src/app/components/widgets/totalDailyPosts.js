'use client'

import React, { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient'
import {fetchPostsFromFeeds} from '@/app/components/widgets/adpServer'
import { useRouter } from 'next/navigation';
import { calculateAverageDailyPosts } from '@/utils/tools';

export default function AverageDailyPosts(packId) {

  // console.log('TOTAL DAILY POSTS WIDGET')

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

  let totalPosts = 0

  function calculateFrequency(fetchedFeeds) {
    //go througheach of the fetched feeds
    for (const feedId in fetchedFeeds) {
   
      const feed = fetchedFeeds[feedId];
      const itemDates = Object.values(feed.itemDates);
      const dailyPosts = calculateAverageDailyPosts(itemDates)      
      
      totalPosts += parseFloat(dailyPosts);
    }

    setAverage(totalPosts.toFixed(2));
  }
  
  useEffect(() => {
    setAverage(0)
    // console.log('total daily posts use effect')
    getFeedIdsFromPack()
    
    
  }, []);

  return (
    <div className="flex flex-row-reverse md:flex-col justify-between md:justify-center border-none md:border-b border-gray-300 py-2 text-center md:bg-gray-100 rounded-full p-4 h-32 w-32">
      <div className="md:text-5xl">
        {average}
      </div>
      <div className="text-sm">Posts Per Day</div>
    </div>
  )
}