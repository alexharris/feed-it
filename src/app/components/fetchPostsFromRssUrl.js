'use server'

import Parser from 'rss-parser';

const parser = new Parser();

export async function fetchPostsFromRssUrl(feeds) {



  const fetchedFeeds = {};

  await Promise.all(feeds.map(async (feed, index) => {

    const response = await fetch(feed);
    const text = await response.text();
    
    let parsedFeed;
    try {
      parsedFeed = await parser.parseString(text);
    } catch (error) {
      console.error(`Failed to parse feed: ${feed}`, error);
      return; // Skip this feed if parsing fails
    }
    console.log('parsed!:' + feed);


    const itemDates = {};
    parsedFeed.items.forEach((item, index) => {
      itemDates[index] = item.pubDate;
    });
    
    fetchedFeeds[index] = {
      title: parsedFeed.title,
      description: parsedFeed.description,
      url: parsedFeed.link,
      rss: parsedFeed.feedUrl,
      itemDates: itemDates
    };
  }));

  console.log(fetchedFeeds)

  return fetchedFeeds;

}