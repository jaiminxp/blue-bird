import {createClient} from "@/supabase/server";
import {AuthButtonServer} from "@/app/auth-button-server";
import {redirect} from "next/navigation";
import NewTweet from "@/app/new-tweet";

export default async function Home() {
  const supabase = await createClient<Database>();

  const {data: {session}} = await supabase.auth.getSession()

  if(!session) {
    redirect("/login")
  }

  const { data: tweets } = await supabase.from("tweets").select("*, profiles(*)")

  return (
      <div>
          <NewTweet/>
          <AuthButtonServer/>
          {tweets?.map((tweet) => (<div key={tweet.id}>
              <p>{tweet.profiles.name} {tweet.profiles.username}</p>
              <p>{tweet.title}</p>
          </div>))}
      </div>
  );
}
