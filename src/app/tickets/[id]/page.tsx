import { getTicketByID,  } from "@/action/ticket.action"
import TicketDescription from "@/components/custom/TicketDescription";
import { logEvent } from "@/utils/sentry";
import { getPriorityClass, getStatus} from "@/utils/ui"
import Link from "next/link";
import { notFound } from "next/navigation";


const UniqueTicketPage = async (props: {
    params: Promise<{id:string}>
}) => {

    const { id } = await props.params
    const ticket = await getTicketByID(id);
    if (!ticket) {
        return notFound();
    }

    logEvent("Viewing ticket details", 'ticket', {ticketId: ticket.id},'info')

    return (
        <div className="flex min-h-screen items-center justify-center">
        <div className="w-[800px] rounded-lg border p-6 shadow-md overflow-auto">
            <div className="flex gap-2 items-center">    
                <div className={getStatus(ticket.status)}></div>    
                <h1 className="text-2xl font-semibold">
                    {ticket.subject}
                </h1>
                
            </div>


            <div className=" p-5 text-gray-600"><TicketDescription description={ticket.description} /></div>

            <p className={`text-xl p-5 ${getPriorityClass(ticket.priority)}`}>
                {ticket.priority}
            </p>
            <div className=" rounded-xl text-white bg-blue-600 text-xl px-4 py-2 w-fit"><Link href="/tickets"> ←Back To Tickets</Link></div>
            
        </div>
        </div>
    );
};

export default UniqueTicketPage