'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BookOpenText,
  Clock,
  Warning,
  Quotes,
  ArrowBendUpRight,
  CheckCircle,
  Lightbulb,
  ArrowRight,
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const Q: React.CSSProperties = { fontFamily: '"Questrial", "Satoshi", sans-serif' };

interface Insight {
  id: string;
  index: string;
  category: string;
  text: string;
  detail?: string;
  icon: React.ReactNode;
  accentColor: string;
}

const INSIGHTS: Insight[] = [
  {
    id: 'ins-marco',
    index: '01',
    category: 'Marco Teórico',
    text: 'Escribe el marco teórico después de definir tu metodología, no antes.',
    detail: 'La mayoría lo hace al revés y termina reescribiéndolo por completo.',
    icon: <BookOpenText size={16} weight="light" />,
    accentColor: '#365571',
  },
  {
    id: 'ins-tiempo',
    index: '02',
    category: 'Gestión del Tiempo',
    text: 'Dedica el 60% de tu tiempo a revisar, no a escribir.',
    detail: 'La calidad de una tesis se decide en las revisiones, no en el primer borrador.',
    icon: <Clock size={16} weight="light" />,
    accentColor: '#365571',
  },
  {
    id: 'ins-hipotesis',
    index: '03',
    category: 'Hipótesis',
    text: 'Una hipótesis mal construida invalida todo el estudio.',
    detail: 'Verifica su falsabilidad. Si no puede ser refutada con datos, no es científica.',
    icon: <Warning size={16} weight="light" />,
    accentColor: '#BACE37',
  },
  {
    id: 'ins-citas',
    index: '04',
    category: 'Citación APA',
    text: 'Cita al escribir, nunca al terminar.',
    detail: 'Insertar referencias retroactivamente genera errores sistemáticos difíciles de rastrear.',
    icon: <Quotes size={16} weight="light" />,
    accentColor: '#365571',
  },
  {
    id: 'ins-asesor',
    index: '05',
    category: 'Estrategia',
    text: 'Lleva preguntas concretas a cada reunión con tu asesor.',
    detail: 'El tiempo de asesoría es escaso. Llega con avances, no con dudas vagas.',
    icon: <ArrowBendUpRight size={16} weight="light" />,
    accentColor: '#365571',
  },
  {
    id: 'ins-muestra',
    index: '06',
    category: 'Metodología',
    text: 'Justifica tu tamaño de muestra con una fórmula estadística.',
    detail: 'Los comités exigen el respaldo matemático. G*Power es la herramienta estándar.',
    icon: <CheckCircle size={16} weight="light" />,
    accentColor: '#BACE37',
  },
  {
    id: 'ins-titulo',
    index: '07',
    category: 'Redacción',
    text: 'El título debe incluir: variable principal, población y contexto geográfico.',
    icon: <Lightbulb size={16} weight="light" />,
    accentColor: '#365571',
  },
];

function NoiseTexture() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.02, mixBlendMode: 'multiply', position: 'absolute', top: 0, left: 0 }}
    >
      <filter id="radar-noise-v3">
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#radar-noise-v3)" />
    </svg>
  );
}

function InsightRow({ insight, index }: { insight: Insight; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const detailInnerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    gsap.from(rowRef.current, {
      opacity: 0,
      x: -18,
      duration: 0.7,
      delay: index * 0.055,
      ease: 'power3.out',
      scrollTrigger: { trigger: rowRef.current, start: 'top 90%', once: true },
    });
  }, [index]);

  const handleToggle = () => {
    if (!insight.detail) return;
    const inner = detailInnerRef.current;
    const wrapper = detailRef.current;
    if (!inner || !wrapper) return;

    if (!isExpanded) {
      gsap.fromTo(wrapper, { height: 0, opacity: 0 }, {
        height: inner.scrollHeight, opacity: 1, duration: 0.5, ease: 'power4.inOut',
        onComplete: () => { gsap.set(wrapper, { height: 'auto' }); },
      });
      if (arrowRef.current) gsap.to(arrowRef.current, { rotate: 90, duration: 0.3, ease: 'power2.out' });
      if (indexRef.current) gsap.to(indexRef.current, { color: insight.accentColor, duration: 0.3 });
    } else {
      gsap.fromTo(wrapper, { height: wrapper.offsetHeight, opacity: 1 }, {
        height: 0, opacity: 0, duration: 0.4, ease: 'power4.inOut',
      });
      if (arrowRef.current) gsap.to(arrowRef.current, { rotate: 0, duration: 0.3, ease: 'power2.out' });
      if (indexRef.current) gsap.to(indexRef.current, { color: 'rgba(20,19,24,0.18)', duration: 0.3 });
    }
    setIsExpanded((v) => !v);
  };

  return (
    <div
      ref={rowRef}
      className={`group ${insight.detail ? 'cursor-pointer' : ''}`}
      onClick={handleToggle}
    >
      <div className="flex items-start gap-4 md:gap-7 py-6">
        {/* Index */}
        <span
          ref={indexRef}
          className="text-xs shrink-0 pt-[3px] w-6 text-right select-none"
          style={{ ...Q, color: 'rgba(20,19,24,0.18)', fontVariantNumeric: 'tabular-nums', transition: 'color 0.3s ease' }}
        >
          {insight.index}
        </span>

        {/* Category */}
        <span
          className="shrink-0 mt-[2px] px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.18em] font-semibold border whitespace-nowrap"
          style={{ ...Q, color: insight.accentColor, borderColor: `${insight.accentColor}28`, background: `${insight.accentColor}08` }}
        >
          {insight.category}
        </span>

        {/* Text */}
        <p
          className="flex-1 font-medium leading-snug"
          style={{ ...Q, fontSize: 'clamp(0.88rem, 1.7vw, 1rem)', color: '#141318' }}
        >
          {insight.text}
        </p>

        {/* Arrow */}
        {insight.detail && (
          <span
            ref={arrowRef}
            className="shrink-0 pt-[3px] opacity-25 group-hover:opacity-60 inline-flex"
            style={{ color: '#141318', transition: 'opacity 0.3s ease', transformOrigin: 'center' }}
            aria-hidden="true"
          >
            <ArrowRight size={14} weight="bold" />
          </span>
        )}
      </div>

      {/* Expandable detail */}
      {insight.detail && (
        <div ref={detailRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
          <div ref={detailInnerRef} className="pb-5 pl-[4rem]">
            <p className="text-sm leading-relaxed max-w-[58ch]" style={{ ...Q, color: 'rgba(20,19,24,0.5)' }}>
              {insight.detail}
            </p>
          </div>
        </div>
      )}

      <div style={{ height: '1px', background: 'rgba(20,19,24,0.09)' }} />
    </div>
  );
}

