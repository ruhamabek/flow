"use client";

import React from "react";
import ReactCountUpWrapper from "@/components/ReactCountUpWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePlayIcon, WaypointsIcon, CoinsIcon } from "lucide-react";

const ICONS = {
  play: CirclePlayIcon,
  phases: WaypointsIcon,
  credits: CoinsIcon,
};

interface Props {
  title: string;
  value: number;
  iconName: keyof typeof ICONS;
}

const StatsCard = ({ title, value, iconName }: Props) => {
  const Icon = ICONS[iconName];

  return (
    <Card className="relative overflow-hidden h-full">
      <CardHeader className="flex pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {Icon && <Icon size={120} className="text-muted-foreground absolute -bottom-4 -right-8 stroke-primary opacity-10"/>}
        </div>
      </CardHeader>
      <CardContent>
        <ReactCountUpWrapper value={value} />
      </CardContent>
    </Card>
  );
};

export default StatsCard;
