// src/app/eventos/[id]/page.tsx
import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../../components/ui/Button";
import { deleteEvent } from "../../../actions/event.actions";

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
    OPEN:
      "status-dot status-dot-open bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.75)]",
    CLOSED:
      "status-dot status-dot-closed bg-slate-300 shadow-[0_0_10px_rgba(203,213,225,0.65)]",
    SOLD_OUT:
      "status-dot status-dot-sold bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.75)]",
  };

  const statusLabels = {
    OPEN: "Aberto",
    CLOSED: "Encerrado",
    SOLD_OUT: "Lotado",
  };

  return (
    <main className="min-h-screen pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Botão de Voltar */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-6 font-medium text-cyan-200 hover:text-cyan-100 transition-colors"
        >
          &larr; Voltar para os eventos
        </Link>

        <article className="glass-panel shadow-2xl overflow-hidden border border-white/20">
          {/* Imagem de Capa Gigante */}
          <div className="relative w-full h-64 md:h-96 bg-slate-900">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="object-cover saturate-110"
              priority // Essa imagem é importante, carrega rápido!
            />
          </div>

          {/* Conteúdo do Evento */}
          <div className="p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="inline-flex items-center">
                <span
                  className={`h-3 w-3 ${statusColors[event.status as keyof typeof statusColors]}`}
                  aria-label={statusLabels[event.status as keyof typeof statusLabels]}
                  title={statusLabels[event.status as keyof typeof statusLabels]}
                />
              </span>
              <span className="text-slate-300 font-medium">
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

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-100 mb-6 leading-tight">
              {event.title}
            </h1>

            <div className="flex items-center gap-2 text-slate-300 mb-8 font-medium">
              <svg
                className="w-6 h-6 text-cyan-300"
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

            <div className="prose prose-lg prose-invert text-slate-200 max-w-none mb-12">
              <p>{event.shortDescription}</p>
            </div>

            {/* Ações do Evento */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center gap-4">
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
                  className="w-full md:w-auto px-6 py-4 text-rose-200 border-rose-300/40 hover:bg-rose-500/15 hover:border-rose-300/60"
                >
                  Excluir Evento
                </Button>
              </form>

              <Link
                href={`/eventos/${event.id}/editar`}
                className="w-full md:w-auto inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-300 px-6 py-4 border border-cyan-200/30 bg-cyan-300/10 text-cyan-100 hover:bg-cyan-300/20 hover:border-cyan-200/50"
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
