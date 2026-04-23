"use client";

import { useEffect } from "react";
import { Button } from "../components/ui/Button";
import { AlertTriangle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  
  useEffect(() => {
    console.error("Erro capturado na Home:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <AlertTriangle size={64} className="text-red-500 mb-4" />
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Ops! Algo deu errado.
      </h2>
      
      <p className="text-gray-600 mb-8 max-w-md">
        Não conseguimos carregar os eventos no momento. Pode ser uma instabilidade na nossa conexão.
      </p>
      
      <Button variant="primary" onClick={() => reset()}>
        Tentar Novamente
      </Button>
    </div>
  );
}