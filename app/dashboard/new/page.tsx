import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";

const NewTODO = async () => {
    const supabase = createClient();

    // Get user data
    const user = (await supabase.auth.getUser()).data.user;

    // Redirect to the login page if the user is not logged in
    if (!user) {
        redirect("/login");
    }

    return ( 
        <div className="flex flex-col items-center justify-center py-4">
            <h1 className="text-2xl">Crear nueva tarea</h1>
            <form action="/api/dashboard/new" method="GET" className="flex flex-col items-center">
                <input type="text" placeholder="Tarea" id="task" name="task" className="p-2 my-2" />
                <button type="submit" id="submit" className="bg-green-500 text-white p-2 rounded-lg">Crear tarea</button>
            </form>
        </div>
     );
}
 
export default NewTODO;