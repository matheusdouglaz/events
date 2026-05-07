"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useClickOutside } from "../../../hooks/useClickOutside";


const LANGUAGES = [
  { code: "pt-BR", label: "PT" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("pt-BR");

  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div 
      ref={dropdownRef} 
      className="relative w-16"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-1 text-slate-100 hover:text-cyan-300 transition-colors px-3 py-1.5 uppercase text-sm font-medium border border-white/15 bg-white/5"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {LANGUAGES.find((l) => l.code === currentLang)?.label || "PT"}
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-full glass-panel border border-white/20 shadow-xl overflow-hidden z-50">
          <ul role="listbox">
            {LANGUAGES.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => {
                    setCurrentLang(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-center px-4 py-3 text-sm transition-colors ${
                    currentLang === lang.code
                      ? "bg-cyan-300/25 text-cyan-100 font-bold"
                      : "text-slate-100 hover:bg-cyan-300/10"
                  }`}
                >
                  {lang.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}