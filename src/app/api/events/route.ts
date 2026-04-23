
import { NextResponse } from "next/server";
import { mockEvents } from "../../../lib/mocks/events";

export async function GET() {
  try {
    const events = mockEvents;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json(events, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno ao buscar eventos" }, 
      { status: 500 }
    );
  }
}