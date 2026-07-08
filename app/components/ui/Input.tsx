import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, id, className = "", ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-[12px] font-medium text-text-neutral mb-1.5">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          className={`appearance-none block w-full px-3 py-2 border border-border bg-default rounded-lg shadow-sm placeholder:text-text-disabled text-text-default focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-[14px] ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}
