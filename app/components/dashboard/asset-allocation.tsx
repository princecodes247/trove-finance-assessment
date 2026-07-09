import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/api-client";

const sectorColors: Record<string, string> = {
  Technology: "bg-primary",
  Automotive: "bg-accent-blue",
  Healthcare: "bg-primary-light",
  Finance: "bg-purple",
  Entertainment: "bg-cream",
};

const sectorOrder = [
  "Technology",
  "Automotive",
  "Healthcare",
  "Finance",
  "Entertainment"
];

export function AssetAllocation() {
  const { data: holdings, isLoading } = useQuery({
    queryKey: ['holdings'],
    queryFn: apiClient.getHoldings
  });

  const allocation = React.useMemo(() => {
    if (!holdings) return [];
    
    let totalValue = 0;
    const sectorValues: Record<string, number> = {};
    
    holdings.forEach(h => {
      const value = h.shares * h.currentPrice;
      if (value > 0) {
        totalValue += value;
        sectorValues[h.sector] = (sectorValues[h.sector] || 0) + value;
      }
    });

    return Object.entries(sectorValues)
      .map(([name, value]) => ({
        name,
        percentage: (value / totalValue) * 100,
        color: sectorColors[name] || "bg-gray-400"
      }))
      .sort((a, b) => {
        const indexA = sectorOrder.indexOf(a.name);
        const indexB = sectorOrder.indexOf(b.name);
        return (indexA !== -1 ? indexA : Infinity) - (indexB !== -1 ? indexB : Infinity);
      });
  }, [holdings]);

  return (
    <div className="bg-surface border border-border rounded-xl p-8 shadow-sm flex flex-col h-full">
      <h3 className="text-[15px] font-bold text-text-default mb-8">Asset Allocation</h3>
      
      {isLoading ? (
        <div className="flex-1 flex flex-col space-y-4">
          <div className="h-4 w-full bg-border rounded-full animate-pulse" />
          <div className="grid grid-cols-2 gap-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-border mr-2 animate-pulse" />
                <div className="h-3 w-16 bg-border rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col flex-1">
          <div className="flex h-7 w-full rounded-full overflow-hidden mb-12 bg-border">
            {allocation.map((sector) => (
              <div
                key={sector.name}
                className={`h-full ${sector.color}`}
                style={{ width: `${sector.percentage}%` }}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-y-3 gap-x-4">
            {allocation.map((sector) => (
              <div key={sector.name} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${sector.color} mr-2`} />
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-text-neutral">{sector.name}</span>
                  <span className="text-[12px] font-bold text-text-default">
                    {sector.percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
