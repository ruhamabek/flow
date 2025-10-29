"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const checkoutId = searchParams.get("checkout_id");

  useEffect(() => {
    if (checkoutId) {
      // Optionally confirm checkout, fetch details
      authClient.checkout({ referenceId: checkoutId })
        .then((res) => console.log("Checkout confirmed:", res))
        .catch(console.error);
    }
  }, [checkoutId]);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Payment Successful 🎉</h1>
      <p className="mt-2">Checkout ID: {checkoutId}</p>
    </div>
  );
}
