'use server'

import { logEvent } from "@/utils/sentry";
import { prisma } from "@/db/prisma"
import { revalidatePath } from "next/cache";

export async function createTicket(prevState: {success: boolean, message: string}, formData: FormData): Promise<{success:boolean, message:string}>{
    try {
        const subject = formData.get('subject') as string;
        const description = formData.get('description') as string;
        const priority = formData.get('priority') as string;


        const ticket = await prisma.ticket.create({
            data: {
                subject: subject,
                description: description,
                priority: priority,
            }
        })

        await logEvent(
            `Ticket created successfully: ${ticket.id}`,
            'ticket',
            {ticketId: ticket.id},
            'info',
        )

        revalidatePath("/tickets")

        
    } catch (error) {
        await logEvent(
            'Failed to create ticket',
            'ticket',
            {
                formData: Object.fromEntries(formData.entries())
            },
            'error',
            error,
        );
    }
    return {success : true, message: 'Ticket created'};
}


export async function getTickets() {
    try {
        const tickets = await prisma.ticket.findMany( {
            orderBy: {createdAt:"desc"}
        })

        await logEvent(
            "Tickets are loaded",
            'tickets',
            {count: tickets.length},
            'info'
        )

        return tickets;

    } catch (error) {

        await logEvent(
            "Tickets didn't load correctly",
            'tickets',
            {},
            'error',
            error
        )

        return []
    }
}

export async function shortTimeAgo(date: Date) {
    const seconds = Math.floor(
        (Date.now() - date.getTime()) / 1000
    );

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours}hr ago`;
    }

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

export async function getTicketByID(id: string) {
    try {
        const ticket = await prisma.ticket.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!ticket) {
            logEvent(
                "Ticket Doesn't Exist",
                'ticket',
                {ticketId : id},
                'warning'
            )
        }

        return ticket;

    } catch (error) {
        logEvent("Error while loading the Ticket",
            'ticket',
            {ticketId: id},
            'error',
            error
        )
        return null
    }
    
}