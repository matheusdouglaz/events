// src/components/features/events/EventCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { DevEvent, EventStatus } from "../../../types/event.types";
import { Button } from "../../ui/Button"; // Nosso átomo do Dia 1!

interface EventCardProps {
  event: DevEvent;
}

// 1. O SEU OBJETO DE CONFIGURAÇÃO! (Dictionary Pattern)
// Retiramos isso de dentro do componente para não ser recriado a cada renderização.
const STATUS_CONFIG: Record<EventStatus, {
  buttonText: string;
  buttonVariant: "primary" | "secondary" | "outline";
  badgeText: string;
  badgeColor: string;
  isDisabled: boolean;
  opacityClass: string;
}> = {
  OPEN: {
    buttonText: "Garantir Vaga",
    buttonVariant: "primary",
    badgeText: "Inscrições Abertas",
    badgeColor: "bg-green-500 text-white",
    isDisabled: false,
    opacityClass: "opacity-100",
  },
  SOLD_OUT: {
    buttonText: "Esgotado",
    buttonVariant: "secondary",
    badgeText: "Vagas Esgotadas",
    badgeColor: "bg-red-500 text-white",
    isDisabled: true,
    opacityClass: "opacity-100",
  },
  CLOSED: {
    buttonText: "Ver Resumo",
    buttonVariant: "outline",
    badgeText: "Evento Encerrado",
    badgeColor: "bg-gray-500 text-white",
    isDisabled: false, // Falso porque ele ainda pode clicar para ver as fotos/resumo
    opacityClass: "opacity-75 grayscale-[50%]", // O evento já passou, deixamos meio apagado
  },
};

export function EventCard({ event }: EventCardProps) {
  // 2. A Mágica do Mapeamento (O(1) de complexidade)
  // Pegamos todas as configurações daquele status específico com apenas UMA linha.
  const config = STATUS_CONFIG[event.status];

  // 3. O componente fica extremamente limpo e "burro", apenas desenhando a tela.
  return (
    <div className={`flex flex-col bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${config.opacityClass}`}>

      {/* Imagem do Evento */}
      <div className="relative w-full h-48 bg-gray-200">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover"
        />
        {/* Badge condicional flutuando na imagem */}
        <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold uppercase rounded-full shadow-sm ${config.badgeColor}`}>
          {config.badgeText}
        </div>
      </div>

      {/* Corpo do Card */}
      <div className="flex flex-col flex-grow p-6 gap-4">
        <div>
          <Link href={`/eventos/${event.id}`} className="hover:underline decoration-purple-600 underline-offset-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
              {event.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 line-clamp-2">
            {event.shortDescription}
          </p>
        </div>

        {/* Metadados (Data e Local) */}
        <div className="flex flex-col gap-1 mt-auto pt-4 border-t border-gray-100">
          <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">
            {/* Em um projeto real, formataríamos essa data com Date-fns ou Intl.DateTimeFormat */}
            {new Date(event.date).toLocaleDateString('pt-BR')}
          </span>
          <span className="text-sm text-gray-500">
            {event.location}
          </span>
        </div>

        {/* Botão Condicional (Reutilizando nosso Átomo) */}
        <Button
          variant={config.buttonVariant}
          disabled={config.isDisabled}
          className="w-full mt-2"
          onClick={() => {
            if (event.registrationUrl) {
              window.open(event.registrationUrl, '_blank');
            }
          }}
        >
          {config.buttonText}
        </Button>
      </div>
    </div>
  );
}