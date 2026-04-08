"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function ProgramsBenefits() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  // Animaciones 3D Lift que no alteran el Layout ni el ancho (evita saltos de texto)
  const handleHoverLeft = (isEnter: boolean) => {
    if (window.innerWidth < 1024) return;
    
    if (isEnter) {
      // Elevar izquierda, empujar derecha
      gsap.to(leftCardRef.current, { y: -15, scale: 1.02, zIndex: 20, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", duration: 0.5, ease: "power3.out" });
      gsap.to(rightCardRef.current, { opacity: 0.5, scale: 0.95, filter: "grayscale(100%)", duration: 0.5, ease: "power3.out" });
    } else {
      gsap.to([leftCardRef.current, rightCardRef.current], { y: 0, scale: 1, opacity: 1, filter: "grayscale(0%)", boxShadow: "none", duration: 0.5, ease: "power3.out" });
      gsap.set(leftCardRef.current, { zIndex: 10 });
    }
  };

  const handleHoverRight = (isEnter: boolean) => {
    if (window.innerWidth < 1024) return;

    if (isEnter) {
      // Elevar derecha, empujar izquierda
      gsap.to(rightCardRef.current, { y: -15, scale: 1.02, zIndex: 20, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", duration: 0.5, ease: "power3.out" });
      gsap.to(leftCardRef.current, { opacity: 0.5, scale: 0.95, filter: "grayscale(100%)", duration: 0.5, ease: "power3.out" });
    } else {
      gsap.to([leftCardRef.current, rightCardRef.current], { y: 0, scale: 1, opacity: 1, filter: "grayscale(0%)", boxShadow: "none", duration: 0.5, ease: "power3.out" });
      gsap.set(rightCardRef.current, { zIndex: 10 });
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="bg-[#F2F2F2] py-20 lg:py-32 w-full overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <h2 className="text-4xl sm:text-5xl font-black text-[#141318] leading-tight mb-4">
            Servicios <span className="text-[#95C2E9]">Especializados</span>
          </h2>
          <p className="text-lg text-[#365470] font-medium">
            Entornos dedicados de acompañamiento según en qué etapa te encuentres.
          </p>
        </div>

        {/* CONTENEDOR 50/50 ESTÁTICO (FLEX-1) - Sin cambios de width (Accordion) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch" onMouseLeave={() => {
           // Respaldo de seguridad por si el mouse sale rápido del contenedor
           if (window.innerWidth >= 1024) {
             gsap.to([leftCardRef.current, rightCardRef.current], { y: 0, scale: 1, opacity: 1, filter: "grayscale(0%)", boxShadow: "none", duration: 0.5, ease: "power3.out" });
           }
        }}>
          
          {/* TARJETA IZQUIERDA: Programa Flex */}
          <div 
            ref={leftCardRef}
            className="flex-1 bg-[#141318] relative rounded-[2rem] overflow-hidden flex flex-col cursor-pointer transition-shadow"
            onMouseEnter={() => handleHoverLeft(true)}
            onMouseLeave={() => handleHoverLeft(false)}
          >
            {/* Ambientación Glow Interna */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#365470]/30 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="p-8 sm:p-12 xl:p-16 flex-grow flex flex-col relative z-10">
              <h3 className="text-4xl md:text-5xl font-black text-[#F2F2F2] mb-8">
                Programa <br />
                <span className="text-[#95C2E9]">Flex</span>
              </h3>

              <ul className="space-y-6 mb-12 flex-grow">
                {[
                  "Asesoría 100% personalizada",
                  "Equipo de 3 asesores especializados",
                  "Pre-sustentación con especialistas de tu carrera"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-4 text-[#F2F2F2] text-lg font-medium">
                    <div className="mt-1 flex-shrink-0 w-7 h-7 rounded-full bg-[#365470] flex items-center justify-center text-[#95C2E9]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Geometry Image Left */}
            <div className="w-full h-64 sm:h-80 relative overflow-hidden mt-auto">
              {/* Overlay suave para integrar imagen con el fondo #141318 */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141318] via-transparent to-transparent z-10 mix-blend-multiply"></div>
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop"
                alt="Programa Flex Creativa Tesis"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* TARJETA DERECHA: Simulación de Sustentación */}
          <div 
            ref={rightCardRef}
            className="flex-1 bg-[#365470] relative rounded-[2rem] overflow-hidden flex flex-col cursor-pointer transition-shadow"
            onMouseEnter={() => handleHoverRight(true)}
            onMouseLeave={() => handleHoverRight(false)}
          >
            {/* Patrón sutil y Glow Interno */}
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.05] mix-blend-overlay pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#95C2E9]/20 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="p-8 sm:p-12 xl:p-16 flex-grow flex flex-col relative z-10">
              <h3 className="text-4xl md:text-5xl font-black text-[#F2F2F2] mb-8 drop-shadow-sm">
                Simulación de <br />
                <span className="text-[#95C2E9]">Sustentación</span>
              </h3>

              <ul className="space-y-6 mb-12 flex-grow">
                {[
                  "Diapositivas o PPT",
                  "Banco de preguntas de jurado",
                  "Capacitación integral",
                  "(2) Simulaciones"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-4 text-[#F2F2F2] text-lg font-medium">
                    <div className="mt-1 flex-shrink-0 w-7 h-7 rounded-sm bg-[#95C2E9] flex items-center justify-center text-[#141318]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Geometry Image Right */}
            <div className="w-full h-64 sm:h-80 relative overflow-hidden mt-auto">
              <div className="absolute inset-0 bg-gradient-to-t from-[#365470] via-[#365470]/30 to-transparent z-10 mix-blend-multiply"></div>
              <Image
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470&auto=format&fit=crop"
                alt="Simulación de Sustentación Creativa Tesis"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
