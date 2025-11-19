import {createClient} from "@/supabase/server";
import {AuthButtonServer} from "@/app/auth-button-server";
import {redirect} from "next/navigation";
import NewTweet from "@/app/new-tweet";
import Likes from "@/app/likes";

export default async function Home() {
  const supabase = await createClient<Database>();

  const {data: {session}} = await supabase.auth.getSession()

  if(!session) {
    redirect("/login")
  }

  const { data } = await supabase.from("tweets").select("*, profiles(*), likes(*)")

  const tweets = data?.map((tweet) => ({
    ...tweet,
    user_has_liked_tweet: tweet.likes.find(like => like.user_id === session?.user.id),
    likes: tweet.likes.length,
  }))

  return (
      <div>
          <NewTweet/>
          <AuthButtonServer/>
          {tweets?.map((tweet) => (<div key={tweet.id}>
              <p>{tweet.profiles.name} {tweet.profiles.username}</p>
              <p>{tweet.title}</p>
              <Likes tweet={tweet} />
          </div>))}
      </div>
  );
}
