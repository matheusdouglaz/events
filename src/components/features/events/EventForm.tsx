// src/components/features/events/EventForm.tsx
"use client";

import { useActionState } from "react";
import { Button } from "../../../components/ui/Button";
import { EventFormState } from "../../../types/event.types";

// Definimos o que o nosso formulário aceita receber
interface EventFormProps {
  action: (prevState: EventFormState, formData: FormData) => Promise<EventFormState>; // A Server Action (criar ou atualizar)
  initialData?: {
    title?: string;
    shortDescription?: string;
    date?: string | Date;
    location?: string;
    imageUrl?: string;
  }; // Os dados do evento (opcional, só usado na edição)
  eventId?: string; // O ID do evento (opcional, só usado na edição)
}

export function EventForm({ action, initialData, eventId }: EventFormProps) {
  const [state, formAction, isPending] = useActionState<EventFormState, FormData>(action, {
    errors: {},
    message: "",
  });

  // O input 'datetime-local' do HTML exige um formato de data muito específico (YYYY-MM-DDThh:mm)
  // Esse trecho formata a data do banco para o input entender
  const formattedDate = initialData?.date 
    ? new Date(initialData.date).toISOString().slice(0, 16) 
    : "";

  return (
    <div className="glass-panel neon-ring p-8 rounded-2xl border border-white/20">
      <h1 className="text-3xl font-bold text-slate-100 mb-6">
        {initialData ? "Editar Evento" : "Cadastrar Novo Evento"}
      </h1>

      {state?.message && (
        <div
          className={`mb-6 p-4 rounded-lg border ${
            state.errors
              ? "bg-rose-500/15 text-rose-200 border-rose-300/30"
              : "bg-amber-300/15 text-amber-100 border-amber-200/30"
          }`}
        >
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-6">
        {/* Se tivermos um ID (modo edição), colocamos o input invisível! */}
        {eventId && <input type="hidden" name="id" value={eventId} />}

        {/* TÍTULO */}
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-1">Título do Evento</label>
          <input type="text" name="title" 
            defaultValue={initialData?.title} // <-- MÁGICA AQUI: Preenche se tiver dado
            className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-slate-100 placeholder:text-slate-300/60 outline-none focus:ring-2 focus:ring-cyan-300/70 focus:border-cyan-300/50"
          />
          {state?.errors?.title && <p className="text-rose-300 text-sm mt-1">{state.errors.title[0]}</p>}
        </div>

        {/* DESCRIÇÃO */}
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-1">Breve Descrição</label>
          <textarea name="shortDescription" rows={3}
            defaultValue={initialData?.shortDescription}
            className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-slate-100 placeholder:text-slate-300/60 outline-none focus:ring-2 focus:ring-cyan-300/70 focus:border-cyan-300/50"
          ></textarea>
          {state?.errors?.shortDescription && <p className="text-rose-300 text-sm mt-1">{state.errors.shortDescription[0]}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DATA */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1">Data e Hora</label>
            <input type="datetime-local" name="date" 
              defaultValue={formattedDate}
              className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-slate-100 outline-none focus:ring-2 focus:ring-cyan-300/70 focus:border-cyan-300/50"
            />
            {state?.errors?.date && <p className="text-rose-300 text-sm mt-1">{state.errors.date[0]}</p>}
          </div>

          {/* LOCAL */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1">Local</label>
            <input type="text" name="location" 
              defaultValue={initialData?.location}
              className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-slate-100 placeholder:text-slate-300/60 outline-none focus:ring-2 focus:ring-cyan-300/70 focus:border-cyan-300/50"
            />
            {state?.errors?.location && <p className="text-rose-300 text-sm mt-1">{state.errors.location[0]}</p>}
          </div>
        </div>

        {/* IMAGEM */}
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-1">URL da Imagem da Capa</label>
          <input type="url" name="imageUrl" 
            defaultValue={initialData?.imageUrl}
            className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-slate-100 placeholder:text-slate-300/60 outline-none focus:ring-2 focus:ring-cyan-300/70 focus:border-cyan-300/50"
          />
          {state?.errors?.imageUrl && <p className="text-rose-300 text-sm mt-1">{state.errors.imageUrl[0]}</p>}
        </div>

        <div className="pt-4 border-t border-white/10">
          <Button
            type="submit"
            variant="primary"
            className="w-full text-lg h-12"
            disabled={isPending}
            isLoading={isPending}
          >
            {initialData ? "Salvar Alterações" : "Salvar e Publicar Evento"}
          </Button>
        </div>

      </form>
    </div>
  );
}