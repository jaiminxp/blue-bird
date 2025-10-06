import { createBrowserClient } from "@supabase/ssr";

export async function createClient<DBType = any>() {
    return createBrowserClient<DBType>(process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!)
}