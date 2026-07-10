import * as React from "react";
import { MdOutlineSearch } from "react-icons/md";
import { cn } from "~/../lib/utils";

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, containerClassName, ...props }, ref) => {
    return (
      <div className={cn("relative flex items-center w-full", containerClassName)}>
        <MdOutlineSearch className="absolute left-4 w-4 h-4 text-text-neutral z-20" />
        <input
          ref={ref}
          className={cn(
            "w-full border border-border bg-default text-[14px] text-text-default placeholder:text-text-disabled rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:ring-1 focus:ring-primary transition-all relative z-10",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
