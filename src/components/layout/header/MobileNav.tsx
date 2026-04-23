
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
          <div key={item.label} className="border-b border-purple-800/50 last:border-0">
            {hasSubItems ? (
              <div>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`flex items-center justify-between w-full py-4 text-left uppercase text-[15px] font-semibold tracking-wider transition-colors ${
                    isActive ? "text-yellow-400" : "text-white"
                  }`}
                >
                  {item.label}
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                
                {isOpen && (
                  <div className="flex flex-col gap-2 pl-4 pb-4 animate-in fade-in slide-in-from-top-2">
                    {item.subItems!.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={onClose}
                        className="py-2 text-[14px] text-white/70 hover:text-yellow-400 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href}
                onClick={onClose}
                className={`block w-full py-4 uppercase text-[15px] font-semibold tracking-wider transition-colors ${
                  isActive ? "text-yellow-400" : "text-white"
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