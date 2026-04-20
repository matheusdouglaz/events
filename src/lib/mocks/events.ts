// src/lib/mocks/events.ts

import { DevEvent } from "../../types/event.types";

// Simulamos o retorno de uma API com os 3 cenários condicionais que precisamos testar na nossa tela.
export const mockEvents: DevEvent[] = [
  {
    id: "evt-001",
    title: "React Next.js Summit 2026",
    shortDescription: "Aprenda arquitetura de componentes e Server Actions na prática com os melhores profissionais.",
    date: "2026-05-20T09:00:00Z",
    location: "São Paulo, SP - Online",
    imageUrl: "/mock-react.webp", // Faremos de conta que essa imagem existe na pasta public
    status: "OPEN",
    registrationUrl: "https://inscricao.devevents.com/evt-001",
  },
  {
    id: "evt-002",
    title: "Hackathon FinTech 48h",
    shortDescription: "Crie a próxima solução financeira do mercado em um fim de semana intenso de muito código.",
    date: "2026-04-10T18:00:00Z",
    location: "Brasília, DF",
    imageUrl: "/mock-hackathon.webp",
    status: "SOLD_OUT",
  },
  {
    id: "evt-003",
    title: "Imersão Tailwind v4",
    shortDescription: "Revisão completa sobre as novas features zero-config do Tailwind CSS v4.",
    date: "2026-01-15T14:00:00Z",
    location: "100% Online",
    imageUrl: "/mock-tailwind.webp",
    status: "CLOSED", // Evento já passou
  }
];

/**
 * Simula uma busca no Banco de Dados pelo ID do evento.
 * O Pleno já faz a função ser 'async' para o front-end já nascer 
 * preparado para o futuro backend real.
 */
export async function getEventById(id: string): Promise<DevEvent | undefined> {
  // Simulamos um delay de 500ms (latência da internet)
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return mockEvents.find((event) => event.id === id);
}