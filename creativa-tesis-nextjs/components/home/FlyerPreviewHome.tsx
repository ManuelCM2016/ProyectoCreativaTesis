'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, X, ArrowSquareOut, Images } from '@phosphor-icons/react';
import BokehParticles from '@/components/shared/BokehParticles';

gsap.registerPlugin(ScrollTrigger);

const Q: React.CSSProperties = { fontFamily: '"Questrial", "Satoshi", sans-serif' };

/* ═══════════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════════ */
interface Flyer {
  _id: string;
  title: string;
  caption?: string;
  category?: string;
  tags?: string[];
  imageUrl: string;
  linkUrl?: string;
}

const CAT_LABEL: Record<string, string> = {
  'servicio-carrera': '🎓 Servicio por Carrera',
  'consejos-tips': '💡 Consejos y Tips',
  motivacion: '⚡ Motivación',
  'alianzas-universitarias': '🏫 Alianzas Universitarias',
  'campanas-especiales': '🎉 Campañas Especiales',
  'comunidad-marca': '📸 Comunidad / Marca',
};

/* ═══════════════════════════════════════════════════════════════════════════════
   3-D math — interpolate card transforms from fractional offset
   ═══════════════════════════════════════════════════════════════════════════════ */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface CardTransform {
  x: number;
  z: number;
  ry: number;
  sc: number;
  op: number;
}

// Keyframes by integer offset distance from center (0 = center)
// Returns responsive values based on viewport width
function getKeyframes(): CardTransform[] {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024;
  
  if (isMobile) {
    return [
      { x: 0, z: 140, ry: 0, sc: 1, op: 1 },
      { x: 160, z: -20, ry: -25, sc: 0.72, op: 0.6 },
      { x: 260, z: -80, ry: -40, sc: 0.5, op: 0 },
      { x: 320, z: -140, ry: -50, sc: 0.4, op: 0 },
    ];
  }
  if (isTablet) {
    return [
      { x: 0, z: 180, ry: 0, sc: 1, op: 1 },
      { x: 220, z: -25, ry: -26, sc: 0.76, op: 0.7 },
      { x: 380, z: -110, ry: -42, sc: 0.55, op: 0.2 },
      { x: 500, z: -200, ry: -52, sc: 0.42, op: 0 },
    ];
  }
  return [
    { x: 0, z: 220, ry: 0, sc: 1, op: 1 },
    { x: 285, z: -30, ry: -28, sc: 0.78, op: 0.8 },
    { x: 480, z: -140, ry: -44, sc: 0.6, op: 0.35 },
    { x: 640, z: -250, ry: -55, sc: 0.45, op: 0 },
  ];
}

function getCardTransform(offset: number): CardTransform {
  const KF = getKeyframes();
  // offset is fractional, signed. e.g. -1.3, 0, 0.7, 2.1
  const sign = offset >= 0 ? 1 : -1;
  const abs = Math.abs(offset);
  const idx = Math.floor(abs);
  const frac = abs - idx;

  if (idx >= KF.length - 1) return { x: sign * KF[KF.length - 1].x, z: KF[KF.length - 1].z, ry: -sign * KF[KF.length - 1].ry, sc: KF[KF.length - 1].sc, op: 0 };

  const a = KF[idx];
  const b = KF[idx + 1];
  return {
    x: sign * lerp(a.x, b.x, frac),
    z: lerp(a.z, b.z, frac),
    ry: -sign * lerp(a.ry, b.ry, frac), // negative sign flips for left side
    sc: lerp(a.sc, b.sc, frac),
    op: lerp(a.op, b.op, frac),
  };
}

// Normalise offset to [-half, +half] for circular wrapping
function wrapOffset(rawOff: number, total: number): number {
  const half = total / 2;
  let o = ((rawOff % total) + total) % total; // [0, total)
  if (o > half) o -= total;
  return o;
}

/* ═══════════════════════════════════════════════════════════════════════════════
   Zoom Detail Modal — appears from the card position
   ═══════════════════════════════════════════════════════════════════════════════ */
