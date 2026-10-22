'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Search, Sliders, CheckCircle2, ArrowRight, ShieldCheck, Zap, Lock } from 'lucide-react';

export default function ComoFuncionaStacking() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.stack-card'));
    if (cards.length === 0) return;

    let ticking = false;

    function updateCards() {
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          const nextCard = cards[i + 1];
          const currentRect = card.getBoundingClientRect();
          const nextRect = nextCard.getBoundingClientRect();

          const overlap = currentRect.bottom - nextRect.top;
          const totalHeight = currentRect.height;

          if (overlap > 0) {
            const progress = Math.min(Math.max(overlap / (totalHeight * 0.85), 0), 1);
            const scale = 1 - (progress * 0.04);
            const brightness = 1 - (progress * 0.15);
            const translateY = progress * -4;

            card.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            card.style.filter = `brightness(${brightness})`;
          } else {
            card.style.transform = 'scale(1) translateY(0px)';
            card.style.filter = 'brightness(1)';
          }
        } else {
          card.style.transform = 'scale(1) translateY(0px)';
          card.style.filter = 'brightness(1)';
        }
      });

      ticking = false;
    }

    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateCards);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    updateCards();

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return (
    <section id="como-funciona" className="py-12 md:py-16 bg-[#F8FAF8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho Sticky com Efeito Blur */}
        <div className="services-sticky-header rounded-2xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#008020] tracking-wider uppercase bg-[#F0FAF2] px-3.5 py-1.5 rounded-full border border-[#00E63A]/40 inline-block mb-1.5">
                Passo a Passo
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#004010]">
                Como funciona o processo de consulta
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#647067] max-w-md">
              Processo simplificado em três etapas transparentes, seguras e imediatas.
            </p>
          </div>
        </div>

        {/* Stacking Cards Container */}
        <div className="stacking-container relative max-w-4xl mx-auto">
          {/* Card 01 */}
          <div className="stack-card sticky top-[160px] sm:top-[200px] md:top-[220px] z-10 w-full rounded-3xl bg-white border border-[#E2EAE3] shadow-md p-6 sm:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FAF2] text-[#008020] text-xs font-bold">
                  <Search className="w-3.5 h-3.5 text-[#00BF30]" />
                  Passo 01
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#004010]">
                  Escolha o tipo de consulta
                </h3>
                <p className="text-sm text-[#647067] leading-relaxed">
                  Selecione entre consultas de CPF, telefone, CNPJ, nome ou placa automotiva. Informe o documento ou chave desejada com total segurança e sigilo.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs bg-[#F8FAF8] border border-[#E2EAE3] text-[#15231A] font-semibold px-2.5 py-1 rounded-lg">CPF</span>
                  <span className="text-xs bg-[#F8FAF8] border border-[#E2EAE3] text-[#15231A] font-semibold px-2.5 py-1 rounded-lg">Telefone Nacional</span>
                  <span className="text-xs bg-[#F8FAF8] border border-[#E2EAE3] text-[#15231A] font-semibold px-2.5 py-1 rounded-lg">Placa Mercosul</span>
                  <span className="text-xs bg-[#F8FAF8] border border-[#E2EAE3] text-[#15231A] font-semibold px-2.5 py-1 rounded-lg">CNPJ & Sócios</span>
                </div>
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F0FAF2] border border-[#E2EAE3] text-[#00BF30] flex items-center justify-center text-2xl font-black shrink-0 shadow-inner">
                01
              </div>
            </div>
          </div>

          {/* Card 02 */}
          <div className="stack-card sticky top-[180px] sm:top-[225px] md:top-[250px] z-20 w-full rounded-3xl bg-[#F0FAF2] border border-[#00BF30]/30 shadow-lg p-6 sm:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#008020] text-xs font-bold shadow-xs">
                  <Sliders className="w-3.5 h-3.5 text-[#00BF30]" />
                  Passo 02
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#004010]">
                  Selecione os módulos com preços avulsos
                </h3>
                <p className="text-sm text-[#15231A] leading-relaxed">
                  Visualize a grade de módulos disponíveis, confira os valores transparentes e marque apenas as informações necessárias para a sua finalidade. Sem mensalidade ou pegadinhas.
                </p>
                <div className="flex items-center gap-4 pt-1 text-xs text-[#008020] font-semibold">
                  <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#00BF30]" /> Cache Inteligente (48h)</span>
                  <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-[#00BF30]" /> Débito Fracionado</span>
                </div>
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-[#00BF30]/30 text-[#008020] flex items-center justify-center text-2xl font-black shrink-0 shadow-sm">
                02
              </div>
            </div>
          </div>

          {/* Card 03 */}
          <div className="stack-card sticky top-[200px] sm:top-[250px] md:top-[280px] z-30 w-full rounded-3xl bg-gradient-to-br from-[#004010] via-[#008020] to-[#00BF30] text-white border border-[#00E63A]/40 shadow-xl p-6 sm:p-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF41]" />
                  Passo 03
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Acesse os dados em tempo real
                </h3>
                <p className="text-sm text-emerald-50 leading-relaxed">
                  Os resultados são estruturados e entregues instantaneamente em um relatório visual completo, legível e responsivo, pronto para exportação ou visualização em qualquer dispositivo.
                </p>
                <div className="pt-2">
                  <Link
                    href="/cadastro"
                    className="inline-flex items-center gap-2 bg-white text-[#004010] hover:bg-emerald-50 font-bold px-6 py-3 rounded-xl shadow-lg transition-all active:scale-95 text-xs sm:text-sm"
                  >
                    Começar Consulta Agora
                    <ArrowRight className="w-4 h-4 text-[#008020]" />
                  </Link>
                </div>
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 text-[#00FF41] flex items-center justify-center text-2xl font-black shrink-0 shadow-lg">
                03
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
