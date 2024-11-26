import React from 'react'
import supabase from '@/lib/supabaseClient'
import Parser from 'rss-parser';

// Needs to be server because CORS


// import { parseFeeds } from '@/utils/supabase/parseFeeds';

const parser = new Parser();

let totalAverage = ''

export default function AverageDailyPosts(packId) {

  async function getFeedIdsFromPack() {

    let { data: feedIds, error } = await supabase
      .from('packs')
      .select('feed_ids')
      .eq('id', packId.packId)

    if (error) {
      console.error('Error getting number of feeds:', error);
      setError('Error getting number of feeds');
      return;
    } else {
      fetchPostsFromFeeds(feedIds[0].feed_ids)
    }
  }     

  async function fetchPostsFromFeeds(feedIds) {

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

    calculateFrequency(fetchedFeeds)
  }

  function calculateFrequency(fetchedFeeds) {
    console.log('calculate freq');
    const averages = {}
    
    //go througheach of the fetched feeds
    for (const feedId in fetchedFeeds) {
   
      const feed = fetchedFeeds[feedId];
      const itemDates = Object.values(feed.itemDates);

      const dateCounts = itemDates.reduce((acc, date) => {
        const day = new Date(date).toDateString();
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {});

      const totalDays = Object.keys(dateCounts).length;
      const totalPosts = itemDates.length;

      averages[feedId] = totalPosts / totalDays;
    }


    totalAverage = Object.values(averages).reduce((acc, avg) => acc + avg, 0) / Object.keys(averages).length;
    totalAverage = totalAverage.toFixed(2);
  }
  

  getFeedIdsFromPack()




  return (
    <div className="flex flex-row-reverse md:flex-col">
      <div className="md:text-7xl">
        {totalAverage}
      </div>
      <div>Average Daily Posts</div>
    </div>
  )
}