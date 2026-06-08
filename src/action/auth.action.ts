'use server'

import { prisma } from '@/db/prisma'
import bcrypt from 'bcryptjs'
import { logEvent } from '@/utils/sentry'
import { signAuthToken, setAuthCookie, removeAuthCookie } from '@/lib/auth'
import { redirect } from 'next/navigation'

type ResponseResult = {
    success: boolean
    message: string
}

// Register new user

export async function registerUser(_prevState: ResponseResult, formData: FormData):Promise<ResponseResult> {
    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!name || !email || !password) {
            logEvent('Validation error: Missing registration values','auth',{name, email},'warning')

            return {success: false, message: 'All field are required'}
        }
        const existingUser = await prisma.user.findUnique({
            where : {email}
        })
        if (existingUser) {
            logEvent('Registation Failed: User already Exist', 'auth', {email}, 'warning')

            return {success: false, message: 'User Already Exists'}
        }
        //Hash Password

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        // Sign and set auth token

        const token = await signAuthToken({userId: user.id, email: user.email})

        await setAuthCookie(token)

        logEvent('User registered successfully','auth', {userID: user.id, email}, 'info')

        return {success: true, message: 'User Successfully Created'}

    } catch (error) {
        logEvent('Unexpected error during registration','auth', {}, 'error', error)

        return {success: false, message: 'Something went wrong please try again Registration failed'}
    }
}

// Log user out and remove auth cookie 

export async function logoutUser(): Promise<{
    success: boolean
    message: string
    submitted: boolean
}> {
    try {
        await removeAuthCookie()
        logEvent("User logged out successfully", "auth", {}, 'info')
    } catch (error) {
        logEvent("Some Unknown Error occured when trying to log out the User",'auth',{},'error',error)

        return {success: false, message: 'Logout Failed', submitted:true}
    }

    return redirect('/')
}

// log user in

export async function loginUser(_prevState:ResponseResult, formData: FormData):Promise<ResponseResult> {
    try {
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        if (!email || !password) {
            logEvent('Validation Error missing login fields','auth',{email},'warning')

            return {success: false, message:"Email and Password are required"}
        }
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        if (!user || !user.password) {
            logEvent(`login failed: User not found - $(email)`, 'auth', {email},'warning')

            return {success: false, message:"Invalid email or password"}
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            logEvent('Login failed: Incorrect Password', 'auth', {},'warning')

            return {success: false, message:"Invalid email or password"}
        }
        
        const token = await signAuthToken({
            userId: user.id
        })
        await setAuthCookie(token)

        return {success: true, message: 'Login Successful'}
    } catch (error) {
        logEvent("Unexpected error during login", 'auth', {}, 'error', error)

        return {success: false, message: 'Unexcpected error during login'}
    }
}