function DetailModal({
  flyer,
  originRect,
  onClose,
}: {
  flyer: Flyer;
  originRect: DOMRect | null;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Overlay
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.32, ease: 'power2.out' });

    // Panel — zoom from card position
    if (panelRef.current && originRect) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const targetW = Math.min(440, vw - 32);
      const fromScale = originRect.width / targetW;
      const fromX = originRect.left + originRect.width / 2 - vw / 2;
      const fromY = originRect.top + originRect.height / 2 - vh / 2;

      gsap.fromTo(
        panelRef.current,
        { x: fromX, y: fromY, scale: fromScale, opacity: 0.7 },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.6, ease: 'expo.out', delay: 0.04 }
      );
    } else {
      gsap.fromTo(panelRef.current, { y: 40, scale: 0.88, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(1.3)' });
    }
  }, []);

  const close = useCallback(() => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in', onComplete: onClose });
    gsap.to(panelRef.current, { scale: 0.88, opacity: 0, y: 20, duration: 0.2, ease: 'power2.in' });
  }, [onClose]);

  // ESC to close
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [close]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        background: 'rgba(18, 26, 36, 0.5)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
      }}
      onClick={close}
    >
      <div
        ref={panelRef}
        className="relative w-full overflow-y-auto"
        style={{
          maxWidth: 440,
          maxHeight: '90vh',
          background: 'rgba(194, 228, 248, 0.92)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderRadius: 28,
          border: '1px solid rgba(255,255,255,0.6)',
          boxShadow: '0 40px 100px rgba(18,26,36,0.35), inset 0 1px 0 rgba(255,255,255,0.4)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Image ── */}
        <div className="relative w-full" style={{ aspectRatio: '1/1' }}>
          <img
            src={flyer.imageUrl}
            alt={flyer.title}
            className="w-full h-full object-cover"
            style={{ borderRadius: '28px 28px 0 0' }}
          />
          {/* Close btn */}
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-90"
            style={{ background: 'rgba(18,26,36,0.55)', backdropFilter: 'blur(8px)' }}
          >
            <X size={16} weight="bold" style={{ color: '#fff' }} />
          </button>
        </div>

        {/* ── Details ── */}
        <div className="p-6">
          {flyer.category && (
            <span
              className="inline-block px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-medium mb-4"
              style={{
                ...Q,
                background: 'rgba(255,255,255,0.55)',
                color: '#1a3552',
                border: '1px solid rgba(255,255,255,0.7)',
              }}
            >
              {CAT_LABEL[flyer.category] ?? flyer.category}
            </span>
          )}

          <h3
            className="font-bold text-lg leading-snug mb-3"
            style={{ ...Q, color: '#0d1e2e' }}
          >
            {flyer.title}
          </h3>

          {flyer.caption && (
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ ...Q, color: 'rgba(13,30,46,0.6)' }}
            >
              {flyer.caption}
            </p>
          )}

          {flyer.tags && flyer.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {flyer.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-[10px]"
                  style={{
                    ...Q,
                    background: 'rgba(255,255,255,0.5)',
                    color: '#1a3552',
                    border: '1px solid rgba(255,255,255,0.65)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div
            className="flex items-center gap-3 pt-4 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.4)' }}
          >
            {flyer.linkUrl && (
              <a
                href={flyer.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 hover:opacity-90 active:scale-95"
                style={{ ...Q, background: 'rgba(22,35,54,0.85)', color: '#fff' }}
              >
                Ver en redes <ArrowSquareOut size={13} weight="bold" />
              </a>
            )}
            <Link
              href="/blog#vitrina-social"
              onClick={close}
              className="flex items-center px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-200 hover:bg-white/40"
              style={{ ...Q, color: '#1a3552', border: '1px solid rgba(255,255,255,0.5)' }}
            >
              Ver todos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   Main Carousel Component
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function FlyerPreviewHome({ flyers }: { flyers: Flyer[] }) {
  const total = flyers.length;

  // ── State ────────────────────────────────────────────────────────────────
  const [, forceRender] = useState(0);
  const [modal, setModal] = useState<{ flyer: Flyer; rect: DOMRect } | null>(null);

  // ── Refs ─────────────────────────────────────────────────────────────────
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Engine state — kept in refs so pointer handlers don't stale
  const progressRef = useRef(0);      // float: current carousel position
  const velocityRef = useRef(0);      // px/ms drag velocity
  const isDragging = useRef(false);
  const isSpinning = useRef(false);   // decelerating after flick
  const dragStartX = useRef(0);
  const dragStartProgress = useRef(0);
  const lastPointerX = useRef(0);
  const lastPointerT = useRef(0);
  const totalDragDist = useRef(0);    // accumulated absolute px for tap detection
  const rafId = useRef<number>(0);
  const inertiaTween = useRef<gsap.core.Tween | null>(null);

  // ── Apply transforms to all cards from current progressRef ──────────────
  const renderCards = useCallback(() => {
    const p = progressRef.current;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const rawOff = i - p;
      const off = wrapOffset(rawOff, total);
      const t = getCardTransform(off);
      // zIndex based on closeness to center (closest = highest)
      const zi = Math.round(100 - Math.abs(off) * 20);
      card.style.transform = `translateX(${t.x}px) translateZ(${t.z}px) rotateY(${t.ry}deg) scale(${t.sc})`;
      card.style.opacity = `${Math.max(0, t.op)}`;
      card.style.zIndex = `${zi}`;
    });
  }, [total]);

  // ── Scroll entry animations ─────────────────────────────────────────────
  useGSAP(() => {
    if (!headRef.current || !stageRef.current) return;
    gsap.from(Array.from(headRef.current.children), {
      opacity: 0, y: 24, duration: 0.75, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true },
    });
    gsap.from(stageRef.current, {
      opacity: 0, y: 50, scale: 0.94, duration: 0.9, ease: 'power3.out', delay: 0.15,
      scrollTrigger: { trigger: stageRef.current, start: 'top 88%', once: true },
    });
  }, { scope: sectionRef });

  // ── Initial render ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!total) return;
    renderCards();
  }, [total, renderCards]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      inertiaTween.current?.kill();
    };
  }, []);

  // ── Snap to nearest integer index (for buttons and after inertia) ──────
  const snapToNearest = useCallback(() => {
    const target = Math.round(progressRef.current);
    inertiaTween.current?.kill();
    inertiaTween.current = gsap.to(progressRef, {
      current: target,
      duration: 0.45,
      ease: 'power2.out',
      onUpdate: renderCards,
      onComplete: () => {
        isSpinning.current = false;
        forceRender((v) => v + 1); // re-render to update dot indicators
      },
    });
  }, [renderCards]);

  // ── Navigate by 1 step (arrows) ────────────────────────────────────────
  const goNext = useCallback(() => {
    if (isDragging.current) return;
    inertiaTween.current?.kill();
    isSpinning.current = false;
    const target = Math.round(progressRef.current) + 1;
    inertiaTween.current = gsap.to(progressRef, {
      current: target,
      duration: 0.6,
      ease: 'power3.out',
      onUpdate: renderCards,
      onComplete: () => forceRender((v) => v + 1),
    });
  }, [renderCards]);

  const goPrev = useCallback(() => {
    if (isDragging.current) return;
    inertiaTween.current?.kill();
    isSpinning.current = false;
    const target = Math.round(progressRef.current) - 1;
    inertiaTween.current = gsap.to(progressRef, {
      current: target,
      duration: 0.6,
      ease: 'power3.out',
      onUpdate: renderCards,
      onComplete: () => forceRender((v) => v + 1),
    });
  }, [renderCards]);

  const goToIndex = useCallback(
    (idx: number) => {
      if (isDragging.current) return;
      inertiaTween.current?.kill();
      isSpinning.current = false;
      // Find shortest path to idx
      const cur = progressRef.current;
      const curMod = ((cur % total) + total) % total;
      let diff = idx - curMod;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
      const target = cur + diff;
      inertiaTween.current = gsap.to(progressRef, {
        current: target,
        duration: 0.6,
        ease: 'power3.out',
        onUpdate: renderCards,
        onComplete: () => forceRender((v) => v + 1),
      });
    },
    [renderCards, total]
  );

  // ── Pointer handlers ───────────────────────────────────────────────────
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Stop any running inertia
      if (isSpinning.current) {
        inertiaTween.current?.kill();
        isSpinning.current = false;
      }

      isDragging.current = true;
      totalDragDist.current = 0;
      dragStartX.current = e.clientX;
      dragStartProgress.current = progressRef.current;
      lastPointerX.current = e.clientX;
      lastPointerT.current = performance.now();
      velocityRef.current = 0;

      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    []
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;

      const now = performance.now();
      const dx = e.clientX - lastPointerX.current;
      const dt = Math.max(now - lastPointerT.current, 1);

      totalDragDist.current += Math.abs(dx);

      // Velocity in cards-per-ms (negative dx = progress increases = go right)
      velocityRef.current = (-dx / 280) / dt * 1000; // cards per second

      lastPointerX.current = e.clientX;
      lastPointerT.current = now;

      // Update progress from total drag delta
      const totalDx = e.clientX - dragStartX.current;
      // 280px of drag = 1 card position
      progressRef.current = dragStartProgress.current - totalDx / 280;
      renderCards();
    },
    [renderCards]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const wasTap = totalDragDist.current < 8;

      if (wasTap) {
        // Detect which card was tapped
        const clickedEl = document.elementFromPoint(e.clientX, e.clientY);
        if (clickedEl) {
          const cardEl = clickedEl.closest('[data-flyer-idx]') as HTMLElement | null;
          if (cardEl) {
            const idx = parseInt(cardEl.dataset.flyerIdx ?? '-1', 10);
            if (idx >= 0 && idx < total) {
              const curIdx = ((Math.round(progressRef.current) % total) + total) % total;
              const off = wrapOffset(idx - Math.round(progressRef.current), total);

              if (Math.abs(off) < 0.5) {
                // Center card tapped — open modal!
                const rect = cardEl.getBoundingClientRect();
                setModal({ flyer: flyers[idx], rect });
                return;
              } else {
                // Side card tapped — navigate to it
                goToIndex(idx);
                return;
              }
            }
          }
        }
        // Tapped but missed cards — just snap
        snapToNearest();
        return;
      }

      // Flick: apply inertia based on release velocity
      const vel = velocityRef.current; // cards/sec

      if (Math.abs(vel) > 0.3) {
        // Inertia! Spin and decelerate over ~2.5 seconds
        isSpinning.current = true;
        const inertiaDistance = vel * 2.2; // how many cards to travel
        const target = progressRef.current + inertiaDistance;

        inertiaTween.current = gsap.to(progressRef, {
          current: target,
          duration: 2.8,
          ease: 'power3.out', // natural deceleration
          onUpdate: renderCards,
          onComplete: () => {
            isSpinning.current = false;
            snapToNearest();
          },
        });
      } else {
        // Low velocity — just snap to nearest
        snapToNearest();
      }
    },
    [total, flyers, renderCards, snapToNearest, goToIndex]
  );

  // ── Current active index for dots ───────────────────────────────────────
  const activeIdx = total > 0 ? ((Math.round(progressRef.current) % total) + total) % total : 0;

  if (!total) return null;

  return (
    <>
      <section
        ref={sectionRef}
        id="home-vitrina-social"
        className="relative overflow-hidden py-24 md:py-36"
        style={{
          background:
            'linear-gradient(155deg, #C8E8F8 0%, #A0D3F2 20%, #94C6F2 50%, #7CB8EB 75%, #64AADF 100%)',
        }}
      >
        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.028] mix-blend-multiply"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px',
          }}
        />
        {/* Ambient glows */}
        <div
          className="absolute -top-20 right-0 w-[550px] h-[550px] pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.24) 0%, transparent 65%)' }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-[420px] h-[420px] pointer-events-none"
          aria-hidden="true"
          style={{ background: 'radial-gradient(circle, rgba(42,84,120,0.12) 0%, transparent 65%)' }}
        />

        {/* Bokeh particles — mouse-reactive */}
        <BokehParticles sectionRef={sectionRef} color="#ffffff" count={210} mouseRadius={180} mouseForce={1.2} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-20">
          {/* ── Header ── */}
          <div
            ref={headRef}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          >
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5"
                style={{
                  borderColor: 'rgba(255,255,255,0.45)',
                  background: 'rgba(255,255,255,0.22)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Images size={10} weight="fill" style={{ color: 'rgba(22,35,54,0.65)' }} />
                <span
                  className="text-[9px] uppercase tracking-[0.25em] font-medium"
                  style={{ ...Q, color: 'rgba(22,35,54,0.65)' }}
                >
                  Redes Sociales
                </span>
              </div>
              <h2
                className="font-bold leading-tight"
                style={{ ...Q, fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#162336' }}
              >
                Lo que compartimos
              </h2>
              <p className="mt-2 text-sm" style={{ ...Q, color: 'rgba(22,35,54,0.55)' }}>
                Arrastra para explorar · Clic en la tarjeta central para ver detalles
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                id="slider-prev"
                type="button"
                onClick={goPrev}
                aria-label="Anterior"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90"
                style={{
                  background: 'rgba(255,255,255,0.28)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <ArrowLeft size={18} weight="bold" style={{ color: '#162336' }} />
              </button>
              <button
                id="slider-next"
                type="button"
                onClick={goNext}
                aria-label="Siguiente"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90"
                style={{
                  background: 'rgba(255,255,255,0.28)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <ArrowRight size={18} weight="bold" style={{ color: '#162336' }} />
              </button>
              <Link
                href="/blog#vitrina-social"
                id="home-flyers-ver-mas"
                className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-[1.03] active:scale-95"
                style={{ ...Q, background: 'rgba(22,35,54,0.82)', color: '#fff', backdropFilter: 'blur(8px)' }}
              >
                Ver todos
              </Link>
            </div>
          </div>

          {/* ── 3-D Carousel Stage ── */}
          <div
            ref={stageRef}
            className="relative mx-auto touch-none select-none"
            style={{
              height: 'clamp(320px, 55vw, 420px)',
              perspective: '1100px',
              perspectiveOrigin: '50% 50%',
              cursor: isDragging.current ? 'grabbing' : 'grab',
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {flyers.map((flyer, i) => (
              <div
                key={flyer._id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-flyer-idx={i}
                className="absolute"
                style={{
                  width: 'clamp(200px, 38vw, 272px)',
                  height: 'clamp(270px, 50vw, 368px)',
                  top: '50%',
                  left: '50%',
                  marginLeft: 'clamp(-100px, -19vw, -136px)',
                  marginTop: 'clamp(-135px, -25vw, -184px)',
                  borderRadius: 20,
                  overflow: 'hidden',
                  willChange: 'transform, opacity',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.18)',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <img
                  src={flyer.imageUrl}
                  alt={flyer.title}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />
                {/* Gradient overlay with title on all cards */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-4 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(18,26,36,0.82) 0%, rgba(18,26,36,0.15) 60%, transparent 100%)',
                  }}
                >
                  <p
                    className="text-white text-xs font-medium line-clamp-2"
                    style={Q}
                  >
                    {flyer.title}
                  </p>
                </div>
                {/* White border ring */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ border: '2px solid rgba(255,255,255,0.35)', borderRadius: 20 }}
                />
              </div>
            ))}
          </div>

          {/* ── Dot indicators ── */}
          <div className="flex justify-center gap-2 mt-8">
            {flyers.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToIndex(i)}
                aria-label={`Ir al flyer ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIdx ? 24 : 8,
                  height: 8,
                  background:
                    i === activeIdx ? 'rgba(22,35,54,0.72)' : 'rgba(22,35,54,0.2)',
                }}
              />
            ))}
          </div>

          {/* Mobile link */}
          <div className="flex justify-center mt-5 md:hidden">
            <Link
              href="/blog#vitrina-social"
              className="text-sm font-medium"
              style={{ ...Q, color: 'rgba(22,35,54,0.55)' }}
            >
              Ver galería completa →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Detail Modal ── */}
      {modal && (
        <DetailModal
          flyer={modal.flyer}
          originRect={modal.rect}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
