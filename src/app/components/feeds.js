'use client'

import React, { useEffect, useState } from 'react';
import Parser from 'rss-parser';
import supabase from '@/lib/supabaseClient';

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


function RenderFeeds({ feeds }) {
  console.log(feeds);

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
      try {
        let { data: feeds, error } = await supabase
          .from('feeds')
          .select('*')
          .in('id', feedIds);

        if (error) {
          console.error('Error fetching feeds:', error);
          return;
        }

        const fetchedFeeds = await Promise.all(feeds.map(async feed => {
          console.log(feed.rss)
          const response = await fetch(CORS_PROXY + feed.rss);
          const text = await response.text();
          const parsedFeed = await parser.parseString(text);
          return {
            title: parsedFeed.title,
            description: parsedFeed.description,
            url: feed.url,
            rss: feed.rss,
            items: parsedFeed.items
          };
        }));

        setRssFeeds(fetchedFeeds);
      } catch (error) {
        console.error('Error fetching or parsing feeds:', error);
      }
    }

    fetchFeeds();
  }, [feedIds]);

  return (
    <section>
      <RenderFeeds feeds={rssFeeds} />
    </section>
  );
}