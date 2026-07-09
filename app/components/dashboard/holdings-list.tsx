import { useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/api-client";
import { SECTOR_METADATA, sectorOrder, type Sector } from "../../../lib/constants/sectors";
import { dashboardKeys } from "../../../lib/query-keys";

const SECTORS = ["All", ...sectorOrder];

export function HoldingsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSector, setActiveSector] = useState("All");

  const getIcon = (sector: string) => {
    const metadata = SECTOR_METADATA[sector as Sector] || SECTOR_METADATA.Default;
    const IconComponent = metadata.icon;
    
    let textClass = "text-text-neutral";
    if (sector === "Technology" || sector === "Healthcare") textClass = "text-primary";
    else if (sector === "Automotive") textClass = "text-negative";
    else if (sector === "Finance") textClass = "text-text-default";
    else if (sector === "Entertainment") textClass = "text-accent-blue";

    return <IconComponent className={`w-5 h-5 ${textClass}`} />;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: dashboardKeys.holdings(),
    queryFn: apiClient.getHoldings
  });

  const filteredData = data?.filter((holding) => {
    const matchesSearch = holding.ticker.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          holding.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = activeSector === "All" || holding.sector === activeSector;
    return matchesSearch && matchesSector && holding.shares > 0;
  });

  if (isError) {
    return (
      <div className="flex flex-col h-full bg-surface border border-border rounded-xl p-6 shadow-sm justify-center items-center min-h-[300px]">
        <p className="text-negative font-semibold mb-2">Failed to load holdings</p>
        <p className="text-text-neutral text-[13px]">Please check your connection and try again.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-[16px] font-bold text-text-default">Holdings</h3>
        <button className="text-[12px] font-bold text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>
      
      <div className="flex flex-col space-y-3">
        {isLoading && (
          <>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="border border-border rounded-xl p-4 flex items-center animate-pulse">
                <div className="w-10 h-10 rounded-lg bg-border mr-4 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-16 bg-border rounded" />
                  <div className="h-3 w-24 bg-border rounded" />
                </div>
                <div className="flex-1 hidden sm:block space-y-2">
                  <div className="h-3 w-12 bg-border rounded mx-auto" />
                  <div className="h-4 w-10 bg-border rounded mx-auto" />
                </div>
                <div className="text-right space-y-2 shrink-0 flex flex-col items-end">
                  <div className="h-4 w-16 bg-border rounded" />
                  <div className="h-3 w-20 bg-border rounded" />
                </div>
              </div>
            ))}
          </>
        )}
        
        {!isLoading && filteredData?.length === 0 && (
          <div className="py-12 text-center text-text-neutral text-sm">
            No holdings found matching your criteria.
          </div>
        )}

        {filteredData?.map((holding) => {
          const totalValue = holding.shares * holding.currentPrice;
          const absoluteChange = (holding.currentPrice - holding.avgCost) * holding.shares;
          const percentChange = ((holding.currentPrice - holding.avgCost) / holding.avgCost) * 100;
          const isPositive = absoluteChange >= 0;

          return (
            <div key={holding.id} className="border border-border rounded-xl p-4 flex items-center hover:bg-canvas transition-colors cursor-pointer bg-surface shadow-sm">
              <div className="w-10 h-10 rounded-lg border border-border bg-canvas flex items-center justify-center mr-4 shrink-0">
                {getIcon(holding.sector)}
              </div>
              
              <div className="flex-1">
                <div className="text-[14px] font-bold text-text-default">{holding.ticker}</div>
                <div className="text-[12px] text-text-neutral">{holding.name}</div>
              </div>

              <div className="flex-1 text-center hidden sm:block">
                <div className="text-[11px] text-text-neutral mb-0.5">Shares</div>
                <div className="text-[13px] font-bold text-text-default">{holding.shares.toFixed(2)}</div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-[14px] font-bold text-text-default">
                  ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className={`text-[11px] font-semibold ${isPositive ? 'text-positive' : 'text-negative'}`}>
                  {isPositive ? '+' : ''}${absoluteChange.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({percentChange.toFixed(1)}%)
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
