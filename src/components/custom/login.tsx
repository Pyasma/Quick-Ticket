'use client'

import Link from "next/link"
import { Button } from "../ui/button"
import { loginUser } from "@/action/auth.action"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

const LoginPage = () => {
    const router = useRouter()
    const initialstate = {
        success: false,
        message:''
    }
    const [state, formAction] = useActionState(loginUser, initialstate)

    useEffect(()=> {
        if (state.success){
            toast.success('User Successfully logged In')
            router.push("/tickets")
        } else if (state.message){
            toast.error(state.message)
        }
    },[state,router])



    return (
        <>
            <div className="flex min-h-screen items-center justify-center">
                <form action={formAction} className="flex w-[500px] flex-col gap-4 rounded-sm border border-gray-500 px-6 py-5 shadow-[-15px_-11px_20px_-9px_rgba(99,_54,_54,_0.3)]">
                    <span className="text-2xl font-semibold"> Login to your account</span>

                    <p className="text-sm text-gray-500">Enter your email below to login to your account</p>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name='email' placeholder="m@example.com" required className="border-gray-400 rounded border px-3 py-2"/>
                    <div className="flex justify-between">
                        <label htmlFor="password">Password</label>
                        <Link href= "/forgotpassword">Forgot your password?</Link>
                    </div>
                    <input type="password" name='password' placeholder="" required className="border-gray-400 rounded border px-3 py-2"/>

                    <div className="mt-3 flex flex-col gap-3">
                        <Button className="py-5 text-base text-black bg-gray-300">
                            Login
                        </Button>

                        <Button className="py-5 text-base">
                            Login with Google
                        </Button>

                        <p className="text-center text-gray-600">
                            Don&apos;t have an account?{' '}
                            <Link href="/register" className="cursor-pointer underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginPage