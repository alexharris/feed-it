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
      const dailyPosts = calculateAverageDailyPosts(itemDates).roundedAverage      
      
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
    <div className="flex flex-row md:flex-col justify-between md:justify-center border-b mb-4 border-gray-100 py-2 md:rounded-full  w-full">
      <div className="md:text-xl">
        {average} posts / day
      </div>
      {/* <div className="text-sm">Posts Per Day</div> */}
    </div>
  )
}