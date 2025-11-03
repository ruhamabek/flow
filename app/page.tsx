import { auth } from "@/lib/auth";
import { headers } from "next/headers";
 
import HeroSection from "./_components/hero";
 
import { Header } from "./_components/header";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex relative min-h-screen flex-col">
      <Header session={session} />
      <HeroSection />
    </div>
  );
}
