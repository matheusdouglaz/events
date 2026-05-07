
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
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
                  isActive ? "text-cyan-300" : "text-slate-100 group-hover:text-cyan-300"
                }`}
              >
                {item.label}
                {item.subItems && (
                  <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                )}

                <span
                  className={`absolute bottom-2 left-1/2 -translate-x-1/2 h-[2px] bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all duration-300 ${
                    isActive ? "w-[80%]" : "w-0 group-hover:w-[80%]"
                  }`}
                />
              </Link>

              {item.subItems && (
                <div className="absolute top-full left-0 mt-1 w-80 opacity-0 invisible translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-50">
                  <div className="glass-panel border border-cyan-300/20 shadow-[0_0_24px_rgba(34,211,238,0.12)] p-2">
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-200/80">
                        Navegue por categorias
                      </p>
                    </div>
                    {item.subItems.map((sub, index) => {
                      const isSubActive = pathname === sub.href;
                      return (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className={`group/item flex items-center justify-between px-3 py-2 border border-transparent transition-colors ${
                          isSubActive
                            ? "bg-cyan-300/18 border-cyan-300/25 text-cyan-100"
                            : "text-slate-200 hover:bg-cyan-300/10 hover:border-cyan-300/20 hover:text-cyan-100"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-[10px] text-cyan-300/80">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm font-medium">{sub.label}</span>
                        </span>
                        <ChevronRight size={14} className="text-cyan-300/80 transition-transform group-hover/item:translate-x-0.5" />
                      </Link>
                    );
                    })}
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