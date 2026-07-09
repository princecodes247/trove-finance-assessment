import React from "react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={className}
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 400 400" 
      xmlSpace="preserve"
    >
      <rect width="400" height="400" fill="#059A83" rx="60" />
      <path fill="#FFFFFF" d="M 187, 77.5 Q 200, 70 213, 77.5 L 299.6, 127.5 Q 312.6, 135 312.6, 150 L 312.6, 250 Q 312.6, 265 299.6, 272.5 L 213, 322.5 Q 200, 330 187, 322.5 L 100.4, 272.5 Q 87.4, 265 87.4, 250 L 87.4, 150 Q 87.4, 135 100.4, 127.5 Z" />
      <path fill="#059A83" d="M 204, 117 L 276, 159 Q 280, 161 280, 165 L 280, 197 Q 280, 201 276, 199 L 226, 170 Q 221, 167 221, 177 L 221, 269 Q 221, 274 216, 274 L 184, 274 Q 179, 274 179, 269 L 179, 177 Q 179, 167 174, 170 L 124, 199 Q 120, 201 120, 197 L 120, 165 Q 120, 161 124, 159 L 196, 117 Q 200, 115 204, 117 Z" />
    </svg>
  );
}
