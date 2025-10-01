import {createClient} from "@/supabase/server";
import {AuthButton} from "@/app/auth-button";

export default async function Home() {
  const supabase = await createClient();

  const { data: tweets } = await supabase.from("tweets").select()

  return (
    <div>
      <AuthButton />
      {JSON.stringify(tweets, null, 2)}
    </div>
  );
}
