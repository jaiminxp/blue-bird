"use client";

import Likes from "./likes";
import { useOptimistic } from "react";

export default function Tweets({ tweets }: { tweets: TweetWithAuthor[] }) {
  const [optimisticTweets, addOptimisticTweet] = useOptimistic<
    TweetWithAuthor[],
    TweetWithAuthor
  >(tweets, (currentTweets, newTweet: TweetWithAuthor) => {
      const newTweets = [...currentTweets]
      const index = newTweets.findIndex(tweet => tweet.id === newTweet.id)
      newTweets[index] = newTweet
      return newTweets
  });
    
  return (
    <div>
      {optimisticTweets?.map((tweet) => (
        <div key={tweet.id}>
          <p>
            {tweet.author.name} {tweet.author.username}
          </p>
          <p>{tweet.title}</p>
          <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
        </div>
      ))}
    </div>
  );
}
