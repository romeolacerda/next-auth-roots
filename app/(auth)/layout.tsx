import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isUserAuthenticated = await isAuthenticated()
  
  if (isUserAuthenticated) {
    redirect('/')
  }

  return (
    <div className="min-h-screen grid place-items-center p-4">
      {children}
    </div>
  );
}
