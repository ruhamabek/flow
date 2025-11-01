import Link from "next/link";
import {   ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
const Line = ({ className = "" }) => (
  <div
    className={cn(
      "h-px w-full via-zinc-400 from-[1%] from-zinc-200 to-zinc-600 absolute -z-0 dark:via-zinc-700 dark:from-zinc-900 dark:to-zinc-500",
      className
    )}
  />
);
export default async function HeroSection() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="bg-radial-gradient text-white flex flex-col">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 border border-zinc-800"></div>
      </div>
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          <div className="relative -mt-10 px-14 py-14">
            <Line className="left-0 top-2 bg-zinc-700/30 sm:top-4 md:top-6" />
            <Line className="bottom-2 bg-zinc-700/30  sm:bottom-4 md:bottom-6 left-0" />

            <Line className="w-px bg-zinc-700/30  right-2 sm:right-4 md:right-6 h-full inset-y-0" />
            <Line className="w-px bg-zinc-700/30  left-2 sm:left-4 md:left-6 h-full inset-y-0" />
            <h1 className="text-4xl dark:from-zinc-400/10 dark:via-white/90 dark:to-white/20  bg-gradient-to-tr  from-black/70 via-black to-black/60 bg-clip-text text-transparent tracking-tighter md:text-5xl lg:text-6xl font-bold text-center ">
             The Web&apos;s Secrets, Served Simply.
            </h1>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 tracking-tight text-center max-w-2xl mb-10">
            Flow is an automated web scraping tool designed to collect and
            structure data seamlessly, so you can focus on insights, not
            repetitive scraping scripts
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
            <Link href={session ? "/dashboard" : "/signup"}>
              <Button className="rounded-full cursor-pointer tracking-tight group bg-zinc-100 text-black hover:bg-zinc-200 h-12 text-base">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 w-full">
            {[
              {
                title: "Smart Scraping",
                description: "Extract structured data from websites",
              },
              {
                title: "Data Management",
                description: "Organize, clean, and store data instantly",
              },
              {
                title: "Integrations",
                description:
                  "Easily connect with APIs, dashboards, or external databases.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="border rounded-md border-zinc-200 dark:border-zinc-800 bg-zinc-900/10 dark:bg-zinc-900/20 p-6 backdrop-blur-sm"
              >
                <h3 className="text-lg text-black dark:text-white font-medium mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-700 dark:text-zinc-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
