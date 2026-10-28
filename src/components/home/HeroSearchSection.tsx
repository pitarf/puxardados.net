'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  UserCheck, 
  Building2, 
  Phone, 
  Car, 
  Users,
  Compass
} from 'lucide-react';
import { 
  validarCPF, 
  validarCNPJ, 
  validarTelefone, 
  validarPlaca, 
  validarNome 
} from './validators';

export type SearchCategory = 'cpf' | 'cnpj' | 'telefone' | 'placa' | 'nome';

/**
 * Componente Hero principal com as 5 categorias de pesquisa e retorno de validação imediato.
 * Atende com rigor aos Blocos 02, 03 e 04 do PROMPT_SUPREMO_HOMEPAGE.md.
 */
export default function HeroSearchSection() {
  const [category, setCategory] = useState<SearchCategory>('cpf');
  const [inputValue, setInputValue] = useState('');
  const [validationState, setValidationState] = useState<{
    status: 'idle' | 'invalid' | 'valid';
    message?: string;
    details?: string;
  }>({ status: 'idle' });

  // Máscaras e formatações de input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;
    setValidationState({ status: 'idle' });

    if (category === 'cpf') {
      raw = raw.replace(/\D/g, '').slice(0, 11);
      raw = raw
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      setInputValue(raw);
    } else if (category === 'cnpj') {
      // Aceita letras e números, normaliza para maiúsculas (máximo 14 caracteres limpos)
      let clean = raw.toUpperCase().replace(/[^0-9A-Z]/g, '').slice(0, 14);
      // Aplica formatação amigável se for apenas numérico ou alfanumérico padrão
      if (clean.length > 2 && clean.length <= 5) {
        clean = `${clean.slice(0, 2)}.${clean.slice(2)}`;
      } else if (clean.length > 5 && clean.length <= 8) {
        clean = `${clean.slice(0, 2)}.${clean.slice(2, 5)}.${clean.slice(5)}`;
      } else if (clean.length > 8 && clean.length <= 12) {
        clean = `${clean.slice(0, 2)}.${clean.slice(2, 5)}.${clean.slice(5, 8)}/${clean.slice(8)}`;
      } else if (clean.length > 12) {
        clean = `${clean.slice(0, 2)}.${clean.slice(2, 5)}.${clean.slice(5, 8)}/${clean.slice(8, 12)}-${clean.slice(12, 14)}`;
      }
      setInputValue(clean);
    } else if (category === 'telefone') {
      let clean = raw.replace(/\D/g, '').slice(0, 11);
      if (clean.length > 2 && clean.length <= 6) {
        clean = `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
      } else if (clean.length > 6 && clean.length <= 10) {
        clean = `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
      } else if (clean.length > 10) {
        clean = `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7)}`;
      } else if (clean.length > 0) {
        clean = `(${clean}`;
      }
      setInputValue(clean);
    } else if (category === 'placa') {
      let clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
      setInputValue(clean);
    } else {
      // Nome
      setInputValue(raw);
    }
  };

  const handleCategoryChange = (newCat: SearchCategory) => {
    setCategory(newCat);
    setInputValue('');
    setValidationState({ status: 'idle' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      setValidationState({
        status: 'invalid',
        message: 'Informe o dado necessário para começar.'
      });
      return;
    }

    if (category === 'cpf') {
      const res = validarCPF(inputValue);
      if (!res.valido) {
        setValidationState({
          status: 'invalid',
          message: res.mensagem || 'Confira o CPF informado. A sequência não corresponde a um formato válido.'
        });
      } else {
        setValidationState({
          status: 'valid',
          message: 'Formato reconhecido',
          details: 'O identificador informado passou pela verificação inicial de formato. Continue para conhecer as modalidades de consulta disponíveis.'
        });
      }
    } else if (category === 'cnpj') {
      const res = validarCNPJ(inputValue);
      if (!res.valido) {
        setValidationState({
          status: 'invalid',
          message: res.mensagem || 'Revise o CNPJ informado e tente novamente.'
        });
      } else {
        setValidationState({
          status: 'valid',
          message: 'Formato reconhecido',
          details: `Estrutura de CNPJ ${res.tipo === 'alfanumerico' ? 'alfanumérico (padrão 2026)' : 'numérico'} compatível. Continue para conhecer as modalidades disponíveis.`
        });
      }
    } else if (category === 'telefone') {
      const res = validarTelefone(inputValue);
      if (!res.valido) {
        setValidationState({
          status: 'invalid',
          message: res.mensagem || 'Informe um telefone brasileiro completo com DDD.'
        });
      } else {
        setValidationState({
          status: 'valid',
          message: 'Formato reconhecido',
          details: `Número de telefone (${res.tipo || 'nacional'}) verificado com sucesso. Continue para conferir as opções de pesquisa.`
        });
      }
    } else if (category === 'placa') {
      const res = validarPlaca(inputValue);
      if (!res.valido) {
        setValidationState({
          status: 'invalid',
          message: res.mensagem || 'Confira os sete caracteres da placa.'
        });
      } else {
        setValidationState({
          status: 'valid',
          message: 'Formato reconhecido',
          details: `Placa ${res.tipo === 'mercosul' ? 'padrão Mercosul' : 'padrão Tradicional'} reconhecida. Continue para conferir as modalidades de consulta veicular.`
        });
      }
    } else if (category === 'nome') {
      const res = validarNome(inputValue);
      if (!res.valido) {
        setValidationState({
          status: 'invalid',
          message: res.mensagem || 'Digite um nome para continuar.'
        });
      } else {
        setValidationState({
          status: 'valid',
          message: 'Formato reconhecido',
          details: 'Identificador textual pronto para pesquisa. Continue para visualizar as modalidades disponíveis.'
        });
      }
    }
  };

  // Configurações visuais por categoria
  const categoryConfigs: Record<SearchCategory, {
    label: string;
    placeholder: string;
    buttonText: string;
    icon: React.ReactNode;
  }> = {
    cpf: {
      label: 'Digite o CPF para consultar.',
      placeholder: '000.000.000-00',
      buttonText: 'Consultar CPF',
      icon: <UserCheck className="w-4 h-4" />
    },
    cnpj: {
      label: 'Digite o CNPJ para consultar.',
      placeholder: '00.000.000/0001-00',
      buttonText: 'Consultar CNPJ',
      icon: <Building2 className="w-4 h-4" />
    },
    telefone: {
      label: 'Digite o telefone com DDD.',
      placeholder: '(11) 99999-9999',
      buttonText: 'Consultar telefone',
      icon: <Phone className="w-4 h-4" />
    },
    placa: {
      label: 'Digite a placa do veículo.',
      placeholder: 'ABC1D23',
      buttonText: 'Consultar placa',
      icon: <Car className="w-4 h-4" />
    },
    nome: {
      label: 'Digite o nome para pesquisar.',
      placeholder: 'Nome e sobrenome',
      buttonText: 'Consultar por nome',
      icon: <Users className="w-4 h-4" />
    }
  };

  const currentConfig = categoryConfigs[category];

  return (
    <section id="consultar-dados" className="relative pt-6 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-white via-[#F8FAF8] to-[#F0FAF2] overflow-hidden">
      {/* Elementos sutis de fundo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00BF30]/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00E63A]/5 rounded-full blur-[90px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Coluna Principal da Busca (Esquerda no desktop, Topo no mobile) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Texto acima do H1 */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FAF2] border border-[#00BF30]/30 text-[#008020] text-xs font-bold tracking-wider uppercase">
              PLATAFORMA DE CONSULTAS CADASTRAIS
            </div>

            {/* H1 Definitivo */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#004010] tracking-tight leading-[1.15]">
              Puxar dados e consultar informações online
            </h1>

            {/* Descrição Principal */}
            <p className="text-base sm:text-lg text-[#15231A] font-medium leading-relaxed max-w-2xl">
              Escolha CPF, CNPJ, telefone, placa ou nome para iniciar sua consulta e conhecer os serviços disponíveis.
            </p>

            {/* Caixa do Formulário de Conversão Principal */}
            <div className="bg-white border border-[#E2EAE3] rounded-3xl p-5 sm:p-7 shadow-xl shadow-[#004010]/5 space-y-5">
              
              {/* Seletor Compacto das Cinco Categorias (Mobile-First) */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2 p-1.5 bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl">
                {(['cpf', 'cnpj', 'telefone', 'placa', 'nome'] as SearchCategory[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={`py-2 sm:py-2.5 px-1 rounded-xl text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 transition-all uppercase tracking-wider ${
                      category === cat
                        ? 'bg-[#00BF30] text-white shadow-md'
                        : 'text-[#647067] hover:text-[#004010] hover:bg-slate-200/50'
                    }`}
                  >
                    <span className="hidden sm:inline">{categoryConfigs[cat].icon}</span>
                    <span>{cat}</span>
                  </button>
                ))}
              </div>

              {/* Formulário com Input Adaptativo e Botão de Largura Total */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="search-input" className="block text-xs font-bold text-[#004010] uppercase tracking-wide">
                    {currentConfig.label}
                  </label>
                  <div className="relative">
                    <input
                      id="search-input"
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder={currentConfig.placeholder}
                      className="w-full bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl px-4 py-3.5 sm:py-4 text-base font-semibold text-[#15231A] placeholder:text-[#647067]/60 focus:bg-white focus:border-[#00BF30] focus:ring-2 focus:ring-[#00BF30]/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00BF30] hover:bg-[#008020] text-white font-extrabold py-4 px-6 rounded-2xl text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-lg shadow-[#00BF30]/25 transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Search className="w-5 h-5 shrink-0" />
                  <span>{currentConfig.buttonText}</span>
                </button>
              </form>

              {/* Microcopy comercial mínima */}
              <p className="text-xs text-[#647067] font-medium text-center">
                Confira as modalidades, informações disponíveis e valores antes de contratar.
              </p>

              {/* CTA Secundário para o Assistente */}
              <div className="pt-2 border-t border-[#E2EAE3] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-[#647067] font-medium">Não sabe qual consulta escolher?</span>
                <a
                  href="#assistente-consultas"
                  className="inline-flex items-center gap-1.5 text-[#008020] font-bold hover:text-[#00BF30] transition-colors"
                >
                  <Compass className="w-4 h-4 text-[#00BF30]" />
                  <span>Encontrar o tipo de consulta</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* BLOCO 03 — RETORNO IMEDIATO DA BUSCA (Antes de qualquer texto SEO) */}
            {validationState.status === 'invalid' && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3 animate-in fade-in duration-300">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-red-900">Atenção</h4>
                  <p className="text-xs text-red-700 font-medium leading-relaxed mt-0.5">
                    {validationState.message}
                  </p>
                </div>
              </div>
            )}

            {validationState.status === 'valid' && (
              <div className="bg-[#F0FAF2] border border-[#00BF30]/40 rounded-3xl p-5 sm:p-6 space-y-4 animate-in fade-in duration-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#00BF30] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-[#004010]">
                      {validationState.message}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#008020] font-medium leading-relaxed">
                      {validationState.details}
                    </p>
                  </div>
                </div>

                {/* Bloco de Direcionamento Comercial Ético (Sem simular dados fictícios) */}
                <div className="bg-white border border-[#E2EAE3] rounded-2xl p-4 sm:p-5 space-y-3">
                  <h4 className="text-sm font-bold text-[#004010]">
                    Continue para escolher sua consulta
                  </h4>
                  <p className="text-xs text-[#647067] leading-relaxed">
                    Crie sua conta ou faça login para acessar os serviços disponíveis e conferir os valores antes de contratar.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <Link
                      href={`/cadastro?src=home-${category}`}
                      className="flex-1 bg-[#00BF30] hover:bg-[#008020] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm text-center transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <span>Criar conta e continuar</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/login"
                      className="bg-[#F8FAF8] hover:bg-slate-100 text-[#15231A] border border-[#E2EAE3] font-bold py-3 px-4 rounded-xl text-xs sm:text-sm text-center transition-colors"
                    >
                      Já tenho conta
                    </Link>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* BLOCO 04 — CARD ILUSTRATIVO SECUNDÁRIO (Ao lado no Desktop, Abaixo no Mobile) */}
          <div className="lg:col-span-5 w-full mt-4 lg:mt-0">
            <div className="bg-white border border-[#E2EAE3] rounded-3xl p-6 sm:p-7 shadow-lg space-y-5">
              <div className="flex items-center justify-between border-b border-[#E2EAE3] pb-4">
                <div>
                  <h3 className="text-sm font-bold text-[#004010]">Conheça a estrutura de uma consulta</h3>
                  <p className="text-[11px] text-[#647067] font-semibold uppercase tracking-wider mt-0.5">Visão demonstrativa</p>
                </div>
                <span className="px-2.5 py-1 bg-[#F8FAF8] text-[#647067] border border-[#E2EAE3] rounded-full text-[10px] font-bold">
                  EXEMPLO
                </span>
              </div>

              {/* Informações ilustrativas discretas */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-[#647067] font-medium">Modalidade</span>
                  <span className="font-bold text-[#004010] uppercase">{category}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-[#647067] font-medium">Identificador</span>
                  <span className="font-semibold text-[#15231A]">Exemplo demonstrativo</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-[#647067] font-medium">Formato</span>
                  <span className="font-semibold text-[#008020]">Verificação de exemplo</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-[#647067] font-medium">Dados disponíveis</span>
                  <span className="font-semibold text-[#15231A]">Dependem do módulo</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-[#647067] font-medium">Situação cadastral</span>
                  <span className="text-[#647067] italic">Não consultada</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-[#647067] font-medium">Documentação</span>
                  <span className="text-[#647067] italic">Não consultada</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#647067] font-medium">Informações complementares</span>
                  <span className="text-[#647067] italic">Não consultadas</span>
                </div>
              </div>

              {/* Rodapé ético obrigatório */}
              <div className="pt-4 border-t border-[#E2EAE3] bg-[#F8FAF8] -mx-6 -mb-6 p-4 rounded-b-3xl text-center">
                <p className="text-[11px] text-[#647067] font-semibold leading-relaxed">
                  Demonstração visual. Nenhuma consulta cadastral real foi executada.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
