'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  UserCheck, 
  Building2, 
  Phone, 
  Car, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  HelpCircle 
} from 'lucide-react';

type OptionKey = 'cpf' | 'cnpj' | 'telefone' | 'placa' | 'nome';

/**
 * Componente interativo do Bloco 07 — Assistente Gratuito de Consultas (#assistente-consultas).
 * Ajuda o usuário a descobrir qual categoria de consulta corresponde à informação que possui.
 */
export default function AssistenteConsultas() {
  const [selectedOption, setSelectedOption] = useState<OptionKey>('cpf');

  const options: Record<OptionKey, {
    label: string;
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
    icon: React.ReactNode;
  }> = {
    cpf: {
      label: 'Tenho um CPF.',
      title: 'Consulta cadastral por CPF',
      description: 'Utilize essa modalidade para conhecer as opções de pesquisa que começam pelo CPF e verificar os módulos disponíveis.',
      buttonText: 'Consultar CPF',
      buttonHref: '/#consultar-dados',
      icon: <UserCheck className="w-5 h-5 text-[#00BF30]" />
    },
    cnpj: {
      label: 'Tenho um CNPJ.',
      title: 'Consulta de dados empresariais',
      description: 'Utilize o CNPJ para conhecer modalidades de pesquisa relacionadas a empresas e outras entidades cadastradas.',
      buttonText: 'Consultar CNPJ',
      buttonHref: '/#consultar-dados',
      icon: <Building2 className="w-5 h-5 text-[#00BF30]" />
    },
    telefone: {
      label: 'Tenho um telefone.',
      title: 'Consulta por número de telefone',
      description: 'Informe um telefone brasileiro com DDD para conhecer as opções de pesquisa correspondentes.',
      buttonText: 'Consultar telefone',
      buttonHref: '/#consultar-dados',
      icon: <Phone className="w-5 h-5 text-[#00BF30]" />
    },
    placa: {
      label: 'Tenho uma placa.',
      title: 'Consulta de informações veiculares',
      description: 'Informe a placa de um veículo para conhecer as modalidades relacionadas a dados veiculares.',
      buttonText: 'Consultar placa',
      buttonHref: '/#consultar-dados',
      icon: <Car className="w-5 h-5 text-[#00BF30]" />
    },
    nome: {
      label: 'Tenho um nome.',
      title: 'Pesquisa cadastral por nome',
      description: 'Conheça as modalidades que utilizam nome como informação inicial, considerando a possibilidade de homônimos e limitações de identificação.',
      buttonText: 'Consultar por nome',
      buttonHref: '/#consultar-dados',
      icon: <Users className="w-5 h-5 text-[#00BF30]" />
    }
  };

  const current = options[selectedOption];

  return (
    <section id="assistente-consultas" className="py-20 bg-white border-b border-[#E2EAE3]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho do Bloco 07 */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#00BF30]" />
            Ferramenta Gratuita de Orientação
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#004010] tracking-tight">
            Qual dado você possui? Descubra qual consulta escolher
          </h2>
          <p className="text-[#647067] text-sm md:text-base leading-relaxed font-medium">
            Nem toda pesquisa começa pelo mesmo identificador. Algumas pessoas possuem um CPF. Outras precisam consultar informações de uma empresa, verificar um telefone ou pesquisar dados relacionados a um veículo. Utilize o assistente do PuxarDados para conhecer o tipo de consulta correspondente à informação disponível.
          </p>
        </div>

        {/* Card Interativo do Assistente */}
        <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#004010] mb-4 text-center sm:text-left">
              Qual informação você tem para começar?
            </h3>
            
            {/* Lista de Opções em Botões Grandes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {(Object.keys(options) as OptionKey[]).map((key) => {
                const opt = options[key];
                const isSelected = selectedOption === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedOption(key)}
                    className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-white border-[#00BF30] shadow-md ring-2 ring-[#00BF30]/20'
                        : 'bg-white/60 border-[#E2EAE3] hover:bg-white hover:border-[#00BF30]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="p-2 rounded-xl bg-[#F0FAF2]">
                        {opt.icon}
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-4 h-4 text-[#00BF30]" />
                      )}
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-[#15231A]">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Resultado da Recomendação */}
          <div className="bg-white border border-[#E2EAE3] rounded-2xl p-6 sm:p-8 space-y-4 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-[#008020] uppercase tracking-wider block">
                  Modalidade Recomendada
                </span>
                <h4 className="text-xl font-black text-[#004010] mt-0.5">
                  {current.title}
                </h4>
              </div>
              <Link
                href={current.buttonHref}
                className="bg-[#00BF30] hover:bg-[#008020] text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shrink-0 w-full sm:w-auto"
              >
                <span>{current.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <p className="text-sm text-[#647067] leading-relaxed font-medium">
              {current.description}
            </p>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-[#647067] font-medium">
              O assistente é gratuito e funciona no seu navegador sem necessidade de login ou pagamento.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
