import { Link, useLocation } from "react-router";
import { LayoutGrid, Wallet, ReceiptText, TrendingUp, Settings } from "lucide-react";
import { Button } from "../ui/Button";

export function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutGrid },
    { name: "Portfolio", path: "/portfolio", icon: Wallet },
    { name: "Transactions", path: "/transactions", icon: ReceiptText },
    { name: "Markets", path: "/markets", icon: TrendingUp },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-[260px] bg-canvas border-r border-border flex flex-col hidden sm:flex">
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
              <Icon className="w-[18px] h-[18px] mr-4" strokeWidth={isActive ? 2.5 : 2} />
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
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-text-default leading-tight">Adaeze Okonkwo</span>
            <span className="text-[11px] text-text-disabled font-medium mt-0.5">Premium Member</span>
          </div>
        </div>
        <Button className="w-full">
          Add Funds
        </Button>
      </div>
    </aside>
  );
}
