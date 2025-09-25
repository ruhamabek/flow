import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function Page() {
  const res = await auth.api.getSession({
    headers: await headers(),
  });
  console.log({ res });
  return <div>Dashboard</div>;
}
