import supabase from '@/lib/supabaseClient'

export default async function Page() {
  const test = await supabase
    .from('test')
    .select('*')
          
  console.log();
  
  return <pre>{test.data[0].test}</pre>
}