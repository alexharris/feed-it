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
    <div className="flex flex-col">
      <header className="flex flex-col md:flex-row gap-4 items-start md:items-center md:justify-between">
        
        
      </header>   
      <div className="flex flex-col-reverse md:flex-row items-start lg:w-4/5 lg:mx-auto">
        <div className="w-full md:w-3/5 bg-gray-50">  
          <Tabs>
            <div title="Stream">
              <Stream feeds={fetchedFeeds} />
            </div>        
            <div title="Feeds">
              <Feeds feeds={fetchedFeeds} />
            </div>
          </Tabs>
        </div>
        <div className="flex flex-col justify-start md:ml-6 p-4 bg-gray-50 md:rounded-xl items-start w-full md:w-2/5 md:sticky md:top-20">
          <h1 className="text-2xl mb-2">{pack[0].title}</h1>
          <div className="w-full text-left text-xl">
            {pack[0].description}
          </div>
          
          <div className="w-full">
            <NumberOfFeeds packId={pack[0].id} />
          </div>
          <div className="w-full">
            <AverageDailyPosts packId={pack[0].id} />
          </div>
          <DownloadFile title={pack[0].title} feeds={fetchedFeeds} />
        </div>        
      </div>   

    </div>
  )
}



