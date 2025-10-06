import {createClient} from "@/supabase/server";
import {AuthButton} from "@/app/auth-button";

export const AuthButtonServer = async () => {
    const supabase = await createClient()
    const {data: {session}} = await supabase.auth.getSession()

    return <AuthButton session={session} />
}
