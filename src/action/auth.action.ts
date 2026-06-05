'use server'

import { prisma } from '@/db/prisma'
import bcrypt from 'bcryptjs'
import { logEvent } from '@/utils/sentry'
import { signAuthToken, setAuthCookie, removeAuthCookie } from '@/lib/auth'


type ResponseResult = {
    success: boolean
    message: string
}

// Register new user

export async function registerUser(prevState, formData: FormData):Promise<ResponseResult> {
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
}> {
    try {
        await removeAuthCookie()
        logEvent("User logged out successfully", "auth", {}, 'info')
        return {success: true, message: 'Logout Successful'}

    } catch (error) {
        logEvent("Some Unknown Error occured when trying to log out the User",'auth',{},'error',error)

        return {success: false, message: 'Logout Failed'}
    }

}