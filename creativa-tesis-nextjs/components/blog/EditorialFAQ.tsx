'use client';

import { useRef, useState, useCallback, useId } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const Q: React.CSSProperties = { fontFamily: '"Questrial", "Satoshi", sans-serif' };

// ─── Types ────────────────────────────────────────────────────────────────────
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-tiempo',
    category: 'Proceso',
    question: '¿Cuánto tiempo toma hacer una tesis con asesoría?',
    answer:
      'Depende del nivel académico y tu dedicación semanal. Con nuestra asesoría, una tesis de pregrado puede completarse en 3 a 6 meses trabajando 10–15 horas semanales. Una maestría requiere de 6 a 12 meses. Lo que marca la diferencia es tener un cronograma claro desde el día uno — algo que construimos contigo en la primera sesión.',
  },
  {
    id: 'faq-diferencia',
    category: 'Conceptos',
    question: '¿Cuál es la diferencia entre tesis, tesina y TSP?',
    answer:
      'La tesis implica una contribución original al conocimiento y requiere trabajo de campo o experimental. La tesina es un trabajo monográfico de menor envergadura, sin investigación empírica propia. El TSP (Trabajo de Suficiencia Profesional) demuestra competencias adquiridas en la práctica laboral. La elección depende del reglamento de tu universidad y de tu situación particular.',
  },
  {
    id: 'faq-tema',
    category: 'Inicio',
    question: '¿Cómo elijo un buen tema de investigación?',
    answer:
      'Un buen tema es la intersección entre tres factores: algo que te interese genuinamente, algo donde exista un vacío real en la literatura académica, y algo que sea viable con los recursos y el tiempo que tienes. Evita los temas demasiado amplios ("La educación en América Latina") y los demasiado específicos. En nuestra primera sesión, te ayudamos a encontrar ese punto exacto.',
  },
  {
    id: 'faq-estadistica',
    category: 'Servicios',
    question: '¿Qué incluye el servicio de asesoría estadística?',
    answer:
      'Incluye: selección del diseño metodológico adecuado (experimental, correlacional, descriptivo), definición y justificación del tamaño de muestra con fórmula estadística, procesamiento de datos en SPSS, R o Excel según tu requerimiento, interpretación de resultados en lenguaje comprensible, y redacción del capítulo de resultados listo para presentar al comité.',
  },
  {
    id: 'faq-apa',
    category: 'Formato',
    question: '¿Por qué es tan importante el formato APA en una tesis?',
    answer:
      'El formato APA no es una formalidad menor — es el estándar internacional que garantiza la integridad académica. Un error sistemático en las citas puede generar acusaciones de plagio involuntario, o simplemente hacer que el comité rechace el trabajo para revisión. APA 7ma edición (2020) introdujo cambios significativos respecto a la 6ta: más de 20 instituciones peruanas y latinoamericanas ya exigen la versión actual.',
  },
  {
    id: 'faq-plagio',
    category: 'Proceso',
    question: '¿Cómo evito el plagio en mi investigación?',
    answer:
      'El plagio académico tiene dos formas: intencional e involuntario. El segundo es el más común. La regla de oro: toda idea que no sea tuya necesita una cita. Usa Turnitin o el software que tu universidad emplea para hacer pruebas antes de entregar. Mantén un porcentaje de similitud por debajo del 15–20% según el estándar de tu institución. En nuestras asesorías revisamos el reporte y corregimos cualquier flagging antes de la entrega final.',
  },
];

