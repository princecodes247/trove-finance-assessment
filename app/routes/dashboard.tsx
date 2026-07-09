import { NetWorthChart } from "../components/dashboard/net-worth-chart";
import { AssetAllocation } from "../components/dashboard/asset-allocation";
import { PortfolioCards } from "../components/dashboard/portfolio-cards";
import { HoldingsList } from "../components/dashboard/holdings-list";
import { TransactionsList } from "../components/dashboard/transactions-list";

export default function Dashboard() {
  return (
    <div className="flex flex-col space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <NetWorthChart />
        <AssetAllocation />
      </div>

      <PortfolioCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <HoldingsList />
        <TransactionsList />
      </div>
    </div>
  );
}
