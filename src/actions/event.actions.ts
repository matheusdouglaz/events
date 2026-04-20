// src/actions/event.actions.ts
"use server"; // A linha mágica! Isso garante que esse código NUNCA vaze para o navegador.

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// A função recebe o objeto nativo FormData do HTML
export async function createEvent(formData: FormData) {
  // 1. Extraímos os dados do formulário
  const title = formData.get("title") as string;
  const shortDescription = formData.get("shortDescription") as string;
  const dateString = formData.get("date") as string;
  const location = formData.get("location") as string;
  const imageUrl = formData.get("imageUrl") as string;

  // 2. Validação básica de segurança (O Pleno nunca confia no usuário)
  if (!title || !shortDescription || !dateString) {
    throw new Error("Preencha todos os campos obrigatórios");
  }

  // 3. Salvamos no Banco de Dados via Prisma!
  await prisma.event.create({
    data: {
      title,
      shortDescription,
      date: new Date(dateString), // Convertendo a string do input de data para DateTime do Prisma
      location,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87", // Imagem padrão se vier vazio
      status: "OPEN", // Todo evento novo nasce com inscrições abertas
    },
  });

  // 4. Limpamos o cache da Home Page para o evento novo aparecer instantaneamente
  revalidatePath("/");

  // 5. Redirecionamos o usuário de volta para a Home
  redirect("/");
}