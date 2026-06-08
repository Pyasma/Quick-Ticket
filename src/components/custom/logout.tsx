'use client'

import { logoutUser } from "@/action/auth.action"
import { Button } from "../ui/button"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"


const LogoutButton = () => {

    const initialState = {
        success: false,
        message: '',
        submitted:false
    }

    const [state, formAction] = useActionState(logoutUser, initialState)

    useEffect (() => {
        if (!state.submitted) return

        if (state.success) {
            toast.success("logout Successful")
        }
        else if (state.message) {
            toast.error(state.message)
        }
    },[state])
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