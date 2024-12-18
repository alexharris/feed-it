'use client'

import React, { useEffect, useState } from 'react';
import { getImage } from '@/utils/tools';

function getDisplayDate(date) {
  const now = new Date();
  const diff = now - new Date(date);

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);

  if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 8) {
    return `${hours} hours ago`;
  } else {
    return new Date(date).toLocaleDateString();
  }
}

function shortenSnippet(snippet, link) {
  if (snippet.length > 500) {
    return (
      <div className="ml-10">
        <p >
          {snippet.substring(0, 500)} [<a className="inline no-underline text-blue-600" href={link}>more</a>]
        </p>
      </div>
    ) }
    else {
      return (
        <div className="ml-10">
          <p>
            {snippet}
          </p>
        </div>
      )
    }
}

function cleanUpSrc(src, link) {
  let cleanSrc;
  if (src.includes("bsky.app")) {
    const parts = link.split("/profile/");
    cleanSrc = parts.length > 1 ? parts[1] : src;
    cleanSrc = cleanSrc.split('/')[0];
  } else if (src.includes("substack")) {
    cleanSrc = src.replace(/^https?:\/\//, '');
  } else if (src.includes("beehiiv")) {
    const url = new URL(link);
    cleanSrc = url.hostname;
  } else {
    cleanSrc = src.replace(/^https?:\/\//, '');
    const url = new URL(src);
    cleanSrc = url.hostname.split('.').slice(-2).join('.');
  }
  return cleanSrc;
}

function cleanUpLink(src, link) {
  if (src.includes("substack")) {
    return src;
  } else if (src.includes("beehiiv")) {
    return 'https://' + cleanUpSrc(src, link);
  } else if (src.includes("bsky.app")) {
    return link.split('/post')[0];
  } else {
    return src;
  }
}

function StreamFeeds({ feeds }) {

  console.log(feeds)

  const allItems = [];

  Object.values(feeds).forEach(feed => {
    Object.values(feed.itemContent).forEach(item => {
      console.log(feed)
      item['srcTitle'] = feed.title
      item['srcLink'] = feed.url
      allItems.push(item);
    });
  });



  allItems.sort((a, b) => new Date(b.date) - new Date(a.date));

  console.log(allItems)
  
  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full"> 

      {allItems.map((item, index) => (
        <div key={index} className="w-full pb-8 border-b border-gray-100">
          <div className="flex flex-row gap-4 items-center text-gray-400 text-sm mb-2">
            <a href={item.srcLink}><img className="w-6 h-6" src={getImage(item.image, item.src)} /></a>
            <span className="flex flex-row gap-4">
              <a href={item.srcLink}>{item.srcTitle}</a>
              {getDisplayDate(item.date)}
            </span>
            
          </div>
          <h3 className="font-bold ml-10"><a href={item.link}>{item.title}</a></h3>
            {/* if snippet exists */}
            {item.snippet &&
              shortenSnippet(item.snippet, item.link)
            }
            <a className="ml-10 uppercase text-sm text-blue-400" href={item.link}>Read →</a>

          
          
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