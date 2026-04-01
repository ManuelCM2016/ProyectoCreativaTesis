'use client';

import { useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FileText,
  ChartBar,
  Checks,
  CalendarBlank,
  ArrowSquareOut,
  DownloadSimple,
  Lock,
  Sparkle,
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const Q: React.CSSProperties = { fontFamily: '"Questrial", "Satoshi", sans-serif' };

// ─── Types ────────────────────────────────────────────────────────────────────
interface Asset {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  badgeColor: string;
  icon: React.ReactNode;
  accentColor: string;
  glowColor: string;
  downloadHref: string;
  size: 'wide' | 'tall' | 'standard';
  featured?: boolean;
}

// ─── Animated grid background (isolated, GPU-safe) ────────────────────────────
function AnimatedGridBg() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const anim = gsap.to(ref.current, {
      backgroundPositionY: '48px',
      duration: 12,
      repeat: -1,
      ease: 'none',
    });
    return () => { anim.kill(); };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none opacity-[0.04]"
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(rgba(150,193,233,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(150,193,233,1) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        willChange: 'background-position',
      }}
    />
  );
}

// ─── Corner accent SVG ────────────────────────────────────────────────────────
function CornerAccent({ color }: { color: string }) {
  return (
    <svg
      className="absolute top-0 right-0 w-16 h-16 opacity-30 pointer-events-none"
      aria-hidden="true"
      viewBox="0 0 64 64"
      fill="none"
    >
      <path d="M0 0 L64 0 L64 64" fill={color} opacity="0.15" />
      <line x1="0" y1="0" x2="64" y2="0" stroke={color} strokeWidth="1" />
      <line x1="64" y1="0" x2="64" y2="64" stroke={color} strokeWidth="1" />
    </svg>
  );
}

