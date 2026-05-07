"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EventFormState } from "../types/event.types";
import { z } from "zod";

const eventSchema = z.object({
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres."),
  shortDescription: z.string().min(15, "A descrição deve ter pelo menos 15 caracteres."),
  date: z.coerce.date().refine((date) => date > new Date(), {
    message: "A data do evento não pode estar no passado.",
  }),
  location: z.string().min(3, "O local deve ter pelo menos 3 caracteres."),
  imageUrl: z.union([z.string().url("A URL da imagem é inválida."), z.literal("")]).optional(),
});

export async function createEvent(
  _prevState: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = eventSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Por favor, corrija os erros abaixo.",
    };
  }

  const { title, shortDescription, date, location, imageUrl } = validatedFields.data;

  try {
    await prisma.event.create({
      data: {
        title, shortDescription, date, location, 
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
        status: "OPEN",
      },
    });
  } catch (error) {
    return { message: "Erro interno ao salvar no banco de dados." };
  }

  revalidatePath("/");
  redirect("/");
}

export async function deleteEvent(formData: FormData) {
  "use server"; // Garantia extra de segurança

  // 1. Pegamos o ID que virá escondido no formulário
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("ID do evento não encontrado.");
  }

  // 2. Pedimos ao Prisma para deletar a linha exata no banco
  await prisma.event.delete({
    where: {
      id: id,
    },
  });

  // 3. Limpamos o cache da Home (para o evento sumir da lista) e redirecionamos
  revalidatePath("/");
  redirect("/");
}

export async function updateEvent(
  _prevState: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  "use server";

  const id = formData.get("id") as string; // Pegamos o ID escondido
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = eventSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erro na validação. Verifique os campos.",
    };
  }

  const { title, shortDescription, date, location, imageUrl } = validatedFields.data;

  try {
    await prisma.event.update({
      where: { id }, // QUEM vamos atualizar
      data: {
        title,
        shortDescription,
        date,
        location,
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      },
    });
  } catch (error) {
    return { message: "Erro ao atualizar no banco de dados." };
  }

  revalidatePath("/");
  revalidatePath(`/eventos/${id}`); // Limpamos o cache da página de detalhes também!
  redirect(`/eventos/${id}`); // Volta para a página de detalhes
}