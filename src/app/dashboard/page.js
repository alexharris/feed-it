import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import UserPacks from '../components/dashboard/userPacks'


export default async function PrivatePage() {
  
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }


  return (
    <div className="p-4">
      <p>Hello {data.user.email}. Here are your packs:</p>
      <UserPacks />
      
    </div>
  
  )
}