'use client'

import React, { useEffect, useState } from 'react';


function GetCadence(posts) {
  let posts2 = posts.posts
  // console.log(posts.length)
  if (!posts2 || posts2.length === 0) return "No posts available";

  let postArray = Object.values(posts2).map(post => new Date(post));

  console.log(postArray);

  const firstDate = Math.min(...postArray);
  const lastDate = Math.max(...postArray);
  const weeks = (lastDate - firstDate) / (1000 * 60 * 60 * 24 * 7);
  const cadence = postArray.length / weeks;

  return `Average posts per week: ${cadence.toFixed(2)}`;
}


function RenderFeeds({ feeds }) {
  return (
    <div>
      {Object.values(feeds.feeds).map((feed, index) => (
        <div key={index} className='rounded-lg border border-blue-400 p-4 mb-4'>
        <h2>{feed.title}</h2>
        <p>{feed.description}</p>
        <span>{feed.url}</span><br />
        <span><GetCadence posts={feed.items} /></span>
      </div>
      ))}
    </div>
  );
}


export default function Feeds(feeds) {

  return (
    <section>
      Hello
      <RenderFeeds feeds={feeds} />
    </section>
  );
}