'use client'

import { closeTicket } from "@/action/ticket.action"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "../ui/button"


const ClosedTicket = ({ticketId, isClosed}: {ticketId: number, isClosed: boolean}) => {
    const router = useRouter()
    const initialState = {success:false, message:''}
    const [state, formAction] = useActionState(closeTicket,initialState)

    useEffect(() => {
        if (state.success){
            toast.success("Ticket Closed Successfully")
            router.push('/tickets')
        } else if (state.message && !state.success) {
            toast.error(state.message)
        }
    } )

    if (isClosed) return null 
    


    return (
        <form action={formAction}>
            <input type="hidden" name="ticketId" value={ticketId} />
            <Button type="submit" className="rounded-2xl text-white bg-red-600 text-base px-3 py-2 w-fit">Close Ticket</Button>
        </form>
    )
}

export default ClosedTicket