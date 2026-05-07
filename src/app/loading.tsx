import { SkeletonEventCard } from "../components/features/events/SkeletonEventCard";

export default function LoadingHome() {
  return (
    <main className="min-h-screen flex flex-col pt-28 pb-12">
      <section className="w-full px-4">
        <div className="max-w-7xl mx-auto glass-panel neon-ring py-16 px-6 md:px-10 text-center futuristic-grid">
          <div className="h-3 w-44 mx-auto bg-cyan-300/30 animate-pulse mb-5" />
          <div className="h-12 w-3/4 mx-auto bg-slate-200/20 animate-pulse mb-4" />
          <div className="h-4 w-1/2 mx-auto bg-slate-200/15 animate-pulse" />
        </div>
      </section>

      <section className="grow w-full py-12 px-4 max-w-7xl mx-auto">
        <div className="h-8 bg-slate-200/20 animate-pulse w-72 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkeletonEventCard />
          <SkeletonEventCard />
          <SkeletonEventCard />
        </div>
      </section>
    </main>
  );
}