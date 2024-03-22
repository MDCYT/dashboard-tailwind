import Image from "next/image";

import { createClient } from "../../utils/supabase/server";

const Navbar = async () => {
    const supabase = createClient();

    const user = (await supabase.auth.getUser()).data.user;

    return ( 
        <div className="w-full bg-black text-white h-12 flex-row flex justify-between px-4 items-center">
            <a href="/" className="flex flex-row items-center">
                <Image src={"/vercel.svg"} alt="Vercel Logo" width={72} height={16} className="invert dark:filter-none" />
            </a>
            <div className="flex flex-row row-span-12">
                {user ? (
                    <div>
                        <a href="/dashboard" className="text-white">Dashboard</a>
                        <a href="/auth/logout" className="text-white px-2">Logout</a>
                    </div>
                ) : (
                    <div>
                        <a href="/login" className="text-white">Login</a>
                    </div>
                )}
            </div>
        </div>
     );
}
 
export default Navbar;