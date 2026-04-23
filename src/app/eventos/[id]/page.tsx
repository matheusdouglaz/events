
import Image from "next/image";
import { notFound } from "next/navigation";
import { getEventById } from "../../../lib/mocks/events";
import { Button } from "../../../components/ui/Button";

interface EventDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailsPage({ params }: EventDetailsProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const event = await getEventById(id);

  if (!event) {
    notFound(); 
  }

  const statusColors = {
    OPEN: "bg-green-100 text-green-800 border-green-200",
    SOLD_OUT: "bg-red-100 text-red-800 border-red-200",
    CLOSED: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-24">

      <article className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[event.status]}`}>
              {event.status === "OPEN" ? "INSCRIÇÕES ABERTAS" : event.status === "SOLD_OUT" ? "ESGOTADO" : "ENCERRADO"}
            </span>
            <span className="text-sm font-semibold text-purple-700">
              {new Date(event.date).toLocaleDateString('pt-BR')}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {event.title}
          </h1>
          <p className="text-xl text-gray-600">
            {event.location}
          </p>
        </div>

        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl mb-12 bg-gray-200">
          <Image 
            src={event.imageUrl} 
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sobre o Evento</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {event.shortDescription}
              <br/><br/>
              (Aviso: Como este é um mock, estamos usando a descrição curta. Em um projeto real, você teria um campo `fullDescription` no banco de dados com formatação em HTML ou Markdown para os detalhes completos da programação, palestrantes e horários).
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-fit">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Participe</h3>
            <p className="text-sm text-gray-500 mb-6">
              Garanta sua vaga antes que acabe. Vagas limitadas!
            </p>
            
            <Button 
              variant={event.status === "OPEN" ? "primary" : "secondary"}
              disabled={event.status !== "OPEN"}
              className="w-full"
            >
              {event.status === "OPEN" ? "Fazer Inscrição" : "Inscrições Fechadas"}
            </Button>
          </div>
        </div>
      </article>
    </main>
  );
}