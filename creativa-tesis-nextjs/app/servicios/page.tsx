import React from "react";
import ServicesHero from "@/components/servicios/ServicesHero";
import FlexTimeline from "@/components/servicios/FlexTimeline";
import ProgramsBenefits from "@/components/servicios/ProgramsBenefits";
import ServiciosList from "@/components/servicios/ServiciosList";
import UniversidadesSection from "@/components/servicios/UniversidadesSection";
import StatisticalTools from "@/components/servicios/StatisticalTools";
import { getUniversities } from "@/lib/sanity/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios | Creativa Tesis",
  description: "Transformamos tu tesis en un título. Descubre nuestro Programa Flex y las Simulaciones de Sustentación con acompañamiento 100% personalizado.",
};

export default async function ServiciosPage() {
  const universities = await getUniversities();

  return (
    <main className="min-h-screen overflow-hidden bg-[#141318]">
      {/* 1. Hero Split con Partículas y Tilt 3D */}
      <ServicesHero />

      {/* 2. Programa Flex — Tiempos + Sub-pasos (Sticky Scroll) */}
      <FlexTimeline />

      {/* 3. Programas lado a lado (Flex vs Simulación) */}
      <ProgramsBenefits />

      {/* 4. Lista de 7 Servicios Enumerados */}
      <ServiciosList />

      {/* 5. Universidades a nivel nacional (logos desde Sanity) */}
      <UniversidadesSection universities={universities} />

      {/* 6. Ecosistema Estadístico — Marquee */}
      <StatisticalTools />

      {/* 7. Call to Action Final — Diseño Premium */}
      <ServicesCTA />
    </main>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CTA FINAL — Diseño "Spotlight" con vidrio y resplandor central
   ═══════════════════════════════════════════════════════════════ */
function ServicesCTA() {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden bg-[#141318]">
      {/* Spotlight central */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(149,194,233,0.18) 0%, rgba(54,84,112,0.08) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Grid dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Top/Bottom lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#95C2E9]/15 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="mb-10">
          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.3em] font-semibold"
            style={{
              background: 'rgba(149,194,233,0.08)',
              color: '#95C2E9',
              border: '1px solid rgba(149,194,233,0.15)',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#95C2E9] animate-pulse" />
            Tu futuro comienza aquí
          </span>
        </div>

        {/* Title */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white leading-[1.08] mb-8"
          style={{ fontFamily: '"Questrial", "Satoshi", sans-serif', letterSpacing: '-0.02em' }}
        >
          ¿Listo para <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #95C2E9 0%, #eef4f9 50%, #95C2E9 100%)' }}>
            titularte
          </span>
          ?
        </h2>

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg text-white/45 max-w-xl mx-auto leading-relaxed mb-12"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          Comienza hoy con una evaluación gratuita de tu proyecto. Recibe un cronograma de trabajo personalizado en tu primera sesión.
        </p>

        {/* Glass Card CTA */}
        <div
          className="inline-flex flex-col sm:flex-row items-center gap-4 p-2 rounded-[1.5rem]"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <a
            href="/contacto"
            className="group inline-flex items-center gap-3 rounded-[1.2rem] px-10 py-5 text-sm font-bold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03] active:scale-[0.97]"
            style={{
              fontFamily: '"Inter", sans-serif',
              background: 'linear-gradient(135deg, #95C2E9 0%, #7BB0DC 100%)',
              color: '#141318',
              boxShadow: '0 8px 32px rgba(149,194,233,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            Cotizar Programa Flex
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#141318]/10 transition-transform duration-500 group-hover:translate-x-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </a>
          <a
            href="https://wa.me/51918677900"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-[1.2rem] px-10 py-5 text-sm font-semibold text-white ring-1 ring-white/15 transition-all duration-500 hover:ring-white/30 hover:bg-white/5 active:scale-[0.97]"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            WhatsApp
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </a>
        </div>

        {/* Trust line */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <div className="w-12 h-px bg-white/10" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/25 font-semibold" style={{ fontFamily: '"Inter", sans-serif' }}>
            Acompañamiento integral · Garantía de éxito
          </p>
          <div className="w-12 h-px bg-white/10" />
        </div>
      </div>
    </section>
  );
}
