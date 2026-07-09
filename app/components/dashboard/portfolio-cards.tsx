import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/api-client";
import { dashboardKeys } from "../../../lib/query-keys";

export function PortfolioCards() {
  const { data: holdings, isLoading, isError } = useQuery({
    queryKey: dashboardKeys.holdings(),
    queryFn: apiClient.getHoldings
  });

  const cards = React.useMemo(() => {
    if (!holdings) return [];

    const grouped = holdings.reduce((acc, holding) => {
      if (!acc[holding.sector]) {
        acc[holding.sector] = {
          title: holding.sector,
          positions: 0,
          value: 0
        };
      }
      // only count as a position if they actually hold it (shares > 0)
      if (holding.shares > 0) {
        acc[holding.sector].positions += 1;
        acc[holding.sector].value += holding.shares * holding.currentPrice;
      }
      return acc;
    }, {} as Record<string, { title: string; positions: number; value: number }>);

    return Object.values(grouped)
      .filter(g => g.positions > 0)
      .sort((a, b) => b.value - a.value);
  }, [holdings]);

  if (isError) {
    return (
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm flex items-center justify-center min-h-[104px]">
        <p className="text-negative font-medium text-[13px]">Failed to load categories</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-4 gap-4 lg:gap-5 pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="min-w-[260px] snap-center lg:min-w-0 lg:snap-none bg-surface border border-border rounded-xl p-6 shadow-sm h-[126px] animate-pulse">
          <div className="h-4 w-24 bg-border rounded mb-3" />
          <div className="h-6 w-32 bg-border rounded mb-2" />
          <div className="h-4 w-16 bg-border rounded" />
        </div>
      ))}
    </div>
    );
  }

  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-4 gap-4 lg:gap-5 pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {cards.map((card) => (
        <div key={card.title} className="min-w-[260px] snap-center lg:min-w-0 lg:snap-none bg-surface border border-border rounded-xl p-6 shadow-sm h-[126px]">
          <div className="text-[12px] font-medium text-text-neutral mb-2">{card.title}</div>
          <div className="text-[18px] font-bold text-text-default mb-2">
            ${card.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[12px] font-medium text-text-neutral">
            {card.positions} position{card.positions !== 1 && 's'}
          </div>
        </div>
      ))}
    </div>
  );
}
