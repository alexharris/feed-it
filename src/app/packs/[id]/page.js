import supabase from '@/lib/supabaseClient'

export default async function Page({ params }) {

  const id = (await params).id

  let { data: packs, error } = await supabase
  .from('packs')
  .select('*')
  .eq('id', id)

  console.log(packs[0].title);


  return <div>My Post: {id}</div>
}



