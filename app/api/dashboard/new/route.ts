import { NextRequest, NextResponse } from 'next/server'
import { createClient } from "../../../../utils/supabase/server";

export async function GET(request: NextRequest) {

    // Check if the user is already logged in
    const supabase = createClient()

    const user = (await supabase.auth.getUser()).data.user

    const redirectTo = request.nextUrl.clone()

    if (!user) {
        // Return the user to the login page
        return NextResponse.redirect('/auth/login')
    }
    // Get the get parameters from the request, email and password
    const { searchParams } = new URL(request.url)

    const task = searchParams.get('task')

    redirectTo.searchParams.delete('task')


    if (!task) {
        redirectTo.pathname = '/auth/login-error'
        return NextResponse.redirect(redirectTo)
    }

    const { error } = await supabase.from('todos').insert([{ task, user_id: user.id }])

    if (!error) {
        redirectTo.pathname = '/dashboard'
        return NextResponse.redirect(redirectTo)
    }


    // return the user to an error page with some instructions
    redirectTo.pathname = '/auth/login-error'
    return NextResponse.redirect(redirectTo)
}