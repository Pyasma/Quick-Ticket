import { getTickets } from "@/action/ticket.action";
import TicketItem from "@/components/custom/ticket-items";
import { getCurrentUser } from "@/lib/current-user";
import { logEvent } from "@/utils/sentry";
import { redirect } from "next/navigation";



const Tickets = async () => {
    const user = await getCurrentUser();

    if (!user) {
        logEvent("User has logged out",'auth',{},'info')
        redirect("/")
    }
    const tickets = await getTickets();

    return (
        <div className="">
            <div className="w-full bg-gray-300 font-semibold px-5 py-3 text-xl">
                Feed
            </div>

            <div className="m-5 min-w-[500px] overflow-hidden rounded-lg border">
                <div
                    className="grid items-center border-b py-3 font-semibold"
                    style={{
                        gridTemplateColumns: "2fr 3fr 1fr 1fr 1fr 1fr",
                    }}
                >
                    <div className="px-4">
                        Subject
                    </div>

                    <div className="border-l border-gray-400 px-4">
                        Description
                    </div>

                    <div className="border-l border-gray-400 px-4">
                        Priority
                    </div>

                    <div className="border-l border-gray-400 px-4">
                        Status
                    </div>

                    <div className="border-l border-gray-400 px-4">
                        Created
                    </div>

                    <div className="border-l border-gray-400 px-4">
                        Updated
                    </div>
                </div>

                {tickets.length === 0 ? (
                    <div className="flex items-center justify-center py-8 text-xl text-green-600">
                        No Tickets
                    </div>
                ) : (
                    tickets.map((ticket) => (
                        <TicketItem key={ticket.id} ticket={ticket}  />                    
                    ))
                )}
            </div>
        </div>
    );
};

export default Tickets;