// ─── Individual Asset Card ─────────────────────────────────────────────────────
function AssetCard({ asset }: { asset: Asset }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const iconWrapRef = useRef<HTMLDivElement>(null);

  // GSAP border glow on mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !borderRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;

    gsap.to(borderRef.current, {
      background: `radial-gradient(ellipse 200px 200px at ${x}px ${y}px, ${asset.glowColor}55, transparent 70%)`,
      duration: 0.4,
      ease: 'power2.out',
    });

    gsap.to(cardRef.current, {
      rotateX: -dy * 4,
      rotateY: dx * 4,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 900,
    });
  }, [asset.glowColor]);

  const handleMouseEnter = useCallback(() => {
    // Reveal download button (slide-up)
    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { y: 16, opacity: 0, pointerEvents: 'none' },
        { y: 0, opacity: 1, pointerEvents: 'auto', duration: 0.45, ease: 'power3.out' }
      );
    }
    // Scale icon
    if (iconWrapRef.current) {
      gsap.to(iconWrapRef.current, { scale: 1.08, duration: 0.35, ease: 'back.out(2)' });
    }
    // Intensify border
    if (borderRef.current) {
      gsap.to(borderRef.current, { opacity: 1, duration: 0.3 });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Hide download button (slide back down)
    if (btnRef.current) {
      gsap.to(btnRef.current, {
        y: 12,
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power2.in',
      });
    }
    // Reset icon scale
    if (iconWrapRef.current) {
      gsap.to(iconWrapRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
    }
    // Reset border glow and tilt
    if (borderRef.current) {
      gsap.to(borderRef.current, { background: 'transparent', opacity: 0.4, duration: 0.5 });
    }
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, []);

  const sizeClasses: Record<Asset['size'], string> = {
    wide: 'md:col-span-2',
    tall: 'md:row-span-2',
    standard: '',
  };

  return (
    <div
      className={`relative group ${sizeClasses[asset.size]}`}
      style={{ perspective: '900px' }}
    >
      {/* Outer shell — Double-Bezel */}
      <div
        className="p-[1px] rounded-[24px] h-full"
        style={{
          background: `linear-gradient(135deg, rgba(54,85,113,0.5) 0%, rgba(20,19,24,0.2) 50%, rgba(150,193,233,0.12) 100%)`,
        }}
      >
        {/* Animated glow border overlay */}
        <div
          ref={borderRef}
          className="absolute inset-0 rounded-[24px] opacity-40 pointer-events-none"
          style={{ zIndex: 2, transition: 'opacity 0.3s' }}
          aria-hidden="true"
        />

        {/* Inner core card */}
        <div
          ref={cardRef}
          className="relative h-full rounded-[23px] overflow-hidden flex flex-col"
          style={{
            background: 'linear-gradient(145deg, #1c1b21 0%, #161519 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 48px rgba(0,0,0,0.5)',
            willChange: 'transform',
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CornerAccent color={asset.accentColor} />

          {/* Card body */}
          <div className="flex flex-col flex-1 p-7 md:p-8">
            {/* Header row */}
            <div className="flex items-start justify-between mb-6">
              {/* Icon — folder/box aesthetic */}
              <div
                ref={iconWrapRef}
                className="flex items-center justify-center w-14 h-14 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${asset.accentColor}22, ${asset.accentColor}08)`,
                  border: `1px solid ${asset.accentColor}30`,
                  boxShadow: `inset 0 1px 0 ${asset.accentColor}18`,
                }}
              >
                <span style={{ color: asset.accentColor }}>{asset.icon}</span>
              </div>

              {/* Badge */}
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em]"
                style={{
                  ...Q,
                  background: `${asset.badgeColor}15`,
                  color: asset.badgeColor,
                  border: `1px solid ${asset.badgeColor}30`,
                }}
              >
                {asset.badge}
              </span>
            </div>

            {/* Subtitle */}
            <p
              className="text-[10px] uppercase tracking-[0.2em] font-medium mb-2"
              style={{ ...Q, color: asset.accentColor }}
            >
              {asset.subtitle}
            </p>

            {/* Title */}
            <h3
              className="font-bold text-xl leading-tight mb-3"
              style={{ ...Q, color: '#F2F2F2' }}
            >
              {asset.title}
            </h3>

            {/* Description */}
            <p
              className="text-sm leading-relaxed flex-1"
              style={{ ...Q, color: 'rgba(242,242,242,0.42)' }}
            >
              {asset.description}
            </p>

            {/* ── Download button — hidden until hover, slide-up ── */}
            <div className="mt-6 relative overflow-hidden" style={{ minHeight: '44px' }}>
              {/* Static "free" badge — always visible */}
              <div className="flex items-center gap-2">
                <Lock size={12} weight="light" style={{ color: 'rgba(242,242,242,0.25)' }} />
                <span
                  className="text-xs"
                  style={{ ...Q, color: 'rgba(242,242,242,0.25)' }}
                >
                  Descarga gratuita — sin registro
                </span>
              </div>

              {/* Slide-up download CTA */}
              <a
                ref={btnRef}
                id={`download-btn-${asset.id}`}
                href={asset.downloadHref}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2.5 px-5 py-3 rounded-[14px] font-semibold text-sm transition-shadow duration-300"
                style={{
                  ...Q,
                  background: `linear-gradient(135deg, ${asset.accentColor}28 0%, ${asset.accentColor}10 100%)`,
                  border: `1px solid ${asset.accentColor}45`,
                  color: asset.accentColor,
                  opacity: 0,
                  transform: 'translateY(12px)',
                  pointerEvents: 'none',
                  boxShadow: `0 8px 24px ${asset.accentColor}12`,
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    background: `linear-gradient(135deg, ${asset.accentColor}42 0%, ${asset.accentColor}20 100%)`,
                    duration: 0.25,
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    background: `linear-gradient(135deg, ${asset.accentColor}28 0%, ${asset.accentColor}10 100%)`,
                    duration: 0.25,
                  });
                }}
                onMouseDown={(e) => {
                  gsap.to(e.currentTarget, { scale: 0.975, duration: 0.1 });
                }}
                onMouseUp={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: 'back.out(2)' });
                }}
              >
                <DownloadSimple size={15} weight="bold" />
                Descargar recurso
                <ArrowSquareOut size={13} weight="light" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section header ────────────────────────────────────────────────────────────
function VaultHeader() {
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: h2Ref.current,
        start: 'top 85%',
        once: true,
      },
    });

    tl.from(eyebrowRef.current, { opacity: 0, y: -12, duration: 0.5, ease: 'power2.out' })
      .from(h2Ref.current, { opacity: 0, y: 28, duration: 0.7, ease: 'power3.out' }, '-=0.2')
      .from(subRef.current, { opacity: 0, y: 16, duration: 0.6, ease: 'power2.out' }, '-=0.3');

    return () => { tl.kill(); };
  }, []);

  return (
    <div className="flex flex-col items-center text-center mb-20">
      <div
        ref={eyebrowRef}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
        style={{
          borderColor: 'rgba(8, 26, 43, 0.2)',
          background: 'rgba(37, 139, 235, 0.05)',
          boxShadow: 'inset 0 1px 0 rgba(150,193,233,0.1)',
        }}
      >
        <Sparkle size={12} weight="fill" style={{ color: '#000000ff' }} />
        <span
          className="text-[10px] uppercase tracking-[0.22em] font-medium"
          style={{ ...Q, color: '#040d14ff' }}
        >
          Arsenal Académico
        </span>
      </div>

      <h2
        ref={h2Ref}
        className="font-bold leading-none mb-4"
        style={{
          ...Q,
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: '#0a355eff',
        }}
      >
        Recursos{' '}
        <span style={{ color: '#BACE37' }}>Premium</span>
        {' '}Gratuitos
      </h2>

      <p
        ref={subRef}
        className="text-base md:text-lg leading-relaxed max-w-[52ch]"
        style={{ ...Q, color: 'rgba(0, 0, 0, 0.42)' }}
      >
        Plantillas y guías construidas para los estándares exigidos por los comités de titulación en toda la región.
      </p>
    </div>
  );
}

