import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server"
import z from "zod"

const schema = z.object({
    name: z.string().min(1),
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

    const { email, name, password } = data

    const emailAlreadyInUse = await prisma.user.findUnique({
        where: {
            email
        },
        select: { id: true }
    })

    if (emailAlreadyInUse) {
        return NextResponse.json(
            { error: "Email already in use!" },
            { status: 409 }
        )
    }


    const hashedPassword = await hash(password, 12)

    await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    })

    return new NextResponse(null, { status: 204 })
}