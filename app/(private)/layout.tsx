import { AuthProvider } from "@/contexts/AuthContext";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PrivatePages({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await auth()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <AuthProvider user={user}>
      {children}
    </AuthProvider>
  );
}
