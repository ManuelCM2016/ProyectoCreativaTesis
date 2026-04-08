"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function ServicesHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal text
    gsap.from(".hero-text-line", {
      y: 40,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.2
    });

    // Animate Orbs Fade-in
    gsap.from(".hero-orb", {
       scale: 0.6,
       opacity: 0,
       duration: 2,
       stagger: 0.3,
       ease: "power2.out"
    });
  }, { scope: containerRef });

  useEffect(() => {
    // Gentle floating orb effect reacting to mouse
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth) - 0.5;
      const yPos = (clientY / window.innerHeight) - 0.5;

      gsap.to(orb1Ref.current, {
        x: xPos * 80,
        y: yPos * 80,
        duration: 2,
        ease: "sine.out",
      });
      gsap.to(orb2Ref.current, {
        x: -xPos * 120,
        y: -yPos * 120,
        duration: 2.5,
        ease: "sine.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#141318]">
      {/* Background Interactive Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          ref={orb1Ref}
          className="hero-orb absolute top-[20%] left-[20%] w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] bg-[#365470] rounded-full mix-blend-screen filter blur-[120px] lg:blur-[180px] opacity-50" 
        ></div>
        <div 
          ref={orb2Ref}
          className="hero-orb absolute bottom-[10%] right-[15%] w-[450px] h-[450px] lg:w-[700px] lg:h-[700px] bg-[#95C2E9] rounded-full mix-blend-screen filter blur-[120px] lg:blur-[200px] opacity-30" 
        ></div>
        {/* Textura sutil ruído */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.04] mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center max-w-5xl mt-12 lg:mt-0">
        
        {/* Etiqueta superior */}
        <div className="hero-text-line inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-[#95C2E9]/30 bg-[#365470]/30 backdrop-blur-md shadow-lg shadow-[#365470]/20">
          <span className="w-2 h-2 rounded-full bg-[#95C2E9] animate-pulse"></span>
          <span className="text-[#95C2E9] text-sm md:text-base font-semibold tracking-widest uppercase">
            Metodología Académica Probada
          </span>
        </div>
        
        {/* Título Moderno y Elegante */}
        <h1 className="hero-text-line text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-8 text-[#F2F2F2] leading-[1.1] drop-shadow-2xl">
          Transformamos tu esfuerzo en un <br className="hidden md:block"/>
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#eef4f9] via-[#95C2E9] to-[#365470]">Título Profesional</span>
            {/* Destello decorativo detrás del texto */}
            <span className="absolute -inset-2 bg-[#95C2E9] blur-3xl opacity-20 -z-10 rounded-full"></span>
          </span>
        </h1>
        
        {/* Descripción */}
        <p className="hero-text-line text-lg sm:text-xl md:text-2xl text-[#F2F2F2]/80 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-md">
          Impulsamos tu proyecto de investigación con asesoría especializada, 
          análisis estadístico riguroso y simulaciones de alto impacto para 
          asegurar tu excelencia.
        </p>

        {/* CTA */}
        <div className="hero-text-line mt-14 flex flex-col sm:flex-row items-center justify-center gap-6">
           <button 
             className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#95C2E9] text-[#141318] font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-400 ease-out shadow-[0_0_20px_rgba(149,194,233,0.3)] hover:shadow-[0_0_30px_rgba(149,194,233,0.6)] flex items-center justify-center gap-3"
             onClick={() => {
                const el = document.getElementById("programa-flex");
                el?.scrollIntoView({ behavior: "smooth" });
             }}
           >
             Descubrir Programas
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
           </button>
        </div>
      </div>
    </section>
  );
}
