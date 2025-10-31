import { GetPeriods } from "@/actions/analytics/getPeriods";
import { Suspense } from "react";
import PeriodSelector from "./_components/PeriodSelector";
import { Periods } from "@/app/types/analytics";
import { Skeleton } from "@/components/ui/skeleton";
import { GetStatsCardsValues } from "@/actions/analytics/getStatsCardsValues";
import StatsCard from "./_components/StatsCard";
import {  GetWorkflowExecutionStatus } from "@/actions/analytics/getWorkflowExecutionStatus";
import ExecutionStatusChart from "./_components/ExecutionStatusChart";
import { GetCreditsUsageInPeriod } from "@/actions/analytics/getCreditsUsageInPeriod";
import CreditUsageChart from "./billing/_components/CreditUsageChart";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; year?: string }>
}) {
  const currentDate = new Date();
  const { month, year } = await searchParams;
  const period: Periods = {
    month: month ? parseInt(month) : currentDate.getMonth(),
    year: year ? parseInt(year) : currentDate.getFullYear(),
  };

  return (
    <div className="flex flex-1 flex-col h-full ml-7">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Suspense fallback={<Skeleton className="w-[180px] h-[40px]" />}>
          <PeriodSelectorWrapper selectedPeriod={period} />
        </Suspense>
      </div>
      <div className="h-full py-6 flex flex-col gap-4">
        <Suspense fallback={<StatusCardSkeleton />}>
          <StatsCards selectedPeriod={period} />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
          <StatsExecutionStatus selectedPeriod={period} />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
          <CreditsUsageInPeriod selectedPeriod={period} />
        </Suspense>
      </div>
    </div>
  );
}

async function PeriodSelectorWrapper({
  selectedPeriod,
}: {
  selectedPeriod: Periods;
}) {
  const periods = await GetPeriods();
  return <PeriodSelector selectedPeriod={selectedPeriod} periods={periods} />;
}

async function StatsCards({ selectedPeriod }: { selectedPeriod: Periods }) {
  const data = await GetStatsCardsValues(selectedPeriod);

  return (
    <div className="grid gap-3 lg:gap-8 lg:grid-cols-3 min-h-[120px]">
      <StatsCard
        title="Workflow Executions"
        value={data.workfowExecutions}
        iconName="play"
      />
      <StatsCard
        title="Phase Executions"
        value={data.phaseExecution}
        iconName="phases"
      />
      <StatsCard
        title="Credits Consumed"
        value={data.creditsConsumed}
        iconName="credits"
      />
    </div>
  );
}

function StatusCardSkeleton() {
  return (
    <div className="grid gap-3 lg:gap-8 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="w-full min-h-[120px]" />
      ))}
    </div>
  );
}

async function StatsExecutionStatus({
  selectedPeriod,
}: {
  selectedPeriod: Periods;
}) {
  const data = await GetWorkflowExecutionStatus(selectedPeriod);
  return <ExecutionStatusChart data={data} />;
}

async function CreditsUsageInPeriod({
  selectedPeriod,
}: {
  selectedPeriod: Periods;
}) {
  const data = await GetCreditsUsageInPeriod(selectedPeriod);
  return(
    <CreditUsageChart
      data={data}
      title="Daily credits spent"
      description="Daily credit consumed in selected period"
     />
  )

}
