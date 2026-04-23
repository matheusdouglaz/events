"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  isLoading?: boolean;
}

export function Button({ 
  children, 
  variant = "primary", 
  isLoading = false, 
  className = "", 
  ...props
}: ButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-200 px-6 py-3";
  
  const variants = {
    primary: "bg-purple-600 text-white hover:bg-purple-700 shadow-md",
    secondary: "bg-yellow-400 text-gray-900 hover:bg-yellow-500 shadow-md",
    outline: "border-2 border-purple-600 text-purple-600 hover:bg-purple-50",
  };

  const disabledStyles = (props.disabled || isLoading) 
    ? "opacity-50 cursor-not-allowed" 
    : "cursor-pointer";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading ? "Aguarde..." : children}
    </button>
  );
}