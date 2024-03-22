import { NextRequest, NextResponse } from 'next/server'
import { createClient } from "../../../utils/supabase/server";

export async function GET(request: NextRequest) {
    // Get the get parameters from the request, email and password
    const { searchParams } = new URL(request.url)

    const email = searchParams.get('email')
    const password = searchParams.get('password')

    const redirectTo = request.nextUrl.clone()
    redirectTo.searchParams.delete('email')
    redirectTo.searchParams.delete('password')

    if (!email || !password) {
        redirectTo.pathname = '/auth/login-error'
        return NextResponse.redirect(redirectTo)
    }

    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (!error) {
        redirectTo.pathname = '/dashboard'
        return NextResponse.redirect(redirectTo)
    }


    // return the user to an error page with some instructions
    redirectTo.pathname = '/auth/login-error'
    return NextResponse.redirect(redirectTo)
}