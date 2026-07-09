import React from "react";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <div className={`bg-surface border border-border/80 rounded-2xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] w-full ${className}`}>
      {children}
    </div>
  );
}

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="w-13 h-13 bg-primary rounded-xl flex items-center justify-center text-white text-[18px] mb-4 shadow-sm font-medium">
        T
      </div>
      <h2 className="text-xl font-semibold text-text-default tracking-tight mb-2">{title}</h2>
      <p className="text-sm text-text-neutral">{subtitle}</p>
    </div>
  );
}
