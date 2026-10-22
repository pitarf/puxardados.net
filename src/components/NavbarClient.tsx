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

export default function NavbarClient({ logoUrl, siteTitle, menuPages = [] }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      
      // 1. Origem de Tráfego (utm_source ou src)
      const source = params.get('src') || params.get('utm_source');
      if (source) {
        document.cookie = `trafficSource=${encodeURIComponent(source)}; path=/; max-age=2592000; SameSite=Lax`;
      }
      
      // 2. Sistema de Indicações (ref)
      const ref = params.get('ref');
      if (ref) {
        document.cookie = `referral=${encodeURIComponent(ref)}; path=/; max-age=2592000; SameSite=Lax`;
      }
    }
  }, []);

  // Função para retornar o link correto dependendo se o usuário está na Home ou não
  const getHref = (hash: string) => {
    return pathname === '/' ? hash : `/${hash}`;
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#004010]/95 backdrop-blur-md border-b border-[#008020]/40 shadow-xl py-3 text-white' 
          : 'bg-white/95 backdrop-blur-md border-b border-[#E2EAE3] py-4 text-[#15231A]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt="Logo do PuxarDados" 
              className="h-8 w-auto object-contain"
            />
          ) : (
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 shadow-md ${
              isScrolled ? 'bg-[#00BF30] text-white shadow-[#00BF30]/30' : 'bg-[#00BF30] text-white shadow-[#00BF30]/20'
            }`}>
              <Search className="w-4.5 h-4.5" />
            </div>
          )}
          <span className={`text-lg font-extrabold tracking-tight transition-colors ${
            isScrolled ? 'text-white' : 'text-[#004010]'
          }`}>
            Puxar<span className="text-[#00BF30]">Dados</span>
          </span>
        </Link>

        {/* Links de navegação desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href={getHref('#recursos')} 
            className={`text-sm font-semibold transition-colors ${
              isScrolled ? 'text-emerald-100 hover:text-[#00FF41]' : 'text-[#647067] hover:text-[#008020]'
            }`}
          >
            Recursos
          </Link>
          <Link 
            href={getHref('#como-funciona')} 
            className={`text-sm font-semibold transition-colors ${
              isScrolled ? 'text-emerald-100 hover:text-[#00FF41]' : 'text-[#647067] hover:text-[#008020]'
            }`}
          >
            Como Funciona
          </Link>
          <Link 
            href={getHref('#precos')} 
            className={`text-sm font-semibold transition-colors ${
              isScrolled ? 'text-emerald-100 hover:text-[#00FF41]' : 'text-[#647067] hover:text-[#008020]'
            }`}
          >
            Preços
          </Link>
          <Link 
            href={getHref('#aplicacoes')} 
            className={`text-sm font-semibold transition-colors ${
              isScrolled ? 'text-emerald-100 hover:text-[#00FF41]' : 'text-[#647067] hover:text-[#008020]'
            }`}
          >
            Aplicações
          </Link>
          <Link 
            href={getHref('#faq')} 
            className={`text-sm font-semibold transition-colors ${
              isScrolled ? 'text-emerald-100 hover:text-[#00FF41]' : 'text-[#647067] hover:text-[#008020]'
            }`}
          >
            FAQ
          </Link>
          <Link 
            href="/blog" 
            className={`text-sm font-bold transition-colors ${
              isScrolled ? 'text-emerald-100 hover:text-[#00FF41]' : 'text-[#647067] hover:text-[#008020]'
            }`}
          >
            Blog
          </Link>
          {menuPages.map((page) => (
            <Link 
              key={page.slug} 
              href={`/${page.slug}`} 
              className={`text-sm font-semibold transition-colors ${
                isScrolled ? 'text-emerald-100 hover:text-[#00FF41]' : 'text-[#647067] hover:text-[#008020]'
              }`}
            >
              {page.title.split(' - ')[0]}
            </Link>
          ))}
        </nav>

        {/* Ações desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/login" 
            className={`text-sm font-bold px-4 py-2 rounded-xl transition-colors ${
              isScrolled 
                ? 'text-white hover:text-[#00FF41]' 
                : 'text-[#15231A] hover:text-[#008020]'
            }`}
          >
            Entrar
          </Link>
          <Link 
            href="/cadastro" 
            className={`text-sm font-bold px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 ${
              isScrolled
                ? 'bg-white text-[#004010] hover:bg-emerald-50 shadow-white/10'
                : 'bg-[#00BF30] hover:bg-[#008020] text-white shadow-[#00BF30]/20'
            }`}
          >
            Acessar Plataforma
          </Link>
        </div>

        {/* Botão Hambúrguer Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`focus:outline-none p-1.5 transition-colors ${
              isScrolled ? 'text-white hover:text-[#00FF41]' : 'text-[#15231A] hover:text-[#008020]'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu retrátil mobile */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-[#E2EAE3] shadow-xl overflow-hidden transition-all duration-300 ease-in-out z-50 ${
          isOpen ? 'max-h-[500px] opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3">
          <Link
            href={getHref('#recursos')}
            onClick={() => setIsOpen(false)}
            className="block text-base font-semibold text-[#647067] hover:text-[#008020] py-2"
          >
            Recursos
          </Link>
          <Link
            href={getHref('#como-funciona')}
            onClick={() => setIsOpen(false)}
            className="block text-base font-semibold text-[#647067] hover:text-[#008020] py-2"
          >
            Como Funciona
          </Link>
          <Link
            href={getHref('#precos')}
            onClick={() => setIsOpen(false)}
            className="block text-base font-semibold text-[#647067] hover:text-[#008020] py-2"
          >
            Preços
          </Link>
          <Link
            href={getHref('#aplicacoes')}
            onClick={() => setIsOpen(false)}
            className="block text-base font-semibold text-[#647067] hover:text-[#008020] py-2"
          >
            Aplicações
          </Link>
          <Link
            href={getHref('#faq')}
            onClick={() => setIsOpen(false)}
            className="block text-base font-semibold text-[#647067] hover:text-[#008020] py-2"
          >
            FAQ
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsOpen(false)}
            className="block text-base font-bold text-[#647067] hover:text-[#008020] py-2"
          >
            Blog
          </Link>
          {menuPages.map((page) => (
            <Link
              key={page.slug}
              href={`/${page.slug}`}
              onClick={() => setIsOpen(false)}
              className="block text-base font-semibold text-[#647067] hover:text-[#008020] py-2"
            >
              {page.title.split(' - ')[0]}
            </Link>
          ))}
          
          <div className="pt-4 border-t border-[#E2EAE3] flex flex-col gap-3">
            <Link
              href="/login"
              className="text-center font-bold text-[#15231A] hover:text-[#008020] py-2.5 rounded-xl border border-[#E2EAE3] hover:bg-[#F8FAF8] transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="text-center font-bold text-white bg-[#00BF30] hover:bg-[#008020] py-2.5 rounded-xl shadow-md transition-colors"
            >
              Acessar Plataforma
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
