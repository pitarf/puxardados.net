'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  UserCheck, 
  Car, 
  Building2, 
  Scale, 
  MapPin, 
  History, 
  Wallet, 
  UserCircle, 
  LifeBuoy, 
  Code,
  ShieldAlert,
  Globe,
  FileText,
  BookOpen,
  Settings,
  Gift,
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface SidebarNavProps {
  isAdmin?: boolean;
  isSeo?: boolean;
  role?: string;
  whatsappLink: string;
}

/**
 * Componente de Navegação da Sidebar do Dashboard
 * Categorizado em grupos visuais (Estilo Stripe / Linear) com design moderno em verde esmeralda
 */
export function SidebarNav({ isAdmin, isSeo, role, whatsappLink }: SidebarNavProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/dashboard' && pathname === '/dashboard') return true;
    if (path !== '/dashboard' && pathname.startsWith(path)) return true;
    return false;
  };

  const navItemClass = (path: string) => {
    const active = isActive(path);
    return `group flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
      active 
        ? 'bg-[#00BF30]/15 text-[#00BF30] shadow-sm shadow-[#00BF30]/10 border border-[#00BF30]/20' 
        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
    }`;
  };

  return (
    <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto custom-scrollbar">
      
      {/* GRUPO 1: VISÃO GERAL */}
      <div className="space-y-1">
        <div className="px-3 pb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          Principal
        </div>

        <Link href="/dashboard" className={navItemClass('/dashboard')}>
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg transition-colors ${isActive('/dashboard') ? 'bg-[#00BF30]/20 text-[#00BF30]' : 'text-slate-400 group-hover:text-white'}`}>
              <LayoutDashboard className="w-4 h-4" />
            </div>
            <span>Painel Principal</span>
          </div>
          {isActive('/dashboard') && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#00BF30]" />
          )}
        </Link>
      </div>

      {/* GRUPO 2: CONSULTAS & DADOS */}
      <div className="space-y-1">
        <div className="px-3 pb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          Módulos de Consulta
        </div>

        <Link href="/dashboard" className={navItemClass('/dashboard')}>
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg text-slate-400 group-hover:text-white transition-colors">
              <UserCheck className="w-4 h-4" />
            </div>
            <span>Consultar Pessoas</span>
          </div>
          <span className="text-[10px] bg-[#00BF30]/10 text-[#00BF30] px-1.5 py-0.5 rounded font-mono font-semibold">
            CPF/Nome
          </span>
        </Link>

        <Link href="/dashboard/veiculos" className={navItemClass('/dashboard/veiculos')}>
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg transition-colors ${isActive('/dashboard/veiculos') ? 'bg-[#00BF30]/20 text-[#00BF30]' : 'text-slate-400 group-hover:text-white'}`}>
              <Car className="w-4 h-4" />
            </div>
            <span>Consultar Veículos</span>
          </div>
          <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
            Placa
          </span>
        </Link>

        <Link href="/dashboard/empresas" className={navItemClass('/dashboard/empresas')}>
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg transition-colors ${isActive('/dashboard/empresas') ? 'bg-[#00BF30]/20 text-[#00BF30]' : 'text-slate-400 group-hover:text-white'}`}>
              <Building2 className="w-4 h-4" />
            </div>
            <span>Consultar Empresas</span>
          </div>
          <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
            CNPJ
          </span>
        </Link>

        <Link href="/dashboard/processos" className={navItemClass('/dashboard/processos')}>
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg transition-colors ${isActive('/dashboard/processos') ? 'bg-[#00BF30]/20 text-[#00BF30]' : 'text-slate-400 group-hover:text-white'}`}>
              <Scale className="w-4 h-4" />
            </div>
            <span>Processos Judiciais</span>
          </div>
          <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
            CNJ
          </span>
        </Link>

        <div title="Em desenvolvimento" className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-600 cursor-not-allowed opacity-60">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="text-sm">Endereços & CEP</span>
          </div>
          <span className="text-[9px] bg-slate-800/80 text-slate-500 px-1.5 py-0.5 rounded">
            Em breve
          </span>
        </div>

        <Link href="/dashboard/historico" className={navItemClass('/dashboard/historico')}>
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg transition-colors ${isActive('/dashboard/historico') ? 'bg-[#00BF30]/20 text-[#00BF30]' : 'text-slate-400 group-hover:text-white'}`}>
              <History className="w-4 h-4" />
            </div>
            <span>Histórico de Consultas</span>
          </div>
        </Link>
      </div>

      {/* GRUPO 3: FINANCEIRO & RECOMPENSAS */}
      <div className="space-y-1">
        <div className="px-3 pb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          Financeiro & Benefícios
        </div>

        <Link href="/dashboard/faturas" className={navItemClass('/dashboard/faturas')}>
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg transition-colors ${isActive('/dashboard/faturas') ? 'bg-[#00BF30]/20 text-[#00BF30]' : 'text-slate-400 group-hover:text-white'}`}>
              <Wallet className="w-4 h-4" />
            </div>
            <span>Recarga & Faturas</span>
          </div>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00BF30] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00BF30]"></span>
          </span>
        </Link>

        <Link href="/dashboard/promocoes" className={navItemClass('/dashboard/promocoes')}>
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg transition-colors ${isActive('/dashboard/promocoes') ? 'bg-[#00BF30]/20 text-[#00BF30]' : 'text-slate-400 group-hover:text-white'}`}>
              <Gift className="w-4 h-4" />
            </div>
            <span>Pacotes Promocionais</span>
          </div>
          <span className="text-[10px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded font-semibold">
            Bônus
          </span>
        </Link>

        <Link href="/dashboard/indicacoes" className={navItemClass('/dashboard/indicacoes')}>
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg transition-colors ${isActive('/dashboard/indicacoes') ? 'bg-[#00BF30]/20 text-[#00BF30]' : 'text-slate-400 group-hover:text-white'}`}>
              <Award className="w-4 h-4" />
            </div>
            <span>Indique e Ganhe</span>
          </div>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </Link>
      </div>

      {/* GRUPO 4: CONTA & AJUDA */}
      <div className="space-y-1">
        <div className="px-3 pb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
          Minha Conta
        </div>

        <Link href="/dashboard/perfil" className={navItemClass('/dashboard/perfil')}>
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg transition-colors ${isActive('/dashboard/perfil') ? 'bg-[#00BF30]/20 text-[#00BF30]' : 'text-slate-400 group-hover:text-white'}`}>
              <UserCircle className="w-4 h-4" />
            </div>
            <span>Meus Dados & Segurança</span>
          </div>
        </Link>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all border border-transparent"
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg text-slate-400 group-hover:text-emerald-400 transition-colors">
              <LifeBuoy className="w-4 h-4" />
            </div>
            <span>Suporte Via WhatsApp</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </a>

        <div title="Em desenvolvimento" className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-600 cursor-not-allowed opacity-60">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg">
              <Code className="w-4 h-4" />
            </div>
            <span className="text-sm">API para Desenvolvedores</span>
          </div>
          <span className="text-[9px] bg-slate-800/80 text-slate-500 px-1.5 py-0.5 rounded">
            v3.0
          </span>
        </div>
      </div>

      {/* GRUPO 5: ADMINISTRAÇÃO & GESTÃO */}
      {(isAdmin || role === 'ADMIN') && (
        <div className="pt-2 border-t border-white/5 space-y-1">
          <div className="px-3 pb-1 text-[10px] font-bold tracking-wider text-rose-400 uppercase">
            Administração
          </div>
          <Link 
            href="/admin" 
            className="group flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all shadow-sm"
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Painel Administrativo</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-rose-400/70 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      )}

      {(isSeo || role === 'SEO') && (
        <div className="pt-2 border-t border-white/5 space-y-1">
          <div className="px-3 pb-1 flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-blue-400 uppercase">
            <Globe className="w-3 h-3 text-blue-400" />
            <span>Gestão de SEO & CMS</span>
          </div>
          
          <Link href="/admin/paginas" className={navItemClass('/admin/paginas')}>
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Páginas SEO</span>
            </div>
          </Link>

          <Link href="/admin/blog" className={navItemClass('/admin/blog')}>
            <div className="flex items-center gap-3">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Blog CMS</span>
            </div>
          </Link>

          <Link href="/admin/configuracoes" className={navItemClass('/admin/configuracoes')}>
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Configurações SEO</span>
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
}
