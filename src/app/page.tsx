import Link from 'next/link';
import { prisma } from '../lib/prisma';
import NavbarClient from '@/components/NavbarClient';
import Footer from '@/components/Footer';
import HomeTabs from '@/components/HomeTabs';
import FaqAccordion from '@/components/FaqAccordion';
import HomeSearchBox from '@/components/HomeSearchBox';
import ComoFuncionaStacking from '@/components/ComoFuncionaStacking';
import { Metadata } from 'next';
import { 
  ShieldCheck, 
  Search, 
  Zap, 
  FileText, 
  Scale, 
  ArrowRight,
  TrendingUp,
  Fingerprint,
  RefreshCw,
  Users2,
  Wallet,
  CheckCircle,
  Building2,
  Car,
  UserCheck,
  CreditCard,
  Users
} from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const title = "Consulta CPF, Telefone, CNPJ e Placa | PuxarDados";
  const description = "Consulte CPF, telefone, CNPJ, nome e placa em uma plataforma online com módulos avulsos, preços transparentes e pagamento via Pix. Acesse o PuxarDados.";

  return {
    title,
    description,
    alternates: {
      canonical: "https://puxardados.net/"
    },
    robots: "index, follow, max-image-preview:large",
    openGraph: {
      title,
      description,
      url: "https://puxardados.net/",
      siteName: "PuxarDados",
      images: [
        {
          url: "https://puxardados.net/og-puxardados.jpg",
          width: 1200,
          height: 630,
          alt: "PuxarDados - Plataforma de consultas online"
        }
      ],
      type: "website",
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://puxardados.net/og-puxardados.jpg"]
    }
  };
}

/**
 * Nova Landing Page Whitelist Principal do Detetive Buscas
 * Design institucional corporativo (SaaS Light Premium) baseado no site de referência DeskData.
 * Focado em enriquecimento de leads, validação cadastral, compliance e prevenção a fraudes.
 * 100% otimizado para aprovação do Google Ads.
 */
