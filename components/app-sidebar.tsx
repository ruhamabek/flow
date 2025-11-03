"use client";

import * as React from "react";
import {
  IconDashboard,
  IconCreditCard,
  IconShieldCheck,
  IconLayersIntersect,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Workflows",
      url: "/dashboard/workflows",
      icon: IconLayersIntersect,
    },
    {
      title: "Credentials",
      url: "/dashboard/credentials",
      icon: IconShieldCheck,
    },
    {
      title: "Billing",
      url: "/dashboard/billing",
      icon: IconCreditCard,
    },
  ],
  documents: [],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: Partial<User>;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  if (!user) {
    throw new Error("AppSidebar requires a user but received undefined.");
  }

  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null; // Wait until mounted to prevent flicker

  const logoSrc =
    theme === "dark" ? "/flowdash-nobg.png" : "/flowdashwhite-nobg.png";

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logoSrc}
                alt="Flow Logo"
                width={100}
                height={60}
                className="rounded-md -mt-3"
                priority
              />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
