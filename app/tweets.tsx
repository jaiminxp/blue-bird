'use client'

import { useEffect } from 'react'
import Likes from './likes'
import { createClient } from '@/supabase/client'
import { useRouter } from 'next/navigation'
import { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js'

export default function Tweets({ tweets }: { tweets: TweetWithAuthor[] }) {
  const router = useRouter()

  useEffect(() => {
    let supabase: SupabaseClient<Database>
    let channel: RealtimeChannel

    async function refreshOnChange() {
      supabase = await createClient<Database>()
      channel = supabase
        .channel('realtime-tweets')
        .on('postgres_changes', { event: '*', schema: 'public' }, () => {
          router.refresh()
        })
        .subscribe()
    }

    refreshOnChange()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [router])

  return (
    <div>
      {tweets?.map((tweet) => (
        <div key={tweet.id}>
          <p>
            {tweet.author.name} {tweet.author.username}
          </p>
          <p>{tweet.title}</p>
          <Likes tweet={tweet} />
        </div>
      ))}
    </div>
  )
}
