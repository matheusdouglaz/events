
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
  
  const baseStyles = "inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-300 px-6 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";
  
  const variants = {
    primary:
      "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-[0_0_22px_rgba(34,211,238,0.28)] hover:brightness-110 hover:-translate-y-0.5",
    secondary:
      "bg-gradient-to-r from-amber-300 to-amber-500 text-slate-950 shadow-[0_0_18px_rgba(251,191,36,0.35)] hover:brightness-105 hover:-translate-y-0.5",
    outline:
      "border border-white/20 bg-white/5 text-cyan-100 hover:bg-white/10 hover:border-cyan-200/40",
  };

  const disabledStyles = (props.disabled || isLoading) 
    ? "opacity-50" 
    : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 border border-cyan-100/70 border-r-transparent animate-spin" />
          Processando
        </span>
      ) : (
        children
      )}
    </button>
  );
}