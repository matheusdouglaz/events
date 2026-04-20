// src/app/page.tsx
import { EventCard } from "../components/features/events/EventCard";
import { prisma } from "../lib/prisma"; // Importamos o nosso Singleton

export default async function Home() {
  // 1. Buscamos TODOS os eventos direto no PostgreSQL
  // O Prisma já retorna os dados tipados!
  const events = await prisma.event.findMany({
    orderBy: {
      date: 'asc' // Ordena por data (mais próximos primeiro)
    }
  });

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-24">

      {/* Seção Hero - Mantemos igual */}
      <section className="w-full bg-purple-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Descubra seu próximo <span className="text-yellow-400">Desafio</span>
          </h1>
        </div>
      </section>

      {/* Lista de Eventos vinda do Banco */}
      <section className="flex-grow w-full py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 uppercase">
          Eventos em Destaque
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            // O Prisma retorna 'Date', e nossa tipagem antiga esperava 'string'.
            // O EventCard já faz 'new Date(event.date)', então ele vai funcionar.
            <EventCard key={event.id} event={event as any} />
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Nenhum evento cadastrado no banco de dados.
          </div>
        )}
      </section>
    </main>
  );
}