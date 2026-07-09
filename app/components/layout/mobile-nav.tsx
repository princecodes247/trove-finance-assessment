import { Link, useLocation } from "react-router";
import { LayoutGrid, Wallet, ReceiptText, TrendingUp, Settings } from "lucide-react";

export function MobileNav() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutGrid },
    { name: "Portfolio", path: "/dashboard/portfolio", icon: Wallet },
    { name: "Orders", path: "/dashboard/transactions", icon: ReceiptText },
    { name: "Markets", path: "/dashboard/markets", icon: TrendingUp },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-surface border-t border-border flex lg:hidden justify-around items-center h-20 px-2 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive
                ? "text-primary"
                : "text-text-disabled hover:text-text-neutral"
            }`}
          >
            <Icon className="w-[22px] h-[22px]" strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
