import { prisma } from "@/db/prisma";
import { getAuthCookie, verifyAuthToken } from "./auth";
import { Email } from "@hugeicons/core-free-icons";

type AuthPayload = {
    userId: string
}

export async function getCurrentUser() {
    try {
        const token = await getAuthCookie()

        if (!token) return null

        const payload = (await verifyAuthToken(token)) as AuthPayload

        if (!payload?.userId) return null;
        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId},
            select: {
                id: true,
                email: true,
                name: true,
                }
        })
        return user
    } catch (error) {
        console.log("Error getting the current user",error)
        return null
    }
}