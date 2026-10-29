'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export const faqsData: FaqItem[] = [
  {
    id: 1,
    question: "O que significa puxar dados?",
    answer: "Puxar dados é uma expressão popular utilizada para descrever pesquisas de informações relacionadas a um identificador, como CPF, CNPJ, telefone, placa ou nome."
  },
  {
    id: 2,
    question: "Como consultar dados online?",
    answer: "Escolha o tipo de consulta, informe o identificador correspondente e continue para conhecer os módulos e preços disponíveis."
  },
  {
    id: 3,
    question: "Quais tipos de consulta existem no PuxarDados?",
    answer: "A plataforma apresenta modalidades relacionadas a CPF, CNPJ, telefone, placa e nome, conforme os serviços efetivamente disponíveis."
  },
  {
    id: 4,
    question: "É possível puxar dados pelo CPF?",
    answer: "Existem modalidades de verificação cadastral por CPF. O conteúdo acessível depende do serviço contratado, das fontes e das condições legais aplicáveis."
  },
  {
    id: 5,
    question: "Posso consultar dados pelo CNPJ?",
    answer: "Sim. A consulta por CNPJ pode envolver informações cadastrais empresariais, conforme a modalidade disponível."
  },
  {
    id: 6,
    question: "É possível puxar dados pelo telefone?",
    answer: "Um número brasileiro com DDD pode ser utilizado como ponto de partida para serviços compatíveis. Um registro associado não comprova necessariamente quem utiliza a linha atualmente."
  },
  {
    id: 7,
    question: "Como consultar dados pela placa?",
    answer: "Informe a placa brasileira e conheça as modalidades disponíveis para pesquisa de informações veiculares."
  },
  {
    id: 8,
    question: "É possível consultar dados pelo nome?",
    answer: "Podem existir modalidades de pesquisa por nome, observadas suas limitações de identificação e a possibilidade de homônimos."
  },
  {
    id: 9,
    question: "Quanto custa puxar dados?",
    answer: "O preço varia conforme a categoria e os módulos selecionados. O valor exato é sempre informado com total clareza na tela antes de você confirmar qualquer consulta."
  },
  {
    id: 10,
    question: "A consulta de dados é gratuita?",
    answer: "A validação básica e a verificação estrutural de formato são gratuitas no topo da página. Já as consultas detalhadas aos registros cadastrais possuem custos individuais acessíveis a partir de R$ 0,50."
  },
  {
    id: 11,
    question: "Posso pagar por Pix?",
    answer: "Sim. A plataforma aceita recargas de saldo instantâneas via Pix. Assim que o pagamento é identificado, seus créditos ficam imediatamente disponíveis para realizar consultas."
  },
  {
    id: 12,
    question: "Preciso pagar mensalidade?",
    answer: "Não. A plataforma opera no modelo pré-pago sob demanda, sem mensalidades, assinaturas ou cobranças recorrentes. Você recarrega apenas o valor que deseja utilizar."
  },
  {
    id: 13,
    question: "Como funciona uma consulta por módulo?",
    answer: "Cada módulo corresponde a um grupo específico de dados (como contatos, veículos ou processos). Você escolhe e paga exclusivamente pelas informações que realmente precisa."
  },
  {
    id: 14,
    question: "Todas as informações estão incluídas em uma única consulta?",
    answer: "Depende da modalidade escolhida. Você pode optar por consultas pontuais e econômicas ou selecionar múltiplos módulos para obter um relatório completo e unificado."
  },
  {
    id: 15,
    question: "O que acontece quando não há dados encontrados?",
    answer: "A plataforma retorna a informação real do registro. Caso não existam dados cadastrados nos repositórios para o documento pesquisado, o sistema reporta o resultado com total transparência."
  },
  {
    id: 16,
    question: "CPF válido significa CPF regular?",
    answer: "Não. A validação matemática não comprova a situação cadastral na Receita Federal."
  },
  {
    id: 17,
    question: "O CNPJ pode conter letras?",
    answer: "Sim. A Receita Federal começou a emitir CNPJs alfanuméricos em julho de 2026, mantendo válidos os formatos numéricos anteriores."
  },
  {
    id: 18,
    question: "É possível verificar um telefone gratuitamente?",
    answer: "O verificador gratuito previsto na homepage analisa formato e DDD, mas não comprova titularidade ou atividade da linha."
  },
  {
    id: 19,
    question: "Posso validar uma placa gratuitamente?",
    answer: "O verificador pode reconhecer a estrutura de placa tradicional ou Mercosul, sem confirmar registro ou propriedade do veículo."
  },
  {
    id: 20,
    question: "Uma pesquisa por nome identifica uma pessoa com certeza?",
    answer: "Não. Pessoas diferentes podem possuir o mesmo nome, e os resultados precisam ser interpretados com cautela."
  },
  {
    id: 21,
    question: "Todos os dados estão sempre atualizados?",
    answer: "Não necessariamente. A atualização depende das fontes e das modalidades utilizadas."
  },
  {
    id: 22,
    question: "O que é consulta cadastral?",
    answer: "É uma pesquisa destinada à verificação de determinadas informações relacionadas a um cadastro ou identificador."
  },
  {
    id: 23,
    question: "Qual é a diferença entre dados pessoais e dados públicos?",
    answer: "Dados pessoais estão relacionados a pessoas naturais identificadas ou identificáveis. Informações publicamente acessíveis também podem estar sujeitas a regras de proteção de dados."
  },
  {
    id: 24,
    question: "Posso consultar qualquer pessoa livremente?",
    answer: "Não. O tratamento de dados pessoais exige fundamento adequado e respeito às condições legais aplicáveis."
  },
  {
    id: 25,
    question: "Preciso criar uma conta?",
    answer: "Para testar o formato do documento no verificador gratuito, não é necessário cadastro. Para visualizar os relatórios e consultas completas, basta criar sua conta rapidamente."
  },
  {
    id: 26,
    question: "O PuxarDados é um serviço oficial do governo?",
    answer: "Não. O PuxarDados é uma plataforma privada e 100% independente, sem qualquer vínculo direto ou institucional com órgãos governamentais."
  },
  {
    id: 27,
    question: "Posso consultar dados pelo celular?",
    answer: "Sim. Toda a interface da plataforma é otimizada para smartphones e tablets, permitindo pesquisar e visualizar relatórios na tela do seu celular com máxima rapidez e conforto."
  },
  {
    id: 28,
    question: "Como escolher o tipo de consulta?",
    answer: "Você pode utilizar o seletor rápido no topo da página ou o nosso Assistente de Consultas logo abaixo para identificar a melhor opção para a informação que você possui."
  },
  {
    id: 29,
    question: "Como os resultados são apresentados?",
    answer: "Os resultados são organizados em relatórios visuais limpos, com campos estruturados, badges de status e opções rápidas para visualização ou cópia das informações."
  },
  {
    id: 30,
    question: "Como começar uma consulta agora?",
    answer: "Basta escolher a categoria desejada no formulário no topo desta página, digitar o identificador e clicar em consultar para iniciar imediatamente."
  }
];

