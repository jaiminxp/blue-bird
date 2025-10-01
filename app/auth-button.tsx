'use client'

import {createClient} from "@/supabase/client";

export const AuthButton = () => {

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
    }

    return <>
        <button className="bg-blue-500 p-1 m-2" onClick={handleSignIn}>Login</button>
        <button className="bg-red-500 p-1 m-2" onClick={handleSignOut}>Logout</button>
    </>
}