import supabase from '@/lib/supabaseClient'
import Feeds from '@/app/components/feeds'
import DownloadFile from '@/app/components/downloadFile'
import FeedFrequency from '@/app/components/feedFrequency'
import Link from 'next/link'
import AverageDailyPosts from '@/app/components/widgets/totalDailyPosts';
import NumberOfFeeds from '@/app/components/widgets/numberOfFeeds';
import PackDescription from '@/app/components/dashboard/packDescription'
import { fetchContentFromFeeds } from '@/utils/server-tools';
import Stream from '@/app/components/stream';
import Tabs from '@/app/components/tabs';

async function fetchFeeds(feedIds) {

  let { data: feeds, error } = await supabase
  .from('feeds')
  .select('*')
  .in('id', feedIds);

  return fetchContentFromFeeds(feeds)
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
    <div className="flex flex-col-reverse md:grid grid-cols-11 md:gap-4 items-start">
      <div className="col-start-3 col-span-1">
        {/* empty column for now */}
      </div>
      <div className="w-full col-span-5 bg-gray-50 border-x border-gray-100">  
        <Tabs>
          <div title="Stream">
            <Stream feeds={fetchedFeeds} />
          </div>        
          <div title="Feeds">
            <Feeds feeds={fetchedFeeds} />
          </div>
          <div title="Download">
            <div className="w-full">
              <p className="mb-4 w-full">Download this OPML file and import into the RSS reader of your choice.</p>
              <DownloadFile title={pack[0].title} feeds={fetchedFeeds} />
            </div>
          </div>       
        </Tabs>
      </div>
      <div className="w-full col-span-2 col-end-11 md:sticky flex flex-col justify-start py-4 px-4 bg-gray-50 md:bg-white md:rounded-xl items-start md:top-20">
        <h1 className="text-xl mb-2 mr-6 font-semibold">{pack[0].title}</h1>
        <div className="w-full text-left">
          {pack[0].description}
        </div>
        <div className="w-full flex flex-col gap-2 mt-4 text-gray-600">
          <NumberOfFeeds packId={pack[0].id} />
          <AverageDailyPosts packId={pack[0].id} />
        </div>
        <span className="absolute top-6 right-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3"/>
          </svg>
        </span>
      </div>        
    </div>
  )
}



