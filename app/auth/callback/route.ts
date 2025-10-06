import {NextRequest, NextResponse} from "next/server";
import {createClient} from "@/supabase/server";

export async function GET(req: NextRequest) {
    const requestUrl = new URL(req.url)
    const code = requestUrl.searchParams.get('code')

    if(code) {
        const supabase = await createClient<Database>()
        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(requestUrl.origin)
}