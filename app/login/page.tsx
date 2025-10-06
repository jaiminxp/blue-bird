import {createClient} from "@/supabase/server";
import {redirect} from "next/navigation";
import {AuthButton} from "@/app/auth-button";

export default async function Login() {
    const supabase = await createClient<Database>();

    const {data: {session}} = await supabase.auth.getSession()

    if(session) {
        redirect("/")
    }

    return <AuthButton session={session} />
}
