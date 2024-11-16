import React from 'react';
import supabase from '@/lib/supabaseClient'
import Feeds from '@/app/components/feeds'
import DownloadFile from '@/app/components/downloadFile'
import FeedFrequency from '@/app/components/feedFrequency'
import Parser from 'rss-parser';
import Link from 'next/link'

const parser = new Parser();


// Tried making my own CORS proxy but it didnt work
// const CORS_PROXY = "https://cloudflare-cors-anywhere.feedit.workers.dev/"
// Trying https://corsproxy.io/?
// const CORS_PROXY = "https://corsproxy.io/?"
// maybe I dont need to do this if I run this from the server instead of the client? maybe move to page.js??
// I did move it to page.js and it doesnt seem to need CORS proxy anymore

async function fetchFeeds(feedIds) {

  console.log('fetchedFeeds function');

  let { data: feeds, error } = await supabase
  .from('feeds')
  .select('*')
  .in('id', feedIds);

  const fetchedFeeds = {};

  await Promise.all(feeds.map(async (feed) => {
    
    const response = await fetch(feed.rss);
    const text = await response.text();
    
    let parsedFeed;
    try {
      parsedFeed = await parser.parseString(text);
    } catch (error) {
      console.error(`Failed to parse feed: ${feed.rss}`, error);
      return; // Skip this feed if parsing fails
    }

    const itemsObject = {};
    parsedFeed.items.forEach((item, index) => {
      itemsObject[index] = item.pubDate;
    });


    //parsedFeed comes from the feed itself
    //feed comes from the db
    fetchedFeeds[feed.id] = {
      title: parsedFeed.title,
      description: parsedFeed.description,
      url: parsedFeed.link,
      rss: parsedFeed.feedUrl,
      itemDates: itemsObject
    };
  }));
  return fetchedFeeds
}


export default async function Page({ params }) {
  
  const id = (await params).id

  let { data: pack, error } = await supabase
  .from('packs')
  .select('*')
  .eq('id', id)

  const feedIds = pack[0].feed_ids;

  const fetchedFeeds = await fetchFeeds(feedIds);
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-1/3 p-4 lg:pr-0">
        <div className="bg-blue-100 rounded p-2">
          <h1 className="text-lg font-semibold">{pack[0].title}</h1>
          <p>{pack[0].description}</p>
          <FeedFrequency feeds={fetchedFeeds} />
          <DownloadFile feeds={fetchedFeeds} />
        </div>
      </div>
      {/* Main */}
      <div className="w-full lg:w-2/3 p-4">
        <Feeds feeds={fetchedFeeds} />
      </div>
    </div>
  )
}



