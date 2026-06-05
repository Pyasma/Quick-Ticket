import { getTickets, shortTimeAgo } from "@/action/ticket.action";
import { logEvent } from "@/utils/sentry";
import { getPriorityClass } from "@/utils/ui";
import Link from "next/link";




const Tickets = async () => {
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
                    ))
                )}
            </div>
        </div>
    );
};

export default Tickets;