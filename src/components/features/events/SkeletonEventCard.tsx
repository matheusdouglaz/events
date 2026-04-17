// src/components/features/events/SkeletonEventCard.tsx

export function SkeletonEventCard() {
  return (
    // A classe chave aqui é o 'animate-pulse' do Tailwind!
    <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden animate-pulse h-[380px]">
      {/* Esqueleto da Imagem */}
      <div className="w-full h-48 bg-gray-300"></div>

      <div className="flex flex-col flex-grow p-6 gap-4">
        {/* Esqueleto do Título e Descrição */}
        <div className="space-y-3">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>

        {/* Esqueleto da Data/Local */}
        <div className="mt-auto pt-4 border-t border-gray-100 space-y-2">
          <div className="h-3 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>

        {/* Esqueleto do Botão */}
        <div className="w-full h-12 bg-gray-300 rounded-md mt-2"></div>
      </div>
    </div>
  );
}