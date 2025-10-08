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
      <NewTweet />
      <AuthButtonServer />
      {JSON.stringify(tweets, null, 2)}
    </div>
  );
}
