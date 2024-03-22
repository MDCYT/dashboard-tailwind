import { NextRequest, NextResponse } from 'next/server'
import { createClient } from "../../../../../utils/supabase/server";
let regex = /\/api\/todo\/(.*)\/complete/

export async function GET(request: NextRequest) {

    // Check if the user is already logged in
    const supabase = createClient()

    const user = (await supabase.auth.getUser()).data.user

    const redirectTo = request.nextUrl.clone()

    if (!user) {
        // Return the user to the login page
        return NextResponse.redirect('/auth/login')
    }

    // Get the id, from url like /api/todo/[id]/delete
    const params = regex.exec(request.nextUrl.pathname)

    // Get the id from the request
    const id = params?.[1]

    if (!id) {
        redirectTo.pathname = '/auth/login-error'
        return NextResponse.redirect(redirectTo)
    }

    const { error } = await supabase.from('todos').update({ is_complete: true }).eq('id', id)

    if (!error) {
        redirectTo.pathname = '/dashboard'
        return NextResponse.redirect(redirectTo)
    }

    // return the user to an error page with some instructions
    redirectTo.pathname = '/auth/login-error'
    return NextResponse.redirect(redirectTo)
}