// src/app/eventos/[id]/page.tsx
import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../../components/ui/Button";
import { deleteEvent, updateEvent } from "../../../actions/event.actions";

// 1. A página recebe os "params" da URL (ex: params.id)
export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // No Next.js 15, params é uma Promise, então precisamos do await
  const { id } = await params;

  // 2. Buscamos o evento específico no banco de dados usando o ID da URL
  const event = await prisma.event.findUnique({
    where: {
      id: id,
    },
  });

  // 3. E se o usuário digitar um ID que não existe na URL?
  // O Next.js tem uma função nativa maravilhosa para isso:
  if (!event) {
    notFound(); // Redireciona automaticamente para uma página 404
  }

  // 4. Dicionário de Cores para o Status (Lembra dele?)
  const statusColors = {
    OPEN: "bg-green-100 text-green-800",
    CLOSED: "bg-gray-100 text-gray-800",
    SOLD_OUT: "bg-red-100 text-red-800",
  };

  const statusLabels = {
    OPEN: "Inscrições Abertas",
    CLOSED: "Encerrado",
    SOLD_OUT: "Esgotado",
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Botão de Voltar */}
        <Link
          href="/"
          className="text-purple-600 hover:text-purple-800 flex items-center gap-2 mb-6 font-medium transition-colors"
        >
          &larr; Voltar para os eventos
        </Link>

        <article className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Imagem de Capa Gigante */}
          <div className="relative w-full h-64 md:h-96 bg-gray-200">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover"
              priority // Essa imagem é importante, carrega rápido!
            />
          </div>

          {/* Conteúdo do Evento */}
          <div className="p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${statusColors[event.status as keyof typeof statusColors]}`}
              >
                {statusLabels[event.status as keyof typeof statusLabels]}
              </span>
              <span className="text-gray-500 font-medium">
                {event.date.toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {event.title}
            </h1>

            <div className="flex items-center gap-2 text-gray-600 mb-8 font-medium">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-lg">{event.location}</span>
            </div>

            <div className="prose prose-lg text-gray-700 max-w-none mb-12">
              <p>{event.shortDescription}</p>
            </div>

            {/* Ações do Evento */}
            <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center gap-4">
              {/* Botão de Inscrição (Mantido) */}
              <Button
                variant="primary"
                className="w-full md:w-auto px-12 py-4 text-lg"
                disabled={event.status !== "OPEN"}
              >
                {event.status === "OPEN"
                  ? "Garantir minha vaga"
                  : "Inscrições Indisponíveis"}
              </Button>

              {/* Botão de Deletar usando Form nativo e input escondido */}
              <form action={deleteEvent} className="w-full md:w-auto">
                <input type="hidden" name="id" value={event.id} />

                <Button
                  type="submit"
                  variant="outline"
                  className="w-full md:w-auto px-6 py-4 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                >
                  Excluir Evento
                </Button>
              </form>

              <Link
                href={`/eventos/${event.id}/editar`}
                className="w-full md:w-auto inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-200 px-6 py-4 border-2 border-yellow-200 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-300"
              >
                Editar Evento
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
