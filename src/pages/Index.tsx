import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { GaugeMetric } from "@/components/metrics/GaugeMetric";
import { TemperatureMetric } from "@/components/metrics/TemperatureMetric";
import { WaveformVisualization } from "@/components/metrics/WaveformVisualization";
import { PredictiveMaintenance } from "@/components/metrics/PredictiveMaintenance";
import { getMotorData, MotorData } from "@/services/motorDataService";
import { ArrowUp, ArrowDown, Gauge } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [motorData, setMotorData] = useState<MotorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMotorData(getMotorData());
    setIsLoading(false);

    const interval = setInterval(() => {
      setMotorData(getMotorData());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout title="Motor Monitoring System">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-muted-foreground">Loading data...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Motor Monitoring System">
      {/* This container ensures perfect alignment with the cards */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* First Row - Current, Voltage, System Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <DashboardCard title="Current Parameters (A)">
            {motorData && (
              <div className="space-y-4">
                <GaugeMetric
                  title="Phase A Current"
                  value={motorData.current.phaseA}
                  unit="A"
                  min={0}
                  max={50}
                  color="bg-dashboard-accent-blue"
                  icon={<ArrowUp className="h-5 w-5" />}
                  warning={{ min: 15, max: 35 }}
                />
                <GaugeMetric
                  title="Phase B Current"
                  value={motorData.current.phaseB}
                  unit="A"
                  min={0}
                  max={50}
                  color="bg-dashboard-accent-purple"
                  icon={<ArrowUp className="h-5 w-5" />}
                  warning={{ min: 15, max: 35 }}
                />
                <GaugeMetric
                  title="Phase C Current"
                  value={motorData.current.phaseC}
                  unit="A"
                  min={0}
                  max={50}
                  color="bg-dashboard-accent-green"
                  icon={<ArrowUp className="h-5 w-5" />}
                  warning={{ min: 15, max: 35 }}
                />
              </div>
            )}
          </DashboardCard>

          <DashboardCard title="Voltage Parameters (V)">
            {motorData && (
              <div className="space-y-4">
                <GaugeMetric
                  title="Phase A Voltage"
                  value={motorData.voltage.phaseA}
                  unit="V"
                  min={340}
                  max={420}
                  color="bg-dashboard-accent-blue"
                  icon={<ArrowDown className="h-5 w-5" />}
                  warning={{ min: 370, max: 400 }}
                />
                <GaugeMetric
                  title="Phase B Voltage"
                  value={motorData.voltage.phaseB}
                  unit="V"
                  min={340}
                  max={420}
                  color="bg-dashboard-accent-purple"
                  icon={<ArrowDown className="h-5 w-5" />}
                  warning={{ min: 370, max: 400 }}
                />
                <GaugeMetric
                  title="Phase C Voltage"
                  value={motorData.voltage.phaseC}
                  unit="V"
                  min={340}
                  max={420}
                  color="bg-dashboard-accent-green"
                  icon={<ArrowDown className="h-5 w-5" />}
                  warning={{ min: 370, max: 400 }}
                />
              </div>
            )}
          </DashboardCard>

          <DashboardCard title="System Parameters">
            {motorData && (
              <div className="space-y-5">
                <div>
                  <div className="mb-2 text-sm text-muted-foreground">Frequency</div>
                  <div className="flex items-center space-x-2">
                    <Gauge className="h-6 w-6 text-dashboard-accent-blue" />
                    <span className="text-2xl font-bold">{motorData.frequency.toFixed(1)}</span>
                    <span className="text-muted-foreground">Hz</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="mb-2 text-sm text-muted-foreground">Temperature</div>
                  <div className="grid grid-cols-2 gap-4">
                    <TemperatureMetric
                      title="T1"
                      value={Math.round(motorData.temperature.t1 * 10) / 10}
                      unit="°C"
                      warningThreshold={75}
                      criticalThreshold={85}
                    />
                    <TemperatureMetric
                      title="T2"
                      value={Math.round(motorData.temperature.t2 * 10) / 10}
                      unit="°C"
                      warningThreshold={75}
                      criticalThreshold={85}
                    />
                  </div>
                </div>
              </div>
            )}
          </DashboardCard>
        </div>

        {/* Second Row - Vibration & Predictive Maintenance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <DashboardCard title="Vibration Analysis">
            <WaveformVisualization color="#8B5CF6" />
          </DashboardCard>

          <DashboardCard title="Predictive Maintenance Analysis">
            <PredictiveMaintenance motorData={motorData} />
          </DashboardCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
