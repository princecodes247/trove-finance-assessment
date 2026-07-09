import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/api-client";
import { SECTOR_METADATA, sectorOrder, type Sector } from "../../../lib/constants/sectors";
import { dashboardKeys } from "../../../lib/query-keys";

export function AssetAllocation() {
  const { data: holdings, isLoading, isError } = useQuery({
    queryKey: dashboardKeys.holdings(),
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
      .map(([name, value]) => {
        const metadata = SECTOR_METADATA[name as Sector] || SECTOR_METADATA.Default;
        return {
          name,
          percentage: (value / totalValue) * 100,
          color: metadata.color
        };
      })
      .sort((a, b) => {
        const indexA = sectorOrder.indexOf(a.name as Sector);
        const indexB = sectorOrder.indexOf(b.name as Sector);
        return (indexA !== -1 ? indexA : Infinity) - (indexB !== -1 ? indexB : Infinity);
      });
  }, [holdings]);

  if (isError) {
    return (
      <div className="bg-surface border border-border rounded-xl p-5 sm:p-8 shadow-sm flex items-center justify-center h-full min-h-[300px]">
        <div className="text-center">
          <p className="text-negative font-semibold mb-2">Failed to load allocation</p>
          <p className="text-text-neutral text-[13px] mb-4">Please check your network and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-5 sm:p-8 shadow-sm flex flex-col h-full">
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
