"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

export async function createEvent(prevState: any, formData: FormData) {
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