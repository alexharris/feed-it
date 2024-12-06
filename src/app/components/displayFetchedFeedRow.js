'use client'


import React, { useState, useEffect } from 'react'
import { fetchPostsFromRssUrl } from '@/app/components/fetchPostsFromRssUrl'
import Link from 'next/link'
import { calculateAverageDailyPosts } from '@/utils/tools'
import supabase from '@/lib/supabaseClient'
import { redirect } from 'next/navigation'
import DeleteFeed from '@/app/components/dashboard/deleteFeed'


export default function DisplayFetchedFeeds({ feedRss, packId, feedId, user }) {

  const [rssFeed, setRssFeed] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect( () => {
   
    async function getFetchedFeeds(feedRss) {
      const fetchedFeeds = await fetchPostsFromRssUrl(feedRss)
      setRssFeed(fetchedFeeds)
      // setLoading(false)
    }

    getFetchedFeeds(feedRss)
    
  }, [feedRss])

  if (loading) {
    return (
      <div className="w-full animate-pulse">
        <div className="flex flex-row w-full items-start justify-between border-b border-gray-300 py-2 my-2">
          <div className="w-full md:w-3/5">
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
          <div className="w-full md:w-1/5 self-start">
            <span className="shimmer">Loading</span>
          </div>
          <div className="flex flex-row gap-4 w-full md:w-1/5 justify-end">
            Loading
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {rssFeed[0] && 
        <div className="flex flex-row w-full items-start justify-between border-b border-gray-300 py-2 my-2">
          <div className="w-full md:w-3/5">
            <div className="font-bold">{rssFeed[0].title}</div>
            <div className="text-gray-500 text-sm">{rssFeed[0].rss}</div>
          </div>
          <div className="w-full md:w-1/5 self-start">
            <span>{calculateAverageDailyPosts(rssFeed[0].itemDates)} posts / day</span>
          </div>
          <div className="flex flex-row gap-4 w-full md:w-1/5 justify-end">
            {user &&
              <DeleteFeed feedId={feedId} packId={packId} />
            }
          </div>
        </div>
      }
    {/* <span className="button" onClick={() => createPackFromUploadClicked(rssFeeds[0])}>Create Starter Pack</span> */}
    </div>
  )
}