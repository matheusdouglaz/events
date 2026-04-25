
"use client";

import Image from "next/image";
import Link from "next/link";
import { EventStatus } from "../../../types/event.types";
import { Button } from "../../ui/Button";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    shortDescription: string;
    date: string | Date;
    location: string;
    imageUrl: string;
    status: string;
    registrationUrl?: string | null;
  };
}

const STATUS_CONFIG: Record<EventStatus, {
  buttonText: string;
  buttonVariant: "primary" | "secondary" | "outline";
  statusDotClass: string;
  isDisabled: boolean;
  opacityClass: string;
}> = {
  OPEN: {
    buttonText: "Garantir Vaga",
    buttonVariant: "primary",
    statusDotClass:
      "status-dot status-dot-open bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.75)]",
    isDisabled: false,
    opacityClass: "opacity-100",
  },
  SOLD_OUT: {
    buttonText: "Esgotado",
    buttonVariant: "secondary",
    statusDotClass:
      "status-dot status-dot-sold bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.75)]",
    isDisabled: true,
    opacityClass: "opacity-70",
  },
  CLOSED: {
    buttonText: "Ver Resumo",
    buttonVariant: "outline",
    statusDotClass:
      "status-dot status-dot-closed bg-slate-300 shadow-[0_0_10px_rgba(203,213,225,0.65)]",
    isDisabled: false,
    opacityClass: "opacity-75 grayscale-[50%]",
  },
};

export function EventCard({ event }: EventCardProps) {
  const normalizedStatus: EventStatus =
    event.status in STATUS_CONFIG
      ? (event.status as EventStatus)
      : "CLOSED";
  const config = STATUS_CONFIG[normalizedStatus];

  return (
    <div className={`flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 glass-panel border border-white/15 shadow-[0_10px_30px_rgba(2,6,23,0.5)] ${config.opacityClass}`}>

      <div className="relative w-full h-48 bg-slate-900">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover saturate-110"
        />
        <div className="absolute top-4 right-4 flex items-center">
          <span
            className={`h-3 w-3 ${config.statusDotClass}`}
            aria-label={normalizedStatus}
            title={normalizedStatus}
          />
        </div>
      </div>

      <div className="flex flex-col grow p-6 gap-4">
        <div>
          <Link href={`/eventos/${event.id}`} className="group block">
            <h3 className="text-xl font-bold text-slate-100 mb-2 leading-tight transition-colors duration-200 group-hover:text-cyan-300">
              {event.title}
            </h3>
          </Link>
          <p className="text-sm text-slate-300 line-clamp-2">
            {event.shortDescription}
          </p>
        </div>

        <div className="flex flex-col gap-1 mt-auto pt-4 border-t border-white/10">
          <span className="text-xs font-semibold text-cyan-200 uppercase tracking-wider">
            {new Date(event.date).toLocaleDateString("pt-BR")}
          </span>
          <span className="text-sm text-slate-300/85">
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