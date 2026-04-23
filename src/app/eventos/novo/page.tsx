"use client";

import Header from "../../../components/layout/header";
import { Button } from "../../../components/ui/Button";
import { createEvent } from "../../../actions/event.actions";
import { useActionState } from "react";

export default function NewEventPage() {
  const [state, formAction, isPending] = useActionState(createEvent, {
    errors: {},
    message: "",
  });

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-24">
      <Header />

      <section className="flex-grow w-full py-12 px-4 max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Cadastrar Novo Evento
          </h1>

          {state?.message && (
             <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                {state.message}
             </div>
          )}

          <form action={formAction} className="space-y-6">
            
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">Título do Evento</label>
              <input type="text" id="title" name="title" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
              />
              {state?.errors?.title && (
                <p className="text-red-500 text-sm mt-1">{state.errors.title[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="shortDescription" className="block text-sm font-semibold text-gray-700 mb-1">Breve Descrição</label>
              <textarea id="shortDescription" name="shortDescription" rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
              ></textarea>
              {state?.errors?.shortDescription && (
                <p className="text-red-500 text-sm mt-1">{state.errors.shortDescription[0]}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-1">Data e Hora</label>
                <input type="datetime-local" id="date" name="date" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                />
                {state?.errors?.date && (
                  <p className="text-red-500 text-sm mt-1">{state.errors.date[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-1">Local</label>
                <input type="text" id="location" name="location" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
                />
                {state?.errors?.location && (
                  <p className="text-red-500 text-sm mt-1">{state.errors.location[0]}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-1">URL da Imagem da Capa</label>
              <input type="url" id="imageUrl" name="imageUrl" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
              />
              {state?.errors?.imageUrl && (
                <p className="text-red-500 text-sm mt-1">{state.errors.imageUrl[0]}</p>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100">
              <Button type="submit" variant="primary" className="w-full text-lg h-12" disabled={isPending}>
                {isPending ? "Salvando..." : "Salvar e Publicar Evento"}
              </Button>
            </div>

          </form>
        </div>
      </section>
    </main>
  );
}