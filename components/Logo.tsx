"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const Logo = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

   if (!mounted) return null;

  const logoSrc =
    theme === "dark" ? "/flowdash-nobg.png" : "/flowdashwhite-nobg.png";

  return (
    <button
      type="button"
      onClick={() => router.push("/dashboard")}
      className="flex items-center gap-2 cursor-pointer"
    >
      <Image
        src={logoSrc}
        alt="Flow Logo"
        width={100}
        height={60}
        className="rounded-md -mt-3"
        priority
      />
    </button>
  );
};

export default Logo;
