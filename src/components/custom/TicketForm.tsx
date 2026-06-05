'use client'

import { Button } from "@/components/ui/button";
import { createTicket } from "@/action/ticket.action";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
 
const TicketForm = () => {
    const [state, formAction] = useActionState(createTicket, {success: false, message:''})
    const router = useRouter();
    useEffect(() => {
        if (state.success) {
            toast.success("Ticker submitted successfully!!")
            router.push('/tickets')
        }
    }, [state.success, router])

    return (
        <div className="w-full max-w-2xl rounded-xl border border-amber-200 bg-white px-16 py-12 shadow-xl">
            <div className="mb-8 text-4xl font-medium">
                Submit a Ticket
            </div>

            <form action={formAction} className="flex w-full max-w-xl flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="font-medium">
                        Subject
                    </label>

                    <input
                        required
                        name="subject"
                        id="subject"
                        type="text"
                        placeholder="Enter your subject"
                        className="border rounded-md p-3"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="font-medium">
                        Description
                    </label>

                    <textarea
                        required
                        name="description"
                        id="description"
                        placeholder="Describe your Issue"
                        className="border rounded-md p-3 min-h-[150px]"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="priority" className="font-medium">
                        Priority
                    </label>

                    <select
                        name="priority"
                        id="priority"
                        className="border rounded-md p-3"
                    >
                        <option value="high">Highest</option>
                        <option value="medium">Medium</option>
                        <option value="low">Lowest</option>
                    </select>
                </div>

                <div className="flex justify-around gap-3">
                    <Button
                        variant="outline"
                        className="rounded-md text-red-500 px-8 py-4"
                    >
                        Cancel
                    </Button>

                    <Button className="rounded-md px-8 py-4">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default TicketForm