import { GetAvailableCredits } from "@/actions/billing/getAvailableCredits";
import ReactCountUpWrapper from "@/components/ReactCountUpWrapper";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CoinsIcon } from "lucide-react";
import { Suspense } from "react";
import CreditsPurchase from "./_components/CreditsPurchase";

export default function BillingPage() {
  return (
    <div className="w-full min-h-screen bg-background  ">
       <h1 className="text-3xl font-bold mb-6">Billing</h1>
       <Suspense fallback={<Skeleton className="h-[166px] w-full rounded-xl" />}>
        <BalanceCard />
      </Suspense>
      <CreditsPurchase />
    </div>
  );
}

async function BalanceCard() {
   const userBalance = await GetAvailableCredits();

  return (
    <Card
      className={`
        bg-gradient-to-br 
        from-primary/10 via-primary/5 to-background 
        dark:from-primary/30 dark:via-primary/10 dark:to-muted/30
        border border-primary/20 dark:border-primary/30
        shadow-lg flex justify-between flex-col overflow-hidden
        transition-colors duration-300
      `}
    >
      <CardContent className="p-6 relative items-center">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Available Credits
            </h3>
            <p className="text-4xl font-bold text-primary">
              <ReactCountUpWrapper value={userBalance} />
            </p>
          </div>

          <CoinsIcon
            size={140}
            className="text-primary opacity-20 absolute bottom-0 right-0 dark:opacity-10"
          />
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground text-sm -mt-5">
           When your balances become zero your workflows will stop working. 
      </CardFooter>
    </Card>
  );
}

