
import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Gauge } from "lucide-react";

interface GaugeMetricProps {
  title: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  color?: string;
  icon?: React.ReactNode;
  warning?: { min: number; max: number };
}

export function GaugeMetric({
  title,
  value,
  unit,
  min,
  max,
  color = "bg-primary",
  icon = <Gauge className="h-5 w-5" />,
  warning,
}: GaugeMetricProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  
  const isWarning = warning && (value < warning.min || value > warning.max);
  const displayColor = isWarning ? "bg-dashboard-accent-red" : color;

  return (
    <div className="flex flex-col space-y-2 p-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-muted-foreground">
          {icon}
          <span className="text-sm">{title}</span>
        </div>
        <div className={cn("text-lg font-medium", isWarning ? "text-dashboard-accent-red animate-pulse" : "text-white")}>
          {value.toFixed(1)}
          <span className="text-sm ml-1 text-muted-foreground">{unit}</span>
        </div>
      </div>
      <Progress
        value={percentage}
        className="h-2 bg-muted"
        indicatorClassName={cn(displayColor)}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