// ─── Assets Data ──────────────────────────────────────────────────────────────
const ASSETS: Asset[] = [
  {
    id: 'apa-template',
    title: 'Plantilla de Tesis APA 7ma Edición',
    subtitle: 'Documento Word',
    description:
      'Estructura completa con portada, índice automatizado, capítulos numerados, tablas con formato APA y sección de referencias. Lista para imprimir.',
    badge: 'DOCX',
    badgeColor: '#96C1E9',
    icon: <FileText size={26} weight="light" />,
    accentColor: '#96C1E9',
    glowColor: '#96C1E9',
    downloadHref: '/downloads/plantilla-tesis-apa.docx',
    size: 'wide',
    featured: true,
  },
  {
    id: 'metodologia-guide',
    title: 'Guía de Metodología de Investigación',
    subtitle: 'PDF Interactivo',
    description:
      'Pasos detallados para definir el enfoque (cuantitativo/cualitativo), diseño, población, muestra e instrumentos de recolección.',
    badge: 'PDF',
    badgeColor: '#BACE37',
    icon: <ChartBar size={26} weight="light" />,
    accentColor: '#BACE37',
    glowColor: '#BACE37',
    downloadHref: '/downloads/guia-metodologia.pdf',
    size: 'standard',
  },
  {
    id: 'checklist-sustentacion',
    title: 'Checklist de Sustentación',
    subtitle: 'Lista de verificación',
    description:
      'Todo lo que debes preparar antes del día de tu defensa: documentación, diapositivas, ensayos, y contingencias.',
    badge: 'PDF',
    badgeColor: '#365571',
    icon: <Checks size={26} weight="light" />,
    accentColor: '#96C1E9',
    glowColor: '#365571',
    downloadHref: '/downloads/checklist-sustentacion.pdf',
    size: 'standard',
  },
  {
    id: 'cronograma-tesis',
    title: 'Plantilla de Cronograma de Tesis',
    subtitle: 'Diagrama de Gantt',
    description:
      'Hoja Excel editable con línea de tiempo por semanas, barras de progreso por capítulo y bloques de revisión con el asesor.',
    badge: 'XLSX',
    badgeColor: '#BACE37',
    icon: <CalendarBlank size={26} weight="light" />,
    accentColor: '#BACE37',
    glowColor: '#BACE37',
    downloadHref: '/downloads/cronograma-gantt-tesis.xlsx',
    size: 'wide',
  },
];

// ─── Bento Grid wrapper with scroll-triggered stagger ─────────────────────────
function BentoGrid({ assets }: { assets: Asset[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gridRef.current?.querySelectorAll('[data-asset-card]');
    if (!cards || cards.length === 0) return;

    gsap.from(cards, {
      opacity: 0,
      y: 40,
      scale: 0.97,
      duration: 0.75,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 80%',
        once: true,
      },
    });
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto"
      style={{
        gridTemplateAreas: `
          "wide wide standard"
          "standard standard wide2"
        `,
      }}
    >
      {/* Wide featured card */}
      <div
        data-asset-card
        className="md:col-span-2"
        style={{ gridArea: '' }}
      >
        <AssetCard asset={assets[0]} />
      </div>

      {/* Standard card */}
      <div data-asset-card>
        <AssetCard asset={assets[1]} />
      </div>

      {/* Standard card */}
      <div data-asset-card>
        <AssetCard asset={assets[2]} />
      </div>

      {/* Wide card */}
      <div data-asset-card className="md:col-span-2">
        <AssetCard asset={assets[3]} />
      </div>
    </div>
  );
}

// ─── Main PremiumAssetsVault export ───────────────────────────────────────────
export default function PremiumAssetsVault() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="recursos-premium"
      className="relative overflow-hidden py-32 md:py-40"
      style={{ background: '#94C6F2' }}
    >
      {/* ── Animated grid background ── */}
      <AnimatedGridBg />

      {/* ── Ambient radial glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(54,85,113,0.22) 0%, transparent 70%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <VaultHeader />
        <BentoGrid assets={ASSETS} />

        {/* CTA footer row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16 pt-12 border-t border-white/5">
          <p
            className="text-sm text-center"
            style={{ ...Q, color: 'rgba(0, 0, 0, 0.35)' }}
          >
            ¿Necesitas un recurso específico que no encuentras aquí?
          </p>
          <a
            id="vault-custom-resource-cta"
            href="/contacto"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-500"
            style={{
              ...Q,
              background: 'rgba(150,193,233,0.08)',
              border: '1px solid rgba(8, 26, 43, 0.25)',
              color: '#060708ff',
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                background: 'rgba(150,193,233,0.15)',
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out',
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                background: 'rgba(150,193,233,0.08)',
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
              });
            }}
          >
            Solicitar recurso personalizado
            <ArrowSquareOut size={13} weight="light" />
          </a>
        </div>
      </div>
    </section>
  );
}
