import { Search, Bell, HelpCircle } from "lucide-react";

export function Header() {
  return (
    <header className="bg-surface border-b border-border px-8 py-4 flex justify-between items-center h-[76px]">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-4 h-4 text-text-neutral" strokeWidth={2.5} />
        <input
          type="text"
          placeholder="Search stocks, crypto..."
          className="w-[320px] bg-default text-[14px] text-text-default placeholder:text-text-disabled rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      <div className="flex items-center space-x-6 text-text-neutral">
        <button className="hover:text-primary transition-colors relative">
          <Bell className="w-[22px] h-[22px]" strokeWidth={2} />
        </button>
        <button className="hover:text-primary transition-colors">
          <HelpCircle className="w-[22px] h-[22px]" strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
