import Link from "next/link";
import { FaTicketAlt } from "react-icons/fa";
import { getCurrentUser } from "@/lib/current-user";
import { Button } from "../ui/button";
import LogoutButton from "./logout";

const NavBar = async () => {
    const user = await getCurrentUser()

    return (
        <nav className="flex items-center justify-between px-6 py-4">

            <Link
                href="/"
                className="flex items-center gap-3 text-2xl font-bold text-blue-500"
            >
                <FaTicketAlt className="text-4xl" />
                <span>QuickTicket</span>
            </Link>

            <div className="flex items-center gap-5 text-xl">
                {user ? (
                    <>
                        <Link href="/tickets/new">
                            New Ticket
                        </Link>

                        <Link href="/tickets">
                            My Tickets
                        </Link>
                        <LogoutButton />
                    </>
                ) : (
                <>
                    <Link
                        href="/login"
                        className="text-red-700"
                    >
                        Login
                    </Link>

                    <Link href="/register">
                        <Button
                        className="bg-gray-400 px-6 py-5 text-xl text-black hover:text-black-300"
                        >  
                            Register
                        </Button>
                    </Link>
                </>) }
                

               

            </div>
        </nav>
    );
};

export default NavBar;