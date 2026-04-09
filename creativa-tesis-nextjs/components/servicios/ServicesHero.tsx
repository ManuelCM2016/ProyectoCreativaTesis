'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import BokehParticles from '@/components/shared/BokehParticles';

gsap.registerPlugin(useGSAP);

/* ── Floating metrics that orbit around the hero ── */
const FLOAT_METRICS = [
  { value: '100+', label: 'Tesis Aprobadas', x: '8%', y: '22%', delay: 0.4 },
  { value: '98%', label: 'Éxito en 1ra Sustentación', x: '78%', y: '18%', delay: 0.7 },
  { value: '24h', label: 'Respuesta Garantizada', x: '85%', y: '72%', delay: 1.0 },
];

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // 1. Enormous title: clip reveal from bottom
    tl.fromTo('.srv-title-line', 
      { yPercent: 120, rotateX: -25, opacity: 0 },
      { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.3, stagger: 0.12 }
    );

    // 2. Subtitle fade up
    tl.fromTo('.srv-subtitle',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.6'
    );

    // 3. CTA buttons
    tl.fromTo('.srv-cta',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
      '-=0.4'
    );

    // 4. Floating metric chips pop in
    tl.fromTo('.srv-chip',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.7)' },
      '-=0.5'
    );

    // 5. Image mask reveal
    tl.fromTo('.srv-image-mask',
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power3.inOut' },
      '-=1.2'
    );

    // 6. Floating chip gentle bob (infinite)
    gsap.to('.srv-chip', {
      y: 'random(-8, 8)',
      x: 'random(-5, 5)',
      duration: 'random(3, 5)',
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.4, from: 'random' },
    });

    // 7. Marquee text scroll (infinite horizontal scroll)
    if (marqueeRef.current) {
      const marqueeWidth = marqueeRef.current.scrollWidth / 2;
      gsap.to(marqueeRef.current, {
        x: -marqueeWidth,
        duration: 25,
        ease: 'none',
        repeat: -1,
      });
    }

  }, { scope: sectionRef });

  // Mouse tilt on the image
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const img = document.querySelector('.srv-image-tilt') as HTMLElement | null;
      if (!img || window.innerWidth < 1024) return;
      const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(img, {
        rotateY: xPos * 4,
        rotateX: -yPos * 3,
        duration: 1.2,
        ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const marqueeText = '  SERVICIOS ACADÉMICOS  ·  PROGRAMA FLEX  ·  SIMULACIÓN DE SUSTENTACIÓN  ·  ANÁLISIS ESTADÍSTICO  ·  ';

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#141318] flex items-center"
    >
      {/* ── Bokeh Particles ── */}
      <BokehParticles sectionRef={sectionRef} color="#95C2E9" count={120} mouseRadius={160} mouseForce={0.8} />

      {/* ── Background grid-dot pattern ── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Ambient Glows ── */}
      <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-[#365470]/25 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-[#95C2E9]/15 rounded-full blur-[200px] pointer-events-none" />

      {/* ── Overflowing Marquee Text (behind content, clipped) ── */}
      <div className="absolute bottom-[8%] left-0 w-full z-[2] pointer-events-none overflow-hidden opacity-[0.04]">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          <span className="text-[12vw] font-black text-white tracking-tighter leading-none" style={{ fontFamily: '"Questrial", sans-serif' }}>
            {marqueeText}{marqueeText}
          </span>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 pt-40 pb-20 lg:pt-44 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[70vh]">

          {/* Left Column: Typography */}
          <div className="flex flex-col" style={{ perspective: '800px' }}>
            {/* Badge */}
            <div className="srv-subtitle mb-8 opacity-0">
              <span
                className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-[10px] uppercase tracking-[0.3em] font-semibold backdrop-blur-md"
                style={{
                  background: 'rgba(149,194,233,0.1)',
                  color: '#95C2E9',
                  border: '1px solid rgba(149,194,233,0.2)',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-[#95C2E9] animate-pulse" />
                Soluciones Académicas
              </span>
            </div>

            {/* Enormous Title — Line by line reveal */}
            <h1
              className="mb-8 overflow-hidden"
              style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
            >
              <span className="srv-title-line block text-[clamp(2.5rem,6vw,5.5rem)] font-bold text-white tracking-tight leading-[1.05] opacity-0">
                Transformamos
              </span>
              <span className="srv-title-line block text-[clamp(2.5rem,6vw,5.5rem)] font-bold text-white tracking-tight leading-[1.05] opacity-0">
                tu esfuerzo en un
              </span>
              <span className="srv-title-line block text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-tight leading-[1.05] opacity-0">
                <span className="text-transparent bg-clip-text" style={{
                  backgroundImage: 'linear-gradient(135deg, #eef4f9 0%, #95C2E9 40%, #365470 100%)',
                }}>
                  Título Profesional.
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="srv-subtitle opacity-0 text-base sm:text-lg text-white/55 max-w-[48ch] leading-relaxed mb-10"
              style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}
            >
              Asesoría integral: desde la elección de tu tema hasta la defensa exitosa 
              ante el jurado. Más de 100 tesis aprobadas respaldan nuestro método.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="srv-cta opacity-0 group inline-flex items-center justify-center gap-3 rounded-full px-9 py-4 text-sm font-bold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  background: 'linear-gradient(135deg, #95C2E9 0%, #7BB0DC 100%)',
                  color: '#141318',
                  boxShadow: '0 8px 32px rgba(149,194,233,0.3)',
                }}
                onClick={() => {
                  document.getElementById('programa-flex')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explorar Programas
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#141318]/10 transition-transform duration-500 group-hover:translate-x-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </button>
              <a
                href="https://wa.me/51999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="srv-cta opacity-0 inline-flex items-center justify-center gap-3 rounded-full px-9 py-4 text-sm font-semibold text-white ring-1 ring-white/20 transition-all duration-500 hover:ring-white/40 hover:bg-white/5 active:scale-[0.97]"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                WhatsApp
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Asymmetric Image with Tilt */}
          <div className="relative flex justify-center lg:justify-end" style={{ perspective: '1000px' }}>
            <div
              className="srv-image-tilt relative w-full max-w-[520px] will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Image container with creative clip-path */}
              <div
                className="srv-image-mask relative w-full overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
                style={{
                  borderRadius: '32px 32px 120px 32px',
                  aspectRatio: '4/5',
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop"
                  alt="Equipo Creativa Tesis — Asesoría Profesional"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Elegant overlay blend */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141318]/70 via-transparent to-[#365470]/20 pointer-events-none" />

                {/* Inner glass badge */}
                <div
                  className="absolute bottom-6 left-6 right-6 px-5 py-4 rounded-2xl flex items-center gap-3"
                  style={{
                    background: 'rgba(20,19,24,0.6)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#95C2E9]/20 flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#95C2E9" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold leading-tight" style={{ fontFamily: '"Questrial", sans-serif' }}>
                      Programa Flex
                    </p>
                    <p className="text-white/50 text-xs" style={{ fontFamily: '"Inter", sans-serif' }}>
                      Asesoría integral en 15 pasos
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative floating border element */}
              <div
                className="absolute -top-4 -right-4 w-full h-full rounded-[32px_32px_120px_32px] border border-[#95C2E9]/20 pointer-events-none -z-10"
              />
            </div>

            {/* ── Floating Metric Chips ── */}
            {FLOAT_METRICS.map((chip, i) => (
              <div
                key={i}
                className="srv-chip absolute hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-full opacity-0 will-change-transform z-20"
                style={{
                  left: chip.x,
                  top: chip.y,
                  background: 'rgba(20,19,24,0.7)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid rgba(149,194,233,0.2)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                }}
              >
                <span className="text-[#95C2E9] text-sm font-bold" style={{ fontFamily: '"Questrial", sans-serif' }}>
                  {chip.value}
                </span>
                <span className="text-white/50 text-[10px] uppercase tracking-widest font-medium" style={{ fontFamily: '"Inter", sans-serif' }}>
                  {chip.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-[1px] h-8 rounded-full border border-white/20 flex justify-center pt-1 overflow-hidden">
          <div className="w-[3px] h-[3px] rounded-full bg-white/60 animate-bounce" />
        </div>
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-medium" style={{ fontFamily: '"Inter", sans-serif' }}>
          Scroll
        </span>
      </div>
    </section>
  );
}
