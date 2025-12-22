import { env } from "@/config/env"
import { prisma } from "@/prisma/prisma"
import { compare } from 'bcryptjs'
import { sign } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"
import z from "zod"

const schema = z.object({
    email: z.email(),
    password: z.string().min(8)
})

export async function POST(request: NextRequest) {
    const body = await request.json()

    const { success, error, data } = schema.safeParse(body)

    if (!success) {
        return NextResponse.json(
            { errors: error.issues },
            { status: 400 }
        )
    }

    const { email, password } = data

    const user = await prisma.user.findUnique({
        where: {
            email
        },
        select: { id: true, email: true, password: true }
    })

    if (!user) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 409 }
        )
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 409 }
        )
    }

    const accessToken = sign(
        { sub: user.id },
        env.jwtSecret,
        { expiresIn: '7d' }

    )

    return NextResponse.json({ accessToken }, { status: 200 })
}