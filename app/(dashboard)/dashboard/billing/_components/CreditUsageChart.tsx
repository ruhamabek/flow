"use client"
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
import { ChartColumnStackedIcon } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { GetCreditsUsageInPeriod } from "@/actions/analytics/getCreditsUsageInPeriod";

type ChartData = Awaited<ReturnType<typeof GetCreditsUsageInPeriod>>;
const chartConfig = {
    success : {
        label: "Successful Phases Credits",
        color: "var(--chart-2)"
    },
    failed: {
        label: "Failed Phases Credits",
        color: "var(--chart-5)"
    }
}


const CreditUsageChart = ({data , title , description}: {data: ChartData , description: string, title: string}) => {
   return(
    <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <ChartColumnStackedIcon className="w-6 h-6 text-primary" />
               {title}
            </CardTitle>
            <CardDescription>
              {description}
             </CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
                 <BarChart data={data} height={200} accessibilityLayer margin={{top: 20}}>
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
                      <Bar 
                          dataKey={"success"}
                          radius={[0 , 0 , 4 ,4]}
                          fillOpacity={0.8}
                          fill="var(--color-success)"
                          stroke="var(--color-success)"
                          stackId={"a"}/>
                      <Bar 
                          dataKey={"failed"}
                          radius={[4 , 4 , 0 ,0]}
                          fillOpacity={0.8}
                          fill="var(--color-failed)"
                          stroke="var(--color-failed)"
                          stackId={"a"}/>
                   </BarChart>
            </ChartContainer>
        </CardContent>
    </Card>
  );
}

export default CreditUsageChart