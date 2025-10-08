import {createClient} from "@/supabase/server";

export default function NewTweet() {
    const addTweet = async (formData: FormData) => {
        "use server"
        const title = String(formData.get("title"))
        const supabase = await createClient<Database>()
        const {data: {user}} = await supabase.auth.getUser()

        if(user) {
            await supabase.from("tweets").insert({ title, user_id: user.id })
        }
    }

    return (
        <form action={addTweet}>
            <input name="title" />
        </form>
    )
}