'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { calculateAverageDailyPosts } from '@/utils/tools';

function getFavicon(url) {
  const urlObj = new URL(url);
  return `${urlObj.origin}/favicon.ico`;
}

function RenderFeeds({ feeds }) {
  
  return (
    <div>
      <ul>
      {Object.values(feeds.feeds).map((feed, index) => (
        <li key={index} className="flex flex-col w-full justify-between border-b border-gray-200 py-2 my-2">
          <div className="flex flex-row w-full items-center justify-between"> 
            <div className="w-full md:w-3/5 ">            
              <div className="flex flex-row gap-4 items-center">
                <img className="w-4 h-4" src={getFavicon(feed.itemContent[0].src)} /> 
                <Link href={feed.url}><h3 className="font-semibold pb-0">{feed.title}</h3></Link>
              </div>

              <span className="text-sm text-gray-500">{feed.description}</span>
            </div>
            <div className="w-full md:w-1/5 self-start">
              <span>{calculateAverageDailyPosts(feed.itemDates).roundedAverage} posts / day</span>
            </div>
            <div className="flex flex-row gap-4 w-full md:w-1/5 justify-end">
            {feed.rss &&
              <Link className="icon-link" href={feed.rss}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg></Link>          
            }
            {feed.url &&
              <Link className="icon-link" href={feed.url}><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><g fill="none" fillRule="evenodd"><path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/></g></svg></Link>
            }
            </div>
          </div>
          {/* <div className="flex flex-col gap-4 justify-start">
            <div>
              {Object.values(feed.itemContent).slice(0,10).map((item, idx) => (
                <div key={idx}>
                  {item.title}
                </div>
              ))}
            </div>
          </div> */}

    

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