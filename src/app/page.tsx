
import { EventCard } from "../components/features/events/EventCard";
import { prisma } from "../lib/prisma";
import { SearchBar } from "../components/features/events/SearchBar";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const searchQuery = params.q || "";

  const events = await prisma.event.findMany({
    where: {
      title: {
        contains: searchQuery,
        mode: "insensitive",
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-24">
      <section className="w-full bg-purple-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Descubra seu próximo <span className="text-yellow-400">Desafio</span>
          </h1>
        </div>
      </section>

      <section className="flex-grow w-full py-12 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-800 uppercase">
            {searchQuery ? `Resultados para: "${searchQuery}"` : "Eventos em Destaque"}
          </h2>
          
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
             <EventCard key={event.id} event={event as any} />
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Nenhum evento encontrado {searchQuery && `para "${searchQuery}"`}.
          </div>
        )}
      </section>
    </main>
  );
}