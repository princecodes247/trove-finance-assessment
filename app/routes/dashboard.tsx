import { useState } from "react";
import { NetWorthChart } from "../components/dashboard/net-worth-chart";
import { AssetAllocation } from "../components/dashboard/asset-allocation";
import { PortfolioCards } from "../components/dashboard/portfolio-cards";
import { HoldingsList } from "../components/dashboard/holdings-list";
import { TransactionsList } from "../components/dashboard/transactions-list";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'holdings' | 'transactions'>('holdings');

  return (
    <div className="flex flex-col space-y-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <NetWorthChart />
        <AssetAllocation />
      </div>

      <PortfolioCards />

      <div className="lg:hidden flex space-x-1 bg-canvas border border-border p-1 rounded-lg">
        <button 
          onClick={() => setActiveTab('holdings')}
          className={`flex-1 py-2 text-[13px] font-bold rounded-md transition-colors ${activeTab === 'holdings' ? 'bg-surface border border-border text-text-default shadow-sm' : 'text-text-neutral hover:text-text-default hover:bg-surface/50'}`}
        >
          Holdings
        </button>
        <button 
          onClick={() => setActiveTab('transactions')}
          className={`flex-1 py-2 text-[13px] font-bold rounded-md transition-colors ${activeTab === 'transactions' ? 'bg-surface border border-border text-text-default shadow-sm' : 'text-text-neutral hover:text-text-default hover:bg-surface/50'}`}
        >
          Transactions
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={activeTab === 'holdings' ? 'block' : 'hidden lg:block'}>
          <HoldingsList />
        </div>
        <div className={activeTab === 'transactions' ? 'block' : 'hidden lg:block'}>
          <TransactionsList />
        </div>
      </div>
    </div>
  );
}
