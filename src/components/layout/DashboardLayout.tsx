
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1c3e72] to-[#5f89c2] text-white">
      <header className="border-b border-white/20 p-4 backdrop-blur-sm bg-white/10 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="text-4xl font-bold text-white bg-white/10 h-12 w-12 rounded-md flex items-center justify-center shadow-inner">E</div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-wider">EPSILON SYSTEMS</h1>
                <p className="text-xs text-white/80 italic">Sense. Analyze. Automate. Monitor</p>
              </div>
            </div>
            <p className="text-sm mt-1 text-white/90 font-medium">Epsilon AI Motor Monitoring System</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full shadow-inner">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-green-400 font-medium">System Online</span>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-medium text-white">{title}</h2>
          <p className="text-white/70">
            Real-time monitoring and analytics
          </p>
        </div>
        {children}
      </main>
    </div>
  );
};
