'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, LogOut, Database } from 'lucide-react';
import { SidebarNav } from './SidebarNav';
import Link from 'next/link';
import { logout } from '@/app/actions/auth';

interface MobileSidebarProps {
  isAdmin?: boolean;
  isSeo?: boolean;
  role?: string;
  whatsappLink: string;
  logoUrl?: string;
}

/**
 * Menu Drawer Mobile Atualizado com visual moderno #0A0E17 e botão de fechar elegante
 */
export function MobileSidebar({ isAdmin, isSeo, role, whatsappLink, logoUrl }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const drawerContent = isOpen ? (
    <div className="fixed inset-0 z-[100] flex">
      {/* Overlay com Blur Suave */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-80 max-w-[85vw] h-full bg-[#0A0E17] text-white shadow-2xl animate-in slide-in-from-left duration-250 flex flex-col border-r border-white/10">
        
        {/* Cabeçalho do Menu Mobile */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
          <Link href="/dashboard" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00BF30] to-[#008020] flex items-center justify-center shadow-md shadow-[#00BF30]/20">
                <Database className="text-white w-4 h-4" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
                Puxar<span className="text-[#00BF30]">Dados</span>
              </span>
              <span className="text-[10px] text-emerald-400/80 font-mono">
                Intelligence Platform
              </span>
            </div>
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            aria-label="Fechar menu"
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Itens do Menu */}
        <div className="flex-1 overflow-y-auto">
          <div onClick={() => setIsOpen(false)}>
            <SidebarNav isAdmin={isAdmin} isSeo={isSeo} role={role} whatsappLink={whatsappLink} />
          </div>
        </div>

        {/* Rodapé Logout */}
        <div className="p-4 border-t border-white/5 bg-black/20">
          <form action={logout}>
            <button 
              type="submit" 
              className="flex w-full items-center justify-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair da Conta</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menu"
        className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors flex items-center justify-center border border-slate-200 dark:border-white/10"
      >
        <Menu className="w-5 h-5" />
      </button>

      {mounted && createPortal(drawerContent, document.body)}
    </div>
  );
}
