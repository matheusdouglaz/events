// src/app/page.tsx
import { mockEvents } from "../lib/mocks/events";
import { EventCard } from "../components/features/events/EventCard";
// Se o seu Header (Orquestrador) não estiver no layout.tsx global, 
// podemos importá-mo aqui para a Home:
import Header from "../components/layout/header";

export default function Home() {
  // Como estamos simulando o Next.js moderno (Server Components), 
  // no futuro é aqui mesmo que faremos o "await fetch('api/events')" 
  // sem precisar de useEffect! Por enquanto, usamos o mock.
  const events = mockEvents;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-24">
      {/* O nosso Header que construímos ontem! */}
      <Header />

      {/* Seção Hero (Boas-vindas) */}
      <section className="w-full bg-purple-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Descubra seu próximo <span className="text-yellow-400">Desafio</span>
          </h1>
          <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto">
            Acompanhe os melhores eventos, hackathons e workshops de tecnologia do mercado.
          </p>
        </div>
      </section>

      {/* Seção da Lista de Eventos */}
      <section className="flex-grow w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
            Eventos em Destaque
          </h2>
          {/* Futuramente, aqui poderia ir um botão de 'Ver todos' ou Filtros */}
        </div>

        {/* A Mágica da Responsividade sem duplicar código (Adeus duplicidade do CTA Calendar!)
          - grid-cols-1: 1 coluna no celular (padrão)
          - md:grid-cols-2: 2 colunas no tablet
          - lg:grid-cols-3: 3 colunas em telas grandes
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Feedback visual caso a lista esteja vazia (Sempre prever Edge Cases!) */}
        {events.length === 0 && (
          <div className="w-full text-center py-12 text-gray-500">
            Nenhum evento encontrado no momento.
          </div>
        )}
      </section>
    </main>
  );
}