import { env } from "@/config/env"
import { JwtPayload, verify } from "jsonwebtoken"
import { cookies } from "next/headers"
import { prisma } from "./prisma"
import { User } from "@/entities/User"

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

export async function auth(): Promise<null | User> {
    const userId = await verifyJwt()

    if (!userId) {
        return null
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        return user
    } catch {
        return null
    }
}