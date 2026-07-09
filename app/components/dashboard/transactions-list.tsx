import { MdOutlineAdd, MdOutlineRemove } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/api-client";
import { dashboardKeys } from "../../../lib/query-keys";
import { formatDeterministicFullDate } from "../../../lib/data/utils";

export function TransactionsList() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <span className="bg-primary-light text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Completed</span>;
      case "PENDING":
        return <span className="bg-cream/40 text-text-neutral text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Pending</span>;
      case "FAILED":
        return <span className="bg-negative/10 text-negative text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Failed</span>;
      default:
        return null;
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: dashboardKeys.transactions(),
    queryFn: apiClient.getTransactions
  });

  if (isError) {
    return (
      <div className="flex flex-col h-full bg-surface border border-border rounded-xl p-6 shadow-sm justify-center items-center min-h-[300px]">
        <p className="text-negative font-semibold mb-2">Failed to load transactions</p>
        <p className="text-text-neutral text-[13px]">Please check your connection and try again.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end lg:justify-between items-end mb-4">
        <h3 className="hidden lg:block text-[16px] font-bold text-text-default">Recent Transactions</h3>
        <button className="text-[12px] font-bold text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm flex flex-col">
        {isLoading && (
          <>
            {[1, 2, 3].map((i, index) => (
              <div key={i} className={`p-4 flex items-center ${index !== 0 ? 'border-t border-border' : ''} animate-pulse`}>
                <div className="w-10 h-10 rounded-full bg-border mr-4 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-border rounded" />
                  <div className="h-3 w-40 bg-border rounded" />
                </div>
                <div className="text-right space-y-2 flex flex-col items-end shrink-0">
                  <div className="h-4 w-20 bg-border rounded" />
                  <div className="h-3 w-16 bg-border rounded-full" />
                </div>
              </div>
            ))}
          </>
        )}
        {data?.slice(0, 5).map((tx, index) => {
          const isBuy = tx.type === "BUY";
          
          return (
            <div 
              key={tx.id} 
              className={`p-4 flex items-center ${index !== 0 ? 'border-t border-border' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 shrink-0 ${isBuy ? 'bg-primary-light text-primary' : 'bg-neutral-200 text-text-neutral'}`}>
                {isBuy ? <MdOutlineAdd className="w-5 h-5" /> : <MdOutlineRemove className="w-5 h-5" />}
              </div>
              
              <div className="flex-1">
                <div className="text-[13px] font-bold text-text-default mb-0.5">
                  {isBuy ? 'Buy' : 'Sell'} {tx.name}
                </div>
                <div className="text-[11px] text-text-neutral">
                  {formatDeterministicFullDate(tx.date)} • {tx.shares.toFixed(2)} Shares
                </div>
              </div>

              <div className="text-right flex flex-col items-end">
                <div className="text-[14px] font-bold text-text-default mb-1">
                  {isBuy ? '-' : '+'}${tx.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                {getStatusBadge(tx.status)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
