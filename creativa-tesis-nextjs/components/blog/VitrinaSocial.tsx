'use client';

import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowSquareOut, MagnifyingGlass, Images, X } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const Q: React.CSSProperties = { fontFamily: '"Questrial", "Satoshi", sans-serif' };

// ─── Types ────────────────────────────────────────────────────────────────────
export interface SocialFlyer {
  _id: string;
  title: string;
  caption?: string;
  category: string;
  tags?: string[];
  imageUrl: string;
  imageDimensions?: { width: number; height: number; aspectRatio: number };
  linkUrl?: string;
  publishedAt?: string;
}

// ─── Category config ─────────────────────────────────────────────────────────
const CATEGORIES = [
  { value: 'all', label: 'Todos', emoji: '✦' },
  { value: 'servicio-carrera', label: 'Por Carrera', emoji: '🎓' },
  { value: 'consejos-tips', label: 'Tips', emoji: '💡' },
  { value: 'motivacion', label: 'Motivación', emoji: '⚡' },
  { value: 'alianzas-universitarias', label: 'Universidades', emoji: '🏫' },
  { value: 'campanas-especiales', label: 'Campañas', emoji: '🎉' },
  { value: 'comunidad-marca', label: 'Comunidad', emoji: '📸' },
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ flyer, onClose }: { flyer: SocialFlyer; onClose: () => void }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(boxRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
    gsap.fromTo(imgRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)', delay: 0.05 });
  }, []);

  const handleClose = () => {
    gsap.to(boxRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in', onComplete: onClose });
  };

  return (
    <div
      ref={boxRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(20,19,24,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      onClick={handleClose}
    >
      <div
        ref={imgRef}
        className="relative max-w-[480px] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          id="lightbox-close-btn"
          type="button"
          onClick={handleClose}
          className="absolute -top-10 right-0 flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
          style={Q}
          aria-label="Cerrar visor"
        >
          <X size={16} weight="bold" />
          <span className="text-sm">Cerrar</span>
        </button>

        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
          <img
            src={flyer.imageUrl}
            alt={flyer.title}
            className="w-full h-auto block"
            style={{ maxHeight: '80vh', objectFit: 'contain' }}
          />
        </div>

        {/* Caption row */}
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="font-medium text-sm text-white/85" style={Q}>{flyer.title}</p>
            {flyer.caption && (
              <p className="text-xs text-white/45 mt-1 leading-relaxed" style={Q}>{flyer.caption}</p>
            )}
          </div>
          {flyer.linkUrl && (
            <a
              id={`lightbox-link-${flyer._id}`}
              href={flyer.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:bg-white/10"
              style={{ ...Q, color: '#96C1E9', border: '1px solid rgba(150,193,233,0.3)' }}
            >
              Ver en redes <ArrowSquareOut size={12} weight="bold" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Single Flyer Card ────────────────────────────────────────────────────────
function FlyerCard({ flyer, index, onClick }: { flyer: SocialFlyer; index: number; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 24,
      scale: 0.96,
      duration: 0.55,
      delay: (index % 6) * 0.06,
      ease: 'power3.out',
      scrollTrigger: { trigger: cardRef.current, start: 'top 92%', once: true },
    });
  }, [index]);

  const handleEnter = () => {
    gsap.to(cardRef.current, { scale: 1.03, duration: 0.3, ease: 'back.out(1.5)' });
  };
  const handleLeave = () => {
    gsap.to(cardRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
  };

  return (
    <div
      ref={cardRef}
      className="group relative cursor-pointer overflow-hidden rounded-2xl"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`Ver flyer: ${flyer.title}`}
    >
      {/* Image */}
      <div className="aspect-square w-full bg-gray-100">
        <img
          src={flyer.imageUrl}
          alt={flyer.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(to top, rgba(20,19,24,0.88) 0%, rgba(20,19,24,0.3) 50%, transparent 100%)',
        }}
      >
        <p className="text-white text-xs font-medium leading-snug line-clamp-2" style={Q}>
          {flyer.title}
        </p>
        {flyer.linkUrl && (
          <a
            href={flyer.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-white/60 hover:text-white/90 transition-colors"
            style={Q}
            onClick={(e) => e.stopPropagation()}
          >
            Ver en redes <ArrowSquareOut size={10} weight="bold" />
          </a>
        )}
      </div>

      {/* Magnify icon center on hover */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-hidden="true"
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
        >
          <MagnifyingGlass size={16} weight="bold" style={{ color: '#ffffff' }} />
        </div>
      </div>
    </div>
  );
}

// ─── Filter chip ──────────────────────────────────────────────────────────────
function FilterChip({
  cat,
  active,
  count,
  onClick,
}: {
  cat: typeof CATEGORIES[number];
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  const chipRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={chipRef}
      id={`flyer-filter-${cat.value}`}
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap"
      style={{
        ...Q,
        background: active ? '#365571' : 'rgba(54,85,113,0.06)',
        color: active ? '#ffffff' : 'rgba(20,19,24,0.6)',
        border: active ? '1px solid #365571' : '1px solid rgba(54,85,113,0.14)',
        boxShadow: active ? '0 4px 16px rgba(54,85,113,0.25)' : 'none',
      }}
    >
      <span>{cat.emoji}</span>
      {cat.label}
      <span
        className="text-[10px] px-1.5 py-0.5 rounded-full"
        style={{
          background: active ? 'rgba(255,255,255,0.18)' : 'rgba(20,19,24,0.08)',
          color: active ? '#ffffff' : 'rgba(20,19,24,0.45)',
        }}
      >
        {count}
      </span>
    </button>
  );
}

// ─── Main VitrinaSocial ───────────────────────────────────────────────────────
export default function VitrinaSocial({ flyers }: { flyers: SocialFlyer[] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxFlyer, setLightboxFlyer] = useState<SocialFlyer | null>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(headRef.current?.children ?? [], {
      opacity: 0, y: 22, duration: 0.75, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true },
    });
  }, []);

  const filteredFlyers = activeCategory === 'all'
    ? flyers
    : flyers.filter((f) => f.category === activeCategory);

  const countFor = useCallback(
    (cat: string) => cat === 'all' ? flyers.length : flyers.filter((f) => f.category === cat).length,
    [flyers]
  );

  if (!flyers || flyers.length === 0) {
    return (
      <section
        id="vitrina-social"
        className="relative w-full overflow-hidden px-4 md:px-20 py-28 md:py-36"
        style={{ background: '#ffffff' }}
      >
        <div className="max-w-7xl mx-auto text-center py-20">
          <Images size={48} weight="light" style={{ color: 'rgba(54,85,113,0.3)', margin: '0 auto 16px' }} />
          <p className="text-sm" style={{ ...Q, color: 'rgba(20,19,24,0.4)' }}>
            Próximamente — Los flyers de redes sociales aparecerán aquí.
          </p>
          <p className="text-xs mt-2" style={{ ...Q, color: 'rgba(20,19,24,0.25)' }}>
            Sube flyers desde el panel de Sanity → "🎨 Flyers de Redes Sociales"
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="vitrina-social"
        className="relative w-full overflow-hidden px-4 md:px-20 py-28 md:py-36"
        style={{ background: '#ffffff' }}
      >
        {/* Subtle dot grid bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(54,85,113,0.07) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div
            ref={headRef}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 pb-6 border-b"
            style={{ borderColor: 'rgba(20,19,24,0.1)' }}
          >
            <div>
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-5"
                style={{ borderColor: 'rgba(54,85,113,0.18)', background: 'rgba(54,85,113,0.05)' }}
              >
                <Images size={10} weight="fill" style={{ color: '#365571' }} />
                <span className="text-[9px] uppercase tracking-[0.22em] font-medium" style={{ ...Q, color: '#365571' }}>
                  Vitrina Social
                </span>
              </div>
              <h2 className="font-bold leading-tight" style={{ ...Q, fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#141318' }}>
                Lo que compartimos
              </h2>
            </div>
            <p className="text-sm leading-relaxed max-w-[36ch] md:pb-1" style={{ ...Q, color: 'rgba(20,19,24,0.45)' }}>
              Contenido real de nuestras redes sociales. Flyers, tips y campañas que llegan a miles de tesistas.
            </p>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <FilterChip
                key={cat.value}
                cat={cat}
                active={activeCategory === cat.value}
                count={countFor(cat.value)}
                onClick={() => setActiveCategory(cat.value)}
              />
            ))}
          </div>

          {/* Count label */}
          <p className="text-xs mb-6" style={{ ...Q, color: 'rgba(20,19,24,0.35)' }}>
            Mostrando {filteredFlyers.length} {filteredFlyers.length === 1 ? 'flyer' : 'flyers'}
            {activeCategory !== 'all' && ` en "${CATEGORIES.find((c) => c.value === activeCategory)?.label}"`}
          </p>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredFlyers.map((flyer, i) => (
              <FlyerCard
                key={flyer._id}
                flyer={flyer}
                index={i}
                onClick={() => setLightboxFlyer(flyer)}
              />
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-12 flex items-center justify-center gap-3">
            <div style={{ height: '1px', flex: 1, background: 'rgba(20,19,24,0.08)' }} />
            <p className="text-xs text-center shrink-0" style={{ ...Q, color: 'rgba(20,19,24,0.3)' }}>
              {flyers.length} publicaciones · Actualizado regularmente
            </p>
            <div style={{ height: '1px', flex: 1, background: 'rgba(20,19,24,0.08)' }} />
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxFlyer && (
        <Lightbox flyer={lightboxFlyer} onClose={() => setLightboxFlyer(null)} />
      )}
    </>
  );
}
