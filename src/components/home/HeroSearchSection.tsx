'use client';

import React, { useState, useEffect } from 'react';
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
  Compass,
  Loader2,
  Sparkles,
  Lock,
  UserPlus,
  LogIn
} from 'lucide-react';
import { 
  validarCPF, 
  validarCNPJ, 
  validarTelefone, 
  validarPlaca, 
  validarNome 
} from './validators';

export type SearchCategory = 'cpf' | 'cnpj' | 'telefone' | 'placa' | 'nome';

interface HeroSearchSectionProps {
  pricings?: { id: string; price: number }[];
}

/**
 * Componente Hero principal com as 5 categorias de pesquisa,
 * animação de progresso de 3 segundos simulando consulta e retorno de valor real.
 */
export default function HeroSearchSection({ pricings = [] }: HeroSearchSectionProps) {
  const [category, setCategory] = useState<SearchCategory>('cpf');
  const [inputValue, setInputValue] = useState('');
  const [searchStage, setSearchStage] = useState<'idle' | 'loading' | 'found'>('idle');
  const [progress, setProgress] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Auxiliar para obter preço do módulo ou padrão
  const getCategoryPrice = (cat: SearchCategory): string => {
    let modId = 'dados_basicos';
    let fallback = 1.0;
    if (cat === 'cpf') {
      modId = 'dados_basicos';
      fallback = 1.0;
    } else if (cat === 'cnpj') {
      modId = 'cnpj_basico';
      fallback = 1.0;
    } else if (cat === 'telefone') {
      modId = 'telefones';
      fallback = 0.5;
    } else if (cat === 'placa') {
      modId = 'veiculo_basico';
      fallback = 1.0;
    } else if (cat === 'nome') {
      modId = 'parentes';
      fallback = 1.0;
    }
    const found = pricings.find(p => p.id === modId);
    const finalPrice = found ? found.price : fallback;
    return finalPrice.toFixed(2).replace('.', ',');
  };

  // Efeito da barrinha de progresso de 3 segundos
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (searchStage === 'loading') {
      setProgress(5);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + Math.floor(Math.random() * 8) + 4;
        });
      }, 150);

      timer = setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        setSearchStage('found');
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    } else {
      setProgress(0);
    }
  }, [searchStage]);

  // Máscaras e formatações de input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;
    setValidationError(null);
    if (searchStage !== 'idle') {
      setSearchStage('idle');
    }

    if (category === 'cpf') {
      raw = raw.replace(/\D/g, '').slice(0, 11);
      raw = raw
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      setInputValue(raw);
    } else if (category === 'cnpj') {
      let clean = raw.toUpperCase().replace(/[^0-9A-Z]/g, '').slice(0, 14);
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
      setInputValue(raw);
    }
  };

  const handleCategoryChange = (newCat: SearchCategory) => {
    setCategory(newCat);
    setInputValue('');
    setSearchStage('idle');
    setValidationError(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchStage === 'loading') return;

    if (!inputValue.trim()) {
      setValidationError('Informe o dado necessário para começar.');
      return;
    }

    // Não bloqueia por algoritmo matemático: qualquer entrada preenchida dispara a busca e conversão
    setValidationError(null);
    setSearchStage('loading');
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
  const currentPriceFormatted = getCategoryPrice(category);

  return (
    <section id="consultar-dados" className="relative pt-6 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-white via-[#F8FAF8] to-[#F0FAF2] overflow-hidden">
      {/* Elementos sutis de fundo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00BF30]/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00E63A]/5 rounded-full blur-[90px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Coluna Principal da Busca */}
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
                    disabled={searchStage === 'loading'}
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

              {/* Formulário com Input Adaptativo e Botão */}
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
                      disabled={searchStage === 'loading'}
                      className="w-full bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl px-4 py-3.5 sm:py-4 text-base font-semibold text-[#15231A] placeholder:text-[#647067]/60 focus:bg-white focus:border-[#00BF30] focus:ring-2 focus:ring-[#00BF30]/20 outline-none transition-all disabled:opacity-60"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={searchStage === 'loading'}
                  className="w-full bg-[#00BF30] hover:bg-[#008020] disabled:bg-[#008020]/70 text-white font-extrabold py-4 px-6 rounded-2xl text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-lg shadow-[#00BF30]/25 transition-all active:scale-[0.99] cursor-pointer"
                >
                  {searchStage === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Consultando base de dados...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 shrink-0" />
                      <span>{currentConfig.buttonText}</span>
                    </>
                  )}
                </button>
              </form>

              {/* BARRINHA DE CARREGAMENTO ANIMADA (3 Segundos) */}
              {searchStage === 'loading' && (
                <div className="pt-2 space-y-2.5 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between text-xs font-bold text-[#004010]">
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00BF30]" />
                      Localizando registros cadastrais...
                    </span>
                    <span className="font-mono text-[#008020]">{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-[#E2EAE3]">
                    <div 
                      className="h-full bg-gradient-to-r from-[#00BF30] to-[#00E63A] rounded-full transition-all duration-150 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[#647067] text-center italic">
                    Conectando aos repositórios nacionais e validando integridade...
                  </p>
                </div>
              )}

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

            {/* ERRO DE VALIDAÇÃO */}
            {validationError && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3 animate-in fade-in duration-300">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-red-900">Atenção</h4>
                  <p className="text-xs text-red-700 font-medium leading-relaxed mt-0.5">
                    {validationError}
                  </p>
                </div>
              </div>
            )}

            {/* RETORNO: DADOS ENCONTRADOS + VALOR REAL + BOTÃO DE CRIAR CONTA */}
            {searchStage === 'found' && (
              <div className="bg-gradient-to-b from-[#F0FAF2] to-white border-2 border-[#00BF30]/60 rounded-3xl p-5 sm:p-7 space-y-5 shadow-xl shadow-[#00BF30]/10 animate-in fade-in slide-in-from-top-4 duration-400">
                
                {/* Cabeçalho do Retorno */}
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#00BF30] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#00BF30]/25">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#00BF30]/15 text-[#008020] text-[11px] font-black uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      Registros Localizados com Sucesso
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-[#004010] leading-tight">
                      Dados encontrados para {inputValue}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#008020] font-medium">
                      O identificador possui correspondência ativa pronta para visualização detalhada.
                    </p>
                  </div>
                </div>

                {/* Card de Preço Real e Desbloqueio */}
                <div className="bg-white border border-[#E2EAE3] rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2EAE3]">
                    <div>
                      <span className="text-[11px] font-bold text-[#647067] uppercase tracking-wider block">
                        Custo desta consulta ({category.toUpperCase()})
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-xs font-bold text-[#647067]">Apenas</span>
                        <span className="text-3xl font-black text-[#004010]">
                          R$ {currentPriceFormatted}
                        </span>
                        <span className="text-xs font-semibold text-[#008020] bg-[#F0FAF2] px-2 py-0.5 rounded-full border border-[#00BF30]/30">
                          Sem mensalidade
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-[#647067] bg-[#F8FAF8] px-3 py-2 rounded-xl border border-[#E2EAE3]">
                      <Lock className="w-4 h-4 text-[#00BF30] shrink-0" />
                      <span>Crie sua conta para desbloquear o relatório completo</span>
                    </div>
                  </div>

                  {/* Ações de Conversão */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <Link
                      href={`/cadastro?query=${encodeURIComponent(inputValue)}&type=${category}`}
                      className="flex-1 bg-[#00BF30] hover:bg-[#008020] text-white font-extrabold py-3.5 px-6 rounded-xl text-sm sm:text-base text-center transition-all shadow-md shadow-[#00BF30]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <UserPlus className="w-4 h-4 shrink-0" />
                      <span>Criar Conta e Liberar Dados (R$ {currentPriceFormatted})</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </Link>

                    <Link
                      href="/login"
                      className="bg-[#F8FAF8] hover:bg-slate-100 text-[#15231A] border border-[#E2EAE3] font-bold py-3.5 px-5 rounded-xl text-sm text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <LogIn className="w-4 h-4 text-[#647067]" />
                      <span>Já tenho conta</span>
                    </Link>
                  </div>

                  <p className="text-[11px] text-[#647067] text-center">
                    Cadastro rápido em menos de 1 minuto. Pagamento via Pix com liberação imediata.
                  </p>
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
                  <span className="font-semibold text-[#15231A]">
                    {inputValue ? inputValue : 'Exemplo demonstrativo'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-[#647067] font-medium">Formato</span>
                  <span className="font-semibold text-[#008020]">
                    {searchStage === 'found' ? 'Localizado na base' : 'Verificação de exemplo'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-[#647067] font-medium">Preço</span>
                  <span className="font-bold text-[#004010]">
                    R$ {currentPriceFormatted}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-[#647067] font-medium">Dados disponíveis</span>
                  <span className="font-semibold text-[#15231A]">Dependem do módulo</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-[#647067] font-medium">Situação cadastral</span>
                  <span className="text-[#008020] font-medium">
                    {searchStage === 'found' ? 'Pronta para acesso' : 'Disponível após login'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#647067] font-medium">Informações complementares</span>
                  <span className="text-[#647067] italic">
                    {searchStage === 'found' ? 'Liberadas na conta' : 'Não consultadas'}
                  </span>
                </div>
              </div>

              {/* Rodapé ético obrigatório */}
              <div className="pt-4 border-t border-[#E2EAE3] bg-[#F8FAF8] -mx-6 -mb-6 p-4 rounded-b-3xl text-center">
                <p className="text-[11px] text-[#647067] font-semibold leading-relaxed">
                  Demonstração visual. Faça login ou crie sua conta para consultar dados reais.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
