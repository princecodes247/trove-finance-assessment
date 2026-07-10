import { useState } from "react";
import { MdOutlineAdd, MdOutlineRemove, MdOutlineSync } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/api-client";
import { dashboardKeys } from "../../../lib/query-keys";
import { formatDeterministicFullDate, formatPrice } from "../../../lib/data/utils";
import type { ITransaction, TransactionStatus } from "../../../lib/types";

function TransactionStatusBadge({ status }: { status: TransactionStatus }) {
  switch (status) {
    case "COMPLETED":
      return <span className="bg-primary-light text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Completed</span>;
    case "PENDING":
      return (
        <span className="flex items-center gap-1 bg-cream/40 text-amber-500/90 text-[10px] font-bold pl-1.5 pr-2 py-0.5 rounded-full uppercase">
          <MdOutlineSync className="w-3 h-3 animate-spin" />
          Pending
        </span>
      );
    case "FAILED":
      return <span className="bg-negative/10 text-negative text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Failed</span>;
    default:
      return null;
  }
}

function TransactionSkeletonItem({ showBorder }: { showBorder: boolean }) {
  return (
    <div className={`p-4 flex items-center ${showBorder ? 'border-t border-border' : ''} animate-pulse`}>
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
  );
}

interface TransactionItemProps {
  tx: ITransaction;
  showBorder: boolean;
}

function TransactionItem({ tx, showBorder }: TransactionItemProps) {
  const isBuy = tx.type === "BUY";
  const isPending = tx.status === "PENDING";

  return (
    <div className={`p-4 flex items-center ${showBorder ? 'border-t border-border' : ''} ${isPending ? 'opacity-60 hover:opacity-100 transition-opacity' : ''}`}>
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
          {formatPrice(tx.totalAmount, isBuy ? '-' : '+')}
        </div>
        <TransactionStatusBadge status={tx.status} />
      </div>
    </div>
  );
}

function TransactionsError() {
  return (
    <div className="flex flex-col h-full bg-surface border border-border rounded-xl p-6 shadow-sm justify-center items-center min-h-[300px]">
      <p className="text-negative font-semibold mb-2">Failed to load transactions</p>
      <p className="text-text-neutral text-[13px]">Please check your connection and try again.</p>
    </div>
  );
}

export function TransactionsList() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Buy" | "Sell">("All");
  const [isExpanded, setIsExpanded] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: dashboardKeys.transactions(),
    queryFn: apiClient.getTransactions
  });

  const filteredData = data?.filter((tx) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Buy") return tx.type === "BUY";
    if (activeFilter === "Sell") return tx.type === "SELL";
    return true;
  });

  if (isError) {
    return <TransactionsError />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end lg:justify-between items-end mb-4">
        <h3 className="hidden lg:block text-[16px] font-bold text-text-default">Recent Transactions</h3>
        {filteredData && filteredData.length > 5 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[12px] font-bold text-primary hover:text-primary/80 transition-colors"
          >
            {isExpanded ? "Collapse" : "View All"}
          </button>
        )}
      </div>

      <div className="flex gap-2 mb-4">
        {["All", "Buy", "Sell"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter as any)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors border ${
              activeFilter === filter
                ? 'bg-primary text-white border-primary'
                : 'bg-canvas border-border text-text-neutral hover:border-text-neutral hover:text-text-default'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm flex flex-col">
        {isLoading && (
          <>
            {Array.from({ length: 3 }, (_, index) => (
              <TransactionSkeletonItem key={index} showBorder={index !== 0} />
            ))}
          </>
        )}
        {!isLoading && filteredData?.length === 0 && (
          <div className="p-8 text-center text-text-neutral text-[13px]">
            No transactions found.
          </div>
        )}
        {(isExpanded ? filteredData : filteredData?.slice(0, 5))?.map((tx, index) => (
          <TransactionItem key={tx.id} tx={tx} showBorder={index !== 0} />
        ))}
        {filteredData && filteredData.length > 5 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-3 text-[13px] font-bold text-primary hover:text-primary/80 hover:bg-primary/5 transition-colors border-t border-border rounded-b-xl"
          >
            {isExpanded ? "Collapse" : "View All Transactions"}
          </button>
        )}
      </div>
    </div>
  );
}
