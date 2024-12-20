import supabase from '@/lib/supabaseClient'
import Feeds from '@/app/components/feeds'
import DownloadFile from '@/app/components/downloadFileButton'
import SharePackButton from '@/app/components/sharePackButton'
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
    <div className="flex flex-col-reverse h-full lg:grid grid-cols-11 lg:gap-4 items-start overflow-scroll">
      <div className="col-start-3 col-span-1">
        {/* empty column for now */}
      </div>
      <div className="w-full h-full  col-span-5 bg-gray-50 border-x border-gray-100">  
        <Tabs>
          <div title="Stream">
            <Stream feeds={fetchedFeeds} />
          </div>        
          <div title="Feeds">
            <Feeds feeds={fetchedFeeds} />
          </div>
          <div title="Analysis">
            <div className="w-full">
              <div className="w-full flex flex-col gap-2 mt-4 text-gray-600">
                <NumberOfFeeds packId={pack[0].id} />
                <AverageDailyPosts packId={pack[0].id} />
              </div>              
            </div>
          </div>       
        </Tabs>
      </div>
      <div className="w-full col-span-3 xl:col-span-2 col-end-12 xl:col-end-11 lg:sticky flex flex-col justify-start py-4 px-4 bg-gray-50 lg:bg-white lg:rounded-xl items-start md:top-0">
        <h1 className="text-xl mb-2 mr-6 font-semibold">{pack[0].title}</h1>
        <div className="w-full text-left mb-4">
          {pack[0].description}
        </div>
        <div className="flex flex-col gap-4">
          <DownloadFile title={pack[0].title} feeds={fetchedFeeds} />
          <SharePackButton title={pack[0].title} feeds={fetchedFeeds} />
        </div>
      </div>        
    </div>
  )
}



