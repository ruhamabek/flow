"use client";
import React, { useState } from "react";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconLogout } from "@tabler/icons-react";

export default function LogoutButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleLogOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onRequest: (ctx) => {
          toast.loading("Logging out...");
          setLoading(true);
        },
        onResponse: (ctx) => {
          toast.error("Logged out successfully");
          setLoading(false);
        },
      },
    });
  }
  return (
    <button className="flex gap-3 items-center cursor-pointer" onClick={() => handleLogOut()}>
      <IconLogout />
      {loading ? "Logging out..." : "Log out"}
    </button>
  );
}
