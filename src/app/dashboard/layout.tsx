import { verifySession } from '@/lib/session';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import {
  Database,
  LogOut,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { logout } from '@/app/actions/auth';
import { BalanceHeader } from '@/components/BalanceHeader';
import { SidebarNav } from '@/components/SidebarNav';
import { MobileSidebar } from '@/components/MobileSidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Layout Principal do Dashboard PuxarDados
 * Apresenta uma Sidebar Moderna no estilo Stripe/Linear, com tema escuro elegante (#090D16),
 * perfil de usuário integrado na base e cabeçalho com novo widget de saldo.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  if (!session) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, balance: true, role: true, lastActiveAt: true },
  });

  if (!user) {
    redirect('/login');
  }

  // Atualiza lastActiveAt a cada 10 minutos
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  if (!user.lastActiveAt || user.lastActiveAt < tenMinutesAgo) {
    prisma.user.update({
      where: { id: session.userId },
      data: { lastActiveAt: new Date() }
    }).catch(err => console.error("Erro ao atualizar lastActiveAt no Dashboard:", err));
  }

  const settings = await prisma.systemSetting.findFirst();
  const whatsappNumber = (settings?.supportWhatsapp || "5511999999999").replace(/\D/g, '');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Ol%C3%A1%2C%20gostaria%20de%20suporte%20no%20PuxarDados`;

  // Iniciais do usuário para o avatar
  const userInitials = (user.name || user.email || 'U')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070A0F] text-slate-900 dark:text-slate-100 flex">
      {/* Sidebar Desktop - Design Exclusivo PuxarDados */}
      <aside className="w-72 border-r border-slate-200 dark:border-white/10 bg-[#0A0E17] text-white hidden md:flex flex-col shadow-xl z-20">
        
        {/* Topo da Sidebar: Branding & Versão */}
        <div className="h-20 flex items-center justify-between border-b border-white/5 px-6">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            {settings?.logoUrl ? (
              <img
                src={settings.logoUrl}
                alt="Logo"
                className="h-8 w-auto object-contain"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00BF30] to-[#008020] flex items-center justify-center shadow-lg shadow-[#00BF30]/20 group-hover:scale-105 transition-transform">
                <Database className="text-white w-5 h-5" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white whitespace-nowrap flex items-center gap-1.5">
                Puxar<span className="text-[#00BF30]">Dados</span>
              </span>
              <span className="text-[10px] text-emerald-400/80 font-mono font-medium tracking-wide">
                Intelligence Platform
              </span>
            </div>
          </Link>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
            PRO
          </span>
        </div>

        {/* Links de Navegação Categorizados */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <SidebarNav 
            isAdmin={user.role === 'ADMIN'} 
            isSeo={user.role === 'SEO'}
            role={user.role}
            whatsappLink={whatsappLink} 
          />

          {/* Rodapé da Sidebar: Cartão do Usuário & Sair */}
          <div className="p-3 border-t border-white/5 bg-black/20">
            <div className="flex items-center justify-between gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <Link href="/dashboard/perfil" className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00BF30] to-[#004010] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {userInitials}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-white truncate">
                    {user.name || 'Minha Conta'}
                  </span>
                  <span className="text-[11px] text-slate-400 truncate">
                    {user.email}
                  </span>
                </div>
              </Link>
              
              <form action={logout}>
                <button 
                  type="submit" 
                  title="Sair da Conta"
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </aside>

      {/* Conteúdo Principal & Header */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] dark:bg-[#070A0F]">
        {/* Header Superior */}
        <header className="h-16 border-b border-slate-200 dark:border-white/5 bg-white/70 dark:bg-[#0A0E17]/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 shadow-sm sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <MobileSidebar 
              isAdmin={user.role === 'ADMIN'} 
              isSeo={user.role === 'SEO'}
              role={user.role}
              whatsappLink={whatsappLink} 
              logoUrl={settings?.logoUrl} 
            />
            
            {/* Título de Boas-Vindas Discreto para Desktop */}
            <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span>Painel do Cliente</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 dark:text-white font-semibold">Consultas & Validação Cadastral</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Suspense fallback={<div className="h-9 w-36 bg-slate-200 dark:bg-white/5 animate-pulse rounded-2xl" />}>
              <BalanceHeader initialBalance={user.balance} />
            </Suspense>
          </div>
        </header>

        {/* Área Útil da Página */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
