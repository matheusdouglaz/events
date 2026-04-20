// src/app/eventos/novo/page.tsx
import { Button } from "../../../components/ui/Button";
import { createEvent } from "../../../actions/event.actions";

export default function NewEventPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-24">

      <section className="flex-grow w-full py-12 px-4 max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Cadastrar Novo Evento
          </h1>

          <form action={createEvent} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
                Titulo do Evento
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                placeholder="Ex: Summit de Tecnologia 2026"
              />
            </div>

            <div>
              <label htmlFor="shortDescription" className="block text-sm font-semibold text-gray-700 mb-1">
                Breve Descricao
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                placeholder="O que vai rolar neste evento?"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-1">
                  Data e Hora
                </label>
                <input
                  type="datetime-local"
                  id="date"
                  name="date"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-1">
                  Local
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                  placeholder="Ex: Sao Paulo, SP ou Online"
                />
              </div>
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-1">
                URL da Imagem da Capa (Unsplash)
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                placeholder="https://images.unsplash.com/..."
              />
              <p className="text-xs text-gray-500 mt-1">Deixe em branco para usar a imagem padrao.</p>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <Button type="submit" variant="primary" className="w-full text-lg h-12">
                Salvar e Publicar Evento
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
