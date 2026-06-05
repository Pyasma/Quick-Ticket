'use client'

import { logoutUser } from "@/action/auth.action"
import { Button } from "../ui/button"
import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


const LogoutButton = () => {

    const router = useRouter();
    const initialState = {
        success: false,
        message: ''
    }

    const [state, formAction] = useActionState(logoutUser, initialState)

    useEffect (() => {
        if (state.success) {
            toast.success("logout Successful")
            router.push('/login')
        } else if (state.message) {
            toast.error(state.message)
        }
    },[state, router])
    return (
        <>
            <form action={formAction}>
                <Button
                    type='submit'
                    className="bg-black px-6 py-5 text-xl text-white hover:text-gray-300"
                >
                    Logout
                </Button>
            </form>
        </>
    )
}

export default LogoutButton