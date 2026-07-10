import { useState, useCallback } from "react";
import { SearchInput } from "~/components/ui/search-input";
import { mockStocks } from "~/../lib/data/mock-stocks";
import { useClickOutside } from "~/../lib/hooks/use-click-outside";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchRef = useClickOutside<HTMLDivElement>(
    useCallback(() => setIsSearchFocused(false), [])
  );

  const filteredStocks = mockStocks.filter(
    (s) =>
      s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative flex items-center flex-1 sm:flex-none mr-4 md:h-full md:py-3" ref={searchRef}>
      <SearchInput
        placeholder="Search stocks..."
        onSearch={setSearchQuery}
        onFocus={() => setIsSearchFocused(true)}
        className="sm:w-[320px] md:h-full"
        containerClassName="md:h-full"
      />
      
      {isSearchFocused && searchQuery && (
        <div className="absolute top-full left-0 -mt-1 w-full sm:w-[320px] bg-surface border border-border rounded-xl shadow-lg overflow-hidden z-50">
          {filteredStocks.length > 0 ? (
            <ul className="max-h-[300px] overflow-y-auto py-2">
              {filteredStocks.map((stock) => (
                <li key={stock.symbol}>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-default transition-colors flex justify-between items-center"
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchFocused(false);
                    }}
                  >
                    <span className="font-semibold text-text-default text-sm">{stock.symbol}</span>
                    <span className="text-text-neutral text-xs truncate max-w-[150px]">{stock.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-text-neutral">
              No stocks found for "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