export default async function Home() {
  const [settings, pricings, seoPages, latestArticles, menuPages] = await Promise.all([
    prisma.systemSetting.findFirst(),
    prisma.modulePricing.findMany(),
    prisma.page.findMany({
      where: {
        published: true,
        OR: [
          { publishedAt: null },
          { publishedAt: { lte: new Date() } }
        ]
      },
      select: { title: true, slug: true, showInFooter: true },
      orderBy: { title: 'asc' }
    }),
    prisma.article.findMany({
      where: {
        published: true,
        OR: [
          { publishedAt: null },
          { publishedAt: { lte: new Date() } }
        ]
      },
      take: 3,
      orderBy: { createdAt: 'desc' },
      select: { title: true, slug: true, metaDescription: true, createdAt: true }
    }),
    prisma.page.findMany({
      where: {
        published: true,
        showInMenu: true,
        OR: [
          { publishedAt: null },
          { publishedAt: { lte: new Date() } }
        ]
      },
      select: { title: true, slug: true },
      orderBy: { title: 'asc' }
    })
  ]);

  const footerPages = seoPages.filter(p => p.showInFooter);

  const getPrice = (id: string, defaultPrice: number) => {
    const found = pricings.find(p => p.id === id);
    return found ? found.price : defaultPrice;
  };

  const categories = [
    {
      title: "Dados Pessoais",
      icon: <UserCheck className="w-5 h-5 text-[#00BF30]" />,
      items: [
        { name: "Dados básicos", price: getPrice('dados_basicos', 1.00) },
        { name: "Documentos (RG/PIS/NIS)", price: getPrice('documentos', 1.00) },
        { name: "E-mails", price: getPrice('emails', 0.50) },
        { name: "Telefones", price: getPrice('telefones', 0.50) },
        { name: "Endereços", price: getPrice('enderecos', 1.00) },
      ]
    },
    {
      title: "Pessoas Relacionadas",
      icon: <Users className="w-5 h-5 text-[#008020]" />,
      items: [
        { name: "Parentes", price: getPrice('parentes', 1.00) },
        { name: "Vizinhos", price: getPrice('vizinhos', 1.00) },
        { name: "Sócios / Empresas", price: getPrice('socio_empresa', 1.50) },
      ]
    },
    {
      title: "Patrimônio e Renda",
      icon: <TrendingUp className="w-5 h-5 text-[#00BF30]" />,
      items: [
        { name: "Poder Aquisitivo", price: getPrice('poder_aquisitivo', 1.50) },
        { name: "Dados Trabalhistas", price: getPrice('dados_trabalhistas', 1.00) },
        { name: "Seguro Social (INSS)", price: getPrice('seguro_social', 1.00) },
      ]
    },
    {
      title: "Veículos",
      icon: <Car className="w-5 h-5 text-[#008020]" />,
      items: [
        { name: "Dados Básicos e Técnicos", price: getPrice('veiculo_basico', 1.00) },
        { name: "Situação e Documentação", price: getPrice('veiculo_documentacao', 1.00) },
        { name: "Dados do Proprietário", price: getPrice('veiculo_proprietario', 1.50) },
        { name: "Restrições e Histórico", price: getPrice('veiculo_restricoes', 2.00) },
      ]
    },
    {
      title: "Empresas (CNPJ)",
      icon: <Building2 className="w-5 h-5 text-[#00BF30]" />,
      items: [
        { name: "Dados Básicos e Natureza", price: getPrice('cnpj_basico', 1.00) },
        { name: "Contato e Localização", price: getPrice('cnpj_contato', 1.00) },
        { name: "Quadro Societário (QSA)", price: getPrice('cnpj_socios', 1.50) },
        { name: "Faturamento e Porte", price: getPrice('cnpj_faturamento', 2.00) },
      ]
    },
    {
      title: "Crédito e Histórico",
      icon: <CreditCard className="w-5 h-5 text-[#008020]" />,
      items: [
        { name: "Score de Crédito", price: getPrice('analise_credito', 2.00) },
        { name: "Processos Judiciais", price: getPrice('processos', 1.00) },
        { name: "Certidões Negativas", price: getPrice('certidoes', 1.00) },
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFFFF] text-[#15231A] antialiased overflow-x-clip">
      
      {/* ===================== NAVBAR ===================== */}
      <NavbarClient logoUrl={settings?.logoUrl} siteTitle={settings?.siteTitle} menuPages={menuPages} />

      {/* ===================== HERO SECTION COM ONDAS ORGÂNICAS ===================== */}
      <section id="consulta" className="relative pt-12 pb-24 md:pt-20 md:pb-36 bg-gradient-to-b from-white via-[#F8FAF8] to-[#F0FAF2] overflow-hidden">
        {/* Elementos de background abstratos com tom verde sutil */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00BF30]/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-[#00E63A]/5 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Texto Hero */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {/* Badge Whitelist */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0FAF2] border border-[#00BF30]/30 text-[#008020] text-xs font-bold tracking-wider uppercase shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#00BF30]" />
                Plataforma de consultas cadastrais online
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#004010] tracking-tight leading-[1.1]">
                Consulte CPF, Telefone, CNPJ e Placa Online <br className="hidden md:block" />
                <span className="text-[#00BF30] font-extrabold">em uma única plataforma</span>
              </h1>
              
              {/* Box de Pesquisa Interativo (Posicionado estrategicamente abaixo do H1) */}
              <div className="pt-2">
                <HomeSearchBox />
              </div>

              {/* Ações */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/cadastro"
                  className="bg-[#00BF30] hover:bg-[#008020] text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-[#00BF30]/25 flex items-center justify-center gap-2 group transition-all active:scale-95 text-base"
                >
                  Consultar Agora 🔎
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/login"
                  className="bg-white hover:bg-[#F8FAF8] border border-[#E2EAE3] text-[#15231A] font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-colors text-base shadow-xs"
                >
                  Entrar no Painel
                </Link>
              </div>

              {/* Descrições auxiliares da plataforma */}
              <div className="space-y-4 pt-2">
                <p className="text-base md:text-lg text-[#15231A] leading-relaxed max-w-2xl font-medium">
                  Acesse diferentes módulos de consulta cadastral em uma única plataforma. Consulte informações relacionadas a CPF, telefone, CNPJ, nome e veículos, pagando somente pelos módulos utilizados.
                </p>
                <p className="text-sm text-[#647067] max-w-2xl leading-relaxed">
                  Escolha abaixo o tipo de consulta desejada ou acesse o painel para realizar verificações de forma rápida, organizada e responsável.
                </p>
              </div>

              {/* Trust badges */}
              <div className="pt-6 border-t border-[#E2EAE3] flex flex-wrap gap-6 text-xs text-[#647067] font-semibold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#00BF30]" />
                  Conformidade com a LGPD
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#00BF30]" />
                  Retornos em Milissegundos
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#647067]" />
                  Sem taxas de adesão
                </span>
              </div>
            </div>

            {/* Visual Ilustrativo / Mockup do Relatório no Desktop */}
            <div className="lg:col-span-5 w-full hidden lg:block animate-in fade-in duration-1000 slide-in-from-right-12">
              <div className="relative">
                {/* Efeito Glow atrás do card */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00BF30]/15 to-[#00E63A]/15 rounded-3xl blur-2xl -z-10" />
                
                {/* Mockup Card */}
                <div className="bg-white border border-[#E2EAE3] rounded-3xl p-6 shadow-xl space-y-6">
                  <div className="flex items-center justify-between border-b border-[#E2EAE3] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F0FAF2] text-[#00BF30] border border-[#00BF30]/20 flex items-center justify-center font-bold">
                        🔎
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#004010]">Relatório Consolidado</h4>
                        <p className="text-[10px] text-[#647067] font-semibold uppercase tracking-wider">PuxarDados Engine</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-[#F0FAF2] text-[#008020] border border-[#00BF30]/30 rounded-full text-[10px] font-bold">
                      VERIFICADO
                    </span>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: 'CPF / CNPJ', value: 'Situação REGULAR na RF' },
                      { label: 'Telefones Vinculados', value: '3 números ativos identificados' },
                      { label: 'Localização / Endereços', value: 'Histórico de logradouros mapeado' },
                      { label: 'Vínculos Parentais', value: 'Árvore genealógica de 1º grau' },
                      { label: 'Restrições & Score', value: 'Análise de restrições ativa' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-[#F0FAF2] border border-[#00BF30]/30 text-[#00BF30] flex items-center justify-center text-[9px] font-bold">
                            ✓
                          </div>
                          <span className="text-[#647067] font-medium">{item.label}</span>
                        </div>
                        <span className="font-semibold text-[#15231A]">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#E2EAE3] flex items-center justify-between text-[11px] text-[#647067] font-medium">
                    <span>Tempo de varredura: ~1.2s</span>
                    <span>Fonte: API PuxarDados</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divisor de Onda Orgânica Inferior (Wave SVG) */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-0 pointer-events-none">
          <svg 
            className="relative block w-full h-12 sm:h-20 md:h-28 text-white" 
            viewBox="0 0 1440 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path 
              d="M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,58.7C840,43,960,21,1080,21.3C1200,21,1320,43,1380,53.3L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" 
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* ===================== ESCOLHA O TIPO DE CONSULTA ===================== */}
      <section id="escolha-consulta" className="py-20 bg-white border-b border-[#E2EAE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-block">
              Módulos Específicos
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#004010]">
              Escolha o tipo de consulta
            </h2>
            <p className="text-[#647067] text-sm md:text-base max-w-2xl mx-auto font-medium">
              Acesse a página correspondente ao tipo de informação que deseja verificar. Cada consulta possui módulos específicos, valores individuais e explicações sobre os dados que podem aparecer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Card 1: CPF */}
            <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-3xl p-6 flex flex-col justify-between hover:border-[#00BF30]/50 hover:shadow-lg transition-all text-left group">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#F0FAF2] border border-[#00BF30]/30 text-[#00BF30] flex items-center justify-center">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#004010] group-hover:text-[#00BF30] transition-colors">
                  Consulta de CPF
                </h3>
                <p className="text-[#647067] text-xs leading-relaxed">
                  Consulte informações cadastrais disponíveis relacionadas a um CPF, como dados básicos, telefones, endereços e outros módulos disponíveis na plataforma.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/consulta-cpf"
                  className="w-full bg-white hover:bg-[#00BF30] hover:text-white border border-[#E2EAE3] hover:border-[#00BF30] text-[#15231A] font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  Consultar CPF
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2: Telefone */}
            <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-3xl p-6 flex flex-col justify-between hover:border-[#00BF30]/50 hover:shadow-lg transition-all text-left group">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#F0FAF2] border border-[#00BF30]/30 text-[#00BF30] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#004010] group-hover:text-[#00BF30] transition-colors">
                  Consulta de telefone
                </h3>
                <p className="text-[#647067] text-xs leading-relaxed">
                  Pesquise informações disponíveis relacionadas a números de telefone nacionais e verifique possíveis vínculos cadastrais.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/consulta-telefone"
                  className="w-full bg-white hover:bg-[#00BF30] hover:text-white border border-[#E2EAE3] hover:border-[#00BF30] text-[#15231A] font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  Consultar telefone
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3: Placa */}
            <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-3xl p-6 flex flex-col justify-between hover:border-[#00BF30]/50 hover:shadow-lg transition-all text-left group">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#F0FAF2] border border-[#00BF30]/30 text-[#00BF30] flex items-center justify-center">
                  <Car className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#004010] group-hover:text-[#00BF30] transition-colors">
                  Consulta de placa
                </h3>
                <p className="text-[#647067] text-xs leading-relaxed">
                  Consulte dados básicos e informações disponíveis relacionadas a veículos por meio da placa informada.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/consulta-placa"
                  className="w-full bg-white hover:bg-[#00BF30] hover:text-white border border-[#E2EAE3] hover:border-[#00BF30] text-[#15231A] font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  Consultar placa
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 4: CNPJ */}
            <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-3xl p-6 flex flex-col justify-between hover:border-[#00BF30]/50 hover:shadow-lg transition-all text-left group">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#F0FAF2] border border-[#00BF30]/30 text-[#00BF30] flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#004010] group-hover:text-[#00BF30] transition-colors">
                  Consulta de CNPJ
                </h3>
                <p className="text-[#647067] text-xs leading-relaxed">
                  Verifique informações cadastrais disponíveis sobre empresas, incluindo situação cadastral, atividade e dados empresariais.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/consulta-cnpj"
                  className="w-full bg-white hover:bg-[#00BF30] hover:text-white border border-[#E2EAE3] hover:border-[#00BF30] text-[#15231A] font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  Consultar CNPJ
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 5: Nome */}
            <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-3xl p-6 flex flex-col justify-between hover:border-[#00BF30]/50 hover:shadow-lg transition-all text-left group">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#F0FAF2] border border-[#00BF30]/30 text-[#00BF30] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#004010] group-hover:text-[#00BF30] transition-colors">
                  Consulta por nome
                </h3>
                <p className="text-[#647067] text-xs leading-relaxed">
                  Utilize nome e sobrenome para pesquisar resultados cadastrais disponíveis e refinar a busca por uma pessoa.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/consulta-nome"
                  className="w-full bg-white hover:bg-[#00BF30] hover:text-white border border-[#E2EAE3] hover:border-[#00BF30] text-[#15231A] font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  Consultar nome
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== METRICS STRIP ===================== */}
      <section className="py-12 bg-[#F8FAF8] border-b border-[#E2EAE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "24 horas", label: "Plataforma disponível online" },
              { value: "Pagamento via Pix", label: "Liberação automática do saldo" },
              { value: "Sem mensalidade", label: "Pagamento por módulo utilizado" },
              { value: "Consultas organizadas", label: "Resultados separados por categoria" },
            ].map((metric) => (
              <div key={metric.label} className="space-y-1">
                <p className="text-3xl font-extrabold text-[#004010]">
                  {metric.value}
                </p>
                <p className="text-[#647067] text-xs font-semibold uppercase tracking-wider">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== COMO FUNCIONA (STACKING CARDS SCROLL) ===================== */}
      <ComoFuncionaStacking />

      {/* ===================== USO RESPONSÁVEL ===================== */}
      <section id="uso-responsavel" className="py-20 bg-[#F8FAF8] border-b border-[#E2EAE3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-block">
              Termos e Conduta
            </span>
            <h2 className="text-3xl font-extrabold text-[#004010]">
              Uso responsável das consultas
            </h2>
          </div>

          <div className="text-left bg-white border border-[#E2EAE3] rounded-3xl p-8 md:p-10 space-y-6 shadow-sm text-sm text-[#647067] leading-relaxed">
            <p>
              O PuxarDados deve ser utilizado exclusivamente para finalidades legítimas e de acordo com a legislação aplicável. O usuário é responsável pelas informações pesquisadas, pela finalidade da consulta e pelo uso realizado a partir dos resultados apresentados.
            </p>
            <p>
              A plataforma não deve ser utilizada para perseguição, ameaça, discriminação, fraude, extorsão, invasão de privacidade ou qualquer outra finalidade ilícita. Também não é permitido utilizar as informações obtidas para constranger pessoas, tomar decisões discriminatórias ou praticar atos que violem direitos de terceiros.
            </p>
            <p>
              Os resultados podem variar conforme a disponibilidade, a atualização e a abrangência das fontes consultadas. A presença ou ausência de uma informação não deve ser interpretada isoladamente como confirmação absoluta de identidade, propriedade, vínculo ou situação cadastral.
            </p>
            <p>
              Antes de realizar qualquer consulta, o usuário deve verificar se possui uma finalidade legítima e uma base adequada para tratar as informações pesquisadas.
            </p>
          </div>

          <div className="flex justify-center gap-6 text-sm font-bold">
            <Link href="/politica-de-privacidade" className="text-[#00BF30] hover:text-[#008020] transition-colors hover:underline">
              Política de Privacidade
            </Link>
            <span className="text-[#E2EAE3]">|</span>
            <Link href="/termos" className="text-[#00BF30] hover:text-[#008020] transition-colors hover:underline">
              Termos de Uso
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== TABELA DE PREÇOS E MÓDULOS (PREÇOS) ===================== */}
      <section id="precos" className="py-20 bg-white border-b border-[#E2EAE3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-[#008020] bg-[#F0FAF2] border border-[#00E63A]/40 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#00BF30]" />
              Preços transparentes & sem mensalidade
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#004010] tracking-tight">
              Pague apenas pelo que consultar
            </h2>
            <p className="text-[#647067] text-sm md:text-base max-w-2xl mx-auto font-medium">
              Sem taxas ocultas, contratos de fidelidade ou mensalidades. Adicione saldo via Pix e consulte os dados que precisar em tempo real.
            </p>
          </div>

          {/* Destaque de Benefícios da Tarifação */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F0FAF2] text-[#00BF30] border border-[#00BF30]/20 flex items-center justify-center shrink-0">
                <Wallet className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-[#004010] text-sm">A Partir de R$ 0,50</h4>
                <p className="text-xs text-[#647067]">Módulos avulsos e fracionados por consulta</p>
              </div>
            </div>

            <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F0FAF2] text-[#00BF30] border border-[#00BF30]/20 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-[#004010] text-sm">Recarga Instantânea via Pix</h4>
                <p className="text-xs text-[#647067]">Saldo liberado automaticamente no painel</p>
              </div>
            </div>

            <div className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F0FAF2] text-[#008020] border border-[#00BF30]/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-[#004010] text-sm">Cache Inteligente Integrado</h4>
                <p className="text-xs text-[#647067]">Zero cobrança duplicada em buscas recentes</p>
              </div>
            </div>
          </div>

          {/* Grid de Categorias e Módulos com Preços Dinâmicos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-3xl p-6 flex flex-col justify-between hover:border-[#00BF30]/50 hover:shadow-lg transition-all text-left">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E2EAE3] pb-3">
                    <h3 className="font-bold text-lg text-[#004010] flex items-center gap-2">
                      {cat.icon}
                      {cat.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-[#647067] bg-white px-2.5 py-1 rounded-full border border-[#E2EAE3]">
                      {cat.items.length} módulos
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {cat.items.map((item, i) => (
                      <li key={i} className="flex items-center justify-between text-xs py-1.5 px-3 rounded-xl bg-white border border-[#E2EAE3] shadow-2xs">
                        <span className="text-[#15231A] font-medium">{item.name}</span>
                        <span className="font-mono font-bold text-[#008020] bg-[#F0FAF2] border border-[#00E63A]/40 px-2 py-0.5 rounded text-[11px]">
                          R$ {item.price.toFixed(2).replace('.', ',')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-4 border-t border-[#E2EAE3]">
                  <Link
                    href="/cadastro"
                    className="w-full bg-white hover:bg-[#00BF30] hover:text-white border border-[#E2EAE3] hover:border-[#00BF30] text-[#15231A] font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-xs group"
                  >
                    Consultar este Módulo
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-[#F0FAF2] border border-[#00E63A]/40 rounded-2xl p-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left space-y-1">
              <h4 className="font-bold text-sm text-[#004010]">Quer testar a plataforma agora mesmo?</h4>
              <p className="text-xs text-[#647067]">Crie sua conta em menos de 1 minuto sem precisar de cartão de crédito.</p>
            </div>
            <Link
              href="/cadastro"
              className="bg-[#00BF30] hover:bg-[#008020] text-white text-xs font-bold py-3 px-6 rounded-xl shadow-md transition-all shrink-0 active:scale-95"
            >
              Criar Conta Gratuita 🚀
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== CONSULTAS DISPONÍVEIS (RECURSOS) ===================== */}
      <section id="recursos" className="py-20 bg-[#F8FAF8] border-b border-[#E2EAE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-block">
              Inteligência de Dados
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#004010]">
              Fontes de consultas disponíveis
            </h2>
            <p className="text-[#647067] text-sm md:text-base font-medium">
              Selecione o tipo de validação para visualizar a estrutura dos dados retornados pela plataforma.
            </p>
          </div>

          {/* Abas e Mockups Interativos Client */}
          <HomeTabs />

          {/* Disclaimer de Mockups Fictícios para o Google Ads */}
          <p className="mt-6 text-[#647067] text-[11px] leading-relaxed max-w-2xl mx-auto font-medium">
            * Os dados exibidos nas abas de demonstração acima são estritamente fictícios e conceituais, tendo como propósito exclusivo ilustrar o formato técnico do retorno do nosso motor de dados. Dados reais serão exibidos apenas em consultas reais no painel logado.
          </p>

          {/* Bloco de Links Fortes de SEO (Texto Centralizado Elegante) */}
          <div className="mt-12 text-center">
            <p className="text-[#647067] text-sm md:text-base leading-relaxed max-w-4xl mx-auto font-medium">
              Nosso painel é completo, com página de{' '}
              <Link href="/consulta-cpf" className="text-[#00BF30] hover:text-[#008020] hover:underline font-bold transition-all">
                consulta cpf
              </Link>
              ,{' '}
              <Link href="/consulta-telefone" className="text-[#00BF30] hover:text-[#008020] hover:underline font-bold transition-all">
                consulta telefone
              </Link>
              ,{' '}
              <Link href="/consulta-placa" className="text-[#00BF30] hover:text-[#008020] hover:underline font-bold transition-all">
                consulta placa
              </Link>
              ,{' '}
              <Link href="/consulta-nome" className="text-[#00BF30] hover:text-[#008020] hover:underline font-bold transition-all">
                consulta nome
              </Link>
              {' e '}
              <Link href="/consulta-cnpj" className="text-[#00BF30] hover:text-[#008020] hover:underline font-bold transition-all">
                consulta cnpj
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ===================== APLICAÇÕES B2B ===================== */}
      <section id="aplicacoes" className="py-20 bg-white border-b border-[#E2EAE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-block">
              Aplicações Práticas
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#004010]">
              Casos de uso da plataforma
            </h2>
            <p className="text-[#647067] text-sm md:text-base font-medium">
              Descubra como o motor PuxarDados ajuda diferentes verticais corporativas a mitigarem riscos e otimizarem cadastros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Fingerprint,
                title: "Prevenção a Fraudes e Identidade",
                desc: "Valide dados de novos cadastros e certifique-se de que os CPFs informados são consistentes com a Receita Federal e não pertencem a pessoas falecidas."
              },
              {
                icon: RefreshCw,
                title: "Higienização e Enriquecimento",
                desc: "Atualize carteiras de clientes corporativos obsoletas recuperando novos canais de contato e endereços para otimizar suas estratégias de vendas."
              },
              {
                icon: Scale,
                title: "Compliance e Risco (KYC)",
                desc: "Estruture background checks de fornecedores e parceiros verificando a saúde cadastral corporativa e o quadro societário em segundos."
              },
              {
                icon: Users2,
                title: "Localização de Clientes",
                desc: "Recupere localizações geográficas e contatos vinculados a clientes com pendências financeiras para processos de renegociação amigáveis."
              },
              {
                icon: ShieldCheck,
                title: "Validação Cadastral Integrada",
                desc: "Unifique em um único local consultas complexas que exigiriam buscas manuais em dezenas de páginas estatais de forma lenta."
              },
              {
                icon: TrendingUp,
                title: "Análise de Renda e Faixa Salarial",
                desc: "Entenda o perfil socioeconômico aproximado de potenciais parceiros com estimativas de renda e faixas salariais padronizadas por CBO."
              }
            ].map((app, index) => {
              const Icon = app.icon;
              return (
                <div key={index} className="bg-[#F8FAF8] border border-[#E2EAE3] rounded-3xl p-8 space-y-4 hover:-translate-y-1 transition-all duration-300 text-left hover:border-[#00BF30]/40 hover:shadow-md">
                  <div className="w-12 h-12 bg-white rounded-xl border border-[#E2EAE3] flex items-center justify-center text-[#00BF30] shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#004010]">{app.title}</h3>
                  <p className="text-[#647067] text-sm leading-relaxed">{app.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== PLATAFORMA DE CONSULTAS (SEO TEXT) ===================== */}
      <section id="seo-explicativo" className="py-20 bg-white border-b border-[#E2EAE3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-[#004010]">
            Plataforma de consultas cadastrais online
          </h2>
          <div className="text-left text-sm text-[#647067] leading-relaxed space-y-4 font-medium">
            <p>
              O PuxarDados reúne diferentes tipos de consulta em um único painel online. Por meio da plataforma, o usuário pode acessar páginas específicas de <Link href="/consulta-cpf" className="text-[#00BF30] hover:text-[#008020] hover:underline font-bold">consulta de CPF</Link>, <Link href="/consulta-telefone" className="text-[#00BF30] hover:text-[#008020] hover:underline font-bold">consulta de telefone</Link>, <Link href="/consulta-cnpj" className="text-[#00BF30] hover:text-[#008020] hover:underline font-bold">consulta de CNPJ</Link>, <Link href="/consulta-placa" className="text-[#00BF30] hover:text-[#008020] hover:underline font-bold">consulta de placa</Link> e <Link href="/consulta-nome" className="text-[#00BF30] hover:text-[#008020] hover:underline font-bold">consulta por nome</Link>.
            </p>
            <p>
              Cada página foi organizada para explicar como a respectiva consulta funciona, quais informações podem estar disponíveis e quais cuidados devem ser adotados durante a utilização. Dessa forma, o usuário pode escolher o serviço mais adequado antes de criar uma conta ou utilizar o saldo disponível.
            </p>
            <p>
              A consulta de CPF é indicada para verificações cadastrais relacionadas a pessoas físicas. A consulta de telefone permite pesquisar informações disponíveis vinculadas a um número nacional. A consulta de CNPJ apresenta dados empresariais e cadastrais disponíveis. Já a consulta de placa é direcionada à verificação de informações relacionadas a veículos.
            </p>
            <p>
              Também é possível utilizar a consulta por nome para refinar pesquisas quando o usuário dispõe apenas do nome ou do nome completo da pessoa pesquisada. Os resultados podem variar e dependem da precisão das informações informadas e da disponibilidade dos dados.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== FAQ SECTION ===================== */}
      <section id="faq" className="py-20 bg-[#F8FAF8] border-b border-[#E2EAE3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-[#008020] text-xs font-bold uppercase tracking-wider bg-[#F0FAF2] border border-[#00E63A]/40 px-3.5 py-1.5 rounded-full inline-block">
              Dúvidas Frequentes
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#004010]">
              Perguntas e respostas institucionais
            </h2>
            <p className="text-[#647067] text-sm md:text-base font-medium">
              Encontre respostas para as principais questões cadastrais, LGPD e de faturamento da nossa plataforma B2B.
            </p>
          </div>

          <FaqAccordion />
        </div>
      </section>

      {/* ===================== CTA FINAL (ORGANIC WAVE + GRADIENT VERDE) ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#004010] via-[#005018] to-[#008020] text-white pt-24 pb-20">
        {/* Onda Orgânica Superior */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-0 pointer-events-none">
          <svg 
            className="relative block w-full h-10 sm:h-16 text-[#F8FAF8]" 
            viewBox="0 0 1440 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path 
              d="M0,0L60,10.7C120,21,240,43,360,48C480,53,600,43,720,32C840,21,960,11,1080,16C1200,21,1320,43,1380,53.3L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" 
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Glow de fundo pontual */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00FF41]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 text-center space-y-8 z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#00FF41] text-xs font-bold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse" />
            Acesso Imediato sem Contrato
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Comece a realizar suas consultas <br className="hidden md:block"/> de forma profissional
          </h2>
          <p className="text-emerald-100 text-base md:text-lg max-w-2xl mx-auto font-normal">
            Integre consultas rápidas, reduza custos operacionais com nosso cache interno e tenha conformidade de proteção de dados e privacidade em todas as buscas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <Link
              href="/cadastro"
              className="w-full sm:w-auto bg-[#00BF30] hover:bg-[#00E63A] text-[#004010] font-extrabold py-4 px-10 rounded-xl shadow-xl shadow-[#00BF30]/30 transition-all active:scale-95 text-base sm:text-lg hover:shadow-2xl"
            >
              Criar Conta Gratuita
            </Link>
            <Link
              href="#faq"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 px-10 rounded-xl transition-colors text-base sm:text-lg backdrop-blur-sm"
            >
              Tirar Dúvidas
            </Link>
          </div>
          <p className="text-emerald-200/70 text-xs font-medium pt-2">
            * Modelo Pay-per-use corporativo • Sem taxas mensais fixas • Cadastro rápido
          </p>
        </div>
      </section>

      {/* ===================== ÚLTIMAS DO BLOG ===================== */}
      {latestArticles.length > 0 && (
        <section className="py-16 md:py-24 bg-[#F8FAF8] border-t border-[#E2EAE3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
              <div>
                <h2 className="text-3xl font-extrabold text-[#004010] tracking-tight">
                  Central de dicas & conteúdo
                </h2>
                <p className="text-[#647067] mt-2 text-sm md:text-base max-w-xl font-medium">
                  Acompanhe as últimas publicações técnicas, tutoriais de conformidade cadastral e novidades de LGPD.
                </p>
              </div>
              <Link 
                href="/blog" 
                className="text-sm font-bold text-[#00BF30] hover:text-[#008020] flex items-center gap-1 group whitespace-nowrap"
              >
                Ver todos os artigos
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestArticles.map((article) => (
                <div key={article.id} className="bg-white border border-[#E2EAE3] rounded-2xl p-6 hover:shadow-lg transition-all flex flex-col justify-between hover:border-[#00BF30]/40">
                  <div className="space-y-3">
                    <span className="text-[10px] font-extrabold text-[#008020] uppercase tracking-widest block">
                      {new Date(article.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </span>
                    <h3 className="font-bold text-[#15231A] text-lg leading-snug line-clamp-2 hover:text-[#00BF30] transition-colors">
                      <Link href={`/blog/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>
                    {article.metaDescription && (
                      <p className="text-[#647067] text-sm leading-relaxed line-clamp-3">
                        {article.metaDescription}
                      </p>
                    )}
                  </div>
                  <Link 
                    href={`/blog/${article.slug}`}
                    className="text-xs font-bold text-[#00BF30] hover:text-[#008020] flex items-center gap-1 mt-6"
                  >
                    Ler Artigo Completo →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================== LINKS RÁPIDOS DE CONSULTA (SEO) ===================== */}
      {footerPages.length > 0 && (
        <section className="py-12 bg-white border-t border-[#E2EAE3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#004010] mb-4">
              Nossas Consultas Disponíveis
            </h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#647067] font-medium">
              {footerPages.map((page) => (
                <Link 
                  key={page.slug} 
                  href={`/${page.slug}`} 
                  className="hover:text-[#00BF30] transition-colors hover:underline"
                >
                  {page.title.split(' - ')[0]}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================== SCHEMAS JSON-LD ===================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "PuxarDados",
            "url": "https://puxardados.net",
            "logo": "https://puxardados.net/logo.webp"
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "PuxarDados",
            "url": "https://puxardados.net",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://puxardados.net/cadastro?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Quais tipos de consulta estão disponíveis?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A plataforma possui páginas e módulos relacionados à consulta de CPF, telefone, CNPJ, nome e placa de veículo. A disponibilidade de informações pode variar conforme o tipo de pesquisa e o módulo selecionado."
                }
              },
              {
                "@type": "Question",
                "name": "Preciso pagar mensalidade para usar o PuxarDados?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Não há mensalidade obrigatória. O usuário pode adicionar saldo ao painel e pagar somente pelas consultas e módulos utilizados."
                }
              },
              {
                "@type": "Question",
                "name": "Como o pagamento é realizado?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "O saldo pode ser adicionado por meio de Pix. Após a confirmação do pagamento, o valor é disponibilizado no painel conforme as regras da plataforma."
                }
              },
              {
                "@type": "Question",
                "name": "Os resultados são sempre completos?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Não. A quantidade e a precisão das informações podem variar conforme os dados informados, a disponibilidade das fontes e a atualização dos registros."
                }
              },
              {
                "@type": "Question",
                "name": "Posso consultar qualquer pessoa?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "As consultas devem ser realizadas somente para finalidades legítimas e de acordo com a legislação aplicável. O usuário é responsável pela pesquisa realizada e pelo uso das informações obtidas."
                }
              },
              {
                "@type": "Question",
                "name": "É necessário informar a senha da pessoa pesquisada?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Não. A plataforma não solicita senhas de redes sociais, contas bancárias, e-mails ou outros serviços pertencentes à pessoa pesquisada."
                }
              },
              {
                "@type": "Question",
                "name": "Como escolho a consulta correta?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Acesse as páginas de consulta de CPF, telefone, CNPJ, nome ou placa e confira a explicação sobre os dados e módulos disponíveis em cada categoria."
                }
              },
              {
                "@type": "Question",
                "name": "Como entro em contato com o suporte?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "O atendimento deve ser solicitado pelos canais oficiais apresentados na página de contato ou dentro do painel do usuário."
                }
              }
            ]
          })
        }}
      />

      {/* ===================== FOOTER ===================== */}
      <Footer logoUrl={settings?.logoUrl} />
    </div>
  );
}
