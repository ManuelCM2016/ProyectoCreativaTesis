import React from "react";
import ServicesHero from "@/components/servicios/ServicesHero";
import FlexTimeline from "@/components/servicios/FlexTimeline";
import ProgramsBenefits from "@/components/servicios/ProgramsBenefits";
import StatisticalTools from "@/components/servicios/StatisticalTools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios | Creativa Tesis",
  description: "Transformamos tu tesis en un título. Descubre nuestro Programa Flex y las Simulaciones de Sustentación con acompañamiento 100% personalizado.",
};

export default function ServiciosPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#141318]">
      {/* 1. Hero con Tipografía Cinética */}
      <ServicesHero />

      {/* 2. Proceso y Tiempos (Sticky Scroll) */}
      <FlexTimeline />

      {/* 3. El Duelo de Beneficios (Accordion Flex) */}
      <ProgramsBenefits />

      {/* 4. Marquee de Herramientas */}
      <StatisticalTools />

      {/* 5. Call to Action Final */}
      <section className="relative py-28 md:py-40 flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Glow Radial de Ambientación */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          <div className="w-full max-w-4xl aspect-square absolute rounded-full blur-[150px] opacity-40 bg-[radial-gradient(circle,#365470_0%,transparent_70%)]"></div>
          {/* Micropartículas estáticas de diseño */}
          <div className="absolute inset-0 opacity-20 bg-[url('/images/noise.png')] mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-12">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#F2F2F2] leading-tight tracking-tighter drop-shadow-xl">
            ¿Listo para dar el paso de<span className="text-[#95C2E9] font-serif italic font-light ml-[2px]">f</span>initivo hacia tu título?
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mt-8">
            <button className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-[#95C2E9] to-[#80b1da] text-[#141318] font-bold text-lg rounded-full shadow-[0_0_20px_rgba(149,194,233,0.25)] hover:shadow-[0_0_40px_rgba(149,194,233,0.5)] hover:bg-gradient-to-l hover:scale-105 transition-all duration-500 ease-out flex items-center justify-center gap-3">
              Cotizar Programa Flex
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-[#F2F2F2]/30 text-[#F2F2F2] font-semibold text-lg rounded-full hover:bg-[#F2F2F2] hover:text-[#141318] hover:border-[#F2F2F2] transition-all duration-500 ease-out flex items-center justify-center gap-3">
              Contactar por WhatsApp
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </button>
          </div>
          
          <p className="text-[#95C2E9] text-sm sm:text-base font-medium mt-10 opacity-80 uppercase tracking-[0.2em]">
            Acompañamiento integral • Garantía de éxito
          </p>
        </div>
      </section>
    </main>
  );
}
