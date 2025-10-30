"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function getTransactionHistory() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  return prisma.transaction.findMany({
    where: { userId },
    include: { checkout: true },
    orderBy: { createdAt: "desc" },
  });
}
