'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagnifyingGlass, BookOpen, Video, DownloadSimple } from '@phosphor-icons/react';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const QUESTRIAL: React.CSSProperties = {
  fontFamily: '"Questrial", "Satoshi", sans-serif',
};

// ─── Search bar component ──────────────────────────────────────────────────────
function HeroSearch() {
  const [query, setQuery] = useState('');
  const wrapRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrapRef} className="hero-sub-content opacity-0 w-full max-w-xl mx-auto mt-10">
      {/* Outer gradient border */}
      <div
        className="p-[1px] rounded-2xl"
        style={{
          background:
            'linear-gradient(135deg, rgba(150,193,233,0.45) 0%, rgba(255,255,255,0.1) 50%, rgba(150,193,233,0.15) 100%)',
        }}
      >
        {/* Glass inner */}
        <div
          className="flex items-center gap-3 px-5 py-3.5 rounded-[15px]"
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          <MagnifyingGlass
            size={17}
            weight="light"
            style={{ color: query ? '#96C1E9' : 'rgba(255,255,255,0.4)', flexShrink: 0 }}
          />
          <input
            id="blog-hero-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca guías, plantillas, formatos APA..."
            className="flex-1 bg-transparent border-none outline-none text-sm"
            style={{
              ...QUESTRIAL,
              color: '#ffffff',
              caretColor: '#96C1E9',
            }}
            aria-label="Buscar recursos académicos"
          />
          <button
            id="blog-hero-search-btn"
            type="button"
            className="shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 active:scale-95"
            style={{
              ...QUESTRIAL,
              background: 'linear-gradient(135deg, #365571, #96C1E9)',
              color: '#ffffff',
            }}
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Hint tags */}
      <div className="flex flex-wrap justify-center gap-2 mt-3">
        {['APA 7ma edición', 'Marco teórico', 'Plantilla Gantt'].map((tag) => (
          <button
            key={tag}
            id={`blog-tag-${tag.replace(/\s+/g, '-').toLowerCase()}`}
            type="button"
            onClick={() => setQuery(tag)}
            className="px-3 py-1 rounded-full text-[11px] transition-all duration-300"
            style={{
              ...QUESTRIAL,
              color: 'rgba(150,193,233,0.7)',
              border: '1px solid rgba(150,193,233,0.2)',
              background: 'transparent',
            }}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Stat pill ─────────────────────────────────────────────────────────────────
function StatPill({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2.5 rounded-full"
      style={{
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      <span style={{ color: '#96C1E9' }}>{icon}</span>
      <span className="font-semibold text-white text-sm" style={QUESTRIAL}>{value}</span>
      <span className="text-xs" style={{ ...QUESTRIAL, color: 'rgba(255,255,255,0.45)' }}>{label}</span>
    </div>
  );
}

// ─── Main BlogHero ─────────────────────────────────────────────────────────────
interface BlogHeroProps {
  postCount?: number;
  videoCount?: number;
}

export default function BlogHero({ postCount = 2, videoCount = 1 }: BlogHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Background image: zoom-in on load, then zoom-out on scroll
    gsap.fromTo(
      '.blog-bg-image',
      { scale: 1.12, filter: 'blur(5px)' },
      {
        scale: 1,
        filter: 'blur(0px)',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      }
    );

    // Overlay darkens on scroll
    gsap.fromTo(
      '.blog-hero-overlay',
      { opacity: 0.6 },
      {
        opacity: 0.82,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      }
    );

    // Content parallax upward on scroll
    gsap.to('.blog-hero-content', {
      y: -70,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    });

    // Badge fade-in
    gsap.fromTo(
      '.blog-hero-badge',
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.15 }
    );

    // Word-by-word title reveal
    const words = gsap.utils.toArray<HTMLSpanElement>('.blog-hero-word');
    gsap.fromTo(
      words,
      { y: '110%', opacity: 0, rotateX: 40 },
      {
        y: '0%',
        opacity: 1,
        rotateX: 0,
        duration: 0.95,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.35,
      }
    );

    // Sub-content fade-up
    gsap.fromTo(
      '.hero-sub-content',
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out',
        delay: 0.95,
      }
    );

    // Scroll indicator
    gsap.fromTo(
      '.blog-scroll-indicator',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, delay: 1.7, ease: 'power3.out' }
    );
    gsap.to('.blog-scroll-dot', {
      y: 8,
      duration: 1.2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, { scope: sectionRef });

  const titleWords = 'Centro de Recursos Académicos'.split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden"
    >
      {/* ── Background image ── */}
      <div className="blog-bg-image absolute inset-0 z-0 will-change-transform">
        <Image
          src="/team-mision2.jpg"
          alt="Equipo Creativa Tesis — Recursos Académicos"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      {/* ── Dark overlay ── */}
      <div className="blog-hero-overlay absolute inset-0 z-[1]" style={{ background: '#141318', opacity: 0.6 }} />

      {/* ── Color accent overlay — cool blue tint ── */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(54,85,113,0.35) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* ── Grain texture ── */}
      <div
        className="absolute inset-0 z-[3] opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div
        className="blog-hero-content relative z-10 w-full max-w-[960px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col items-center text-center"
      >
        {/* Badge */}
        <div className="blog-hero-badge opacity-0 mb-8">
          <span
            className="inline-block rounded-full px-5 py-2 text-[10px] uppercase tracking-[0.3em] font-semibold"
            style={{
              ...QUESTRIAL,
              background: 'rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.75)',
              border: '1px solid rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            Blog y Recursos
          </span>
        </div>

        {/* Title — word-by-word reveal */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white leading-[1.08] mb-6"
          style={{ ...QUESTRIAL, perspective: '600px', letterSpacing: '-0.01em' }}
        >
          {titleWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.22em] last:mr-0">
              <span
                className="blog-hero-word inline-block opacity-0 will-change-transform"
                style={{
                  transformOrigin: 'center bottom',
                  color: i === 2 ? '#96C1E9' : '#ffffff',
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="hero-sub-content opacity-0 text-base sm:text-lg text-white/60 max-w-[52ch] mx-auto leading-relaxed"
          style={QUESTRIAL}
        >
          Guías estructuradas, plantillas descargables y tutoriales en video para dominar cada etapa de tu tesis con precisión.
        </p>

        {/* Search bar */}
        <HeroSearch />

        {/* Stats row */}
        <div className="hero-sub-content opacity-0 flex flex-wrap justify-center gap-3 mt-10">
          <StatPill icon={<BookOpen size={15} weight="light" />} value={`${postCount}+`} label="Artículos" />
          <StatPill icon={<Video size={15} weight="light" />} value={`${videoCount}+`} label="Videos" />
          <StatPill icon={<DownloadSimple size={15} weight="light" />} value="4+" label="Recursos gratis" />
        </div>

        {/* CTA buttons */}
        <div className="hero-sub-content opacity-0 flex flex-col sm:flex-row gap-4 mt-10">
          <Link
            href="#insights-radar"
            className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold bg-white text-[#141318] transition-all duration-500 hover:bg-[#BACE37] hover:text-[#141318] active:scale-[0.97] shadow-[0_8px_30px_-8px_rgba(0,0,0,0.4)]"
            style={QUESTRIAL}
          >
            Explorar recursos
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#141318]/8 transition-all duration-500 group-hover:translate-x-1">
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
          </Link>
          <Link
            href="#recursos-premium"
            className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold text-white ring-1 ring-white/20 transition-all duration-500 hover:ring-white/40 hover:bg-white/5 active:scale-[0.97]"
            style={QUESTRIAL}
          >
            Descargar plantillas
          </Link>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="blog-scroll-indicator opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-[1px] h-8 rounded-full border border-white/20 flex justify-center pt-1 overflow-hidden">
          <div className="blog-scroll-dot w-[3px] h-[3px] rounded-full bg-white/60" />
        </div>
        <span
          className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-medium"
          style={QUESTRIAL}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}
