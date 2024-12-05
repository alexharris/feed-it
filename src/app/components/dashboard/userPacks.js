'use client'

import { createClient } from "@/utils/supabase/client"
import { useState, useEffect } from "react"
import supabase from '@/lib/supabaseClient'
import Link from "next/link"


export default function UserPacks() {
  const [user, setUser] = useState(null)
  const [packData, setPackData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function getUser() {
      const supabase = await createClient()

      const { data, error } = await supabase.auth.getUser()

      if (error || !data?.user) {
        console.log('no user')
      }
      else {
        setUser(data.user)
      }
      setLoading(false)
      getUserPacks(data.user)
    }

    getUser()

    async function getUserPacks(user) {
      let { data, error } = await supabase
      .from('user_packs')
      .select('*')
      .eq('user_id', user.id)

      if (error) {
        console.error('Error getting packs:', error);
        setError('Error adding getting packs');
        return;
      } else {
        if (Array.isArray(data) && data[0] && data[0].pack_ids && data[0].pack_ids.length > 0) {
          getPackDetails(data[0].pack_ids)
        } else {
          console.log('no packs')
        }
      }
    }

    async function getPackDetails(packIds) {
      let { data, error } = await supabase
      .from('packs')
      .select('*')
      .in('id', packIds)      
      
      setPackData(data)
    }
  },[])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>No user logged in</div>
  }

  return (
    <div className="my-4">
      {packData && packData.length > 0 ? (
        <ul>
          {packData.map(pack => (
            <li className="mb-2 pb-2 flex flex-row justify-between items-center gap-4 border-b border-gray-300" key={pack.id}>
              <Link href={'/dashboard/edit/' + pack.id}>{pack.title}</Link>
              <div className="flex flex-row gap-2">
              <Link href={'/packs/' + pack.id}><svg className="icon-link" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><g fill="none" fillRule="evenodd"><path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/></g></svg></Link>
                <Link href={'/dashboard/edit/' + pack.id}><svg className="icon-link" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon><line x1="3" y1="22" x2="21" y2="22"></line></svg></Link>
              </div>  
            </li>
          ))}
        </ul>
      ) : (
        <div>You don&apos;t have any packs yet.</div>
      )}
    </div>
  )
}