import { MdOutlineNotifications, MdOutlineHelpOutline } from "react-icons/md";
import { SearchBar } from "./search-bar";

export function Header() {
  return (
    <header className="bg-surface border-b border-border sticky top-0 z-30">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex justify-between items-center h-[76px] w-full">
        
        <SearchBar />

        <div className="flex items-center space-x-4 sm:space-x-6 text-text-neutral shrink-0">
          <button 
            className="hover:text-primary transition-colors relative"
            title="Notifications"
          >
            <MdOutlineNotifications className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-surface animate-pulse" />
          </button>
          <button 
            className="hover:text-primary transition-colors"
            title="Help & Resources"
          >
            <MdOutlineHelpOutline className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]" />
          </button>
        </div>
      </div>
    </header>
  );
}
