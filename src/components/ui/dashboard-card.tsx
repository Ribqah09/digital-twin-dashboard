
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
    <Card className={cn("overflow-hidden bg-dashboard-card-bg border-muted", className)}>
      <div className="border-b border-muted p-4">
        <h3 className="font-medium text-white">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </Card>
  );
}