function LeftPanel() {
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ch = panelRef.current?.children;
    if (!ch) return;
    gsap.from(Array.from(ch), {
      opacity: 0, y: 24, duration: 0.75, stagger: 0.11, ease: 'power3.out',
      scrollTrigger: { trigger: panelRef.current, start: 'top 82%', once: true },
    });
  }, []);

  return (
    <div ref={panelRef} className="flex flex-col justify-start md:sticky md:top-28 self-start">
      {/* Eyebrow */}
      <div
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-7 w-fit"
        style={{ borderColor: 'rgba(54,85,113,0.2)', background: 'rgba(54,85,113,0.05)' }}
      >
        <span className="text-[9px] uppercase tracking-[0.22em] font-medium" style={{ ...Q, color: '#365571' }}>
          Radar de sabiduría
        </span>
      </div>

      {/* H2 */}
      <h2
        className="font-bold leading-tight mb-5"
        style={{ ...Q, fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)', color: '#141318' }}
      >
        Lo que todo{' '}
        <span style={{ color: '#365571' }}>tesista</span>{' '}
        debería saber.
      </h2>

      <p className="text-sm leading-relaxed mb-10" style={{ ...Q, color: 'rgba(20,19,24,0.48)', maxWidth: '30ch' }}>
        Píldoras de conocimiento de más de 500 asesorías. Haz clic en cada punto para ampliar.
      </p>

      {/* Stats */}
      <div className="border-t pt-7 flex flex-col gap-4" style={{ borderColor: 'rgba(20,19,24,0.1)' }}>
        {[
          { value: '100+', label: 'Asesorías realizadas' },
          { value: '98%', label: 'Tasa de aprobación' },
          { value: '5 años', label: 'De experiencia' },
        ].map((s) => (
          <div key={s.label} className="flex items-baseline gap-3">
            <span className="font-bold" style={{ ...Q, fontSize: '1.35rem', color: '#365571' }}>{s.value}</span>
            <span className="text-xs" style={{ ...Q, color: 'rgba(20,19,24,0.4)' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InsightsRadar() {
  const orbRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Slow breathing glow orb
    gsap.to(orbRef.current, {
      scale: 1.25,
      opacity: 0.85,
      duration: 6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <section id="insights-radar" className="relative overflow-hidden py-28 md:py-36" style={{ background: '#F2F2F2' }}>
      <NoiseTexture />
      {/* Breathing orb */}
      <div
        ref={orbRef}
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          top: '-100px',
          right: '-150px',
          background: 'radial-gradient(circle, rgba(150,193,233,0.14) 0%, rgba(54,85,113,0.06) 50%, transparent 70%)',
          filter: 'blur(40px)',
          transformOrigin: 'center',
          opacity: 0.7,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 15% 0%, rgba(150,193,233,0.07) 0%, transparent 60%)' }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-12 md:gap-20 items-start">
          <LeftPanel />
          <div>
            <div style={{ height: '2px', background: '#141318' }} />
            {INSIGHTS.map((ins, i) => <InsightRow key={ins.id} insight={ins} index={i} />)}
            <p className="text-xs mt-8 uppercase tracking-[0.18em]" style={{ ...Q, color: 'rgba(20,19,24,0.28)' }}>
              Basado en +500 asesorías — Creativa Tesis · Actualizado 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
