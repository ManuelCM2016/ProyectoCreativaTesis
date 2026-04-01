'use client';

import { useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlogPostsList from '@/app/blog/BlogPostsList';

gsap.registerPlugin(ScrollTrigger);

const Q: React.CSSProperties = { fontFamily: '"Questrial", "Satoshi", sans-serif' };

// ─── Types ────────────────────────────────────────────────────────────────────
type Post = Parameters<typeof BlogPostsList>[0]['posts'][number];

// ─── Aurora Cursor Background ─────────────────────────────────────────────────
// Soft radial gradient that follows the mouse — creates a "living" feel on white bg
function AuroraBg() {
  const auroraRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 50, y: 50 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    pos.current = { x, y };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!auroraRef.current) return;
      gsap.to(auroraRef.current, {
        '--aurora-x': `${x}%`,
        '--aurora-y': `${y}%`,
        duration: 1.2,
        ease: 'power2.out',
      });
    });
  }, []);

  return (
    <>
      {/* Aurora gradient that follows cursor */}
      <div
        ref={auroraRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 55% 45% at var(--aurora-x, 50%) var(--aurora-y, 50%),
              rgba(150,193,233,0.12) 0%,
              rgba(54,85,113,0.05) 40%,
              transparent 70%
            )
          `,
          // @ts-ignore CSS custom property
          '--aurora-x': '50%',
          '--aurora-y': '50%',
          transition: 'none',
        }}
      />
      {/* Static ambient top glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 80% 30% at 50% 0%, rgba(150,193,233,0.07) 0%, transparent 70%)',
        }}
      />
      {/* Dot grid — subtle texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(54,85,113,0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />
    </>
  );
}

// ─── Section header ────────────────────────────────────────────────────────────
function BlogPostsHeader() {
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
        start: 'top 85%',
        once: true,
      },
    });
  }, []);

  return (
    <div
      ref={headRef}
      className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 pb-6 border-b"
      style={{ borderColor: 'rgba(20,19,24,0.1)' }}
    >
      <div>
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-5"
          style={{
            borderColor: 'rgba(54,85,113,0.18)',
            background: 'rgba(54,85,113,0.05)',
          }}
        >
          <span
            className="text-[9px] uppercase tracking-[0.22em] font-medium"
            style={{ ...Q, color: '#365571' }}
          >
            Artículos
          </span>
        </div>

        {/* H2 — Questrial */}
        <h2
          className="font-bold leading-tight"
          style={{
            ...Q,
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: '#141318',
          }}
        >
          Blog de Investigación
        </h2>
      </div>

      <p
        className="text-sm leading-relaxed max-w-[38ch] md:pb-1"
        style={{ ...Q, color: 'rgba(20,19,24,0.45)' }}
      >
        Guías prácticas y análisis profundos para cada etapa del proceso de titulación.
      </p>
    </div>
  );
}

// ─── Main BlogPostsSection ────────────────────────────────────────────────────
export default function BlogPostsSection({ posts }: { posts: Post[] }) {
  return (
    <section
      id="blog-articulos"
      className="relative w-full overflow-hidden px-4 md:px-20 py-28 md:py-36"
      style={{ background: '#ffffff' }}
    >
      {/* Dynamic cursor-aurora background */}
      <AuroraBg />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <BlogPostsHeader />
        <BlogPostsList posts={posts} />
      </div>
    </section>
  );
}
