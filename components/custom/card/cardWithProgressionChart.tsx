import React from "react";
import {Card} from "@/components/ui/card"
import ProgressCircle from '@/components/custom/charts/ProgressCircle'

interface CardWithProgressionChartProps{
    text:string,
    value:number
}
export default function CardWithProgressionChart({text, value}:CardWithProgressionChartProps) {
  return (
    <Card className="relative flex p-12 justify-center items-center h-full">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span className="text-xs">{text}</span>
      </div>
      <ProgressCircle value={80.9} label="80.9% Completion" />
    </Card>
  );
}
