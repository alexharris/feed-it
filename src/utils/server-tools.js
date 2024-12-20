'use server'

import Parser from 'rss-parser';

const parser = new Parser();

export async function isValidRSSFeed(url) {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const parsedFeed = await parser.parseString(text);
    return parsedFeed.items && parsedFeed.items.length > 0;
  } catch (error) {
    console.error('Error validating RSS feed:', error);
    return false;
  }
}

export async function fetchContentFromFeeds(feeds) {

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

    const itemDates = {};
    const itemContent = {};

    if (parsedFeed.image && parsedFeed.image.url) {
      parsedFeed.imageUrl = parsedFeed.image.url;
    } else {
      parsedFeed.imageUrl = ''
    }

    parsedFeed.items.forEach((item, index) => {
        // console.log(item)
  
      itemDates[index] = item.pubDate;
      const url = new URL(feed.rss);
      itemContent[index] = {
        title: item.title,
        content: item['content:encoded'],
        snippet: item.contentSnippet,
        date: item.pubDate,
        link: item.link,
        src: url.origin, // Store only the root domain,
        image: parsedFeed.imageUrl,
      }
      
    });

    //parsedFeed comes from the feed itself
    //feed comes from the db
    fetchedFeeds[feed.id] = {
      title: parsedFeed.title,
      description: parsedFeed.description,
      url: parsedFeed.link,
      rss: parsedFeed.feedUrl,
      itemDates: itemDates,
      itemContent: itemContent
    };
  }));


  return fetchedFeeds
}


