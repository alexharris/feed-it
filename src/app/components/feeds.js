'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { calculateAverageDailyPosts } from '@/utils/tools';


function RenderFeeds({ feeds }) {

  return (
    <div>
      <ul>
      {Object.values(feeds.feeds).map((feed, index) => (
        <li key={index} className="flex flex-row w-full items-center justify-between border-b border-gray-200 py-2 my-2">
          <div className="w-full md:w-3/5">
  
          <Link href={feed.url}><h3 className="font-semibold">{feed.title}</h3></Link>
            {feed.description}
          </div>
          <div className="w-full md:w-1/5 self-start">
            <span>{calculateAverageDailyPosts(feed.itemDates)} posts / day</span>
          </div>
          <div className="flex flex-row gap-4 w-full md:w-1/5 justify-end">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><g fill="none" fillRule="evenodd"><path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/></g></svg>
          </div>
        </li>          
      //   <div key={index} className='rounded-lg border border-blue-400 p-4 mb-4'>
      //   <Link href={feed.url}><h2 className="font-semibold">{feed.title}</h2></Link>
      //   <ul>
      //     <li></li>
      //     <li>{feed.url}</li>
      //     <li>{feed.rss}</li>
      //     <li></li>
      //   </ul>

      // </div>
      ))}
      </ul>
    </div>
  );
}


export default function Feeds(feeds) {
  return (
    <section>
      <RenderFeeds feeds={feeds} />
    </section>
  );
}