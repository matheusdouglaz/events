import { SkeletonEventCard } from "../components/features/events/SkeletonEventCard";

export default function LoadingHome() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-24">

      <section className="w-full bg-purple-900 py-16 px-4">
         <div className="h-24 max-w-2xl mx-auto flex items-center justify-center">
            <div className="h-10 bg-purple-800 animate-pulse rounded w-3/4"></div>
         </div>
      </section>

      <section className="flex-grow w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="h-8 bg-gray-200 animate-pulse rounded w-64 mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkeletonEventCard />
          <SkeletonEventCard />
          <SkeletonEventCard />
        </div>
      </section>
    </main>
  );
}