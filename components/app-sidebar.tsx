"use client";
import * as React from "react";
import {  
  IconDashboard,
  IconInnerShadowTop,
  IconMoneybag,
  IconCreditCard,
  IconShieldCheck,
  IconLayersIntersect
} from "@tabler/icons-react";

 import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User } from "@prisma/client";

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

 
  navSecondary: [
    {
      title: "Upgrade to PRO",
      url: "/",
      icon: IconMoneybag,
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
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-6" />
                <span className="text-2xl font-semibold">Flow</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
