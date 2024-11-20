import React from 'react'
import supabase from '@/lib/supabaseClient'
import AddFeedToPack from '@/app/components/dashboard/addFeedToPack'
import DeleteFeed from '@/app/components/dashboard/deleteFeed'
import { createClient } from '@/utils/supabase/server'

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
        <h1>{pack.title}</h1>
        <h2>Feeds:</h2>
        <ul>
          {feeds.map(feed => (
            <li key={feed.id}>{feed.rss} <DeleteFeed feedId={feed.id} packId={pack.id} /></li>
          ))}
        </ul>
        <AddFeedToPack user={data.user} packId={pack.id} />
      </div>
    </div>
  )
}