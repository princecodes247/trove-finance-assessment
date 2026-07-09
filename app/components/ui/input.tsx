import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", error, id, ...props }, ref) => {
    const errorId = id ? `${id}-error` : undefined;
    return (
      <div className="w-full">
        <input
          ref={ref}
          id={id}
          type={type}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          className={`w-full px-4 py-3 bg-default border rounded-lg text-[14px] text-text-default placeholder:text-text-disabled/80 focus:outline-none focus:bg-white transition-all font-medium ${
            error
              ? "border-negative focus:border-negative focus:ring-1 focus:ring-negative/45"
              : "border-gray-300 focus:border-border focus:ring-1 focus:ring-primary/40"
          } ${className}`}
          {...props}
        />
        {error && (
          <p id={errorId} role="alert" className="mt-1.5 text-[11px] font-medium text-negative">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
