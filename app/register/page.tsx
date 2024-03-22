
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
        // Create a register form for users to enter their credentials
        <div>
            <h1>Registro</h1>
            <form action="/auth/register" method="GET">
                <input type="text" placeholder="Email" id="email" name="email" />
                <input type="password" placeholder="Password" id="password" name="password" />
                <input type="password" placeholder="Confirm Password" id="confirm-password" name="confirm-password" />
                <button type="submit" id="submit">Registrate</button>
            </form>

            <p>Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
        </div>
    );
};

export default Login;
