
import { EventCard } from "../components/features/events/EventCard";
import { prisma } from "../lib/prisma";
import { SearchBar } from "../components/features/events/SearchBar";
import { EventStatus } from "../types/event.types";

const VALID_STATUSES: EventStatus[] = ["OPEN", "SOLD_OUT", "CLOSED"];
const STATUS_LABELS: Record<"ALL" | EventStatus, string> = {
  ALL: "Todos",
  OPEN: "Abertos",
  SOLD_OUT: "Esgotados",
  CLOSED: "Encerrados",
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const params = await searchParams;
  const searchQuery = params.q || "";
  const selectedStatus = VALID_STATUSES.includes(params.status as EventStatus)
    ? (params.status as EventStatus)
    : "ALL";

  const events = await prisma.event.findMany({
    where: {
      title: {
        contains: searchQuery,
        mode: "insensitive",
      },
      ...(selectedStatus !== "ALL" ? { status: selectedStatus } : {}),
    },
    orderBy: {
      date: "asc",
    },
  });

  const statusPriority: Record<string, number> = {
    OPEN: 0,
    SOLD_OUT: 1,
    CLOSED: 2,
  };

  const sortedEvents = [...events].sort((a, b) => {
    const statusDiff =
      (statusPriority[a.status] ?? 99) - (statusPriority[b.status] ?? 99);
    if (statusDiff !== 0) return statusDiff;
    return +new Date(a.date) - +new Date(b.date);
  });

  return (
    <main className="min-h-screen flex flex-col pt-28 pb-12">
      <section className="w-full px-4">
        <div className="max-w-7xl mx-auto glass-panel neon-ring py-16 px-6 md:px-10 text-center futuristic-grid">
          <p className="inline-flex mb-4 border border-cyan-300/40 bg-cyan-300/10 px-4 py-1 text-xs tracking-[0.18em] text-cyan-100">
            NEXT-GEN DEV EVENTS
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-white">
            Descubra seu próximo <span className="text-cyan-300">Desafio</span>
          </h1>
          <p className="text-sm md:text-base text-slate-200/90 max-w-2xl mx-auto">
            Experiências imersivas, networking e tecnologia em um hub visual futurista.
          </p>
        </div>
      </section>

      <section className="grow w-full py-12 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold text-slate-100 uppercase tracking-wide">
            {searchQuery
              ? `Resultados para: "${searchQuery}"`
              : `Eventos em Destaque · ${STATUS_LABELS[selectedStatus]}`}
          </h2>
          
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedEvents.map((event) => (
             <EventCard key={event.id} event={event} />
          ))}
        </div>

        {sortedEvents.length === 0 && (
          <div className="text-center py-12 text-slate-300">
            Nenhum evento encontrado {searchQuery && `para "${searchQuery}"`}.
          </div>
        )}
      </section>
    </main>
  );
}