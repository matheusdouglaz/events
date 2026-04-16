// src/hooks/useScroll.ts
import { useState, useEffect } from "react";

/**
 * Hook para detectar se a página foi rolada além de um certo limite.
 * @param threshold Limite em pixels para considerar a página como "scrolled" (padrão: 50px)
 */
export function useScroll(threshold: number = 50) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}