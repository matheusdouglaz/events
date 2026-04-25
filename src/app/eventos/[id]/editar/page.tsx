// src/app/eventos/[id]/editar/page.tsx
import { prisma } from "../../../../lib/prisma";
import { notFound } from "next/navigation";
import { EventForm } from "../../../../components/features/events/EventForm";
import { updateEvent } from "../../../../actions/event.actions";
import Link from "next/link";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 1. Busca os dados atuais do evento no banco
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-24 pb-12">
      <section className="w-full px-4 max-w-3xl mx-auto">
        <Link href={`/eventos/${id}`} className="text-purple-600 hover:text-purple-800 flex items-center gap-2 mb-6 font-medium">
          &larr; Voltar para os detalhes
        </Link>
        
        {/* Chamamos o mesmo formulário, mas agora passando os dados iniciais e a Action de Atualizar */}
        <EventForm 
          action={updateEvent} 
          initialData={event} 
          eventId={event.id} 
        />
      </section>
    </main>
  );
}