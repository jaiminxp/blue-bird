import { createClient } from "@/supabase/server";
import { AuthButtonServer } from "@/app/auth-button-server";
import { redirect } from "next/navigation";
import NewTweet from "@/app/new-tweet";
import Tweets from "./tweets";

export default async function Home() {
  const supabase = await createClient<Database>();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("tweets")
    .select("*, author: profiles(*), likes(user_id)");

  const tweets: TweetWithAuthor[] = data
    ? data?.map((tweet) => ({
        ...tweet,
        author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
        user_has_liked_tweet: !!tweet.likes.find(
          (like) => like.user_id === session?.user.id
        ),
        likes: tweet.likes.length,
      }))
    : [];

  return (
    <div>
      <NewTweet />
      <AuthButtonServer />
      <Tweets tweets={tweets} />
    </div>
  );
}
