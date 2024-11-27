'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link'

function GetCadence(posts) {
  let posts2 = posts.posts
  // console.log(posts.length)
  if (
    !posts2 || posts2.length === 0) return "No posts available";

  let postArray = Object.values(posts2).map(post => new Date(post));

  const firstDate = Math.min(...postArray);
  const lastDate = Math.max(...postArray);
  const weeks = (lastDate - firstDate) / (1000 * 60 * 60 * 24 * 7);
  const cadence = postArray.length / weeks;

  return `Average posts per week: ${cadence.toFixed(2)}`;
}


function RenderFeeds({ feeds }) {
  console.log(feeds)
  return (
    <div>
      {Object.values(feeds.feeds).map((feed, index) => (
        <div key={index} className='rounded-lg border border-blue-400 p-4 mb-4'>
        <Link href={feed.url}><h2 className="font-semibold">{feed.title}</h2></Link>
        <ul>
          <li>{feed.description}</li>
          <li>{feed.url}</li>
          <li>{feed.rss}</li>
          <li><GetCadence posts={feed.itemDates} /></li>
        </ul>

      </div>
      ))}
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