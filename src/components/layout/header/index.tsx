
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu as MenuIcon, X } from "lucide-react";
import { useScroll } from "../../../hooks/useScroll";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export default function Header() {
  const isScrolled = useScroll(50);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 overflow-visible transition-all duration-300 ease-in-out ${
        isScrolled 
          ? "py-3 bg-slate-950/70 backdrop-blur-xl" 
          : "py-5 bg-slate-950/45 backdrop-blur-lg"
      }`}
    >
      <div className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        <Link 
          href="/" 
          className="text-white font-bold text-2xl tracking-wider transition-transform hover:scale-105 drop-shadow-[0_0_14px_rgba(34,211,238,0.35)]"
        >
          DEV<span className="text-cyan-300">EVENTS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <DesktopNav />
          <LanguageSwitcher />
        </div>

        <button
          className="md:hidden text-white hover:text-cyan-300 transition-colors"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Abrir menu"
        >
          {isMobileOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-0 z-40 h-dvh bg-slate-950 border-t border-cyan-300/20 shadow-2xl overflow-y-auto">
          <div className="px-4 pt-24 pb-6 flex flex-col gap-4 min-h-full">
             <MobileNav onClose={() => setIsMobileOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}