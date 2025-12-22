import { env } from "@/config/env"
import { JwtPayload, verify } from "jsonwebtoken"
import { cookies } from "next/headers"

async function getAccessToken() {
    const cookieStore = await cookies()

    return cookieStore.get('accessToken')?.value
}

export async function verifyJwt(): Promise<null | string> {
    const accessToken = await getAccessToken()

    if (!accessToken) {
        return null
    }

    try {
        const { sub: userId } = verify(accessToken, env.jwtSecret) as JwtPayload

        if (!userId) {
            return null
        }

        return userId
    } catch {
        return null
    }
}

export async function isAuthenticated() {
    const isAuthenticated = await verifyJwt()
    
    return !!isAuthenticated
}

export async function auth(): Promise<null | string> {
    return verifyJwt()
}