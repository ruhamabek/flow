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
    setLoading(true);
    const toastId = toast.loading("Logging out...");

    try {
      await authClient.signOut();
      toast.dismiss(toastId); 
      toast.success("Logged out successfully");
      router.push("/");  
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to log out");
      console.error(error);
    } finally {
      setLoading(false);  
    }
  }

  return (
    <button
      className="flex gap-3 items-center cursor-pointer"
      onClick={handleLogOut}
      disabled={loading}  
    >
      <IconLogout />
      {loading ? "Logging out..." : "Log out"}
    </button>
  );
}
