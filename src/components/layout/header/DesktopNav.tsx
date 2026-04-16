// src/components/layout/header/DesktopNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { NAV_ITEMS } from "./nav-data";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-8">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <li key={item.label} className="relative group py-4">
              <Link
                href={item.href}
                className={`flex items-center gap-1 text-sm font-semibold uppercase tracking-wider transition-colors pb-1 ${
                  isActive ? "text-yellow-400" : "text-white group-hover:text-yellow-400"
                }`}
              >
                {item.label}
                {item.subItems && (
                  <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                )}

                <span
                  className={`absolute bottom-2 left-1/2 -translate-x-1/2 h-[3px] bg-yellow-400 transition-all duration-300 ${
                    isActive ? "w-[80%]" : "w-0 group-hover:w-[80%]"
                  }`}
                />
              </Link>

              {item.subItems && (
                <div className="absolute top-full left-0 mt-0 w-56 opacity-0 invisible translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-50">
                  <div className="bg-purple-900 border border-purple-700 rounded-md shadow-xl py-2 flex flex-col">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="px-4 py-2 text-sm text-white hover:bg-yellow-400 hover:text-purple-900 transition-colors font-medium"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}