import { NextRequest, NextResponse } from 'next/server'
import { createClient } from "../../../utils/supabase/server";

export async function GET(request: NextRequest) {
    // Get the get parameters from the request, email and password
    const { searchParams } = new URL(request.url)

    const email = searchParams.get('email')
    const password = searchParams.get('password')
    const password2 = searchParams.get('confirm-password')

    const redirectTo = request.nextUrl.clone()
    redirectTo.searchParams.delete('email')
    redirectTo.searchParams.delete('password')
    redirectTo.searchParams.delete('confirm-password')

    if (!email || !password || !password2 || password !== password2) {
        redirectTo.pathname = '/auth/register-error'
        return NextResponse.redirect(redirectTo)
    }

    const supabase = createClient()

    const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${redirectTo.origin}/login`
        }
    })

    console.log({
        error, data
    })

    if (!error) {
        redirectTo.pathname = '/login'
        redirectTo.searchParams.set('check-email', 'true')
        return NextResponse.redirect(redirectTo)
    }


    // return the user to an error page with some instructions
    redirectTo.pathname = '/auth/login-error'
    return NextResponse.redirect(redirectTo)
}