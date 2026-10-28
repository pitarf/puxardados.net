import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Search } from 'lucide-react';

interface FooterProps {
  logoUrl?: string | null;
}

/**
 * BLOCO 27 — FOOTER DEFINITIVO (PROMPT_SUPREMO_HOMEPAGE.md Seção 32)
 * Marca, 4 Colunas temáticas (Consultas, Plataforma, Conteúdos, Institucional),
 * texto final e links funcionais rigorosamente auditados.
 */
export default async function Footer({ logoUrl }: FooterProps) {
  // Busca dinamicamente páginas do banco para links institucionais válidos
  const dbPages = await prisma.page.findMany({
    where: { 
      published: true, 
      showInFooter: true,
      OR: [
        { publishedAt: null },
        { publishedAt: { lte: new Date() } }
      ]
    },
    select: { title: true, slug: true },
    orderBy: { title: 'asc' }
  });

  return (
    <footer className="bg-[#051109] border-t border-white/10 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Grid com Marca e 4 Colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Marca PuxarDados */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              {logoUrl ? (
                <img src={logoUrl} alt="PuxarDados" className="h-8 w-auto object-contain" />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-[#00BF30] text-white flex items-center justify-center font-bold">
                  <Search className="w-4.5 h-4.5" />
                </div>
              )}
              <span className="text-xl font-black text-white tracking-tight">
                Puxar<span className="text-[#00BF30]">Dados</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Plataforma independente de consultas cadastrais online com modalidades organizadas por CPF, CNPJ, telefone, placa e nome.
            </p>
          </div>

          {/* Coluna 1 — Consultas */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Consultas
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="#consultar-dados" className="hover:text-[#00BF30] transition-colors">
                  Consulta CPF
                </a>
              </li>
              <li>
                <a href="#consultar-dados" className="hover:text-[#00BF30] transition-colors">
                  Consulta CNPJ
                </a>
              </li>
              <li>
                <a href="#consultar-dados" className="hover:text-[#00BF30] transition-colors">
                  Consulta telefone
                </a>
              </li>
              <li>
                <a href="#consultar-dados" className="hover:text-[#00BF30] transition-colors">
                  Consulta placa
                </a>
              </li>
              <li>
                <a href="#consultar-dados" className="hover:text-[#00BF30] transition-colors">
                  Consulta por nome
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 2 — Plataforma */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Plataforma
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="#como-funciona" className="hover:text-[#00BF30] transition-colors">
                  Como funciona
                </a>
              </li>
              <li>
                <a href="#tipos-de-consulta" className="hover:text-[#00BF30] transition-colors">
                  Tipos de consulta
                </a>
              </li>
              <li>
                <a href="#precos" className="hover:text-[#00BF30] transition-colors">
                  Preços
                </a>
              </li>
              <li>
                <a href="#assistente-consultas" className="hover:text-[#00BF30] transition-colors">
                  Assistente de consultas
                </a>
              </li>
              <li>
                <a href="#verificar-dados" className="hover:text-[#00BF30] transition-colors">
                  Verificador de identificadores
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#00BF30] transition-colors">
                  Perguntas frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3 — Conteúdos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Conteúdos
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/blog" className="hover:text-[#00BF30] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a href="#conteudos" className="hover:text-[#00BF30] transition-colors">
                  Dados cadastrais
                </a>
              </li>
              <li>
                <a href="#verificar-dados" className="hover:text-[#00BF30] transition-colors">
                  Validação de identificadores
                </a>
              </li>
              <li>
                <a href="#privacidade" className="hover:text-[#00BF30] transition-colors">
                  Privacidade
                </a>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#00BF30] transition-colors">
                  Guias informativos
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4 — Institucional */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Institucional
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/sobre" className="hover:text-[#00BF30] transition-colors">
                  Sobre o PuxarDados
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-[#00BF30] transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className="hover:text-[#00BF30] transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="hover:text-[#00BF30] transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/protecao-de-dados" className="hover:text-[#00BF30] transition-colors">
                  Proteção de Dados
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Linha Divisória */}
        <div className="border-t border-white/10 pt-8 space-y-4 text-center">
          <p className="text-xs text-slate-400 max-w-4xl mx-auto leading-relaxed">
            PuxarDados — Plataforma independente de consultas online. A disponibilidade das informações depende da modalidade contratada, dos registros acessíveis e das condições legais aplicáveis.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 pt-2">
            <p>© {new Date().getFullYear()} PuxarDados. Todos os direitos reservados.</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00BF30] animate-pulse"></span>
              <span>Central de operações ativa</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
