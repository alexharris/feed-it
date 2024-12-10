import React from 'react'
import supabase from '@/lib/supabaseClient'
import AddFeedToPack from '@/app/components/dashboard/addFeedToPack'
import DeleteFeed from '@/app/components/dashboard/deleteFeed'
import DeletePack from '@/app/components/dashboard/deletePack'
import PackDescription from '@/app/components/dashboard/packDescription'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import NumberOfFeeds from '@/app/components/widgets/numberOfFeeds'
import TotalDailyPosts from '@/app/components/widgets/totalDailyPosts'
import DisplayFetchedFeedRow from '@/app/components/displayFetchedFeedRow'
import { redirect } from 'next/navigation'


export default async function Page({ params }) {

  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }  

  const id = (await params).id
  let rssFeedUrls = []

  // Fetch the pack data
  let { data: pack, error: packError } = await supabase
    .from('packs')
    .select('*')
    .eq('id', id)
    .single()

  if (packError) {
    console.error('Error fetching pack:', packError)
    return <div>Error fetching pack</div>
  } else if (data.user.id != pack.user_id) {
    redirect('/login') 
  }

 

  const feedIds = pack.feed_ids

  // Fetch the feed details
  let { data: feeds, error: feedsError } = await supabase
    .from('feeds')
    .select('*')
    .in('id', feedIds)

  
  if (feedsError) {
    console.error('Error fetching feeds:', feedsError)
    return <div>Error fetching feeds</div>
  } else {
    rssFeedUrls = feeds.map(feed => feed.rss);
    
  }


  return (
    <div className="p-4">
      <div>
        <header className="flex flex-col md:flex-row border-b-2 border-black gap-4 items-start md:items-center md:justify-between pb-2 mb-2">
          <h1>{pack.title}</h1>
          <Link href={'/packs/' + pack.id}><button className="button">View Pack</button></Link>
        </header>
        <div className="my-6 flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/3 text-left text-xl">
            <PackDescription user={data.user} packId={pack.id} />
          </div>
          <div className="w-full md:w-1/3 text-center"><NumberOfFeeds packId={pack.id} /></div>
          <div className="w-full md:w-1/3 text-center"><TotalDailyPosts packId={pack.id} /></div>
        </div>
        <h2 className="border-b border-black">Feeds</h2>
        {feeds.map(feed => (
          <DisplayFetchedFeedRow key={feed.id} feedRss={feed.rss} feedId={feed.id} user={data.user} packId={pack.id} />
        ))}      
        <AddFeedToPack user={data.user} packId={pack.id} />
        {/* <ImportFeedsFromOpml packId={pack.id} /> */}
        <DeletePack id={id} />
      </div>
    </div>
  )
}