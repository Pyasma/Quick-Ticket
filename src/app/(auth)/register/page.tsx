'use client'

import { registerUser } from "@/action/auth.action"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
 

const RegisterPage = () => {
    const router = useRouter()
    const initialState = {
        success: false,
        message: ''
    }
    const [state, formAction] = useActionState(registerUser, initialState)
    useEffect(() => {
        if (state.success) {
            toast.success('User Successfully Signed In')
            router.push('/tickets')
            router.refresh()
        } else if (state.message) {
            toast.error(state.message)
        }
    }, [state, router]) 

    return (
        <div  className="flex min-h-screen items-center justify-center">
            <form action={formAction} className="flex w-[500px] flex-col gap-4 rounded-sm border border-gray-500 px-6 py-5 shadow-[-15px_-11px_20px_-9px_rgba(99,_54,_54,_0.3)]">

                <span className="text-2xl font-semibold">
                    Create an Account
                </span>

                <div className="flex flex-col gap-1">
                    <label htmlFor="full-name">Full Name</label>
                    <input
                        required
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        className="rounded border px-3 py-2"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="m@example.com"
                        required
                        className="rounded border px-3 py-2"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        className="rounded border px-3 py-2"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="confirm-password">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        required
                        className="rounded border px-3 py-2"
                    />
                </div>

                <div className="mt-3 flex flex-col gap-3">
                    <Button className="py-5 text-base text-black bg-gray-300">
                        Create Account
                    </Button>

                    <Button className=" py-5 text-base">
                        Sign up with Google
                    </Button>

                    <p className="text-center text-gray-600">
                        Already have an account?{' '}
                        <span className="cursor-pointer underline">
                            Sign in
                        </span>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage