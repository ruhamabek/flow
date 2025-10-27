"use client";

import {  GetWorkflowExecutionStatus } from "@/actions/analytics/getWorkflowExecutionStatus";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
 import  {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
} from "@/components/ui/chart"
import { Layers2 } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

type ChartData = Awaited<ReturnType<typeof GetWorkflowExecutionStatus>>;
const chartConfig = {
    success : {
        label: "Success",
        color: "var(--chart-2)"
    },
    failed: {
        label: "Failed",
        color: "var(--chart-5)"
    }
}

const ExecutionStatusChart = ({data}: {data: ChartData}) => {
  return(
    <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Layers2 className="w-6 h-6 text-primary" />
                Workflow execution status
            </CardTitle>
            <CardDescription>
                  Daily number of successful and failed workflow executions
            </CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
                 <AreaChart data={data} height={200} accessibilityLayer margin={{top: 20}}>
                      <CartesianGrid vertical={false}/>
                      <XAxis 
                          dataKey={"date"}
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          minTickGap={32}
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString("en-US" , {
                                month: "short",
                                day: "numeric"
                            })
                          }}
                          />
                      <ChartLegend content={<ChartLegendContent />}/>
                      <ChartTooltip content={<ChartTooltipContent className="w-[250px]"/>}/>
                      <Area 
                          min={0}
                          dataKey={"success"}
                          type={"bump"}
                          fillOpacity={0.6}
                          fill="var(--color-success)"
                          stroke="var(--color-success)"
                          stackId={"a"}/>
                      <Area 
                          min={0}
                          dataKey={"failed"}
                          type={"bump"}
                          fillOpacity={0.6}
                          fill="var(--color-failed)"
                          stroke="var(--color-failed)"
                          stackId={"a"}/>
                   </AreaChart>
            </ChartContainer>
        </CardContent>
    </Card>
  );
};

export default ExecutionStatusChart;
