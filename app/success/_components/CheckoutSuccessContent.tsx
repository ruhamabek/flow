"use client"

import { useSearchParams } from "next/navigation"
import { CheckCircle2, Home, Copy } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const checkoutId = searchParams.get("checkout_id")
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    if (checkoutId) {
      navigator.clipboard.writeText(checkoutId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
         <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-muted rounded-full blur-2xl opacity-20" />
            <div className="relative bg-card rounded-full p-6 border border-border shadow-xl">
              <CheckCircle2 className="w-20 h-20 text-foreground" strokeWidth={1.2} />
            </div>
          </div>
        </div>

         <div className="bg-gradient-to-br 
        from-primary/10 via-primary/5 to-background 
        dark:from-primary/30 dark:via-primary/10 dark:to-muted/30
        border border-primary/20 rounded-xl  p-8 mb-6 shadow-lg">
          <div className="space-y-2 mb-8">
            <h1 className="text-4xl font-bold text-foreground">Payment Successful</h1>
            <p className="text-base text-muted-foreground">Your transaction has been completed and confirmed, check your email for invoice.</p>
           </div>

           {checkoutId && (
            <div className="mb-8 p-6 bg-muted rounded-lg border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Checkout ID</p>
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-sm text-foreground break-all">{checkoutId}</p>
                <button
                  onClick={copyToClipboard}
                  className="flex-shrink-0 p-2 hover:bg-background rounded-md transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              </div>
              {copied && <p className="text-xs text-muted-foreground mt-2">Copied to clipboard</p>}
            </div>
          )}

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-muted rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-background text-xs font-bold">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Payment Processed</p>
                  <p className="text-xs text-muted-foreground mt-1">Transaction complete</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-background text-xs font-bold">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Secure Payment</p>
                  <p className="text-xs text-muted-foreground mt-1">Encrypted & verified</p>
                </div>
              </div>
            </div>
          </div>

           <div className="flex flex-col gap-3">
            <Link href="/dashboard" className="w-full">
              <Button className="w-full h-11 text-base">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
