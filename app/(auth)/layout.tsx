import { getAccessToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const accessToken = await getAccessToken()

  if (accessToken) {
    redirect('/')
  }

  return (
    <div className="min-h-screen grid place-items-center p-4">
      {children}
    </div>
  );
}
