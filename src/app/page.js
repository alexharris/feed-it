import supabase from '@/lib/supabaseClient'
import Feeds from '@/app/components/feeds'


export default async function Home() {

let { data: feeds, error } = await supabase
.from('feeds')
.select('*')
        

  return (
    <section>   
      <Feeds feeds={{feeds}}/>
    </section>
  )
}
