
import { createClient } from "../../utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { redirect } from 'next/navigation'

const Login = async () => {
    const supabase = createClient();

    // Get user data
    const user = (await supabase.auth.getUser()).data.user;

    // Redirect to the dashboard if the user is already logged in
    if (user) {
        redirect('/dashboard');
    }

    return (
        // Create a login form for users to enter their credentials
        <div>
            <h1>Logeo</h1>
            <form action="/auth/login" method="GET">
                <input type="text" placeholder="Email" id="email" name="email" />
                <input type="password" placeholder="Password" id="password" name="password" />
                <button type="submit" id="submit">Logeate</button>
            </form>
            <p>No tienes una cuenta? <a href="/register">Registrate</a></p>
        </div>
    );
};

export default Login;
