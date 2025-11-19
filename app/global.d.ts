import {Database as DB} from "@/lib/database.types";

type Tweet = DB["public"]["Tables"]["tweets"]["Row"];
type Author = DB["public"]["Tables"]["profiles"]["Row"];

declare global {
    type Database = DB
    type TweetWithAuthor = Tweet & {
        author: Author;
        user_has_liked_tweet: boolean;
        likes: number;
    }
}