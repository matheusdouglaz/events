
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { NAV_ITEMS } from "./nav-data";

interface MobileNavProps {
  onClose: () => void;
}

export function MobileNav({ onClose }: MobileNavProps) {
  const pathname = usePathname();
  
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  return (
    <nav className="flex flex-col w-full">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        const hasSubItems = !!item.subItems;
        const isOpen = openMenu === item.label;

        return (
          <div key={item.label} className="border-b border-cyan-300/20 last:border-0">
            {hasSubItems ? (
              <div>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`flex items-center justify-between w-full py-4 text-left uppercase text-[15px] font-semibold tracking-wider transition-colors ${
                    isActive ? "text-cyan-300" : "text-slate-100"
                  }`}
                >
                  {item.label}
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                
                {isOpen && (
                  <div className="flex flex-col gap-1 pl-3 pb-4 animate-in fade-in slide-in-from-top-2 border-l border-cyan-300/40">
                    {item.subItems!.map((sub, index) => {
                      const isSubActive = pathname === sub.href;
                      return (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={onClose}
                        className={`flex items-center justify-between py-2.5 px-2 text-[14px] border border-transparent transition-colors ${
                          isSubActive
                            ? "bg-cyan-300/20 border-cyan-300/35 text-cyan-100"
                            : "text-slate-200 hover:text-cyan-200 hover:bg-cyan-300/12 hover:border-cyan-300/25"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-[10px] text-cyan-300/80">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{sub.label}</span>
                        </span>
                        <span className="text-cyan-300/90">+</span>
                      </Link>
                    );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href}
                onClick={onClose}
                className={`block w-full py-4 uppercase text-[15px] font-semibold tracking-wider transition-colors ${
                  isActive ? "text-cyan-300" : "text-slate-100"
                }`}
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}