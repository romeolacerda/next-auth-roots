'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const schema = z.object({
  name: z.string("Informe seu nome").min(1, "Nome invalido"),
  email: z.email('Informe um email valido'),
  password: z.string().min(8, "Ao menos 8 caracteres")
})

type FormData = z.infer<typeof schema>

export default function SignUp() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const handleSubmit = form.handleSubmit(async formData => {
    try {
      setIsLoading(true)
      await axios.post('/api/auth/sign-up', formData)

      router.push('/sign-in')
      toast.success('Conta cadastrada com sucesso!', {
        description: "Faça login agora mesmo!"
      })
    } catch {
      toast.error('Erro ao criar sua conta')
      setIsLoading(false)
    }
  })

  return (
    <div className="w-full max-w-sm">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Crie sua conta</CardTitle>
          <CardDescription>
            Coloque seu email abaixo para criar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className='grid gap-4' onSubmit={handleSubmit}>
              <FieldGroup>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FieldLabel htmlFor="name">Nome</FieldLabel>
                      <FormControl>
                        <Input
                          id="name"
                          type="name"
                          placeholder="cleitin"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FieldLabel htmlFor="password">Senha</FieldLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Field>
                  <Button
                    type="submit"
                    disabled={isLoading}
                  >
                    {!isLoading && 'Criar conta!'}
                    {isLoading && 'Criando conta'}
                  </Button>
                  <FieldDescription className="text-center">
                    Ja está cadastrado?  <Link href="/sign-in">Login</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
