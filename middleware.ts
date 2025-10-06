import { NextRequest, NextResponse } from 'next/server'
import {createClient} from "@/supabase/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = await createClient()
    await supabase.auth.getSession()
    return res
}