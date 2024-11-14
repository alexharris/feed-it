'use client'

import React, { useEffect, useState } from 'react';
import Parser from 'rss-parser';

const parser = new Parser();
// Tried making my own CORS proxy but it didnt work
// const CORS_PROXY = "https://cloudflare-cors-anywhere.feedit.workers.dev/"
// Trying https://corsproxy.io/?
const CORS_PROXY = "https://corsproxy.io/?"
// Maybe I dont need to do this if I run this from the server instead of the client? maybe move to page.js??

function GetCadence(posts) {
  if (!posts || posts.posts.length === 0) return "No posts available";
  const dates = posts.posts.map(post => new Date(post.pubDate));
  
  const firstDate = Math.min(...dates);
  const lastDate = Math.max(...dates);
  const weeks = (lastDate - firstDate) / (1000 * 60 * 60 * 24 * 7);
  const cadence = posts.posts.length / weeks;

  return `Average posts per week: ${cadence.toFixed(2)}`;
}


function RenderFeeds({ feedIds }) {

  console.log(feedIds);

  return (
    <div>
      {feeds.map((feed, index) => (
        <div key={index} className='rounded-lg border border-blue-400 p-4 m-4'>
          <h2>{feed.title}</h2>
          <p>{feed.description}</p>
          <span>{feed.url}</span><br />
          <span><GetCadence posts={feed.items} /></span>
        </div>
      ))}
    </div>
  );
}

export default function Feeds({ feedIds }) {
  const [rssFeeds, setRssFeeds] = useState([]);
  useEffect(() => {
    async function fetchFeeds() {
      const feedUrls = feeds.feeds.map(feed => feed.rss);
      const fetchedFeeds = await Promise.all(feedUrls.map(async url => {
        try {
          const response = await fetch(CORS_PROXY + url);
          const text = await response.text();
          const feed = await parser.parseString(text);
          console.log(feed);
          return {
            title: feed.title,
            description: feed.description,
            url: url,
            items: feed.items
          };
        } catch (error) {
          console.error(`Error fetching or parsing feed from ${url}`, error);
          return null;
        }
      }));
      setRssFeeds(fetchedFeeds.filter(feed => feed !== null));
    }
    fetchFeeds();
  }, [feedIds]);
  return (
    <section>
      <RenderFeeds feeds={rssFeeds} />
    </section>
  );
}