/**
 * Accordion de FAQ acessível contendo todas as 30 perguntas públicas (Bloco 24).
 * Renderiza todas as respostas no HTML para rastreamento SEO e acessibilidade.
 */
export default function FaqAccordion30() {
  const [openIds, setOpenIds] = useState<number[]>([1]); // Primeira pergunta aberta por padrão

  const toggle = (id: number) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 bg-[#F8FAF8] border-b border-[#E2EAE3]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho do Bloco 24 */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#00BF30]" />
            Tire Suas Dúvidas
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#004010] tracking-tight">
            Perguntas frequentes sobre puxar dados e consultas cadastrais
          </h2>
          <p className="text-[#647067] text-sm md:text-base font-medium">
            Confira respostas objetivas e transparentes sobre identificadores, tipos de consulta, preços e diretrizes de privacidade.
          </p>
        </div>

        {/* Lista das 30 Perguntas */}
        <div className="space-y-3.5">
          {faqsData.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className="bg-white border border-[#E2EAE3] rounded-2xl overflow-hidden transition-all duration-200 hover:border-[#00BF30]/40"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-4 sm:py-5 flex items-center justify-between text-left font-bold text-[#15231A] hover:text-[#008020] transition-colors focus:outline-none"
                >
                  <span className="pr-4 text-sm sm:text-base leading-snug">
                    <span className="text-[#00BF30] mr-2">{faq.id}.</span>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#00BF30] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#647067] shrink-0" />
                  )}
                </button>

                {/* Conteúdo sempre no HTML, visibilidade via estilo */}
                <div
                  className={`transition-all duration-300 ease-in-out px-6 ${
                    isOpen ? 'max-h-96 pb-5 pt-1 opacity-100' : 'max-h-0 pb-0 pt-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <p className="text-sm text-[#647067] leading-relaxed font-medium border-t border-slate-100 pt-3">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
