import { GetAvailableCredits } from "@/actions/billing/getAvailableCredits";
import ReactCountUpWrapper from "@/components/ReactCountUpWrapper";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeftRightIcon, CoinsIcon } from "lucide-react";
import { Suspense } from "react";
import CreditsPurchase from "./_components/CreditsPurchase";
import { Periods } from "@/app/types/analytics";
import { GetCreditsUsageInPeriod } from "@/actions/analytics/getCreditsUsageInPeriod";
import CreditUsageChart from "./_components/CreditUsageChart";
import { getTransactionHistory } from "@/actions/billing/getTransactionHistory";
 
export default function BillingPage() {
  return (
    <div className="w-full min-h-screen bg-background  ml-7">
       <h1 className="text-3xl font-bold mb-6">Billing</h1>
       <Suspense fallback={<Skeleton className="h-[166px] w-full rounded-xl" />}>
        <BalanceCard />
      </Suspense>
      <CreditsPurchase />
      <Suspense fallback={<Skeleton className="h-[300px] w-full mt-8"/>}>
          <CreditsUsageCard  />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[300px] w-full mt-8"/>}>
             <TransactionHistoryCard />
      </Suspense>
    </div>
  );
}

async function BalanceCard() {
   const userBalance = await GetAvailableCredits();

  return (
    <Card
      className={`
         dark:border-primary/30
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
 
async function CreditsUsageCard() {
  const period: Periods = {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  }

  const data  = await  GetCreditsUsageInPeriod(period);
  return( <div className="mt-6">
           <CreditUsageChart 
        data={data}
        title="Credits Consumed"
        description="Daily credits consumed in the current month"
  />
  </div> )
}

function formatDate(date: Date){
  return new Intl.DateTimeFormat("en-US" , {
    year: "numeric",
    month:"long",
    day: "numeric"
  }).format(date);
} 

function formatAmount(amount: number , currency: string){
  return new Intl.NumberFormat("en-US" , {
      style: "currency",
      currency,
  }).format(amount / 100);
} 
 
async function TransactionHistoryCard() {
  const transactions = await getTransactionHistory();

  return (
    <div className="mt-8">
      <Card className="p-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <ArrowLeftRightIcon className="h-6 w-6 text-primary" />
            Transaction History
          </CardTitle>
          <CardDescription>
            View your past transactions and payments.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {transactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              No transactions yet.
            </p>
          ) : (
            <div className="divide-y divide-border rounded-lg border">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center py-4 px-4 hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-medium">{formatDate(transaction.createdAt)}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.checkout?.productName || "Unknown Product"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {formatAmount(transaction.amount, transaction.currency)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
