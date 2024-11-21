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
    <div>
      {packData && packData.length > 0 ? (
        <ul>
          {packData.map(pack => (
            <li key={pack.id}><Link href={'/dashboard/edit/' + pack.id}>{pack.title}</Link></li>
          ))}
        </ul>
      ) : (
        <div>You don&apos;t have any feedbags yet!</div>
      )}
      <div>
        Add a new feed bag
      </div>
    </div>
  )
}