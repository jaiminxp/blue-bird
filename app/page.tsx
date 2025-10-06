import {createClient} from "@/supabase/server";
import {AuthButtonServer} from "@/app/auth-button-server";

export default async function Home() {
  const supabase = await createClient();

  const { data: tweets } = await supabase.from("tweets").select()

  return (
    <div>
      <AuthButtonServer />
      {JSON.stringify(tweets, null, 2)}
    </div>
  );
}
