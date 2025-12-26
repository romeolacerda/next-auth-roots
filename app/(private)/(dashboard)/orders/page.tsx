'use client'

import { useAuth } from "@/hook/useAuth"

export default function Orders() {
    const { isSignedIn } = useAuth()

    return (
        <div>
            {!isSignedIn && <div className="w-full h-10 bg-amber-200 grid place-items-center rounded-lg text-sm text-amber-950">
                Faça login par visuazliar seus pedidos
            </div>}

            {isSignedIn &&
                <div>Seus pedidos</div>}
        </div>
    )
}