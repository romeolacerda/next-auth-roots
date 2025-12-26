'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({
  email: z.email('Informe um email valido'),
  password: z.string().min(8, "Informe uma senha")
})

type FormData = z.infer<typeof schema>

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

   const handleSubmit = form.handleSubmit(async formData => {
    try {
      setIsLoading(true)
      await axios.post('/api/auth/sign-in', formData)

      router.push('/')
    } catch {
      toast.error('Credenciais invalidas')
      setIsLoading(false)
    }
  })

  return (
    <div className="w-full max-w-sm">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Acesse a sua conta</CardTitle>
          <CardDescription>
            Faça login para continuar usando a plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className='grid gap-4' onSubmit={handleSubmit}>

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
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">
                        Senha
                      </FieldLabel>
                      <Link href={"#"} className="ml-auto inline-block text-sm underline">
                        Esqueceu sua senha?
                      </Link>
                    </div>

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
                <Button type="submit" disabled={isLoading}>
                  {isLoading && 'Logando'}
                  {!isLoading && 'Login'}
                </Button>
                <Button variant="outline" type="button">
                  Entrar com o Google
                </Button>
                <FieldDescription className="text-center">
                  Não tem conta? <Link href="/sign-up">Cadastre-se</Link> !
                </FieldDescription>
              </Field>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div >
  )
}