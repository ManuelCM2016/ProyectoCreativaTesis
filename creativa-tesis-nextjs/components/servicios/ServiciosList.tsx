'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ── Services data (excluding Programa Flex & Simulación) ── */
const SERVICES = [
  { num: '01', title: 'Tesis Completa', desc: 'Desarrollo integral desde el planteamiento del problema hasta las conclusiones y recomendaciones.' },
  { num: '02', title: 'Artículos científicos', desc: 'Redacción y publicación de artículos en revistas indexadas con estándares internacionales.' },
  { num: '03', title: 'Trabajos de suficiencia profesional', desc: 'Elaboración de informes y documentos requeridos para la titulación por experiencia laboral.' },
  { num: '04', title: 'Ensayos científicos y jurídicos', desc: 'Producción académica argumentativa con rigor metodológico para diversas disciplinas.' },
  { num: '05', title: 'Análisis de datos estadísticos', desc: 'Procesamiento e interpretación de datos con SPSS, R, Python, STATA y más herramientas.' },
  { num: '06', title: 'Formato y estilo (APA-Chicago-Vancouver)', desc: 'Adecuación normativa integral según el estándar exigido por tu universidad.' },
  { num: '07', title: 'Parafraseo de similitud e IA', desc: 'Reducción de índice de similitud y detección de IA con técnicas profesionales de reescritura.' },
];

export default function ServiciosList() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Staggered entrance: each card slides up and fades in from its own trigger point
    const cards = gsap.utils.toArray<HTMLElement>('.srv-list-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        {
          y: 50,
          opacity: 0,
          rotateX: -8,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
          delay: (i % 2) * 0.1, // slight stagger for pairs
        }
      );
    });

    // Title word-split reveal
    const words = gsap.utils.toArray<HTMLElement>('.srv-list-word');
    gsap.fromTo(words,
      { y: '100%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.srv-list-title',
          start: 'top 85%',
          once: true,
        },
      }
    );

  }, { scope: sectionRef });

  const titleWords = ['Servicios', 'de', 'Creativa', 'Tesis'];

  return (
    <section id="otros-servicios" ref={sectionRef} className="relative py-24 sm:py-32 bg-[#141318] overflow-hidden">
      {/* Background grid dot pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] bg-[#365470]/15 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Title */}
        <div className="text-center mb-16 lg:mb-24">
          <h2
            className="srv-list-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight overflow-hidden"
            style={{ fontFamily: '"Questrial", "Satoshi", sans-serif', perspective: '600px' }}
          >
            {titleWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
                <span
                  className={`srv-list-word inline-block opacity-0 ${
                    i >= 2 ? 'text-[#95C2E9]' : 'text-white'
                  }`}
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>
          <p
            className="mt-6 text-base sm:text-lg text-white/45 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Además de nuestros programas estrella, ofrecemos soluciones académicas especializadas para cada etapa de tu formación.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {SERVICES.map((service) => (
            <div
              key={service.num}
              className="srv-list-card opacity-0 group relative rounded-[1.5rem] p-6 lg:p-8 flex items-start gap-5 transition-all duration-500 cursor-default"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                perspective: '800px',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = 'rgba(149,194,233,0.08)';
                el.style.borderColor = 'rgba(149,194,233,0.25)';
                el.style.boxShadow = '0 8px 40px rgba(149,194,233,0.1)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = 'rgba(255,255,255,0.04)';
                el.style.borderColor = 'rgba(255,255,255,0.08)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Number Badge */}
              <div
                className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, #365470 0%, #95C2E9 100%)',
                  color: '#ffffff',
                  fontFamily: '"Questrial", sans-serif',
                  boxShadow: '0 4px 16px rgba(54,84,112,0.3)',
                }}
              >
                {service.num}
              </div>

              <div className="flex-1 min-w-0">
                <h3
                  className="text-lg lg:text-xl font-bold text-white mb-2 leading-tight"
                  style={{ fontFamily: '"Questrial", sans-serif' }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm text-white/40 leading-relaxed"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  {service.desc}
                </p>
              </div>

              {/* Decorative arrow */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0" style={{ background: 'rgba(149,194,233,0.15)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#95C2E9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
