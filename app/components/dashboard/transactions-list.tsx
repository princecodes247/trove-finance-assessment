import { Plus, Minus, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/api-client";

export function TransactionsList() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <span className="bg-[#66E2B3] text-text-default text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Completed</span>;
      case "PENDING":
        return <span className="bg-[#F2C891] text-text-default text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Pending</span>;
      case "FAILED":
        return <span className="bg-[#FF9B9B] text-[#BF221C] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Failed</span>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const { data, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: apiClient.getTransactions
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-[16px] font-bold text-text-default">Recent Transactions</h3>
        <button className="text-[12px] font-bold text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm flex flex-col">
        {isLoading && (
          <div className="flex justify-center p-8">
            <Loader2 className="w-6 h-6 animate-spin text-text-neutral" />
          </div>
        )}
        {data?.slice(0, 5).map((tx, index) => {
          const isBuy = tx.type === "BUY";
          
          return (
            <div 
              key={tx.id} 
              className={`p-4 flex items-center ${index !== 0 ? 'border-t border-border' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 shrink-0 ${isBuy ? 'bg-[#A7EFDC] text-[#059A83]' : 'bg-[#D1E0DC] text-[#13342F]'}`}>
                {isBuy ? <Plus className="w-5 h-5" strokeWidth={3} /> : <Minus className="w-5 h-5" strokeWidth={3} />}
              </div>
              
              <div className="flex-1">
                <div className="text-[13px] font-bold text-text-default mb-0.5">
                  {isBuy ? 'Buy' : 'Sell'} {tx.name}
                </div>
                <div className="text-[11px] text-text-neutral">
                  {formatDate(tx.date)} • {tx.shares.toFixed(2)} Shares
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
