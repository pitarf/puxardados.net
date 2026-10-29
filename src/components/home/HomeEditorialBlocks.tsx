import React from 'react';
import Link from 'next/link';
import { 
  UserCheck, 
  Building2, 
  Phone, 
  Car, 
  Users, 
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Scale,
  Database,
  Lock,
  Layers,
  FileText,
  Search
} from 'lucide-react';

interface PricingItem {
  id: string;
  name: string;
  category: string;
  price: number;
}

interface HomeBlocksProps {
  pricings: PricingItem[];
}

/**
 * Blocos 05, 06, 08, 09, 10, 12 ao 23, 25 e 26.
 * Todos os textos originais, títulos H2/H3 semânticos, comparativo e cards comerciais.
 */
export default function HomeEditorialBlocks({ pricings }: HomeBlocksProps) {
  const getPrice = (id: string, defaultPrice: number) => {
    const found = pricings.find(p => p.id === id);
    return found ? found.price : defaultPrice;
  };

  return (
    <>
      {/* ===================== BLOCO 05 — INTRODUÇÃO SEO ===================== */}
      <section className="py-20 bg-white border-b border-[#E2EAE3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-4">
            <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-block">
              Fundamentos de Pesquisa
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#004010] tracking-tight">
              O que significa puxar dados e como funciona uma consulta cadastral?
            </h2>
          </div>

          <div className="space-y-6 text-[#647067] text-base leading-relaxed font-medium">
            <p>
              A expressão "puxar dados" é utilizada popularmente para descrever pesquisas de informações relacionadas a pessoas, empresas, telefones e veículos.
            </p>
            <p>
              Na prática, consultar dados significa utilizar determinado identificador para verificar registros ou informações disponíveis em uma modalidade específica de pesquisa.
            </p>
            <p>
              Esses identificadores podem incluir CPF, CNPJ, telefone, placa e nome. Cada tipo de consulta possui características próprias.
            </p>
            <p>
              Uma pesquisa iniciada pelo CPF é diferente de uma consulta empresarial por CNPJ. Da mesma forma, verificar um número de telefone não representa o mesmo procedimento de uma consulta veicular. No PuxarDados, o usuário pode conhecer as modalidades disponíveis, entender suas diferenças e selecionar o serviço correspondente à informação que possui.
            </p>

            {/* Subseções H3 do Bloco 05 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-6 space-y-2.5">
                <h3 className="text-lg font-bold text-[#004010]">O que são dados cadastrais?</h3>
                <p className="text-sm">
                  Dados cadastrais são informações utilizadas para identificar ou organizar registros de pessoas, empresas e outros elementos cadastrados em determinado sistema. Dependendo do contexto, podem incluir identificadores, nomes, informações de contato e características associadas ao cadastro. Nem todas as informações cadastrais são públicas ou livremente acessíveis.
                </p>
              </div>

              <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-6 space-y-2.5">
                <h3 className="text-lg font-bold text-[#004010]">Qual é a diferença entre consultar dados e pesquisar dados?</h3>
                <p className="text-sm">
                  Pesquisar dados é uma expressão ampla que pode abranger buscas públicas, verificações documentais e análises de informações. Uma consulta cadastral costuma utilizar um identificador específico e uma fonte ou modalidade determinada para retornar determinadas categorias de informação.
                </p>
              </div>

              <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-6 space-y-2.5">
                <h3 className="text-lg font-bold text-[#004010]">Preciso saber todos os dados antes de consultar?</h3>
                <p className="text-sm">
                  Não. O tipo de informação necessária depende da modalidade selecionada. Um CPF, CNPJ, telefone, nome ou placa pode ser utilizado como ponto de partida, quando o serviço correspondente estiver disponível.
                </p>
              </div>

              <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-6 space-y-2.5">
                <h3 className="text-lg font-bold text-[#004010]">Uma consulta sempre encontra informações?</h3>
                <p className="text-sm">
                  Não. Os resultados dependem da disponibilidade, atualização e abrangência das fontes, além das condições legais de acesso.
                </p>
              </div>
            </div>

            <div className="text-center pt-4">
              <a
                href="#consultar-dados"
                className="inline-flex items-center gap-2 bg-[#00BF30] hover:bg-[#008020] text-white font-bold py-3.5 px-8 rounded-xl shadow-md transition-all active:scale-95"
              >
                <span>Escolher tipo de consulta</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== BLOCO 06 — TIPOS DE CONSULTA ===================== */}
      <section id="tipos-de-consulta" className="py-20 bg-[#F8FAF8] border-b border-[#E2EAE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-block">
              Modalidades Especializadas
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#004010] tracking-tight">
              Quais tipos de consulta de dados estão disponíveis?
            </h2>
            <p className="text-[#647067] text-sm md:text-base leading-relaxed font-medium">
              O PuxarDados organiza as modalidades de pesquisa conforme o identificador utilizado. Conheça as diferenças entre consultar CPF, CNPJ, telefone, placa e nome.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* CARD 1 — CPF */}
            <div className="bg-white border border-[#E2EAE3] rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#00BF30]/50 hover:shadow-lg transition-all space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F0FAF2] text-[#00BF30] border border-[#00BF30]/30 flex items-center justify-center">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#004010]">Consulta de dados por CPF</h3>
                <p className="text-sm text-[#647067] leading-relaxed">
                  O CPF é um identificador utilizado no cadastro de pessoas físicas. As modalidades de consulta por CPF podem envolver verificações cadastrais específicas, conforme os serviços realmente oferecidos e as condições legais aplicáveis. A existência de um CPF com estrutura válida não significa que a situação cadastral esteja regular. O conteúdo retornado depende dos módulos disponíveis.
                </p>
              </div>
              <a
                href="#consultar-dados"
                className="w-full bg-[#F8FAF8] hover:bg-[#00BF30] hover:text-white border border-[#E2EAE3] hover:border-[#00BF30] text-[#004010] font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <span>Consultar CPF</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* CARD 2 — CNPJ */}
            <div className="bg-white border border-[#E2EAE3] rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#00BF30]/50 hover:shadow-lg transition-all space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F0FAF2] text-[#00BF30] border border-[#00BF30]/30 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#004010]">Consulta de dados empresariais por CNPJ</h3>
                <p className="text-sm text-[#647067] leading-relaxed">
                  O CNPJ identifica empresas e entidades no Brasil. Nossa consulta empresarial retorna razão social, nome fantasia, situação cadastral na Receita Federal, atividade econômica principal e secundária, endereço e quadro de sócios. O sistema aceita tanto o formato numérico clássico quanto o novo padrão alfanumérico da Receita.
                </p>
              </div>
              <a
                href="#consultar-dados"
                className="w-full bg-[#F8FAF8] hover:bg-[#00BF30] hover:text-white border border-[#E2EAE3] hover:border-[#00BF30] text-[#004010] font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <span>Consultar CNPJ</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* CARD 3 — TELEFONE */}
            <div className="bg-white border border-[#E2EAE3] rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#00BF30]/50 hover:shadow-lg transition-all space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F0FAF2] text-[#00BF30] border border-[#00BF30]/30 flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#004010]">Consulta de dados por telefone</h3>
                <p className="text-sm text-[#647067] leading-relaxed">
                  Um número de telefone com DDD pode ser utilizado como ponto de partida para determinadas modalidades de pesquisa. Dependendo do serviço e das fontes legalmente acessíveis, podem existir referências relacionadas à numeração ou a cadastros. Um eventual vínculo não comprova necessariamente quem utiliza a linha atualmente.
                </p>
              </div>
              <a
                href="#consultar-dados"
                className="w-full bg-[#F8FAF8] hover:bg-[#00BF30] hover:text-white border border-[#E2EAE3] hover:border-[#00BF30] text-[#004010] font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <span>Consultar telefone</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* CARD 4 — PLACA */}
            <div className="bg-white border border-[#E2EAE3] rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#00BF30]/50 hover:shadow-lg transition-all space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F0FAF2] text-[#00BF30] border border-[#00BF30]/30 flex items-center justify-center">
                  <Car className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#004010]">Consulta de dados de veículo pela placa</h3>
                <p className="text-sm text-[#647067] leading-relaxed">
                  A placa é utilizada como identificador para iniciar pesquisas veiculares. Dependendo do relatório, podem estar disponíveis características técnicas e outras informações autorizadas relacionadas ao veículo. A placa, por si só, não autoriza acesso irrestrito a dados pessoais de proprietários.
                </p>
              </div>
              <a
                href="#consultar-dados"
                className="w-full bg-[#F8FAF8] hover:bg-[#00BF30] hover:text-white border border-[#E2EAE3] hover:border-[#00BF30] text-[#004010] font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <span>Consultar placa</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* CARD 5 — NOME */}
            <div className="bg-white border border-[#E2EAE3] rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#00BF30]/50 hover:shadow-lg transition-all space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F0FAF2] text-[#00BF30] border border-[#00BF30]/30 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#004010]">Pesquisa cadastral por nome</h3>
                <p className="text-sm text-[#647067] leading-relaxed">
                  A pesquisa por nome pode ajudar a encontrar possíveis correspondências em modalidades autorizadas. Entretanto, pessoas diferentes podem possuir nomes iguais. Um resultado por nome deve ser interpretado com cuidado e não pode ser tratado automaticamente como identificação definitiva.
                </p>
              </div>
              <a
                href="#consultar-dados"
                className="w-full bg-[#F8FAF8] hover:bg-[#00BF30] hover:text-white border border-[#E2EAE3] hover:border-[#00BF30] text-[#004010] font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <span>Consultar por nome</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* CARD SÍNTESE */}
            <div className="bg-gradient-to-br from-[#004010] to-[#008020] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center font-bold text-lg">
                  ⚡
                </div>
                <h3 className="text-xl font-bold">Central Unificada PuxarDados</h3>
                <p className="text-sm text-emerald-100 leading-relaxed">
                  Pesquise de forma rápida, organizada e segura. Todas as modalidades contam com suporte a recarga transparente via Pix, sem necessidade de mensalidades fixas ou contratos de fidelidade.
                </p>
              </div>
              <a
                href="#consultar-dados"
                className="w-full bg-white hover:bg-emerald-50 text-[#004010] font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Iniciar Pesquisa Agora</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== BLOCO 08 — COMO FUNCIONA A PLATAFORMA ===================== */}
      <section id="como-funciona" className="py-20 bg-white border-b border-[#E2EAE3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-block">
              Passo a Passo Transparente
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#004010] tracking-tight">
              Como consultar dados cadastrais online no PuxarDados?
            </h2>
            <p className="text-[#647067] text-sm md:text-base leading-relaxed font-medium">
              Siga os passos simples para navegar entre as modalidades e obter suas pesquisas com clareza.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '1',
                title: 'Escolha a categoria',
                desc: 'Selecione CPF, CNPJ, telefone, placa ou nome. O formulário será ajustado ao identificador escolhido.'
              },
              {
                num: '2',
                title: 'Informe o identificador',
                desc: 'Digite a informação necessária. O sistema poderá conferir inicialmente o formato, quando aplicável.'
              },
              {
                num: '3',
                title: 'Acesse sua conta',
                desc: 'Crie sua conta ou faça login para utilizar as modalidades disponíveis. A validação inicial não representa pesquisa concluída.'
              },
              {
                num: '4',
                title: 'Escolha o módulo',
                desc: 'Conheça as categorias de informação oferecidas pelo serviço correspondente.'
              },
              {
                num: '5',
                title: 'Confira o preço',
                desc: 'Visualize o valor e as condições antes da contratação.'
              },
              {
                num: '6',
                title: 'Confirme a pesquisa',
                desc: 'Utilize o saldo disponível ou método de pagamento efetivamente oferecido.'
              },
              {
                num: '7',
                title: 'Visualize o resultado',
                desc: 'Após a execução real da consulta, as informações retornadas serão apresentadas no painel, observados os limites legais.'
              },
              {
                num: '✓',
                title: 'Comece agora',
                desc: 'Tudo pronto para realizar sua primeira pesquisa com total segurança e agilidade.',
                cta: true
              }
            ].map((step, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-6 border flex flex-col justify-between space-y-4 ${
                  step.cta 
                    ? 'bg-[#F0FAF2] border-[#00BF30]/40' 
                    : 'bg-[#F8FAF8] border-[#E2EAE3]'
                }`}
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00BF30] text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                    {step.num}
                  </div>
                  <h3 className="text-base font-bold text-[#004010]">{step.title}</h3>
                  <p className="text-xs text-[#647067] leading-relaxed font-medium">{step.desc}</p>
                </div>

                {step.cta && (
                  <a
                    href="#consultar-dados"
                    className="w-full bg-[#00BF30] hover:bg-[#008020] text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 text-center"
                  >
                    <span>Começar consulta de dados</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== BLOCO 09 — COMPARATIVO ENTRE IDENTIFICADORES ===================== */}
      <section id="comparativo" className="py-20 bg-white border-b border-[#E2EAE3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-block">
              Tabela Comparativa
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#004010] tracking-tight">
              CPF, CNPJ, telefone, nome ou placa: qual consulta utilizar?
            </h2>
            <p className="text-[#647067] text-sm md:text-base leading-relaxed font-medium">
              Cada identificador é utilizado em um contexto diferente. Escolher o tipo de consulta correto evita erros e facilita a compreensão do conteúdo disponível.
            </p>
          </div>

          {/* Tabela Responsiva */}
          <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#004010] text-white text-xs font-bold uppercase tracking-wider">
                    <th className="py-4 px-6">Informação disponível</th>
                    <th className="py-4 px-6">Tipo de consulta</th>
                    <th className="py-4 px-6">Objetivo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2EAE3] font-medium text-[#15231A]">
                  <tr className="hover:bg-white transition-colors">
                    <td className="py-4 px-6 font-bold text-[#004010]">CPF</td>
                    <td className="py-4 px-6">Consulta CPF</td>
                    <td className="py-4 px-6 text-[#647067]">Verificação cadastral de pessoa física</td>
                  </tr>
                  <tr className="hover:bg-white transition-colors">
                    <td className="py-4 px-6 font-bold text-[#004010]">CNPJ</td>
                    <td className="py-4 px-6">Consulta CNPJ</td>
                    <td className="py-4 px-6 text-[#647067]">Pesquisa de dados empresariais</td>
                  </tr>
                  <tr className="hover:bg-white transition-colors">
                    <td className="py-4 px-6 font-bold text-[#004010]">Telefone</td>
                    <td className="py-4 px-6">Consulta telefone</td>
                    <td className="py-4 px-6 text-[#647067]">Verificação relacionada à numeração e aos módulos disponíveis</td>
                  </tr>
                  <tr className="hover:bg-white transition-colors">
                    <td className="py-4 px-6 font-bold text-[#004010]">Placa</td>
                    <td className="py-4 px-6">Consulta placa</td>
                    <td className="py-4 px-6 text-[#647067]">Pesquisa de informações veiculares</td>
                  </tr>
                  <tr className="hover:bg-white transition-colors">
                    <td className="py-4 px-6 font-bold text-[#004010]">Nome</td>
                    <td className="py-4 px-6">Consulta por nome</td>
                    <td className="py-4 px-6 text-[#647067]">Pesquisa de possíveis correspondências</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Subseções H3 do Bloco 09 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-6 space-y-2">
              <h3 className="text-base font-bold text-[#004010]">
                Posso consultar diferentes categorias no mesmo painel?
              </h3>
              <p className="text-xs text-[#647067] leading-relaxed font-medium">
                O PuxarDados reúne modalidades diferentes de consulta, permitindo acessar serviços compatíveis com os identificadores disponíveis. Cada modalidade possui suas próprias regras e condições.
              </p>
            </div>
            <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-6 space-y-2">
              <h3 className="text-base font-bold text-[#004010]">
                Uma consulta retorna todas as informações?
              </h3>
              <p className="text-xs text-[#647067] leading-relaxed font-medium">
                Você tem flexibilidade total: pode contratar módulos pontuais para economizar ou gerar um relatório completo com todas as informações reunidas em um único clique.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ===================== BLOCO 10 — PREÇOS E CONTRATAÇÃO ===================== */}
      <section id="precos" className="py-20 bg-[#F8FAF8] border-b border-[#E2EAE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-block">
              Valores Reais e Transparentes
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#004010] tracking-tight">
              Quanto custa puxar dados online?
            </h2>
            <p className="text-[#647067] text-sm md:text-base leading-relaxed font-medium">
              O preço de uma consulta cadastral depende da modalidade escolhida e das informações incluídas no módulo contratado. No PuxarDados, os serviços podem ser organizados por categorias, permitindo que o usuário conheça o conteúdo e o valor antes de confirmar. Não existe um preço único que represente obrigatoriamente todas as informações sobre um CPF, CNPJ, telefone, nome ou veículo.
            </p>
          </div>

          {/* Cards comerciais principais auditados */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Consulta CPF */}
            <div className="bg-white border border-[#E2EAE3] rounded-3xl p-6 flex flex-col justify-between hover:border-[#00BF30]/50 hover:shadow-lg transition-all space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#F0FAF2] text-[#00BF30] flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#004010]">Consulta CPF</h3>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-[#647067] uppercase tracking-wider">A partir de</span>
                  <p className="text-2xl font-black text-[#004010]">
                    R$ {getPrice('dados_basicos', 1.00).toFixed(2).replace('.', ',')}
                  </p>
                </div>
                <p className="text-xs text-[#647067] leading-relaxed">
                  Módulos de dados cadastrais básicos, telefones vinculados e endereços cadastrados conforme disponibilidade.
                </p>
              </div>
              <a
                href="#consultar-dados"
                className="w-full bg-[#00BF30] hover:bg-[#008020] text-white font-bold py-2.5 px-3 rounded-xl text-xs text-center transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Ver consulta CPF</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Consulta CNPJ */}
            <div className="bg-white border border-[#E2EAE3] rounded-3xl p-6 flex flex-col justify-between hover:border-[#00BF30]/50 hover:shadow-lg transition-all space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#F0FAF2] text-[#00BF30] flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#004010]">Consulta CNPJ</h3>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-[#647067] uppercase tracking-wider">A partir de</span>
                  <p className="text-2xl font-black text-[#004010]">
                    R$ {getPrice('cnpj_basico', 1.00).toFixed(2).replace('.', ',')}
                  </p>
                </div>
                <p className="text-xs text-[#647067] leading-relaxed">
                  Apresenta informações empresariais públicas, situação cadastral, atividade econômica e quadro de sócios.
                </p>
              </div>
              <a
                href="#consultar-dados"
                className="w-full bg-[#00BF30] hover:bg-[#008020] text-white font-bold py-2.5 px-3 rounded-xl text-xs text-center transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Ver consulta CNPJ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Consulta Telefone */}
            <div className="bg-white border border-[#E2EAE3] rounded-3xl p-6 flex flex-col justify-between hover:border-[#00BF30]/50 hover:shadow-lg transition-all space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#F0FAF2] text-[#00BF30] flex items-center justify-center font-bold">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#004010]">Consulta Telefone</h3>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-[#647067] uppercase tracking-wider">A partir de</span>
                  <p className="text-2xl font-black text-[#004010]">
                    R$ {getPrice('telefones', 0.50).toFixed(2).replace('.', ',')}
                  </p>
                </div>
                <p className="text-xs text-[#647067] leading-relaxed">
                  Apresenta o conteúdo e as condições específicas associadas à numeração informada com DDD.
                </p>
              </div>
              <a
                href="#consultar-dados"
                className="w-full bg-[#00BF30] hover:bg-[#008020] text-white font-bold py-2.5 px-3 rounded-xl text-xs text-center transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Ver consulta telefone</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Consulta Placa */}
            <div className="bg-white border border-[#E2EAE3] rounded-3xl p-6 flex flex-col justify-between hover:border-[#00BF30]/50 hover:shadow-lg transition-all space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#F0FAF2] text-[#00BF30] flex items-center justify-center font-bold">
                  <Car className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#004010]">Consulta Placa</h3>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-[#647067] uppercase tracking-wider">A partir de</span>
                  <p className="text-2xl font-black text-[#004010]">
                    R$ {getPrice('veiculo_basico', 1.00).toFixed(2).replace('.', ',')}
                  </p>
                </div>
                <p className="text-xs text-[#647067] leading-relaxed">
                  Apresenta características técnicas, marca, modelo, ano e informações administrativas disponíveis.
                </p>
              </div>
              <a
                href="#consultar-dados"
                className="w-full bg-[#00BF30] hover:bg-[#008020] text-white font-bold py-2.5 px-3 rounded-xl text-xs text-center transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Ver consulta placa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Consulta por Nome */}
            <div className="bg-white border border-[#E2EAE3] rounded-3xl p-6 flex flex-col justify-between hover:border-[#00BF30]/50 hover:shadow-lg transition-all space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#F0FAF2] text-[#00BF30] flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#004010]">Consulta por Nome</h3>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-[#647067] uppercase tracking-wider">A partir de</span>
                  <p className="text-2xl font-black text-[#004010]">
                    R$ {getPrice('parentes', 1.00).toFixed(2).replace('.', ',')}
                  </p>
                </div>
                <p className="text-xs text-[#647067] leading-relaxed">
                  Pesquisa por nome completo e correspondências autorizadas com orientação preventiva de homônimos.
                </p>
              </div>
              <a
                href="#consultar-dados"
                className="w-full bg-[#00BF30] hover:bg-[#008020] text-white font-bold py-2.5 px-3 rounded-xl text-xs text-center transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Ver consulta por nome</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Subseções H3 explicativas de faturamento do Bloco 10 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 text-xs">
            <div className="bg-white border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
              <h3 className="text-sm font-bold text-[#004010]">É necessário pagar mensalidade?</h3>
              <p className="text-[#647067] leading-relaxed font-medium">
                Não. A plataforma trabalha com contratação por módulos e sem mensalidade obrigatória. Você adiciona saldo e utiliza apenas quando desejar.
              </p>
            </div>

            <div className="bg-white border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
              <h3 className="text-sm font-bold text-[#004010]">Posso pagar por Pix?</h3>
              <p className="text-[#647067] leading-relaxed font-medium">
                Sim. A plataforma aceita recarga de saldo via Pix com confirmação automatizada para liberação das consultas.
              </p>
            </div>

            <div className="bg-white border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
              <h3 className="text-sm font-bold text-[#004010]">A consulta completa custa R$ 0,50?</h3>
              <p className="text-[#647067] leading-relaxed font-medium">
                Não necessariamente. O preço a partir de R$ 0,50 está associado a módulos avulsos específicos (como conferência de e-mails ou telefones).
              </p>
            </div>

            <div className="bg-white border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
              <h3 className="text-sm font-bold text-[#004010]">Posso contratar apenas uma categoria?</h3>
              <p className="text-[#647067] leading-relaxed font-medium">
                Sim. Nosso painel permite a seleção individualizada de módulos, permitindo conferir o total exato antes de confirmar.
              </p>
            </div>

            <div className="bg-white border border-[#E2EAE3] rounded-2xl p-5 space-y-2 lg:col-span-2">
              <h3 className="text-sm font-bold text-[#004010]">O que acontece quando não há resultados?</h3>
              <p className="text-[#647067] leading-relaxed font-medium">
                A política comercial para consultas sem retorno reflete com exatidão as condições do serviço contratado e os termos da plataforma, exibindo sempre o retorno verdadeiro da pesquisa.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ===================== BLOCO 12 — O QUE SÃO DADOS CADASTRAIS? ===================== */}
      <section className="py-20 bg-white border-b border-[#E2EAE3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-4">
            <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-block">
              Estrutura de Cadastros
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#004010] tracking-tight">
              O que são dados cadastrais e quais informações podem fazer parte de uma consulta?
            </h2>
          </div>

          <div className="space-y-6 text-[#647067] text-base leading-relaxed font-medium">
            <p>
              Dados cadastrais são informações utilizadas para registrar, organizar ou identificar pessoas, empresas e outros elementos em determinados sistemas. O conteúdo de um cadastro depende da finalidade para a qual ele foi criado.
            </p>
            <p>
              Um cadastro empresarial pode utilizar CNPJ, nome empresarial e atividade econômica. Um cadastro relacionado a veículo pode utilizar placa e características técnicas. Já informações associadas a pessoas físicas podem constituir dados pessoais e exigem cuidados específicos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-sm">
              <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
                <h3 className="font-bold text-[#004010]">Dados de identificação</h3>
                <p>São informações utilizadas para diferenciar um registro de outro. O CPF e o CNPJ são exemplos de identificadores utilizados em contextos distintos.</p>
              </div>

              <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
                <h3 className="font-bold text-[#004010]">Dados de contato</h3>
                <p>Podem incluir telefone e endereço eletrônico. Quando relacionados a uma pessoa identificada ou identificável, esses dados podem estar sujeitos à LGPD.</p>
              </div>

              <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
                <h3 className="font-bold text-[#004010]">Dados empresariais</h3>
                <p>Podem incluir razão social, nome empresarial, situação cadastral, atividade econômica, natureza jurídica e informações societárias disponíveis conforme a fonte.</p>
              </div>

              <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
                <h3 className="font-bold text-[#004010]">Dados veiculares</h3>
                <p>Incluem características e registros relacionados à identificação de veículos, de acordo com a modalidade consultada.</p>
              </div>

              <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
                <h3 className="font-bold text-[#004010]">Dados de localização cadastral</h3>
                <p>Endereços podem fazer parte de determinados registros. Entretanto, a existência de um endereço em um cadastro não comprova a localização atual de uma pessoa.</p>
              </div>

              <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
                <h3 className="font-bold text-[#004010]">Informações históricas</h3>
                <p>Determinados sistemas podem manter registros anteriores. Uma informação histórica não representa obrigatoriamente a situação atual do cadastro.</p>
              </div>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 leading-relaxed font-semibold">
              <strong>Aviso:</strong> A disponibilidade das informações depende do módulo contratado. A plataforma apresenta apenas os dados estritamente contratados e autorizados.
            </div>
          </div>
        </div>
      </section>

      {/* ===================== BLOCO 13 — DADOS PESSOAIS E DADOS EMPRESARIAIS ===================== */}
      <section className="py-20 bg-[#F8FAF8] border-b border-[#E2EAE3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-4">
            <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-block">
              Segurança Jurídica & LGPD
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#004010] tracking-tight">
              Qual é a diferença entre dados pessoais, dados públicos e dados empresariais?
            </h2>
          </div>

          <div className="space-y-6 text-[#647067] text-base leading-relaxed font-medium">
            <p>
              Nem todas as informações possuem a mesma natureza jurídica ou os mesmos requisitos de acesso. Compreender essas diferenças ajuda o usuário a pesquisar dados de maneira responsável.
            </p>

            <div className="space-y-4 text-sm">
              <div className="bg-white border border-[#E2EAE3] rounded-2xl p-6 space-y-2">
                <h3 className="font-bold text-base text-[#004010]">O que são dados pessoais?</h3>
                <p>A LGPD considera dado pessoal a informação relacionada a pessoa natural identificada ou identificável. Dependendo do contexto, isso pode incluir nome, CPF, telefone e endereço.</p>
              </div>

              <div className="bg-white border border-[#E2EAE3] rounded-2xl p-6 space-y-2">
                <h3 className="font-bold text-base text-[#004010]">O que são dados públicos?</h3>
                <p>Algumas informações são disponibilizadas em registros e canais públicos. Entretanto, a publicidade de um registro não elimina automaticamente as obrigações aplicáveis ao tratamento de dados pessoais.</p>
              </div>

              <div className="bg-white border border-[#E2EAE3] rounded-2xl p-6 space-y-2">
                <h3 className="font-bold text-base text-[#004010]">O que são dados empresariais?</h3>
                <p>Dados empresariais incluem informações relacionadas a pessoas jurídicas, como identificação cadastral, atividades e situação de inscrição. Quando um registro empresarial também identificar uma pessoa natural, o tratamento dessa informação pode exigir atenção à legislação de proteção de dados.</p>
              </div>

              <div className="bg-white border border-[#E2EAE3] rounded-2xl p-6 space-y-2">
                <h3 className="font-bold text-base text-[#004010]">O que são dados pessoais sensíveis?</h3>
                <p>A LGPD define dados sensíveis como convicção religiosa, dados biométricos, opiniões políticas e filiação sindical. O PuxarDados prioriza a conformidade legal e não comercializa dados sensíveis protegidos por lei.</p>
              </div>

              <div className="bg-white border border-[#E2EAE3] rounded-2xl p-6 space-y-2">
                <h3 className="font-bold text-base text-[#004010]">O que significa verificar um cadastro?</h3>
                <p>Verificar um cadastro significa conferir informações com base em critérios e fontes apropriadas. Uma simples verificação matemática de CPF ou CNPJ não equivale à confirmação oficial do registro.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== BLOCOS 14 A 18 — APROFUNDAMENTO NAS MODALIDADES ===================== */}
      <section className="py-20 bg-white border-b border-[#E2EAE3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* BLOCO 14 — CONSULTAR DADOS PELO CPF */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#004010]">
              Como funciona a consulta de dados por CPF?
            </h2>
            <p className="text-sm sm:text-base text-[#647067] leading-relaxed font-medium">
              O CPF é utilizado para identificar pessoas físicas em diversos contextos administrativos e cadastrais. Uma pesquisa por CPF pode começar com a validação da estrutura do identificador e, quando houver uma modalidade legítima disponível, continuar para verificações cadastrais específicas. A quantidade de informações acessíveis depende da finalidade, das fontes utilizadas e das condições legais aplicáveis.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="bg-[#F8FAF8] p-4 rounded-xl border border-[#E2EAE3] space-y-1">
                <h3 className="font-bold text-[#004010]">CPF válido significa CPF regular?</h3>
                <p className="text-[#647067]">Não. A validação dos dígitos verificadores apenas demonstra que a sequência corresponde às regras matemáticas do identificador.</p>
              </div>
              <div className="bg-[#F8FAF8] p-4 rounded-xl border border-[#E2EAE3] space-y-1">
                <h3 className="font-bold text-[#004010]">É possível consultar informações cadastrais por CPF?</h3>
                <p className="text-[#647067]">Existem serviços com escopos distintos. O PuxarDados apresenta módulos juridicamente autorizados.</p>
              </div>
              <div className="bg-[#F8FAF8] p-4 rounded-xl border border-[#E2EAE3] space-y-1">
                <h3 className="font-bold text-[#004010]">Posso pesquisar CPF de terceiros livremente?</h3>
                <p className="text-[#647067]">Não de maneira irrestrita. O acesso e tratamento exigem finalidade e hipótese legal adequada.</p>
              </div>
            </div>
            <div className="pt-2">
              <a href="#consultar-dados" className="text-xs font-bold text-[#008020] hover:text-[#00BF30] inline-flex items-center gap-1">
                <span>Conhecer consulta CPF</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <hr className="border-[#E2EAE3]" />

          {/* BLOCO 15 — CONSULTAR DADOS PELO CNPJ */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#004010]">
              Como consultar dados de uma empresa pelo CNPJ?
            </h2>
            <p className="text-sm sm:text-base text-[#647067] leading-relaxed font-medium">
              O CNPJ identifica inscrições de empresas e outras entidades perante o cadastro administrado pela Receita Federal. Uma consulta empresarial pode ajudar a verificar informações como identificação cadastral, natureza jurídica, atividade econômica e situação de inscrição. Dependendo da fonte e do serviço, também podem existir informações relacionadas ao quadro societário.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2 text-xs">
              <div className="bg-[#F8FAF8] p-4 rounded-xl border border-[#E2EAE3] space-y-1">
                <h3 className="font-bold text-[#004010]">O que é situação cadastral?</h3>
                <p className="text-[#647067]">Indica a condição da inscrição perante os critérios do cadastro oficial da Receita Federal.</p>
              </div>
              <div className="bg-[#F8FAF8] p-4 rounded-xl border border-[#E2EAE3] space-y-1">
                <h3 className="font-bold text-[#004010]">O CNPJ pode conter letras?</h3>
                <p className="text-[#647067]">Sim. Desde julho de 2026, a Receita Federal passou a emitir inscrições no formato alfanumérico.</p>
              </div>
              <div className="bg-[#F8FAF8] p-4 rounded-xl border border-[#E2EAE3] space-y-1">
                <h3 className="font-bold text-[#004010]">Consulta gratuita de empresa?</h3>
                <p className="text-[#647067]">Existem canais públicos estatais gratuitos para consultas básicas e módulos particulares avançados.</p>
              </div>
              <div className="bg-[#F8FAF8] p-4 rounded-xl border border-[#E2EAE3] space-y-1">
                <h3 className="font-bold text-[#004010]">Empresa ativa está sem problemas?</h3>
                <p className="text-[#647067]">Não necessariamente. A situação cadastral ativa não equivale a uma garantia comercial irrestrita.</p>
              </div>
            </div>
            <div className="pt-2">
              <a href="#consultar-dados" className="text-xs font-bold text-[#008020] hover:text-[#00BF30] inline-flex items-center gap-1">
                <span>Consultar CNPJ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <hr className="border-[#E2EAE3]" />

          {/* BLOCO 16 — CONSULTAR DADOS PELO TELEFONE */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#004010]">
              É possível pesquisar dados utilizando um número de telefone?
            </h2>
            <p className="text-sm sm:text-base text-[#647067] leading-relaxed font-medium">
              Um telefone pode ser utilizado como informação inicial em determinadas modalidades de pesquisa. Antes de qualquer consulta cadastral, é importante conferir se o número foi informado com DDD e corresponde a um formato suportado. Informações eventualmente relacionadas a um telefone dependem das fontes acessíveis e das regras aplicáveis.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="bg-[#F8FAF8] p-4 rounded-xl border border-[#E2EAE3] space-y-1">
                <h3 className="font-bold text-[#004010]">Posso descobrir o titular pelo número?</h3>
                <p className="text-[#647067]">Registros associados dependem de bases legais acessíveis e não comprovam quem utiliza a linha no momento.</p>
              </div>
              <div className="bg-[#F8FAF8] p-4 rounded-xl border border-[#E2EAE3] space-y-1">
                <h3 className="font-bold text-[#004010]">O DDD revela a localização atual?</h3>
                <p className="text-[#647067]">Não. O DDD identifica uma região geográfica de registro de numeração, nunca localização GPS em tempo real.</p>
              </div>
              <div className="bg-[#F8FAF8] p-4 rounded-xl border border-[#E2EAE3] space-y-1">
                <h3 className="font-bold text-[#004010]">Posso consultar número de WhatsApp?</h3>
                <p className="text-[#647067]">Um número brasileiro pode ser informado como telefone. Isso não permite acessar mensagens privadas do app.</p>
              </div>
            </div>
            <div className="pt-2">
              <a href="#consultar-dados" className="text-xs font-bold text-[#008020] hover:text-[#00BF30] inline-flex items-center gap-1">
                <span>Consultar telefone</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <hr className="border-[#E2EAE3]" />

          {/* BLOCO 17 — CONSULTAR DADOS PELA PLACA */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#004010]">
              Como consultar dados de um veículo pela placa?
            </h2>
            <p className="text-sm sm:text-base text-[#647067] leading-relaxed font-medium">
              A placa é uma das formas de identificação utilizadas em veículos brasileiros. Ela pode ser utilizada como ponto de partida para modalidades de pesquisa sobre características técnicas e informações documentais ou administrativas disponíveis. Os registros apresentados dependem do relatório contratado e dos requisitos de acesso.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="bg-[#F8FAF8] p-4 rounded-xl border border-[#E2EAE3] space-y-1">
                <h3 className="font-bold text-[#004010]">O que posso consultar pela placa?</h3>
                <p className="text-[#647067]">Marca, modelo, ano e características técnicas são exemplos de retornos disponibilizados conforme o módulo.</p>
              </div>
              <div className="bg-[#F8FAF8] p-4 rounded-xl border border-[#E2EAE3] space-y-1">
                <h3 className="font-bold text-[#004010]">Consultar multas e IPVA pela placa?</h3>
                <p className="text-[#647067]">As regras variam pelo órgão responsável, podendo exigir número de Renavam ou autenticação direta.</p>
              </div>
              <div className="bg-[#F8FAF8] p-4 rounded-xl border border-[#E2EAE3] space-y-1">
                <h3 className="font-bold text-[#004010]">Descobrir qualquer dado do proprietário?</h3>
                <p className="text-[#647067]">Não. O acesso a dados pessoais vinculados a veículos possui rígidas restrições legais na LGPD.</p>
              </div>
            </div>
            <div className="pt-2">
              <a href="#consultar-dados" className="text-xs font-bold text-[#008020] hover:text-[#00BF30] inline-flex items-center gap-1">
                <span>Consultar placa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <hr className="border-[#E2EAE3]" />

          {/* BLOCO 18 — CONSULTAR DADOS PELO NOME */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#004010]">
              Como funciona uma pesquisa cadastral por nome?
            </h2>
            <p className="text-sm sm:text-base text-[#647067] leading-relaxed font-medium">
              A pesquisa por nome utiliza uma identificação textual como ponto de partida. Diferentemente do CPF ou CNPJ, o nome não funciona necessariamente como identificador único. Pessoas diferentes podem compartilhar o mesmo nome e sobrenome. Por isso, resultados de pesquisas por nome precisam ser interpretados com cuidado.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="bg-[#F8FAF8] p-4 rounded-xl border border-[#E2EAE3] space-y-1">
                <h3 className="font-bold text-[#004010]">Pesquisar apenas o primeiro nome?</h3>
                <p className="text-[#647067]">Um nome isolado é insuficiente para individualizar registros devido à enorme quantidade de pessoas.</p>
              </div>
              <div className="bg-[#F8FAF8] p-4 rounded-xl border border-[#E2EAE3] space-y-1">
                <h3 className="font-bold text-[#004010]">Nome completo garante exatidão?</h3>
                <p className="text-[#647067]">Não. Mesmo nomes completos frequentes possuem homônimos em território nacional.</p>
              </div>
              <div className="bg-[#F8FAF8] p-4 rounded-xl border border-[#E2EAE3] space-y-1">
                <h3 className="font-bold text-[#004010]">Como interpretar vários resultados?</h3>
                <p className="text-[#647067]">Devem ser avaliados elementos complementares legítimos sem expor terceiros indevidamente.</p>
              </div>
            </div>
            <div className="pt-2">
              <a href="#consultar-dados" className="text-xs font-bold text-[#008020] hover:text-[#00BF30] inline-flex items-center gap-1">
                <span>Conhecer consulta por nome</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ===================== BLOCO 19 — RESULTADOS DE CONSULTAS ===================== */}
      <section className="py-20 bg-[#F8FAF8] border-b border-[#E2EAE3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-4">
            <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-block">
              Interpretação Consciente
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#004010] tracking-tight">
              Como interpretar resultados de uma consulta cadastral?
            </h2>
            <p className="text-[#647067] text-sm md:text-base leading-relaxed font-medium">
              Uma pesquisa cadastral pode apresentar diferentes tipos de retorno. A interpretação depende do identificador utilizado, da modalidade contratada e da qualidade dos registros disponíveis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-white border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-[#004010]">Formato válido</h3>
              <p className="text-[#647067] leading-relaxed">Significa que a informação passou pela verificação estrutural. Não comprova existência do cadastro.</p>
            </div>
            <div className="bg-white border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-[#004010]">Registro encontrado</h3>
              <p className="text-[#647067] leading-relaxed">Indica retorno de dados conforme critérios do módulo e atualização das fontes utilizadas.</p>
            </div>
            <div className="bg-white border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-[#004010]">Resultado parcial</h3>
              <p className="text-[#647067] leading-relaxed">Alguns campos retornam enquanto outros permanecem indisponíveis. Lacunas não são preenchidas artificialmente.</p>
            </div>
            <div className="bg-white border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-[#004010]">Nenhum resultado</h3>
              <p className="text-[#647067] leading-relaxed">A fonte consultada pode não possuir registros correspondentes ou a pesquisa pode ter limitações legais.</p>
            </div>
            <div className="bg-white border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-[#004010]">Dados divergentes</h3>
              <p className="text-[#647067] leading-relaxed">Divergências entre diferentes cadastros podem ocorrer com o tempo e não significam automaticamente fraude.</p>
            </div>
            <div className="bg-white border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-[#004010]">Dados desatualizados</h3>
              <p className="text-[#647067] leading-relaxed">Registros cadastrais podem não refletir o momento atual. Exibimos datas de referência quando disponíveis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== BLOCO 20 — CASOS DE USO ===================== */}
      <section id="aplicacoes" className="py-20 bg-white border-b border-[#E2EAE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-block">
              Aplicações Legítimas
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#004010] tracking-tight">
              Em quais situações uma consulta cadastral pode ser útil?
            </h2>
            <p className="text-[#647067] text-sm md:text-base leading-relaxed font-medium">
              As consultas cadastrais podem auxiliar em verificações específicas, desde que utilizadas de acordo com a finalidade e os requisitos legais correspondentes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Conferência dos próprios dados',
                desc: 'Verificar informações relacionadas aos próprios registros cadastrais, quando houver modalidade apropriada.'
              },
              {
                title: 'Verificação de empresa',
                desc: 'Conferir dados cadastrais públicos relacionados a fornecedores, parceiros comerciais e pessoas jurídicas.'
              },
              {
                title: 'Conferência de contato empresarial',
                desc: 'Verificar referências públicas relacionadas a números de telefone comerciais antes de fechar negócios.'
              },
              {
                title: 'Pesquisa de informações veiculares',
                desc: 'Conhecer características técnicas e outros registros veiculares acessíveis conforme a modalidade.'
              },
              {
                title: 'Validação de identificadores',
                desc: 'Conferir se CPF, CNPJ, telefone ou placa possuem formatos compatíveis com os padrões oficiais reconhecidos.'
              },
              {
                title: 'Organização de cadastros autorizados',
                desc: 'Empresas podem analisar informações em seus próprios cadastros, desde que com finalidade legítima e base legal adequada.'
              }
            ].map((app, idx) => (
              <div key={idx} className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-3xl p-6 space-y-3 hover:border-[#00BF30]/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E2EAE3] text-[#00BF30] flex items-center justify-center font-bold">
                  ✓
                </div>
                <h3 className="text-base font-bold text-[#004010]">{app.title}</h3>
                <p className="text-xs text-[#647067] leading-relaxed font-medium">{app.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center text-xs text-[#647067] font-semibold max-w-3xl mx-auto">
            A plataforma não se destina a perseguição, cobrança abusiva, discriminação ou vigilância. O uso deve respeitar rigorosamente a legislação.
          </div>
        </div>
      </section>

      {/* ===================== BLOCO 21 — FONTES E DISPONIBILIDADE ===================== */}
      <section id="fontes" className="py-20 bg-[#F8FAF8] border-b border-[#E2EAE3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-4">
            <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-block">
              Transparência de Origem
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#004010] tracking-tight">
              De onde vêm as informações utilizadas em consultas cadastrais?
            </h2>
            <p className="text-[#647067] text-sm md:text-base leading-relaxed font-medium">
              Diferentes modalidades de consulta podem utilizar fontes específicas, públicas ou privadas, observadas as condições de acesso e a legislação aplicável. A existência de uma fonte pública não significa que todos os seus registros estejam disponíveis para uso comercial irrestrito, nem que a plataforma possua vínculo institucional direto.
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="bg-white border border-[#E2EAE3] rounded-2xl p-5 space-y-1.5">
              <h3 className="font-bold text-[#004010]">Receita Federal</h3>
              <p className="text-[#647067] leading-relaxed">
                A Receita Federal disponibiliza serviços oficiais relacionados a CPF e CNPJ, com requisitos específicos para cada tipo de verificação. O PuxarDados é independente e apresenta dados de fontes acessíveis de forma transparente.
              </p>
            </div>

            <div className="bg-white border border-[#E2EAE3] rounded-2xl p-5 space-y-1.5">
              <h3 className="font-bold text-[#004010]">Anatel</h3>
              <p className="text-[#647067] leading-relaxed">
                A Anatel disponibiliza informações oficiais sobre o Plano Geral de Metas de Numeração. O uso dessas regras para validar telefones e DDDs não representa acesso a cadastros privados de titulares.
              </p>
            </div>

            <div className="bg-white border border-[#E2EAE3] rounded-2xl p-5 space-y-1.5">
              <h3 className="font-bold text-[#004010]">Órgãos de trânsito</h3>
              <p className="text-[#647067] leading-relaxed">
                Senatran, Detrans e demais órgãos mantêm informações públicas e administrativas referentes a veículos automotores conforme regulamentação própria.
              </p>
            </div>

            <div className="bg-white border border-[#E2EAE3] rounded-2xl p-5 space-y-1.5">
              <h3 className="font-bold text-[#004010]">Fontes cadastrais complementares e atualização</h3>
              <p className="text-[#647067] leading-relaxed">
                Quando existirem provedores externos, a plataforma observa a legitimidade do tratamento. A periodicidade de atualização depende diretamente de cada provedor e fonte correspondente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== BLOCO 22 — BENEFÍCIOS DO PUXARDADOS ===================== */}
      <section id="beneficios" className="py-20 bg-white border-b border-[#E2EAE3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-block">
              Diferenciais Plataforma
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#004010] tracking-tight">
              Por que utilizar o PuxarDados para iniciar sua consulta?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Cinco modalidades organizadas',
                desc: 'Encontre as opções de CPF, CNPJ, telefone, placa e nome em uma interface central e objetiva.'
              },
              {
                title: 'Busca rápida de iniciar',
                desc: 'Escolha o tipo de informação e preencha o campo correspondente sem obstáculos desnecessários.'
              },
              {
                title: 'Orientação antes da contratação',
                desc: 'Conheça a finalidade de cada categoria e as características dos módulos antes de contratar.'
              },
              {
                title: 'Verificador gratuito',
                desc: 'Confira a estrutura de CPF, CNPJ, telefone e placa sem pagar ou contratar uma consulta.'
              },
              {
                title: 'Transparência de preços',
                desc: 'Verifique os valores reais e as condições antes de confirmar qualquer transação.'
              },
              {
                title: 'Explicações sobre resultados',
                desc: 'Entenda as diferenças entre formato válido, registro encontrado, retorno parcial e ausência de dados.'
              }
            ].map((card, idx) => (
              <div key={idx} className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-3xl p-6 space-y-3 hover:border-[#00BF30]/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#F0FAF2] text-[#00BF30] flex items-center justify-center font-bold">
                  ✓
                </div>
                <h3 className="text-base font-bold text-[#004010]">{card.title}</h3>
                <p className="text-xs text-[#647067] leading-relaxed font-medium">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== BLOCO 23 — SEGURANÇA E PRIVACIDADE ===================== */}
      <section id="privacidade" className="py-20 bg-[#F8FAF8] border-b border-[#E2EAE3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-4">
            <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-block">
              Privacidade e Boas Práticas
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#004010] tracking-tight">
              Consulta de dados com responsabilidade e respeito à privacidade
            </h2>
          </div>

          <div className="space-y-6 text-[#647067] text-base leading-relaxed font-medium">
            <p>
              O tratamento de dados cadastrais exige atenção à finalidade da pesquisa, à origem das informações e aos direitos das pessoas envolvidas. No Brasil, a Lei Geral de Proteção de Dados Pessoais (LGPD) estabelece princípios, hipóteses legais e obrigações aplicáveis.
            </p>
            <p>
              Um CPF, número de telefone, nome ou endereço pode constituir dado pessoal quando relacionado a uma pessoa natural identificada ou identificável. A disponibilidade de uma informação em determinado registro não significa autorização irrestrita para sua divulgação.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
                <h3 className="font-bold text-[#004010]">Posso consultar dados de qualquer pessoa?</h3>
                <p>Não de maneira irrestrita. O acesso e o tratamento de dados pessoais dependem de finalidade legítima e hipótese legal adequada.</p>
              </div>
              <div className="bg-white border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
                <h3 className="font-bold text-[#004010]">Os dados encontrados podem ser divulgados?</h3>
                <p>Não. A divulgação indevida de dados pessoais viola a privacidade e sujeita o infrator às sanções legais correspondentes.</p>
              </div>
              <div className="bg-white border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
                <h3 className="font-bold text-[#004010]">Acesso irrestrito a dados privados?</h3>
                <p>Não. A plataforma respeita os limites legais e técnicos de cada fonte, atuando com transparência e responsabilidade.</p>
              </div>
              <div className="bg-white border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
                <h3 className="font-bold text-[#004010]">Como solicitar informações sobre meus dados?</h3>
                <p>Disponibilizamos canal de atendimento e opt-out para que titulares exerçam livremente seus direitos assegurados na LGPD.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-xs font-bold">
              <Link href="/politica-de-privacidade" className="text-[#008020] hover:text-[#00BF30] hover:underline">
                Política de Privacidade
              </Link>
              <span className="text-[#E2EAE3]">|</span>
              <Link href="/termos" className="text-[#008020] hover:text-[#00BF30] hover:underline">
                Termos de Uso
              </Link>
              <span className="text-[#E2EAE3]">|</span>
              <Link href="/protecao-de-dados" className="text-[#008020] hover:text-[#00BF30] hover:underline">
                Proteção de Dados (LGPD)
              </Link>
              <span className="text-[#E2EAE3]">|</span>
              <Link href="/contato" className="text-[#008020] hover:text-[#00BF30] hover:underline">
                Contato
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== BLOCO 25 — CONTEÚDOS EDUCATIVOS E BLOG ===================== */}
      <section id="conteudos" className="py-20 bg-white border-b border-[#E2EAE3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-block">
              Central Educativa
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#004010] tracking-tight">
              Aprenda mais sobre consultas e dados cadastrais
            </h2>
            <p className="text-[#647067] text-sm md:text-base leading-relaxed font-medium">
              Entender como funcionam os identificadores, os registros cadastrais e os diferentes tipos de consulta ajuda a escolher a modalidade adequada e interpretar os resultados corretamente.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
              <span className="font-bold text-[#008020] uppercase tracking-wider text-[10px]">Grupo 1</span>
              <h3 className="font-bold text-sm text-[#004010]">Fundamentos</h3>
              <p className="text-[#647067]">O que são dados cadastrais, significado de puxar dados, diferença entre dados públicos e privados.</p>
            </div>

            <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
              <span className="font-bold text-[#008020] uppercase tracking-wider text-[10px]">Grupo 2</span>
              <h3 className="font-bold text-sm text-[#004010]">CPF e Pessoas Físicas</h3>
              <p className="text-[#647067]">Validação de CPF, diferença entre CPF válido e CPF regular e canais oficiais de consulta.</p>
            </div>

            <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
              <span className="font-bold text-[#008020] uppercase tracking-wider text-[10px]">Grupo 3</span>
              <h3 className="font-bold text-sm text-[#004010]">CNPJ e Empresas</h3>
              <p className="text-[#647067]">Consulta de empresas, situação cadastral e implementação do padrão CNPJ alfanumérico em 2026.</p>
            </div>

            <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
              <span className="font-bold text-[#008020] uppercase tracking-wider text-[10px]">Grupo 4</span>
              <h3 className="font-bold text-sm text-[#004010]">Telefone e Nome</h3>
              <p className="text-[#647067]">Numeração nacional com DDD, padrões Anatel e precauções com homônimos em pesquisas por nome.</p>
            </div>

            <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
              <span className="font-bold text-[#008020] uppercase tracking-wider text-[10px]">Grupo 5</span>
              <h3 className="font-bold text-sm text-[#004010]">Veículos e Placas</h3>
              <p className="text-[#647067]">Diferenças entre o padrão tradicional e o padrão Mercosul e relatórios de características veiculares.</p>
            </div>

            <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-5 space-y-2">
              <span className="font-bold text-[#008020] uppercase tracking-wider text-[10px]">Grupo 6</span>
              <h3 className="font-bold text-sm text-[#004010]">Privacidade e Segurança</h3>
              <p className="text-[#647067]">Boas práticas de proteção cadastral, prevenção contra sites fraudulentos e direitos dos titulares.</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-[#F0FAF2] hover:bg-[#00BF30] text-[#008020] hover:text-white border border-[#00BF30]/30 font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-all"
            >
              <span>Acessar Blog e Guias Informativos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== BLOCO 26 — CTA FINAL ===================== */}
      <section className="py-20 bg-gradient-to-br from-[#004010] via-[#005018] to-[#008020] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[#00FF41] text-xs font-bold uppercase tracking-wider bg-white/10 px-3.5 py-1.5 rounded-full inline-block">
            Início Imediato
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Comece sua consulta de dados cadastrais
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Escolha CPF, CNPJ, telefone, placa ou nome e conheça as modalidades disponíveis no PuxarDados. Informe o identificador correspondente, confira os serviços oferecidos e verifique os valores antes de contratar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#consultar-dados"
              className="w-full sm:w-auto bg-[#00BF30] hover:bg-[#00E63A] text-[#004010] font-black py-4 px-8 rounded-2xl text-base shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5 shrink-0" />
              <span>Consultar dados agora</span>
            </a>
            <Link
              href="/cadastro?src=home-puxardados"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold py-4 px-8 rounded-2xl text-base transition-colors flex items-center justify-center gap-2"
            >
              <span>Criar conta</span>
            </Link>
          </div>

          <p className="text-xs text-emerald-200/80 pt-2 max-w-xl mx-auto">
            A disponibilidade das informações depende dos módulos contratados, dos registros acessíveis e das condições legais aplicáveis.
          </p>
        </div>
      </section>
    </>
  );
}
