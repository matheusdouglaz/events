// src/app/api/events/route.ts
import { NextResponse } from "next/server";
import { mockEvents } from "../../../lib/mocks/events";

/**
 * Função GET: Responde a requisições HTTP do tipo GET 
 * (quando alguém acessa ou "puxa" dados dessa URL).
 */
export async function GET() {
  try {
    // 1. Aqui entraríamos no Banco de Dados. 
    // Ex: const events = await prisma.event.findMany();
    
    // Como ainda não temos o Prisma (ORM) instalado, vamos usar o nosso Mock.
    const events = mockEvents;

    // 2. Simulamos uma lentidão de 2 segundos para testarmos o nosso loading.tsx no mundo real!
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 3. Devolvemos a resposta no formato JSON com status 200 (OK)
    return NextResponse.json(events, { status: 200 });

  } catch (error) {
    // 4. Se o banco explodir, devolvemos um erro 500 elegante
    return NextResponse.json(
      { message: "Erro interno ao buscar eventos" }, 
      { status: 500 }
    );
  }
}