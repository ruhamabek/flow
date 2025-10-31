import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {   Layout  } from "lucide-react";
 import LogoutButton from "@/components/auth/logout-button-icon";
import HeroSection from "./_components/hero";
import { IconInnerShadowTop } from "@tabler/icons-react";
export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div className="flex relative min-h-screen flex-col">
      <header className="relative z-20 border-b">
        <div className="container  flex h-16 items-center justify-between">
          <div className="flex items-center ">
            <span className="font-bold text-xl">
                 <button
        type="button"
        className="flex ml-4  items-center gap-2 cursor-pointer"
        >
        <IconInnerShadowTop className="!size-8" />
        <span className="text-3xl  font-semibold">Flow</span>
    </button>
            </span>
          </div>
          <nav className="flex  items-center gap-6">
            <div className="flex items-center gap-2">
              <ModeToggle />
              {session?.user ? (
                <div className="flex gap-2 items-center">
                  <a href="/dashboard">
                    <Button
                      className="rounded-sm flex items-center gap-2"
                      variant="outline"
                      size="default"
                    >
                      <Layout className="w-4 h-4" />
                      Dashboard
                    </Button>
                  </a>
                  <LogoutButton />
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button className="rounded-sm" variant="outline">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="rounded-sm">Sign up</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
      <HeroSection />

    </div>
  );
}
