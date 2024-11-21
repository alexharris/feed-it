import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import UserPacks from '../components/dashboard/userPacks'
import CreateNewPack from '../components/dashboard/createNewPack'
import { logout } from "@/app/logout/actions";

export default async function PrivatePage() {
  
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }


  return (
    <div className="flex flex-col lg:flex-row">
    {/* Sidebar */}
    <div className="w-full lg:w-1/3 p-4 lg:pr-0">
      <div className="bg-blue-100 rounded p-2">
      <p>Hello {data.user.email}.</p>
      <form action={logout}>
        <button type="submit">
          Logout
        </button>
      </form>
      </div>
    </div>
    {/* Main */}
    <div className="w-full lg:w-2/3 p-4">
      <UserPacks />
      <CreateNewPack />
    </div>
  </div>

  
  )
}