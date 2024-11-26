'use server'

import supabase from '@/lib/supabaseClient'
import Parser from 'rss-parser';


const parser = new Parser();

export async function fetchPostsFromFeeds(feedIds) {

  const fetchedFeeds = {};

  let { data: feeds, error } = await supabase
  .from('feeds')
  .select('*')
  .in('id', feedIds);

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

    const itemDates = {};
    parsedFeed.items.forEach((item, index) => {
      itemDates[index] = item.pubDate;
    });


    fetchedFeeds[feed.id] = {
      title: parsedFeed.title,
      description: parsedFeed.description,
      url: parsedFeed.link,
      rss: parsedFeed.feedUrl,
      itemDates: itemDates
    };
  }));


  return fetchedFeeds
}
