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
      className="relative"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-white hover:text-yellow-400 transition-colors px-2 py-1 uppercase text-sm font-medium"
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
        <div className="absolute top-full right-0 mt-2 w-20 bg-purple-900 border border-purple-700 rounded-md shadow-xl overflow-hidden z-50">
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
                      ? "bg-yellow-400 text-purple-900 font-bold"
                      : "text-white hover:bg-purple-800"
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