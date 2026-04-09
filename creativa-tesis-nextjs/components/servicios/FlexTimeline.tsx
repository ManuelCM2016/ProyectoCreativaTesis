'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import BokehParticles from '@/components/shared/BokehParticles';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ── Scroll-reveal images for the left column (user will replace) ── */
const SCROLL_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop', alt: 'Asesoría académica', orientation: 'horizontal' as const },
  { src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop', alt: 'Investigación científica', orientation: 'vertical' as const },
  { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop', alt: 'Equipo de trabajo', orientation: 'horizontal' as const },
  { src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop', alt: 'Estudiantes exitosos', orientation: 'vertical' as const },
  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop', alt: 'Sesión grupal', orientation: 'horizontal' as const },
  { src: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop', alt: 'Biblioteca académica', orientation: 'vertical' as const },
];

export default function FlexTimeline() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  const setStepRef = (el: HTMLDivElement | null, index: number) => {
    stepsRef.current[index] = el;
  };

  const timelineData = [
    { label: 'Entrega de sus 03 temas', time: '2 a 3 días' },
    { label: 'Proyecto de tesis', time: '10 a 15 días' },
    { label: 'Entrega de Tesis final', time: '10 a 15 días' },
    { label: 'Turnitin', time: '3 a 5 días' },
    { label: 'Levantamiento de observaciones', time: '2 a 3 días' },
  ];

  const phases = [
    {
      id: '01',
      title: 'Plan o proyecto de tesis',
      description: 'Construimos la base sólida de tu investigación de forma guiada y estructurada.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop',
      substeps: [
        { label: '1. POSIBLES TEMAS', text: 'Construimos la base de la investigación mediante la realidad problemática con sustento bibliográfico, formulación del problema, objetivos, justificación e hipótesis.' },
        { label: '2. CAPÍTULO I – PLANTEAMIENTO DEL PROBLEMA', text: 'Elegimos el tema correcto para tu carrera y universidad. Te entregamos 03 propuestas de temas y te explicamos cada uno para que elijas el más viable.' },
        { label: '3. CAPÍTULO II – MARCO TEÓRICO', text: 'Desarrollamos los antecedentes relevantes, teorías vinculadas al tema y bases conceptuales que respaldan científicamente el estudio.' },
        { label: '4. CAPÍTULO III – METODOLOGÍA', text: 'Definimos el diseño de la investigación, población y elaboramos los instrumentos, así como el análisis de datos y aspectos éticos.' },
        { label: '5. CAPÍTULO IV – ASPECTOS ADMINISTRATIVOS', text: 'Detallamos los recursos, presupuesto, financiamiento y cronograma de ejecución del proyecto.' },
        { label: '6. ANEXOS DEL PLAN', text: 'Matrices, instrumentos, confiabilidad, validación de instrumentos, entre otros.' },
      ],
    },
    {
      id: '02',
      title: 'Tesis final o Informe final',
      description: 'Desarrollamos los capítulos vitales para presentar tu estudio ante el jurado.',
      image: 'https://images.unsplash.com/photo-1555431189-0af5d0af9263?q=80&w=1469&auto=format&fit=crop',
      substeps: [
        { label: '7. CAPÍTULO V – RESULTADOS', text: 'Presentamos los resultados descriptivos e inferenciales en función de los objetivos e hipótesis planteadas.' },
        { label: '8. CAPÍTULO VI – DISCUSIÓN', text: 'Contrastamos los resultados obtenidos con los antecedentes y el marco teórico.' },
        { label: '9. CAPÍTULO VII – CONCLUSIONES', text: 'Formulamos conclusiones claras, coherentes derivadas de los objetivos y resultados del estudio.' },
        { label: '10. CAPÍTULO VIII – RECOMENDACIONES', text: 'Planteamos propuestas de mejora dirigidas a la población de estudio, según el contexto investigado.' },
        { label: '11. ANEXOS DE LA TESIS', text: 'Se incorporan evidencias, reportes de originalidad, actas y documentos institucionales (la información es provista).' },
      ],
    },
    {
      id: '03',
      title: 'Programa de simulación de sustentación',
      description: 'Te preparamos para una defensa segura y exitosa con acompañamiento integral.',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470&auto=format&fit=crop',
      substeps: [
        { label: '12. DIAPOSITIVAS O PPT', text: 'Se desarrollan PPT personalizadas con diseño profesional y línea gráfica académica.' },
        { label: '13. BANCO DE PREGUNTAS DE JURADO', text: 'Banco de preguntas con respuestas estratégicas y bien fundamentadas.' },
        { label: '14. CAPACITACIÓN INTEGRAL', text: 'Capacitación estadística y temática aplicada directamente a tu investigación para reforzar teoría y coherencia.' },
        { label: '15. SIMULACIONES', text: '(2) Simulaciones guiadas de exposición para fortalecer seguridad y dominio escénico.' },
      ],
    },
  ];

  useGSAP(() => {
    if (!stepsContainerRef.current) return;

    // Línea vertical que crece con el scroll
    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: stepsContainerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      }
    );

    // Transición de las Fases
    stepsRef.current.forEach((step) => {
      if (!step) return;
      const img = step.querySelector('.geo-image');

      gsap.to(step, {
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 75%',
          end: 'top 40%',
          scrub: true,
        },
      });

      if (img) {
        gsap.fromTo(img,
          { scale: 1 },
          {
            scale: 1.1,
            ease: 'none',
            scrollTrigger: {
              trigger: step,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    });

    // Scroll-reveal images in left column
    const scrollImgs = gsap.utils.toArray<HTMLElement>('.scroll-reveal-img');
    scrollImgs.forEach((img) => {
      gsap.fromTo(img,
        { y: 60, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="programa-flex" ref={containerRef} className="relative py-24 sm:py-32 overflow-hidden" style={{ background: 'linear-gradient(155deg, #A8D0F0 0%, #95C2E9 30%, #88B8E3 70%, #7AAEDC 100%)' }}>
      
      {/* ── Bokeh Particles (white, mouse-reactive) ── */}
      <BokehParticles sectionRef={containerRef} color="#ffffff" count={200} mouseRadius={170} mouseForce={1.1} />

      {/* ── Ambient glows ── */}
      <div className="absolute -top-20 right-0 w-[550px] h-[550px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 65%)' }} />
      <div className="absolute -bottom-16 -left-16 w-[420px] h-[420px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(54,84,112,0.15) 0%, transparent 65%)' }} />

      {/* ── Grain texture ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12">

        {/* ── Encabezado de Sección ── */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 text-[10px] uppercase tracking-[0.25em] font-semibold"
            style={{
              borderColor: 'rgba(255,255,255,0.45)',
              background: 'rgba(255,255,255,0.22)',
              backdropFilter: 'blur(8px)',
              color: 'rgba(22,35,54,0.7)',
              fontFamily: '"Questrial", sans-serif',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#365470]" />
            Nuestra Metodología
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: '"Questrial", "Satoshi", sans-serif', color: '#162336' }}
          >
            Conoce a fondo el{' '}
            <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
              Programa Flex
            </span>
          </h2>
          <p
            className="text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: '"Inter", "Questrial", sans-serif', color: 'rgba(22,35,54,0.6)' }}
          >
            Te guiamos paso a paso desde la selección de tu tema hasta el día de tu sustentación, garantizando calidad académica, rapidez y acompañamiento constante.
          </p>
        </div>

        {/* ── Layout: Sticky + Scroll ── */}
        <div className="flex flex-col xl:flex-row gap-16 xl:gap-24 items-start">

          {/* ── Panel Sticky: Tiempos de Entrega ── */}
          <div className="w-full xl:w-[38%] xl:sticky xl:top-32 z-10 flex-shrink-0">
            <div
              className="rounded-[2rem] p-8 md:p-10"
              style={{
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.7)',
                boxShadow: '0 20px 60px -15px rgba(22,35,54,0.15), inset 0 1px 0 rgba(255,255,255,0.5)',
              }}
            >
              <h3
                className="text-xl font-bold mb-8 flex items-center gap-3"
                style={{ fontFamily: '"Questrial", sans-serif', color: '#162336' }}
              >
                <span className="w-10 h-10 rounded-xl bg-[#365470]/10 flex items-center justify-center text-[#365470] flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
                Tiempos de Entrega
              </h3>

              <ul className="space-y-4">
                {timelineData.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-3 pb-4 border-b last:border-0 last:pb-0"
                    style={{ borderColor: 'rgba(22,35,54,0.08)' }}
                  >
                    <span className="text-sm font-semibold leading-tight" style={{ color: '#365470', fontFamily: '"Questrial", sans-serif' }}>
                      {item.label}
                    </span>
                    <span
                      className="text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0"
                      style={{ background: '#365470', color: '#F2F2F2', fontFamily: '"Inter", sans-serif' }}
                    >
                      {item.time}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 rounded-xl" style={{ background: 'rgba(54,84,112,0.08)' }}>
                <p className="text-xs font-medium leading-relaxed" style={{ color: '#365470', fontFamily: '"Inter", sans-serif' }}>
                  ⚡ Procesos ágiles optimizados para la máxima calidad normativa y académica.
                </p>
              </div>
            </div>

            {/* ── Scroll-Reveal Images (OUTSIDE sticky, in left column) ── */}
            <div className="hidden xl:flex flex-col gap-10 mt-16">
              {SCROLL_IMAGES.map((img, i) => (
                <div
                  key={i}
                  className={`scroll-reveal-img relative w-full overflow-hidden rounded-[2rem] opacity-0 ${
                    img.orientation === 'horizontal' ? 'aspect-[16/10]' : 'aspect-[3/4] max-w-[85%]'
                  } ${i % 2 !== 0 ? 'self-end' : 'self-start'}`}
                  style={{
                    boxShadow: '0 20px 50px -15px rgba(22,35,54,0.2)',
                    border: '3px solid rgba(255,255,255,0.5)',
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1280px) 100vw, 35vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#365470]/30 via-transparent to-transparent pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

          {/* ── Panel de Scroll: Fases ── */}
          <div
            ref={stepsContainerRef}
            className="w-full xl:w-[62%] relative pl-10 sm:pl-16 mt-10 xl:mt-0 pb-12"
          >
            {/* Línea Track */}
            <div className="absolute left-0 top-0 bottom-0 w-[4px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.3)' }}>
              <div
                ref={lineRef}
                className="w-full h-full origin-top transform scale-y-0"
                style={{ background: 'linear-gradient(to bottom, #ffffff, #365470)' }}
              />
            </div>

            <div className="space-y-28">
              {phases.map((phase, i) => (
                <div
                  key={phase.id}
                  ref={(el) => setStepRef(el, i)}
                  className="relative opacity-30 flex flex-col gap-8"
                >
                  {/* Nodo indicador */}
                  <div
                    className="absolute -left-[48px] sm:-left-[73px] top-6 w-6 h-6 rounded-full bg-white shadow-lg z-10"
                    style={{ border: '5px solid #365470', boxShadow: '0 0 20px rgba(54,84,112,0.3)' }}
                  />

                  {/* Cabecera del Paso */}
                  <div>
                    <div
                      className="text-[3.5rem] md:text-[4.5rem] font-black leading-none mb-3 tracking-tighter"
                      style={{ color: 'rgba(255,255,255,0.25)', fontFamily: '"Questrial", sans-serif' }}
                    >
                      Paso {phase.id}
                    </div>
                    <h4
                      className="text-2xl md:text-3xl font-bold mb-3"
                      style={{ color: '#162336', fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                    >
                      {phase.title}
                    </h4>
                    <p className="text-lg font-medium max-w-2xl" style={{ color: 'rgba(22,35,54,0.6)', fontFamily: '"Inter", sans-serif' }}>
                      {phase.description}
                    </p>
                  </div>

                  {/* Imagen decorativa */}
                  <div className="w-full lg:w-4/5">
                    <div className="geo-wrapper relative w-full overflow-hidden rounded-[2rem] aspect-[16/9]" style={{ boxShadow: '0 20px 60px -15px rgba(22,35,54,0.25)' }}>
                      <Image
                        src={phase.image}
                        alt={`Creativa Tesis - ${phase.title}`}
                        fill
                        className="geo-image object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141318]/50 via-transparent to-transparent" />
                    </div>
                  </div>

                  {/* Sub-pasos en grid */}
                  <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {phase.substeps.map((sub, idx) => (
                        <div
                          key={idx}
                          className="p-5 lg:p-6 rounded-2xl transition-all duration-300 group cursor-default"
                          style={{
                            background: 'rgba(255,255,255,0.75)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.6)',
                            boxShadow: '0 4px 16px rgba(22,35,54,0.06)',
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(54,84,112,0.3)';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(22,35,54,0.12)';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.6)';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(22,35,54,0.06)';
                          }}
                        >
                          <h5
                            className="font-bold text-xs md:text-sm mb-2 uppercase tracking-wider leading-tight"
                            style={{ color: '#162336', fontFamily: '"Questrial", sans-serif' }}
                          >
                            {sub.label}
                          </h5>
                          <p className="text-sm leading-relaxed" style={{ color: 'rgba(54,84,112,0.75)', fontFamily: '"Inter", sans-serif' }}>
                            {sub.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
