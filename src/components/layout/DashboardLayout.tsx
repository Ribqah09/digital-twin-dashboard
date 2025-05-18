
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen text-white">
      <header className="border-b border-white/10 p-4 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-primary">Epsilon AI</span>Motor Monitoring System
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-green-500">System Online</span>
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
}
