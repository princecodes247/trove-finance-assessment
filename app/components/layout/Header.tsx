import { Search, Bell, HelpCircle } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center h-[76px]">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-4 h-4 text-gray-400" strokeWidth={2.5} />
        <input
          type="text"
          placeholder="Search stocks, crypto..."
          className="w-[320px] bg-[#f4f7f5] text-[14px] text-gray-700 placeholder:text-gray-500 rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:ring-1 focus:ring-[#066b59] transition-all"
        />
      </div>

      <div className="flex items-center space-x-6 text-[#5b6a65]">
        <button className="hover:text-[#066b59] transition-colors relative">
          <Bell className="w-[22px] h-[22px]" strokeWidth={2} />
        </button>
        <button className="hover:text-[#066b59] transition-colors">
          <HelpCircle className="w-[22px] h-[22px]" strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
