'use client'

import {createClient} from "@/supabase/client";
import {useRouter} from "next/navigation";
import { Session } from "@supabase/auth-js";

export const AuthButton = ({session}: {session: Session | null}) => {
    const router = useRouter()
    const handleSignIn = async () => {
        const supabase = await createClient()

        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback',
            }
        })
    }

    const handleSignOut = async () => {
        const supabase = await createClient()
        await supabase.auth.signOut()
        router.refresh()
    }

    return session ?
        <button className="bg-red-500 p-1 m-2" onClick={handleSignOut}>Logout</button>
        : <button className="bg-blue-500 p-1 m-2" onClick={handleSignIn}>Login</button>;
}