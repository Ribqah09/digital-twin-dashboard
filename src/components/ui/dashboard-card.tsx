
import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function DashboardCard({
  title,
  children,
  className,
}: DashboardCardProps) {
  return (
    <Card className={cn("overflow-hidden bg-white/10 backdrop-blur-sm border-white/20 shadow-lg", className)}>
      <div className="border-b border-white/20 p-4 bg-white/5">
        <h3 className="font-medium text-white tracking-wide">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </Card>
  );
}