// ─── Single FAQ Row ────────────────────────────────────────────────────────────
function FAQRow({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const uid = useId();
  const answerId = `faq-answer-${uid}`;
  const questionId = `faq-question-${uid}`;

  const answerRef = useRef<HTMLDivElement>(null);
  const answerInnerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const questionTextRef = useRef<HTMLButtonElement>(null);

  // Scroll entry animation — staggered fade-up
  useGSAP(() => {
    gsap.from(rowRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.65,
      delay: index * 0.07,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: rowRef.current,
        start: 'top 88%',
        once: true,
      },
    });
  }, [index]);

  // GSAP accordion: height 0 → auto with power4.inOut
  const toggle = useCallback(() => {
    const inner = answerInnerRef.current;
    const wrapper = answerRef.current;
    const iconEl = iconRef.current;
    const questionEl = questionTextRef.current;

    if (!inner || !wrapper) return;

    if (!isOpen) {
      // Opening
      const targetHeight = inner.scrollHeight;

      gsap.fromTo(
        wrapper,
        { height: 0, opacity: 0 },
        {
          height: targetHeight,
          opacity: 1,
          duration: 0.65,
          ease: 'power4.inOut',
          onComplete: () => {
            // Set to auto so it can resize if content changes
            gsap.set(wrapper, { height: 'auto' });
          },
        }
      );

      // Rotate '+' icon → '×' feel (45deg)
      if (iconEl) {
        gsap.to(iconEl, { rotate: 45, duration: 0.4, ease: 'power3.out' });
      }

      // Question text color shift → brand navy
      if (questionEl) {
        gsap.to(questionEl, { color: '#365571', duration: 0.35, ease: 'power2.out' });
      }
    } else {
      // Closing
      const currentHeight = wrapper.offsetHeight;

      gsap.fromTo(
        wrapper,
        { height: currentHeight, opacity: 1 },
        {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'power4.inOut',
        }
      );

      // Rotate back
      if (iconEl) {
        gsap.to(iconEl, { rotate: 0, duration: 0.35, ease: 'power2.out' });
      }

      // Question text color back → dark
      if (questionEl) {
        gsap.to(questionEl, { color: '#141318', duration: 0.35, ease: 'power2.out' });
      }
    }

    setIsOpen((prev) => !prev);
  }, [isOpen]);

  return (
    <div ref={rowRef} className="group">
      {/* ── Question row ── */}
      <div className="flex items-start gap-5 py-7">
        {/* Index number — editorial accent */}
        <span
          className="text-xs mt-[0.35rem] shrink-0 w-6 text-right select-none"
          style={{ ...Q, color: 'rgba(20,19,24,0.18)', fontVariantNumeric: 'tabular-nums' }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Category pill */}
        <span
          className="shrink-0 mt-[0.25rem] px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-semibold border"
          style={{
            ...Q,
            color: '#365571',
            borderColor: 'rgba(54,85,113,0.18)',
            background: 'rgba(54,85,113,0.04)',
            whiteSpace: 'nowrap',
          }}
        >
          {item.category}
        </span>

        {/* Question button */}
        <button
          ref={questionTextRef}
          id={questionId}
          type="button"
          className="flex-1 text-left font-semibold leading-snug transition-none"
          style={{
            ...Q,
            fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
            color: '#141318',
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls={answerId}
        >
          {item.question}
        </button>

        {/* Toggle icon */}
        <button
          type="button"
          onClick={toggle}
          aria-hidden="true"
          tabIndex={-1}
          className="shrink-0 mt-[0.15rem] flex items-center justify-center w-7 h-7 rounded-full transition-colors duration-300"
          style={{
            background: isOpen ? 'rgba(54,85,113,0.1)' : 'rgba(20,19,24,0.05)',
            border: `1px solid ${isOpen ? 'rgba(54,85,113,0.25)' : 'rgba(20,19,24,0.08)'}`,
          }}
        >
          <span
            ref={iconRef}
            className="flex items-center justify-center"
            style={{ display: 'inline-flex', transformOrigin: 'center' }}
          >
            {isOpen
              ? <Minus size={13} weight="bold" style={{ color: '#365571' }} />
              : <Plus size={13} weight="bold" style={{ color: 'rgba(20,19,24,0.5)' }} />
            }
          </span>
        </button>
      </div>

      {/* ── Answer — GSAP height 0 → auto ── */}
      <div
        id={answerId}
        ref={answerRef}
        role="region"
        aria-labelledby={questionId}
        style={{
          height: 0,
          overflow: 'hidden',
          opacity: 0,
        }}
      >
        <div ref={answerInnerRef} className="pl-[4.5rem] pb-8">
          <p
            className="text-base leading-relaxed max-w-[72ch]"
            style={{ ...Q, color: 'rgba(20,19,24,0.58)' }}
          >
            {item.answer}
          </p>
        </div>
      </div>

      {/* ── Separator line ── */}
      <div
        className="h-px w-full"
        style={{
          background: 'rgba(20,19,24,0.1)',
        }}
      />
    </div>
  );
}

// ─── Section header ────────────────────────────────────────────────────────────
function FAQHeader() {
  const headRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(headRef.current?.children ?? [], {
      opacity: 0,
      y: 22,
      duration: 0.75,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headRef.current,
        start: 'top 84%',
        once: true,
      },
    });
  }, []);

  return (
    <div ref={headRef} className="mb-0">
      {/* Eyebrow */}
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
        style={{
          borderColor: 'rgba(20,19,24,0.12)',
          background: 'rgba(20,19,24,0.04)',
        }}
      >
        <span
          className="text-[10px] uppercase tracking-[0.22em] font-medium"
          style={{ ...Q, color: 'rgba(20,19,24,0.5)' }}
        >
          Preguntas frecuentes
        </span>
      </div>

      {/* Asymmetric heading split */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-3 border-b-2 border-[#141318]">
        <h2
          className="font-bold leading-none"
          style={{
            ...Q,
            fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
            color: '#141318',
          }}
        >
          Sin respuestas{' '}
          <span style={{ color: '#365571' }}>genéricas.</span>
        </h2>

        <p
          className="text-sm leading-relaxed max-w-[34ch] md:pb-1"
          style={{ ...Q, color: 'rgba(20,19,24,0.42)' }}
        >
          Las dudas más comunes sobre el proceso de titulación —respondidas con precisión.
        </p>
      </div>
    </div>
  );
}

// \u2500\u2500\u2500 Dot grid parallax background \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function DotGridBg() {
  const dotGridRef = useRef<HTMLDivElement>(null);
  const warmOrbRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Dot grid drifts upward on scroll at 30% speed
    gsap.to(dotGridRef.current, {
      backgroundPositionY: '-80px',
      ease: 'none',
      scrollTrigger: {
        trigger: dotGridRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    // Warm orb breathes subtly
    gsap.to(warmOrbRef.current, {
      scale: 1.15,
      opacity: 0.8,
      duration: 7,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <>
      {/* Dot grid texture — drifts on scroll */}
      <div
        ref={dotGridRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(54,85,113,0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPositionY: '0px',
          maskImage: 'linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}
      />

      {/* Warm accent orb — bottom left */}
      <div
        ref={warmOrbRef}
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          bottom: '-80px',
          left: '-100px',
          background: 'radial-gradient(circle, rgba(186,206,55,0.08) 0%, rgba(150,193,233,0.05) 50%, transparent 70%)',
          filter: 'blur(50px)',
          transformOrigin: 'center',
          opacity: 0.6,
        }}
      />
    </>
  );
}

// \u2500\u2500\u2500 Main EditorialFAQ export \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
export default function EditorialFAQ() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="preguntas-frecuentes"
      className="relative overflow-hidden py-32 md:py-40"
      style={{ background: '#F2F2F2' }}
    >
      {/* Inline SVG noise — analog feel */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.018, mixBlendMode: 'multiply', position: 'absolute' }}
      >
        <filter id="faq-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#faq-noise)" />
      </svg>

      {/* Dot grid parallax + warm orb */}
      <DotGridBg />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-10">
        <FAQHeader />

        {/* Opening border — top separator above first question */}
        <div
          className="h-px w-full mt-0"
          style={{ background: 'rgba(20,19,24,0.1)' }}
        />

        {/* FAQ Rows */}
        <div>
          {FAQ_ITEMS.map((item, i) => (
            <FAQRow key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <p
            className="text-sm"
            style={{ ...Q, color: 'rgba(20,19,24,0.4)' }}
          >
            ¿Tu pregunta no está aquí?
          </p>
          <a
            id="faq-whatsapp-cta"
            href="https://wa.me/51916077800"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300"
            style={{
              ...Q,
              background: '#365571',
              color: '#F2F2F2',
              boxShadow: '0 4px 20px rgba(54,85,113,0.2)',
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.03,
                boxShadow: '0 8px 32px rgba(54,85,113,0.32)',
                duration: 0.3,
                ease: 'power2.out',
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                boxShadow: '0 4px 20px rgba(54,85,113,0.2)',
                duration: 0.3,
                ease: 'power2.out',
              });
            }}
            onMouseDown={(e) => {
              gsap.to(e.currentTarget, { scale: 0.975, duration: 0.1 });
            }}
            onMouseUp={(e) => {
              gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2, ease: 'back.out(2)' });
            }}
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
