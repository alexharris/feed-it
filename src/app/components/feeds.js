'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { calculateAverageDailyPosts, getImage } from '@/utils/tools';

function RenderFeeds({ feeds }) {
  
  return (
    <div>
      <ul>
      {Object.values(feeds.feeds).map((feed, index) => (
        
        <li key={index} className="flex flex-col w-full justify-between border-b border-gray-200 pb-4 my-4">
          <div className="flex flex-col md:flex-row w-full gap-4 items-start justify-between"> 
            <div className="w-full md:w-4/5 ">            
              <div className="flex flex-row gap-4 items-center mb-2">
                <img className="w-6 h-6" src={getImage(feed.itemContent[0].image, feed.itemContent[0].src)} /> 
                <Link href={feed.url}><h3 className="font-semibold pb-0">{feed.title}</h3></Link>
              </div>

              <div className="text-sm text-gray-500 mb-2 ml-10">{feed.description}</div>
              <div className="text-sm text-gray-500 ml-10">{calculateAverageDailyPosts(feed.itemDates).roundedAverage} posts / day</div>

            </div>

            <div className="flex flex-row w-full md:w-1/5 md:justify-end ml-10 md:ml-0">
            {feed.rss &&
              <Link className="icon-link" href={feed.rss}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg></Link>          
            }
            {feed.url &&
              <Link className="icon-link" href={feed.url}><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><g fill="none" fillRule="evenodd"><path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/></g></svg></Link>
            }
            </div>
          </div>
        </li>          
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