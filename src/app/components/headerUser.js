'use server' 

import { createClient } from '@/utils/supabase/server'


import { logout } from "@/app/logout/actions";

export default async function userHeader() {

  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  return (
    <div>
      {data.user ? (
        <form action={logout}>
          <button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#405472" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/></svg>
          </button>
        </form>
      ) : (
        <a href="/login">Login</a>
      )}
      {/* <form action={logout}>
        <button type="submit">
          {data.user.id}
        </button>
      </form> */}
    </div>

  )
}








