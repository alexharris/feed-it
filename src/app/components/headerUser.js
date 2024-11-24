'use server' 

import { createClient } from '@/utils/supabase/server'




export default async function userHeader() {

  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  return (
    <div>
      {data.user ? (
        <a href="/dashboard">
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/></svg>        </a>
      ) : (
        <a href="/login">Login</a>
      )}
    </div>

  )
}








