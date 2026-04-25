// src/app/eventos/novo/page.tsx
import { EventForm } from "../../../components/features/events/EventForm";
import { createEvent } from "../../../actions/event.actions";
import Link from "next/link";

export default function NewEventPage() {
  return (
    <main className="min-h-screen flex flex-col pt-28 pb-12">
      <section className="w-full px-4 max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-6 font-medium text-cyan-200 hover:text-cyan-100 transition-colors"
        >
          &larr; Voltar
        </Link>
        
        {/* Chamamos o nosso componente passando a Action de Criar */}
        <EventForm action={createEvent} />
      </section>
    </main>
  );
}