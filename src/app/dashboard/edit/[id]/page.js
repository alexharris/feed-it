import React from 'react'
import supabase from '@/lib/supabaseClient'
import AddFeedToPack from '@/app/components/dashboard/addFeedToPack'
import DeleteFeed from '@/app/components/dashboard/deleteFeed'
import DeletePack from '@/app/components/dashboard/deletePack'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function Page({ params }) {

  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }


  const id = (await params).id

  // Fetch the pack data
  let { data: pack, error: packError } = await supabase
    .from('packs')
    .select('*')
    .eq('id', id)
    .single()

  if (packError) {
    console.error('Error fetching pack:', packError)
    return <div>Error fetching pack</div>
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
  }

  return (
    <div className="p-4">
      <div>
        <header className="flex flex-col lg:flex-row border-b-2 border-black gap-4 items-start lg:items-center lg:justify-between pb-2 mb-2">
          <h1>{pack.title}</h1>
          <button className="button"><Link href={'/packs/' + pack.id}>View Pack</Link></button>
        </header>
        <div className="my-6 flex flex-col lg:flex-row justify-between">
          <div>Description</div>
          <div>Number of Feeds</div>
          <div>Average Frequency</div>
        </div>
        <h2 className="border-b border-black">Feeds</h2>
        <ul>
          {feeds.map(feed => (
            <li className="flex flex-row items-center justify-between border-b border-gray-300 pb-2 my-2" key={feed.id}>{feed.rss} <DeleteFeed feedId={feed.id} packId={pack.id} /></li>
          ))}
        </ul>
        <AddFeedToPack user={data.user} packId={pack.id} />
        <DeletePack id={id} />
      </div>
    </div>
  )
}