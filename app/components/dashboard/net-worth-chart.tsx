import { Eye, TrendingUp } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/api-client";

const data = [
  { time: "1", value: 42000 },
  { time: "2", value: 42500 },
  { time: "3", value: 42200 },
  { time: "4", value: 44000 },
  { time: "5", value: 43500 },
  { time: "6", value: 46000 },
  { time: "7", value: 45500 },
  { time: "8", value: 48250.75 },
];

export function NetWorthChart() {
  const { data: summary, isLoading } = useQuery({
    queryKey: ['summary'],
    queryFn: apiClient.getSummary
  });

  return (
    <div className="bg-surface border border-border rounded-xl p-6 lg:col-span-2 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center space-x-2 text-text-neutral mb-2">
            <span className="text-[14px] font-medium">Total Net Worth</span>
            <Eye className="w-4 h-4 cursor-pointer hover:text-text-default transition-colors" />
          </div>
          <div className="flex items-center space-x-3">
            {isLoading ? (
              <div className="h-8 w-32 bg-border rounded animate-pulse" />
            ) : (
              <span className="text-[28px] font-semibold text-text-default">
                ${summary?.totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            )}
            <div className="flex items-center space-x-1 text-positive text-[13px] font-medium bg-primary-light/50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+4.2%</span>
            </div>
          </div>
        </div>

        <div className="flex bg-canvas rounded-full p-1 border border-border space-x-1">
          {["1D", "1W", "1M", "ALL"].map((span) => (
            <button
              key={span}
              className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                span === "1D"
                  ? "bg-primary-light text-primary"
                  : "text-text-neutral hover:text-text-default"
              }`}
            >
              {span}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 mt-4 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059A83" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#059A83" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              labelStyle={{ display: "none" }}
              itemStyle={{ color: "#13342F", fontWeight: 500 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#059A83"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorValue)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
