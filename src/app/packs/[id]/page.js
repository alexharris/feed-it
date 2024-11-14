import supabase from '@/lib/supabaseClient'
import Feeds from '@/app/components/feeds'

export default async function Page({ params }) {

  const id = (await params).id

  let { data: feeds, error } = await supabase
  .from('packs')
  .select('*')
  .eq('id', id)

  const feed_ids = feeds[0].feed_ids;



  return (
    <div>
      {feed_ids}
      <Feeds feedIds={feed_ids} />
    </div>
  )
}



