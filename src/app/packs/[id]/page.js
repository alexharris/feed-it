import React from 'react';
import supabase from '@/lib/supabaseClient'
import Feeds from '@/app/components/feeds'
import Parser from 'rss-parser';

const parser = new Parser();
// Tried making my own CORS proxy but it didnt work
// const CORS_PROXY = "https://cloudflare-cors-anywhere.feedit.workers.dev/"
// Trying https://corsproxy.io/?
const CORS_PROXY = "https://corsproxy.io/?"
// maybe I dont need to do this if I run this from the server instead of the client? maybe move to page.js??

async function fetchFeeds(feedIds) {

  console.log('fetchedFeeds function');

  let { data: feeds, error } = await supabase
  .from('feeds')
  .select('*')
  .in('id', feedIds);

  const fetchedFeeds = {};
  await Promise.all(feeds.map(async (feed) => {
    // console.log('promise');
    const response = await fetch(CORS_PROXY + feed.rss);
    const text = await response.text();
    const parsedFeed = await parser.parseString(text);

    const itemsObject = {};
    parsedFeed.items.forEach((item, index) => {
      itemsObject[index] = item.pubDate;
    });

    // console.log(itemsObject)

    fetchedFeeds[feed.id] = {
      title: parsedFeed.title,
      description: parsedFeed.description,
      url: parsedFeed.url,
      items: itemsObject
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
      <div className="w-full lg:w-1/4 p-4 lg:pr-0">
        <div className="border border-blue-400 rounded p-2">
          <h1 className="text-lg font-semibold">{pack[0].title}</h1>
          <p>{pack[0].description}</p>
        </div>
      </div>
      {/* Main */}
      <div className="w-full lg:w-3/4 p-4">
        <Feeds feeds={fetchedFeeds} />
      </div>
    </div>
  )
}



