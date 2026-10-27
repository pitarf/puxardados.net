'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, ChevronRight } from 'lucide-react';

interface TermsModalProps {
  userId?: string;
  onAccept?: () => void;
}

/**
 * Modal de Ciência, Responsabilidade e Uso Legítimo
 * Exibido logo após a criação da conta/primeiro acesso, antes de qualquer outro pop-up.
 */
export default function TermsModal({ userId, onAccept }: TermsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Verifica no localStorage se o usuário já confirmou a ciência dos termos
    const storageKey = userId ? `terms_accepted_${userId}` : 'terms_accepted_generic';
    const accepted = localStorage.getItem(storageKey);

    if (!accepted) {
      setIsOpen(true);
    }
  }, [userId]);

  const handleProceed = () => {
    const storageKey = userId ? `terms_accepted_${userId}` : 'terms_accepted_generic';
    localStorage.setItem(storageKey, 'true');
    setIsOpen(false);
    if (onAccept) {
      onAccept();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0B0F17] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl p-6 md:p-8 flex flex-col text-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Cabeçalho */}
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-[#00BF30]/15 text-[#00BF30] flex items-center justify-center border border-[#00BF30]/30 shadow-md shadow-[#00BF30]/10">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Termo de Ciência, Responsabilidade e Uso Legítimo
            </h3>
            <span className="text-[11px] text-emerald-400 font-mono">
              Conformidade LGPD & Segurança Cadastral
            </span>
          </div>
        </div>

        {/* Corpo dos Termos */}
        <div className="py-4 space-y-3.5 text-xs text-slate-300 leading-relaxed font-normal">
          <p>
            Ao criar uma conta e utilizar os serviços desta plataforma, o usuário declara estar ciente de que o acesso e o tratamento de informações pessoais de terceiros estão sujeitos à Lei nº 13.709/2018 (LGPD) e às demais normas aplicáveis.
          </p>

          <p>
            O usuário compromete-se a utilizar os serviços exclusivamente para finalidades legítimas, específicas e juridicamente fundamentadas.
          </p>

          <p className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 font-medium">
            É expressamente proibida a utilização de informações obtidas por meio da plataforma para perseguição, ameaças, fraudes, discriminação, exposição indevida de dados pessoais, engenharia social ou outras atividades ilícitas.
          </p>

          <p>
            O usuário assume responsabilidade pelas próprias condutas, declarações e operações de tratamento que realizar, inclusive eventual compartilhamento posterior das informações, nos limites previstos na legislação.
          </p>

          <p>
            A responsabilidade por danos será apurada conforme a atuação de cada parte e os artigos 42 e 43 da LGPD, sem exclusão das obrigações legais da empresa operadora.
          </p>

          <p>
            A plataforma poderá solicitar comprovação da finalidade da consulta, limitar funcionalidades, suspender acessos em situações justificadas e adotar medidas legalmente cabíveis para prevenir ou investigar utilizações abusivas.
          </p>

          <p className="text-[11px] text-slate-400 pt-1">
            Ao prosseguir, o usuário confirma que leu e aceita os Termos de Uso e declara ciência da Política de Privacidade.
          </p>
        </div>

        {/* Rodapé com Botão Prosseguir */}
        <div className="pt-4 border-t border-white/10 mt-2">
          <button
            onClick={handleProceed}
            className="w-full py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-[#00BF30] to-[#008020] hover:from-[#00d836] hover:to-[#009425] text-slate-950 shadow-lg shadow-[#00BF30]/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Prosseguir</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
