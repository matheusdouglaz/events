
"use client";

import Image from "next/image";
import Link from "next/link";
import { DevEvent, EventStatus } from "../../../types/event.types";
import { Button } from "../../ui/Button";

interface EventCardProps {
  event: DevEvent;
}

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
    isDisabled: false,
    opacityClass: "opacity-75 grayscale-[50%]",
  },
};

export function EventCard({ event }: EventCardProps) {
  const config = STATUS_CONFIG[event.status];

  return (
    <div className={`flex flex-col bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${config.opacityClass}`}>

      <div className="relative w-full h-48 bg-gray-200">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold uppercase rounded-full shadow-sm ${config.badgeColor}`}>
          {config.badgeText}
        </div>
      </div>

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

        <div className="flex flex-col gap-1 mt-auto pt-4 border-t border-gray-100">
          <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">
            {new Date(event.date).toLocaleDateString('pt-BR')}
          </span>
          <span className="text-sm text-gray-500">
            {event.location}
          </span>
        </div>

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