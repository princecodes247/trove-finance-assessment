import { Link, useLocation } from "react-router";
import { MdOutlineDashboard, MdOutlineAccountBalanceWallet, MdOutlineReceipt, MdOutlineReceiptLong, MdOutlineTrendingUp, MdOutlineSettings } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/api-client";
import { Button } from "../ui/button";
import { dashboardKeys } from "../../../lib/query-keys";

export function Sidebar() {
  const location = useLocation();
  
  const { data: user, isLoading } = useQuery({
    queryKey: dashboardKeys.user(),
    queryFn: apiClient.getUser
  });

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: MdOutlineDashboard },
    { name: "Portfolio", path: "/dashboard/portfolio", icon: MdOutlineAccountBalanceWallet },
    { name: "Transactions", path: "/dashboard/transactions", icon: MdOutlineReceiptLong },
    { name: "Markets", path: "/dashboard/markets", icon: MdOutlineTrendingUp },
    { name: "Settings", path: "/dashboard/settings", icon: MdOutlineSettings },
  ];

  return (
    <aside className="w-[260px] h-screen sticky top-0 overflow-y-auto bg-canvas border-r border-border hidden lg:flex flex-col">
      <div className="p-8 pb-10">
        <h1 className="text-xl font-extrabold text-primary">Trove</h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-1.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary-light text-text-neutral font-medium"
                  : "text-text-neutral hover:text-text-default font-medium hover:bg-default"
              }`}
            >
              <Icon className="w-[22px] h-[22px] mr-4" />
              <span className="text-[15px]">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 pt-0">
        <div className="w-full h-px bg-border mb-6" />
        <div className="flex items-center mb-5">
          <img
            src="https://i.pravatar.cc/150?u=adaeze"
            alt="Adaeze Okonkwo"
            className="w-10 h-10 rounded-full object-cover mr-3 border border-border"
          />
          <div className="flex flex-col space-y-2">
            {isLoading ? (
              <>
                <div className="h-3 w-24 bg-border rounded animate-pulse" />
                <div className="h-2 w-20 bg-border rounded animate-pulse" />
              </>
            ) : (
              <>
                <span className="text-[13px] font-bold text-text-default leading-tight">{user?.name}</span>
                <span className="text-[11px] text-text-disabled font-medium mt-0.5">Premium Member</span>
              </>
            )}
          </div>
        </div>
        <Button className="w-full">
          Add Funds
        </Button>
      </div>
    </aside>
  );
}
