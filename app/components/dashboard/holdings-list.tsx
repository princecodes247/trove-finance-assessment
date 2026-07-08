import { LayoutGrid, Building2, Stethoscope, Landmark, ShoppingCart, Film } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/api-client";

export function HoldingsList() {
  const getIcon = (sector: string) => {
    switch (sector) {
      case "Technology": return <LayoutGrid className="w-5 h-5 text-primary" />;
      case "Automotive": return <Building2 className="w-5 h-5 text-negative" />;
      case "Healthcare": return <Stethoscope className="w-5 h-5 text-primary" />;
      case "Finance": return <Landmark className="w-5 h-5 text-text-default" />;
      case "Entertainment": return <Film className="w-5 h-5 text-accent-blue" />;
      default: return <ShoppingCart className="w-5 h-5 text-text-neutral" />;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ['holdings'],
    queryFn: apiClient.getHoldings
  });

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
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-surface border border-border rounded-xl p-4 flex items-center shadow-sm animate-pulse">
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
        {data?.slice(0, 5).map((holding) => {
          const totalValue = holding.shares * holding.currentPrice;
          const absoluteChange = (holding.currentPrice - holding.avgCost) * holding.shares;
          const percentChange = ((holding.currentPrice - holding.avgCost) / holding.avgCost) * 100;
          const isPositive = absoluteChange >= 0;

          // Provide empty state or hide if 0 shares
          if (holding.shares === 0) return null;

          return (
            <div key={holding.id} className="bg-surface border border-border rounded-xl p-4 flex items-center shadow-sm">
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
