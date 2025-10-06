import {createClient} from "@/supabase/server";
import {AuthButtonServer} from "@/app/auth-button-server";
import {redirect} from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const {data: {session}} = await supabase.auth.getSession()

  if(!session) {
    redirect("/login")
  }

  const { data: tweets } = await supabase.from("tweets").select()

  return (
    <div>
      <AuthButtonServer />
      {JSON.stringify(tweets, null, 2)}
    </div>
  );
}
