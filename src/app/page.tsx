// src/app/page.tsx
import { Button } from "../components/ui/IconButton";
import Header from "../components/layout/header";

export default function Home() {
  return (
    <>
      <Header />
    <main className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg flex flex-col items-center gap-6">
        
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Bem-vindo ao DevEvents
        </h1>
        
        <p className="text-gray-600 text-center">
          Nossa plataforma de gestão de eventos de tecnologia. 
          Criada do zero com as melhores práticas de mercado!
        </p>

        <div className="flex gap-4 w-full justify-center mt-4">
          {/* Aqui estamos testando o nosso componente Atômico! */}
          <Button variant="outline">Ver Eventos</Button>
          <Button variant="primary">Criar Conta</Button>
        </div>
        
      </div>
    </main>
    </>
  );
}