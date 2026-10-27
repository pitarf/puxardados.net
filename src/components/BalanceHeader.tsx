'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Wallet, ArrowUpRight, Sparkles } from 'lucide-react';
import { RechargeModal } from './RechargeModal';
import { useRouter, useSearchParams } from 'next/navigation';

interface BalanceHeaderProps {
  initialBalance: number;
}

/**
 * Componente do Widget de Saldo no Topo do Dashboard.
 * Design moderno em formato card cápsula com gradiente verde esmeralda,
 * efeito de brilho e botão de recarga imediata com micro-animação.
 */
export function BalanceHeader({ initialBalance }: BalanceHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Abre o modal se houver ?recharge=true na URL
  useEffect(() => {
    if (searchParams.get('recharge') === 'true') {
      setIsModalOpen(true);
      const params = new URLSearchParams(searchParams.toString());
      params.delete('recharge');
      router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, router]);

  const handleSuccess = () => {
    router.refresh();
  };

  return (
    <>
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Card Cápsula de Saldo com Novo Estilo */}
        <div 
          onClick={() => setIsModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsModalOpen(true); }}
          className="relative group cursor-pointer flex items-center gap-3 bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-slate-950/90 hover:from-emerald-950/60 hover:to-slate-900 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 shadow-sm shadow-emerald-500/10 hover:shadow-emerald-500/20"
        >
          {/* Ícone com Glow Esmeralda */}
          <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-[#00BF30] to-[#008020] text-slate-950 font-bold shadow-md shadow-[#00BF30]/30 group-hover:scale-105 transition-transform duration-200">
            <Wallet className="w-4 h-4 text-white" />
          </div>

          {/* Textos Informativos */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                Saldo Disponível
              </span>
              <Sparkles className="w-2.5 h-2.5 text-amber-400 opacity-80" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-semibold text-slate-400">R$</span>
              <span className="text-base font-extrabold text-white tracking-tight">
                {initialBalance.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          {/* Botão de Adição com Animação */}
          <div className="ml-1 sm:ml-2 flex items-center justify-center w-7 h-7 rounded-lg bg-[#00BF30]/20 group-hover:bg-[#00BF30] text-[#00BF30] group-hover:text-slate-950 transition-all duration-200">
            <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Botão de Ação Rápida para Desktop */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-400 hover:text-white bg-emerald-500/10 hover:bg-[#00BF30] rounded-xl border border-emerald-500/20 hover:border-transparent transition-all duration-200 active:scale-95"
        >
          <span>Recarregar</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <RechargeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleSuccess} 
      />
    </>
  );
}
