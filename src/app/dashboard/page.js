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
  } else {
    console.log(data.user)
  }


  return (
    <div className="p-4">
      <div className="">
        <h2 className="border-b-2 border-black">Your Packs</h2>
        <UserPacks />
        <CreateNewPack />
      </div>
      <div className="">
        <div className="bg-gray-100 p-4 mt-16 rounded">
          <h2>Account Information</h2>
        <p className="mb-4">Email: {data.user.email}.</p>
        <form action={logout}>
          <button className="button" type="submit">
            Logout
          </button>
        </form>
        </div>
      </div>    
    </div>
  )
}