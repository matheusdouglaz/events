
"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { EventStatus } from "../../../types/event.types";

type StatusFilter = "ALL" | EventStatus;

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "ALL", label: "Todos" },
  { value: "OPEN", label: "Abertos" },
  { value: "SOLD_OUT", label: "Esgotados" },
  { value: "CLOSED", label: "Encerrados" },
];

export function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const term = searchParams.get("q")?.toString() ?? "";
  const status = (searchParams.get("status") as StatusFilter) ?? "ALL";
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, []);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const updateParams = (nextTerm: string, nextStatus: StatusFilter) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextTerm) params.set("q", nextTerm);
    else params.delete("q");

    if (nextStatus !== "ALL") params.set("status", nextStatus);
    else params.delete("status");

    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    updateParams(term, status);
  }, 300);

  const clearSearch = () => {
    updateParams("", status);
  };

  const handleStatusChange = (nextStatus: StatusFilter) => {
    updateParams(term, nextStatus);
  };

  return (
    <div className="w-full md:w-auto">
      <div className="flex w-full md:w-auto gap-2">
        <div className="relative w-full md:w-80">
        <input
          key={searchParams.toString()}
          ref={inputRef}
          type="text"
          className="w-full pl-10 pr-24 py-2.5 border border-cyan-300/20 bg-slate-950/50 text-slate-100 placeholder:text-slate-300/70 focus:ring-2 focus:ring-cyan-300/70 focus:border-cyan-300/50 outline-none transition-all backdrop-blur-md"
          placeholder="Buscar... (Ctrl+K)"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={term}
        />

        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-100/80"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        {term && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-semibold text-cyan-100 border border-cyan-200/30 bg-cyan-300/10 hover:bg-cyan-300/20 transition-colors"
            aria-label="Limpar busca"
          >
            LIMPAR
          </button>
        )}
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsStatusOpen((prev) => !prev)}
            className="w-40 py-2.5 pl-3 pr-9 border border-cyan-300/25 bg-slate-950/70 text-slate-100 text-left shadow-[0_0_16px_rgba(34,211,238,0.12)] focus:ring-2 focus:ring-cyan-300/70 focus:border-cyan-300/60 outline-none transition-all"
            aria-label="Filtrar status de eventos"
            aria-haspopup="listbox"
            aria-expanded={isStatusOpen}
          >
            {STATUS_OPTIONS.find((option) => option.value === status)?.label ?? "Todos"}
          </button>

          <svg
            className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)] transition-transform ${
              isStatusOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 8L10 13L15 8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>

          {isStatusOpen && (
            <div
              role="listbox"
              className="absolute z-20 mt-2 w-40 border border-cyan-300/30 bg-slate-950/95 backdrop-blur-xl shadow-[0_0_20px_rgba(34,211,238,0.18)]"
            >
              {STATUS_OPTIONS.map((option) => {
                const isActive = option.value === status;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      handleStatusChange(option.value);
                      setIsStatusOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-cyan-300/20 text-cyan-100"
                        : "text-slate-200 hover:bg-cyan-300/10 hover:text-cyan-100"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}