'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search } from 'lucide-react';

interface NavbarClientProps {
  logoUrl?: string | null;
  siteTitle?: string | null;
  menuPages?: Array<{ title: string; slug: string }>;
}

/**
 * BLOCO 01 — HEADER (PROMPT_SUPREMO_HOMEPAGE.md Seção 6)
 * Menu desktop: Consultar Dados, Tipos de Consulta, Como Funciona, Preços, Verificar Dados, FAQ, Blog.
 * Direita: Entrar, Criar Conta.
 * Menu mobile: Compacto, sem duas linhas desnecessárias.
 */
export default function NavbarClient({ logoUrl, siteTitle, menuPages = [] }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const source = params.get('src') || params.get('utm_source');
      if (source) {
        document.cookie = `trafficSource=${encodeURIComponent(source)}; path=/; max-age=2592000; SameSite=Lax`;
      }
      const ref = params.get('ref');
      if (ref) {
        document.cookie = `referral=${encodeURIComponent(ref)}; path=/; max-age=2592000; SameSite=Lax`;
      }
    }
  }, []);

  const getHref = (hash: string) => {
    return pathname === '/' ? hash : `/${hash}`;
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#004010]/95 backdrop-blur-md border-b border-[#008020]/40 shadow-xl py-3 text-white' 
          : 'bg-white/95 backdrop-blur-md border-b border-[#E2EAE3] py-3.5 text-[#15231A]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo PuxarDados */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt="Logo do PuxarDados" 
              className="h-8 w-auto object-contain"
            />
          ) : (
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-md ${
              isScrolled ? 'bg-[#00BF30] text-white' : 'bg-[#00BF30] text-white'
            }`}>
              <Search className="w-4.5 h-4.5" />
            </div>
          )}
          <span className={`text-xl font-black tracking-tight transition-colors ${
            isScrolled ? 'text-white' : 'text-[#004010]'
          }`}>
            Puxar<span className="text-[#00BF30]">Dados</span>
          </span>
        </Link>

        {/* Menu Desktop Conforme Seção 6 */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link 
            href={getHref('#consultar-dados')} 
            className={`text-xs font-bold uppercase tracking-wider transition-colors ${
              isScrolled ? 'text-emerald-100 hover:text-[#00FF41]' : 'text-[#647067] hover:text-[#008020]'
            }`}
          >
            Consultar Dados
          </Link>
          <Link 
            href={getHref('#tipos-de-consulta')} 
            className={`text-xs font-bold uppercase tracking-wider transition-colors ${
              isScrolled ? 'text-emerald-100 hover:text-[#00FF41]' : 'text-[#647067] hover:text-[#008020]'
            }`}
          >
            Tipos de Consulta
          </Link>
          <Link 
            href={getHref('#como-funciona')} 
            className={`text-xs font-bold uppercase tracking-wider transition-colors ${
              isScrolled ? 'text-emerald-100 hover:text-[#00FF41]' : 'text-[#647067] hover:text-[#008020]'
            }`}
          >
            Como Funciona
          </Link>
          <Link 
            href={getHref('#precos')} 
            className={`text-xs font-bold uppercase tracking-wider transition-colors ${
              isScrolled ? 'text-emerald-100 hover:text-[#00FF41]' : 'text-[#647067] hover:text-[#008020]'
            }`}
          >
            Preços
          </Link>
          <Link 
            href={getHref('#verificar-dados')} 
            className={`text-xs font-bold uppercase tracking-wider transition-colors ${
              isScrolled ? 'text-emerald-100 hover:text-[#00FF41]' : 'text-[#647067] hover:text-[#008020]'
            }`}
          >
            Verificar Dados
          </Link>
          <Link 
            href={getHref('#faq')} 
            className={`text-xs font-bold uppercase tracking-wider transition-colors ${
              isScrolled ? 'text-emerald-100 hover:text-[#00FF41]' : 'text-[#647067] hover:text-[#008020]'
            }`}
          >
            FAQ
          </Link>
          <Link 
            href="/blog" 
            className={`text-xs font-bold uppercase tracking-wider transition-colors ${
              isScrolled ? 'text-emerald-100 hover:text-[#00FF41]' : 'text-[#647067] hover:text-[#008020]'
            }`}
          >
            Blog
          </Link>
        </nav>

        {/* Ações Desktop (Entrar / Criar Conta) */}
        <div className="hidden md:flex items-center gap-3">
          <Link 
            href="/login" 
            className={`text-xs font-extrabold uppercase tracking-wider px-3.5 py-2 transition-colors ${
              isScrolled ? 'text-white hover:text-[#00FF41]' : 'text-[#15231A] hover:text-[#008020]'
            }`}
          >
            Entrar
          </Link>
          <Link 
            href="/cadastro?src=home-puxardados" 
            className="text-xs font-extrabold uppercase tracking-wider px-5 py-2.5 rounded-xl bg-[#00BF30] hover:bg-[#008020] text-white shadow-md shadow-[#00BF30]/20 transition-all active:scale-95"
          >
            Criar Conta
          </Link>
        </div>

        {/* Botão Hambúrguer Mobile */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 transition-colors focus:outline-none ${
              isScrolled ? 'text-white' : 'text-[#15231A]'
            }`}
            aria-label="Abrir menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Menu Retrátil Mobile */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-[#E2EAE3] shadow-2xl overflow-hidden transition-all duration-300 ease-in-out z-50 ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-5 pt-3 pb-6 space-y-3">
          <Link
            href={getHref('#consultar-dados')}
            onClick={() => setIsOpen(false)}
            className="block text-sm font-bold text-[#15231A] hover:text-[#008020] py-2 border-b border-slate-100"
          >
            Consultar Dados
          </Link>
          <Link
            href={getHref('#tipos-de-consulta')}
            onClick={() => setIsOpen(false)}
            className="block text-sm font-bold text-[#15231A] hover:text-[#008020] py-2 border-b border-slate-100"
          >
            Tipos de Consulta
          </Link>
          <Link
            href={getHref('#como-funciona')}
            onClick={() => setIsOpen(false)}
            className="block text-sm font-bold text-[#15231A] hover:text-[#008020] py-2 border-b border-slate-100"
          >
            Como Funciona
          </Link>
          <Link
            href={getHref('#precos')}
            onClick={() => setIsOpen(false)}
            className="block text-sm font-bold text-[#15231A] hover:text-[#008020] py-2 border-b border-slate-100"
          >
            Preços
          </Link>
          <Link
            href={getHref('#verificar-dados')}
            onClick={() => setIsOpen(false)}
            className="block text-sm font-bold text-[#15231A] hover:text-[#008020] py-2 border-b border-slate-100"
          >
            Verificar Dados
          </Link>
          <Link
            href={getHref('#faq')}
            onClick={() => setIsOpen(false)}
            className="block text-sm font-bold text-[#15231A] hover:text-[#008020] py-2 border-b border-slate-100"
          >
            FAQ
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsOpen(false)}
            className="block text-sm font-bold text-[#15231A] hover:text-[#008020] py-2 border-b border-slate-100"
          >
            Blog
          </Link>

          <div className="pt-3 flex flex-col gap-2.5">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="text-center font-bold text-sm text-[#15231A] py-3 rounded-xl border border-[#E2EAE3] hover:bg-slate-50 transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro?src=home-puxardados"
              onClick={() => setIsOpen(false)}
              className="text-center font-bold text-sm text-white bg-[#00BF30] hover:bg-[#008020] py-3 rounded-xl shadow-md transition-colors"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
