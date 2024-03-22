import { NextRequest, NextResponse } from 'next/server'
import { createClient } from "../../../utils/supabase/server";

export async function GET(request: NextRequest) {

    const redirectTo = request.nextUrl.clone()

    const supabase = createClient()

    const { error } = await supabase.auth.signOut()

    if (!error) {
        redirectTo.pathname = '/'
        return NextResponse.redirect(redirectTo)
    }

    // return the user to an error page with some instructions
    redirectTo.pathname = '/auth/logout-error'
    return NextResponse.redirect(redirectTo)
}