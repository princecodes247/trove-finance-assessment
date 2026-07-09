import { useState } from "react";
import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/api-client";
import { dashboardKeys } from "../../../lib/query-keys";
import type { TimeSpan } from "../../../lib/types";

const spanToDays: Record<TimeSpan, number> = {
  "1D": 1,
  "1W": 7,
  "1M": 30,
  "ALL": 90,
};

export function NetWorthChart() {
  const [selectedSpan, setSelectedSpan] = useState<TimeSpan>("1D");
  const [isWorthVisible, setIsWorthVisible] = useState(true);
  
  const { data: summary, isLoading: isLoadingSummary, isError: isErrorSummary } = useQuery({
    queryKey: dashboardKeys.summary(),
    queryFn: apiClient.getSummary
  });

  const { data: history, isLoading: isLoadingHistory, isError: isErrorHistory } = useQuery({
    queryKey: dashboardKeys.portfolioHistory(selectedSpan),
    queryFn: () => apiClient.getPortfolioHistory(spanToDays[selectedSpan])
  });

  const percentageChange = summary ? ((summary.totalPortfolioValue - summary.totalInvested) / summary.totalInvested) * 100 : 0;
  const isPositive = percentageChange >= 0;
  
  const isLoading = isLoadingSummary || isLoadingHistory;

  if (isErrorSummary || isErrorHistory) {
    return (
      <div className="bg-surface border border-border rounded-xl p-5 sm:p-8 xl:col-span-2 shadow-sm flex items-center justify-center h-full min-h-[300px]">
        <div className="text-center">
          <p className="text-negative font-semibold mb-2">Failed to load net worth data</p>
          <p className="text-text-neutral text-[13px]">Please check your connection and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-5 sm:p-8 xl:col-span-2 shadow-sm flex flex-col h-full">
      <div className="flex flex-col md:flex-row gap-2 justify-between items-start mb-6">
        <div>
          <div className="flex items-center space-x-2 text-text-neutral mb-2">
            <span className="text-[14px] font-medium">Total Net Worth</span>
            {isWorthVisible ? (
              <Eye className="w-4 h-4 cursor-pointer hover:text-text-default transition-colors" onClick={() => setIsWorthVisible(false)} />
            ) : (
              <EyeOff className="w-4 h-4 cursor-pointer hover:text-text-default transition-colors" onClick={() => setIsWorthVisible(true)} />
            )}
          </div>
          <div className="flex items-center space-x-3">
            {isLoading ? (
              <div className="h-8 w-32 bg-border rounded animate-pulse" />
            ) : (
              <span className="text-[28px] font-semibold text-text-default">
                {isWorthVisible 
                  ? `$${summary?.totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : '****'}
              </span>
            )}
            <div className={`flex items-center space-x-1 text-[13px] font-medium px-2 py-0.5 rounded-full ${isPositive ? 'text-positive' : 'text-negative'}`}>
              <TrendingUp className={`w-3.5 h-3.5 ${!isPositive && 'rotate-180'}`} />
              <span>{isPositive ? '+' : ''}{percentageChange.toFixed(2)}%</span>
            </div>
          </div>
        </div>

        <div className="flex bg-canvas rounded-full p-1 space-x-2">
          {(["1D", "1W", "1M", "ALL"] as TimeSpan[]).map((span) => (
            <button
              key={span}
              onClick={() => setSelectedSpan(span)}
              className={`px-4 py-1 rounded-full text-[12px] font-medium transition-all ${
                span === selectedSpan
                  ? "bg-primary-light text-primary"
                  : "text-text-neutral hover:bg-gray-100 hover:text-text-default"
              }`}
            >
              {span}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full h-[250px] min-h-[250px] mt-4 relative">
        {isLoadingHistory ? (
          <div className="absolute inset-0 flex flex-col justify-end space-y-4 pb-2">
            <div className="w-full h-1/2 bg-border/50 rounded-t-xl animate-pulse" />
            <div className="flex justify-between px-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-2 w-8 bg-border rounded animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history || []} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: 'var(--color-text-disabled)' }}
                minTickGap={30}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid var(--color-border)',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'var(--color-text-default)',
                  backgroundColor: 'var(--color-surface)'
                }}
                itemStyle={{ color: 'var(--color-primary)', fontWeight: 600 }}
                formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Value']}
                labelStyle={{ color: 'var(--color-text-neutral)', marginBottom: '4px' }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--color-primary)"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorValue)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
