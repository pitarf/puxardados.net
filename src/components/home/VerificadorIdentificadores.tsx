'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  ShieldCheck, 
  UserCheck, 
  Building2, 
  Phone, 
  Car 
} from 'lucide-react';
import { 
  validarCPF, 
  validarCNPJ, 
  validarTelefone, 
  validarPlaca 
} from './validators';

type VerifierType = 'cpf' | 'cnpj' | 'telefone' | 'placa';

/**
 * Componente do Bloco 11 — Conferidor Gratuito de Identificadores (#verificar-dados).
 * Validação 100% no cliente, transparente, com suporte a CNPJ alfanumérico 2026.
 */
export default function VerificadorIdentificadores() {
  const [type, setType] = useState<VerifierType>('cpf');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<{
    status: 'idle' | 'valid' | 'invalid';
    title?: string;
    details?: string;
    warning?: string;
  }>({ status: 'idle' });

  const handleTypeChange = (newType: VerifierType) => {
    setType(newType);
    setInputValue('');
    setResult({ status: 'idle' });
  };

  const handleReset = () => {
    setInputValue('');
    setResult({ status: 'idle' });
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      setResult({
        status: 'invalid',
        title: 'Campo vazio',
        warning: 'Informe o dado necessário para verificar.'
      });
      return;
    }

    if (type === 'cpf') {
      const res = validarCPF(inputValue);
      if (res.valido) {
        setResult({
          status: 'valid',
          title: 'Estrutura de CPF válida',
          details: 'O número informado possui formato e dígitos verificadores matematicamente compatíveis.',
          warning: 'Essa verificação não confirma que o CPF existe ou está regular na Receita Federal.'
        });
      } else {
        setResult({
          status: 'invalid',
          title: 'Formato inválido',
          warning: res.mensagem || 'Confira o CPF informado. A sequência não corresponde a um formato válido.'
        });
      }
    } else if (type === 'cnpj') {
      const res = validarCNPJ(inputValue);
      if (res.valido) {
        setResult({
          status: 'valid',
          title: 'Estrutura de CNPJ compatível',
          details: `O identificador passou pela validação estrutural do padrão ${res.tipo === 'alfanumerico' ? 'alfanumérico oficial (vigente a partir de julho/2026)' : 'numérico tradicional'}.`,
          warning: 'A verificação não confirma a existência ou situação cadastral da empresa.'
        });
      } else {
        setResult({
          status: 'invalid',
          title: 'Formato inválido',
          warning: res.mensagem || 'Revise o CNPJ informado e tente novamente.'
        });
      }
    } else if (type === 'telefone') {
      const res = validarTelefone(inputValue);
      if (res.valido) {
        setResult({
          status: 'valid',
          title: 'Formato de telefone compatível',
          details: `Tipo de numeração: ${res.tipo === 'celular' ? 'Telefone celular' : 'Telefone fixo'}. DDD: ${res.ddd}. Formato nacional válido.`,
          warning: 'Não comprova titularidade, operadora atual ou atividade da linha.'
        });
      } else {
        setResult({
          status: 'invalid',
          title: 'Formato inválido',
          warning: res.mensagem || 'Informe um telefone brasileiro completo com DDD.'
        });
      }
    } else if (type === 'placa') {
      const res = validarPlaca(inputValue);
      if (res.valido) {
        setResult({
          status: 'valid',
          title: 'Formato de placa compatível',
          details: `Padrão reconhecido: ${res.tipo === 'mercosul' ? 'Placa Mercosul (LLLNLNN)' : 'Placa tradicional brasileira (LLL-NNNN)'}.`,
          warning: 'Não confirma a existência, propriedade ou regularidade do veículo.'
        });
      } else {
        setResult({
          status: 'invalid',
          title: 'Formato inválido',
          warning: res.mensagem || 'Confira os sete caracteres da placa.'
        });
      }
    }
  };

  const placeholders: Record<VerifierType, string> = {
    cpf: 'Digite o CPF (Ex: 000.000.000-00)',
    cnpj: 'Digite o CNPJ numérico ou alfanumérico (Ex: 12.ABC.345/0001-00)',
    telefone: 'Digite o telefone com DDD (Ex: 11 99999-9999)',
    placa: 'Digite a placa (Ex: ABC1D23 ou ABC-1234)'
  };

  const buttonLabels: Record<VerifierType, string> = {
    cpf: 'Verificar formato do CPF',
    cnpj: 'Verificar formato do CNPJ',
    telefone: 'Verificar número',
    placa: 'Verificar placa'
  };

  return (
    <section id="verificar-dados" className="py-20 bg-white border-b border-[#E2EAE3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho do Bloco 11 */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00BF30]" />
            Diferencial PuxarDados
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#004010] tracking-tight">
            Verifique gratuitamente o formato de CPF, CNPJ, telefone ou placa
          </h2>
          <p className="text-[#647067] text-sm md:text-base leading-relaxed font-medium">
            Antes de iniciar uma consulta cadastral, confira se o identificador foi digitado corretamente. O verificador gratuito do PuxarDados analisa a estrutura básica da informação e mostra se ela corresponde a um padrão reconhecido. Essa verificação não executa uma pesquisa cadastral, não confirma a existência do registro e não acessa informações pessoais.
          </p>
        </div>

        {/* Caixa da Ferramenta */}
        <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Seletor de Tipo */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-1.5 rounded-2xl border border-[#E2EAE3]">
            {[
              { id: 'cpf', label: 'CPF', icon: <UserCheck className="w-4 h-4" /> },
              { id: 'cnpj', label: 'CNPJ', icon: <Building2 className="w-4 h-4" /> },
              { id: 'telefone', label: 'Telefone', icon: <Phone className="w-4 h-4" /> },
              { id: 'placa', label: 'Placa', icon: <Car className="w-4 h-4" /> }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTypeChange(item.id as VerifierType)}
                className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  type === item.id
                    ? 'bg-[#00BF30] text-white shadow-sm'
                    : 'text-[#647067] hover:text-[#004010] hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Formulário de Verificação */}
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setResult({ status: 'idle' });
                }}
                placeholder={placeholders[type]}
                className="w-full bg-white border border-[#E2EAE3] rounded-2xl px-5 py-4 text-sm sm:text-base font-semibold text-[#15231A] placeholder:text-[#647067]/60 focus:border-[#00BF30] focus:ring-2 focus:ring-[#00BF30]/20 outline-none transition-all pr-12"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#647067] hover:text-[#004010] p-1 cursor-pointer"
                  title="Limpar campo"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 bg-[#00BF30] hover:bg-[#008020] text-white font-bold py-3.5 px-6 rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span>{buttonLabels[type]}</span>
              </button>
              {inputValue && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-white hover:bg-slate-100 text-[#647067] font-semibold py-3.5 px-6 rounded-2xl text-sm border border-[#E2EAE3] transition-colors cursor-pointer"
                >
                  Limpar
                </button>
              )}
            </div>
          </form>

          {/* Retorno do Resultado */}
          {result.status === 'valid' && (
            <div className="bg-[#F0FAF2] border border-[#00BF30]/40 rounded-2xl p-5 space-y-3 animate-in fade-in duration-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00BF30] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-extrabold text-[#004010]">
                    {result.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#008020] font-medium leading-relaxed">
                    {result.details}
                  </p>
                </div>
              </div>
              {result.warning && (
                <div className="pt-2 border-t border-[#00BF30]/20 text-xs text-[#008020]/90 font-medium">
                  <strong>Aviso:</strong> {result.warning}
                </div>
              )}
            </div>
          )}

          {result.status === 'invalid' && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 space-y-2 animate-in fade-in duration-300">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-red-900">{result.title}</h4>
                  <p className="text-xs text-red-700 font-medium leading-relaxed mt-0.5">
                    {result.warning}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="text-center text-[11px] text-[#647067] font-semibold uppercase tracking-wider">
            Validação local instantânea • Sem gravação de dados pessoais • 100% Gratuito
          </div>

        </div>

      </div>
    </section>
  );
}
