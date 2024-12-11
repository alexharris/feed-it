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
    <div className="w-full lg:w-1/3 bg-white flex flex-col border border-black rounded-xl items-start text-black">
      <div className="border-b border-black w-full p-4 flex flex-row justify-between items-start">
        <h3 className="text-2xl w-3/5 pb-0 thermo">{packData ? packData.title : 'Loading...'}</h3>
        <a className="border border-gray-200 p-2 px-4 flex flex-col justify-center rounded-full text-sm hover:bg-gray-100" href={`/packs/${packId.packId}`}>View Pack</a>
      </div>
      <div className="flex flex-row justify-start gap-8 w-full p-4">
        <NumberOfFeeds packId={packId.packId} />
        <TotalDailyPosts packId={packId.packId} />
      </div>
      <span className="text-xl px-4 pb-4 w-full">{packData ? packData.description : 'Loading...'}</span>
    </div>
  )
}