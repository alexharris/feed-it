import Image from "next/image";
import supabase from '@/lib/supabaseClient'


export default async function Home() {


  const test = await supabase
    .from('test')
    .select('*')


    return <pre>{test.data[0].test}</pre>
}
