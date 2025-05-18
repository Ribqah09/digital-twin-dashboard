
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { CircleAlert, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface MaintenanceItem {
  component: string;
  status: "healthy" | "warning" | "critical";
  remainingLifeHours: number;
  recommendation: string;
}

interface PredictiveMaintenanceProps {
  motorData?: any;
}

export function PredictiveMaintenance({ motorData }: PredictiveMaintenanceProps) {
  const [maintenanceData, setMaintenanceData] = useState<MaintenanceItem[]>([]);
  const [lastAnalysis, setLastAnalysis] = useState<Date>(new Date());

  // Simulate AI predictive analysis based on motor data
  useEffect(() => {
    if (!motorData) return;
    
    // In a real application, this would be replaced with actual AI-based analysis
    // using the telemetry data from the motor
    const simulatePredictiveAnalysis = () => {
      // Analyze temperature trends
      const tempStatus = motorData.temperature.t1 > 80 ? "warning" : 
                        motorData.temperature.t1 > 70 ? "warning" : "healthy";
      
      const tempLife = tempStatus === "warning" ? 
                      Math.round(120 - (motorData.temperature.t1 - 65) * 10) :
                      Math.round(500 - (motorData.temperature.t1 - 50) * 5);
      
      // Analyze current imbalance
      const currents = [motorData.current.phaseA, motorData.current.phaseB, motorData.current.phaseC];
      const avgCurrent = currents.reduce((sum, val) => sum + val, 0) / 3;
      const maxDeviation = Math.max(...currents.map(c => Math.abs(c - avgCurrent)));
      const imbalancePercent = (maxDeviation / avgCurrent) * 100;
      
      const currentStatus = imbalancePercent > 10 ? "critical" : 
                          imbalancePercent > 5 ? "warning" : "healthy";
      
      const currentLife = currentStatus === "critical" ? 48 : 
                         currentStatus === "warning" ? 120 : 2000;
                         
      // Analyze vibration (would use actual vibration data in real application)
      const vibrationStatus = Math.random() > 0.7 ? "warning" : "healthy";
      const vibrationLife = vibrationStatus === "warning" ? 
                          Math.round(100 + Math.random() * 100) : 
                          Math.round(1000 + Math.random() * 1000);
                          
      return [
        {
          component: "Bearing Assembly",
          status: vibrationStatus,
          remainingLifeHours: vibrationLife,
          recommendation: vibrationStatus === "warning" ? 
                        "Schedule inspection within next maintenance cycle" : 
                        "No action needed"
        },
        {
          component: "Winding Insulation",
          status: tempStatus as "healthy" | "warning" | "critical",
          remainingLifeHours: tempLife,
          recommendation: tempStatus === "warning" ? 
                        "Monitor temperature trends; consider inspection" : 
                        "No action needed"
        },
        {
          component: "Phase Balancing",
          status: currentStatus as "healthy" | "warning" | "critical",
          remainingLifeHours: currentLife,
          recommendation: currentStatus === "critical" ? 
                        "Immediate inspection required" : 
                        currentStatus === "warning" ? 
                        "Schedule balancing within 1 week" : 
                        "No action needed"
        }
      ];
    };
    
    setMaintenanceData(simulatePredictiveAnalysis());
    setLastAnalysis(new Date());
  }, [motorData]);
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CircleCheck className="h-5 w-5 text-green-500" />;
      case "warning":
        return <CircleAlert className="h-5 w-5 text-yellow-400" />;
      case "critical":
        return <CircleAlert className="h-5 w-5 text-dashboard-accent-red animate-pulse" />;
      default:
        return <CircleCheck className="h-5 w-5 text-muted-foreground" />;
    }
  };
  
  const getTimeDisplay = (hours: number) => {
    if (hours < 24) return `${hours} hours`;
    if (hours < 168) return `${Math.round(hours / 24)} days`;
    return `${Math.round(hours / 168)} weeks`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Last analysis: {lastAnalysis.toLocaleTimeString()}
        </div>
        <div className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
          AI-Powered Analysis
        </div>
      </div>
      <div className="space-y-3">
        {maintenanceData.map((item, index) => (
          <Card key={index} className={cn(
            "p-3 border-l-4",
            item.status === "critical" ? "border-l-dashboard-accent-red" : 
            item.status === "warning" ? "border-l-yellow-400" : 
            "border-l-green-500"
          )}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(item.status)}
                <div>
                  <h4 className="font-medium">{item.component}</h4>
                  <p className="text-xs text-muted-foreground">
                    Est. remaining service life: {getTimeDisplay(item.remainingLifeHours)}
                  </p>
                </div>
              </div>
              <div className={cn(
                "text-xs px-2 py-1 rounded-full",
                item.status === "critical" ? "bg-dashboard-accent-red/20 text-dashboard-accent-red" : 
                item.status === "warning" ? "bg-yellow-400/20 text-yellow-400" : 
                "bg-green-500/20 text-green-500"
              )}>
                {item.status.toUpperCase()}
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              <span className="font-medium">Recommendation:</span> {item.recommendation}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
