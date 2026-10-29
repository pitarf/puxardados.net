import { Metadata } from 'next';
import { prisma } from '../lib/prisma';
import NavbarClient from '@/components/NavbarClient';
import Footer from '@/components/Footer';
import HeroSearchSection from '@/components/home/HeroSearchSection';
import AssistenteConsultas from '@/components/home/AssistenteConsultas';
import VerificadorIdentificadores from '@/components/home/VerificadorIdentificadores';
import FaqAccordion30 from '@/components/home/FaqAccordion30';
import MobileStickyCTA from '@/components/home/MobileStickyCTA';
import HomeEditorialBlocks from '@/components/home/HomeEditorialBlocks';

/**
 * METADADOS SEO DEFINITIVOS — SEÇÃO 5 DO PROMPT_SUPREMO_HOMEPAGE.md
 * Title: Puxar Dados Online | Consulta de Dados Cadastrais
 * Description: Quer puxar dados online? Conheça as consultas por CPF, CNPJ, telefone, placa e nome no PuxarDados. Confira as modalidades e preços disponíveis.
 * Canonical: https://puxardados.net/
 * OG Title: Puxar Dados Online | Consultas Cadastrais
 * OG Description: Consulte as opções de pesquisa por CPF, CNPJ, telefone, nome ou placa. Conheça os módulos disponíveis no PuxarDados.
 */
export async function generateMetadata(): Promise<Metadata> {
  const title = "Puxar Dados Online | Consulta de Dados Cadastrais";
  const description = "Quer puxar dados online? Conheça as consultas por CPF, CNPJ, telefone, placa e nome no PuxarDados. Confira as modalidades e preços disponíveis.";

  return {
    title,
    description,
    alternates: {
      canonical: "https://puxardados.net/"
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large'
      }
    },
    openGraph: {
      title: "Puxar Dados Online | Consultas Cadastrais",
      description: "Consulte as opções de pesquisa por CPF, CNPJ, telefone, nome ou placa. Conheça os módulos disponíveis no PuxarDados.",
      url: "https://puxardados.net/",
      siteName: "PuxarDados",
      images: [
        {
          url: "https://puxardados.net/og-puxardados.jpg",
          width: 1200,
          height: 630,
          alt: "PuxarDados - Central de Consulta de Dados e Informações Cadastrais"
        }
      ],
      type: "website",
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: "Puxar Dados Online | Consultas Cadastrais",
      description: "Consulte as opções de pesquisa por CPF, CNPJ, telefone, nome ou placa. Conheça os módulos disponíveis no PuxarDados.",
      images: ["https://puxardados.net/og-puxardados.jpg"]
    }
  };
}

/**
 * REESTRUTURAÇÃO COMPLETA DA HOMEPAGE PUXARDADOS.NET
 * Rigorosamente guiada pelo PROMPT_SUPREMO_HOMEPAGE.md.
 * 
 * Arquitetura de Blocos:
 * - Bloco 01: Header compacto com âncoras funcionais.
 * - Bloco 02: Hero com 5 categorias (CPF, CNPJ, Telefone, Placa, Nome) e H1 exato.
 * - Bloco 03: Retorno imediato antes do conteúdo SEO.
 * - Bloco 04: Card ilustrativo de estrutura discreto.
 * - Bloco 05: Introdução SEO semântica.
 * - Bloco 06: Tipos de Consulta organizados.
 * - Bloco 07: Assistente Gratuito de Consultas (#assistente-consultas).
 * - Bloco 08: Como Funciona a Plataforma (#como-funciona).
 * - Bloco 09: Comparativo entre identificadores.
 * - Bloco 10: Preços e Contratação (#precos) com dados reais auditados do banco.
 * - Bloco 11: Conferidor Gratuito de Identificadores (#verificar-dados) com CNPJ alfanumérico 2026.
 * - Blocos 12 a 23: Textos editoriais e educativos, segurança jurídica e privacidade.
 * - Bloco 24: FAQ Accordion com as 30 perguntas públicas institucionais (#faq).
 * - Bloco 25: Central Educativa e Blog (#conteudos).
 * - Bloco 26: CTA Final de conversão comercial.
 * - Bloco 27: Footer com as 4 colunas temáticas e dados institucionais.
 * - Seção 36: Botão flutuante mobile discreto.
 * - Seção 33: JSON-LD Schema.org (WebSite, Organization, WebPage).
 */
export default async function Home() {
  const [settings, pricings, menuPages] = await Promise.all([
    prisma.systemSetting.findFirst(),
    prisma.modulePricing.findMany(),
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

  // Schema.org JSON-LD estruturado e válido conforme Seção 33.3
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://puxardados.net/#website",
        "name": "PuxarDados",
        "url": "https://puxardados.net/",
        "description": "Central de consulta de dados e informações cadastrais online por CPF, CNPJ, telefone, placa e nome.",
        "inLanguage": "pt-BR"
      },
      {
        "@type": "Organization",
        "@id": "https://puxardados.net/#organization",
        "name": "PuxarDados",
        "url": "https://puxardados.net/",
        "logo": settings?.logoUrl || "https://puxardados.net/logo.webp",
        "sameAs": []
      },
      {
        "@type": "WebPage",
        "@id": "https://puxardados.net/#webpage",
        "url": "https://puxardados.net/",
        "name": "Puxar Dados Online | Consulta de Dados Cadastrais",
        "isPartOf": { "@id": "https://puxardados.net/#website" },
        "about": { "@id": "https://puxardados.net/#organization" },
        "inLanguage": "pt-BR",
        "description": "Quer puxar dados online? Conheça as consultas por CPF, CNPJ, telefone, placa e nome no PuxarDados. Confira as modalidades e preços disponíveis."
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#15231A] antialiased overflow-x-clip selection:bg-[#00BF30]/20 selection:text-[#004010]">
      
      {/* Schema.org estruturado */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* BLOCO 01 — HEADER */}
      <NavbarClient 
        logoUrl={settings?.logoUrl} 
        siteTitle={settings?.siteTitle} 
        menuPages={menuPages} 
      />

      <main>
        {/* BLOCOS 02, 03 e 04 — HERO COM 5 CATEGORIAS, RETORNO IMEDIATO E CARD ILUSTRATIVO */}
        <HeroSearchSection pricings={pricings} />

        {/* BLOCOS 05, 06, 08, 09, 10 — INTRODUÇÃO, MODALIDADES, COMO FUNCIONA, TABELA COMPARATIVA E PREÇOS */}
        <HomeEditorialBlocks pricings={pricings} />

        {/* BLOCO 07 — ASSISTENTE GRATUITO DE CONSULTAS */}
        <AssistenteConsultas />

        {/* BLOCO 11 — CONFERIDOR GRATUITO DE IDENTIFICADORES (COM CNPJ ALFANUMÉRICO 2026) */}
        <VerificadorIdentificadores />

        {/* BLOCO 24 — ACCORDION DE FAQ COM 30 PERGUNTAS PÚBLICAS */}
        <FaqAccordion30 />
      </main>

      {/* BLOCO 27 — FOOTER DEFINITIVO COM AS 4 COLUNAS */}
      <Footer logoUrl={settings?.logoUrl} />

      {/* SEÇÃO 36 — BOTÃO FLUTUANTE MOBILE DISCRETO */}
      <MobileStickyCTA />

    </div>
  );
}
