import { Suspense } from "react"
import { CheckoutSuccessContent } from "./_components/CheckoutSuccessContent"
 
export const metadata = {
  title: "Payment Successful",
  description: "Your payment has been processed successfully",
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <CheckoutSuccessContent />
    </Suspense>
  )
}
