import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PublicPages({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isUserAuthenticated = Boolean(await auth())
  
  if (isUserAuthenticated) {
    redirect('/')
  }

  return {children}
  
}
