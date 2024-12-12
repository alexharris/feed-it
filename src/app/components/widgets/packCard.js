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
    <div className="w-full lg:w-1/3 bg-white flex flex-col rounded-xl items-start text-black p-2">
      <div className="border-b border-gray-200 bg-gray-50 w-full p-4 flex flex-row justify-between items-start rounded-xl shadow">
        <h3 className="text-2xl w-3/5 pb-0 thermo">{packData ? packData.title : 'Loading...'}</h3>
        <a className="pill-black" href={`/packs/${packId.packId}`}>View</a>
      </div>
      <span className="text-xl p-0 md:px-4 py-4 w-full border-b border-gray-100">{packData ? packData.description : 'Loading...'}</span>
      <div className="flex flex-col md:flex-row justify-start md:gap-8 w-full md:p-4">
        <NumberOfFeeds packId={packId.packId} />
        <TotalDailyPosts packId={packId.packId} />
      </div>
      
    </div>
  )
}