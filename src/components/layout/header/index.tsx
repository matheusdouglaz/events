
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? "bg-purple-900 shadow-lg py-3" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        <Link 
          href="/" 
          className="text-white font-bold text-2xl tracking-wider transition-transform hover:scale-105"
        >
          DEV<span className="text-yellow-400">EVENTS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <DesktopNav />
          <LanguageSwitcher />
        </div>

        <button
          className="md:hidden text-white hover:text-yellow-400 transition-colors"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Abrir menu"
        >
          {isMobileOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-purple-950 shadow-xl border-t border-purple-800">
          <div className="px-4 py-6 flex flex-col gap-4">
             <MobileNav onClose={() => setIsMobileOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}