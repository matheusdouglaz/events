

export function SkeletonEventCard() {
  return (
    <div className="flex flex-col glass-panel border border-white/15 shadow-[0_10px_30px_rgba(2,6,23,0.5)] overflow-hidden animate-pulse h-[380px]">
      <div className="w-full h-48 bg-slate-200/20"></div>

      <div className="flex flex-col grow p-6 gap-4">
        <div className="space-y-3">
          <div className="h-6 bg-slate-200/20 w-3/4"></div>
          <div className="h-4 bg-slate-200/20 w-full"></div>
          <div className="h-4 bg-slate-200/20 w-5/6"></div>
        </div>

        <div className="mt-auto pt-4 border-t border-white/10 space-y-2">
          <div className="h-3 bg-slate-200/20 w-1/4"></div>
          <div className="h-4 bg-slate-200/20 w-1/2"></div>
        </div>

        <div className="w-full h-12 bg-cyan-300/20 border border-cyan-300/25 mt-2"></div>
      </div>
    </div>
  );
}