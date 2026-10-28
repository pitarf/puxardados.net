'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

/**
 * Componente do Botão Flutuante Mobile (Seção 36).
 * Aparece de maneira discreta na viewport mobile quando o formulário principal do topo
 * (#consultar-dados) sai da área visível de leitura. Ao clicar, retorna suavemente ao topo.
 */
export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Exibe somente em dispositivos móveis (largura menor que 768px)
      if (window.innerWidth >= 768) {
        setIsVisible(false);
        return;
      }

      // Verifica a posição do elemento do formulário principal
      const heroElement = document.getElementById('consultar-dados');
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        // Se a base do Hero passou para cima da tela, ativa o botão
        if (rect.bottom < 100) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToHero = () => {
    const heroElement = document.getElementById('consultar-dados');
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 inset-x-4 z-40 md:hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button
        type="button"
        onClick={scrollToHero}
        className="w-full bg-[#00BF30] hover:bg-[#008020] text-white font-black py-4 px-6 rounded-2xl shadow-2xl shadow-[#004010]/30 flex items-center justify-center gap-2 text-base transition-all active:scale-[0.98] border border-white/20"
      >
        <Search className="w-5 h-5 shrink-0" />
        <span>Consultar dados</span>
      </button>
    </div>
  );
}
