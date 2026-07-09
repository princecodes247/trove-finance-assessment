import { Search, Bell, HelpCircle } from "lucide-react";

export function Header() {
  return (
    <header className="bg-surface border-b border-border sticky top-0 z-30">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex justify-between items-center h-[76px] w-full">
        <div className="relative flex items-center flex-1 sm:flex-none mr-4">
        <Search className="absolute left-4 w-4 h-4 text-text-neutral" strokeWidth={2.5} />
        <input
          type="text"
          placeholder="Search stocks..."
          className="w-full sm:w-[320px] bg-default text-[14px] text-text-default placeholder:text-text-disabled rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      <div className="flex items-center space-x-4 sm:space-x-6 text-text-neutral shrink-0">
        <button className="hover:text-primary transition-colors relative">
          <Bell className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]" strokeWidth={2} />
        </button>
        <button className="hover:text-primary transition-colors">
          <HelpCircle className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]" strokeWidth={2} />
        </button>
      </div>
      </div>
    </header>
  );
}
