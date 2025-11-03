"use client";

import LogoutButton from "@/components/auth/logout-button-icon";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Layout } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */

export function Header({ session }: { session: any }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const logoSrc =
    theme === "dark" ? "/flowdash-nobg.png" : "/flowdashwhite-nobg.png";

  return (
    <header className="relative z-20 border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            className="flex ml-4 items-center gap-2 cursor-pointer"
          >
            <Image
              src={logoSrc}
              alt="Flow logo"
              width={100}
              height={60}
              className="rounded-md"
              priority
            />
          </button>
        </div>

        <nav className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <ModeToggle />
            {session?.user ? (
              <div className="flex gap-2 items-center">
                <Link href="/dashboard">
                  <Button
                    className="rounded-sm flex items-center gap-2"
                    variant="outline"
                    size="default"
                  >
                    <Layout className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
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
  );
}
