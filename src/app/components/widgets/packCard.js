'use client'

import React, { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient'
import NumberOfFeeds from '@/app/components/widgets/numberOfFeeds';
import TotalDailyPosts from '@/app/components/widgets/totalDailyPosts'

export default function PackCard(packId) {
  const [packData, setPackData] = useState(null);
  const [error, setError] = useState(null);

  // console.log('pack card')
  // console.log(packId.packId)

  async function getFeedInfo() {
    let { data, error } = await supabase
      .from('packs')
      .select('*')
      .eq('id', packId.packId)

    if (error) {
      console.error('Error getting number of feeds:', error);
      setError('Error getting number of feeds');
      return;
    } else {
      setPackData(data[0]);
    }
  }     

  useEffect(() => {
    getFeedInfo();
  }, []);

  return (
    <div className="w-96 bg-white flex flex-col justify-between border border-black p-4 rounded-xl items-start">
      <h3 className="text-2xl">{packData ? packData.title : 'Loading...'}</h3>
      <span className="text-xl">{packData ? packData.description : 'Loading...'}</span>
      <div className="flex flex-row justify-between w-full py-6 border border-gray-100 rounded-xl p-4 my-6">
        <NumberOfFeeds packId={packId.packId} />
        <TotalDailyPosts packId={packId.packId} />
      </div>
      <a href={`/packs/${packId.packId}`} className="button">View Pack</a>
    </div>
  )
}