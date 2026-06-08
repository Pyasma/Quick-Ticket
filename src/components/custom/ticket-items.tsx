import { shortTimeAgo } from "@/action/ticket.action"
import { Ticket } from "@/generated/prisma/client"
import { getPriorityClass } from "@/utils/ui"
import Link from "next/link"

type TicketItemsProps = {
    ticket: Ticket
}

const TicketItem  = ({ticket}:TicketItemsProps) => {
    return (
        <>
            <div
                key={ticket.id}
                className="grid items-center border-b py-3 last:border-b-0 hover:bg-gray-50"
                style={{
                    gridTemplateColumns: "2fr 3fr 1fr 1fr 1fr 1fr",
                }}
            >
                <div className="px-4">
                    <Link
                        href={`/tickets/${ticket.id}`}
                        className="text-blue-600 hover:underline"
                    >
                        {ticket.subject}
                    </Link>
                </div>

                <div className="px-4 line-clamp-2">
                    {ticket.description}
                </div>

                <div className="px-4">
                    <span className={getPriorityClass(ticket.priority)}>
                        {ticket.priority}
                    </span>
                </div>

                <div className="px-4">
                    {ticket.status}
                </div>

                <div className="px-4 whitespace-nowrap">
                    {shortTimeAgo(ticket.createdAt)}
                </div>

                <div className="px-4 whitespace-nowrap">
                    {shortTimeAgo(ticket.updatedAt)}
                </div>
            </div>
        </>
    )
}

export default TicketItem