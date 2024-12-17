'use client'

import React, { useEffect, useState } from 'react';
import { getImage } from '@/utils/tools';



function StreamFeeds({ feeds }) {




  console.log(feeds)

  const allItems = [];

  Object.values(feeds).forEach(feed => {
    Object.values(feed.itemContent).forEach(item => {
      allItems.push(item);
    });
  });


  allItems.sort((a, b) => new Date(b.date) - new Date(a.date));

  
  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full md:w-1/2 mx-auto"> 

      {allItems.map((item, index) => (
        <div key={index} className="w-full pb-6 border-b border-gray-200">
          <div className="flex flex-row gap-4 items-center text-gray-500 text-sm mb-2">
            <img className="w-4 h-4" src={getImage(item.image, item.src)} /> 
            <span className="font-bold">{item.src}</span>
            {new Date(item.date).toLocaleString()}
          </div>
          <h3 className="font-bold"><a href={item.link}>{item.title}</a></h3>
          <p className="">{item.snippet}</p>
          
        </div>
      ))}
    </div>
  );
}

export default function Feeds({ feeds }) { 
  return (
    <section className="">
      <StreamFeeds feeds={feeds} />
    </section>
  );
}