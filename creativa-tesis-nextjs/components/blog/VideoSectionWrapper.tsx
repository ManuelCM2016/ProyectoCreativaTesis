'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoSection from '@/app/blog/VideoSection';

gsap.registerPlugin(ScrollTrigger);

const Q: React.CSSProperties = { fontFamily: '"Questrial", "Satoshi", sans-serif' };

// ─── Types (mirrored from VideoSection) ──────────────────────────────────────
type Platform = 'youtube' | 'facebook' | 'instagram';
type AspectRatio = '16:9' | '9:16' | '1:1';
interface Video {
  _id: string;
  title: string;
  description?: string;
  platform: Platform;
  videoUrl: string;
  aspectRatio?: AspectRatio;
  orientation?: 'horizontal' | 'vertical' | 'square';
  thumbnail?: string;
}

// ─── Cinematic diagonal lines background ─────────────────────────────────────
// Parallax-scroll diagonal stripes evoke motion/film/video feeling
function CinematicBg() {
  const stripesRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Diagonal lines drift upward as you scroll — parallax at 40% of scroll speed
    gsap.to(stripesRef.current, {
      backgroundPositionY: '-120px',
      ease: 'none',
      scrollTrigger: {
        trigger: stripesRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    });

    // Glow shifts left-to-right on scroll
    gsap.fromTo(
      glowRef.current,
      { backgroundPositionX: '10%' },
      {
        backgroundPositionX: '90%',
        ease: 'none',
        scrollTrigger: {
          trigger: glowRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      }
    );
  }, []);

  return (
    <>
      {/* Diagonal stripe parallax layer */}
      <div
        ref={stripesRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              -55deg,
              rgba(54,85,113,0.04) 0px,
              rgba(54,85,113,0.04) 1px,
              transparent 1px,
              transparent 40px
            )
          `,
          backgroundSize: '100% 200%',
          backgroundPositionY: '0px',
        }}
      />

      {/* Horizontal color glow that drifts on scroll */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(
            ellipse 50% 70% at 50% 50%,
            rgba(186,206,55,0.07) 0%,
            rgba(150,193,233,0.04) 40%,
            transparent 70%
          )`,
          backgroundSize: '200% 100%',
          backgroundPositionX: '50%',
        }}
      />

      {/* Static top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(186,206,55,0.4) 30%, rgba(150,193,233,0.3) 70%, transparent 100%)',
        }}
      />
    </>
  );
}

// ─── Section header with scroll entry animation ───────────────────────────────
function VideoHeader() {
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
            borderColor: 'rgba(186,206,55,0.28)',
            background: 'rgba(186,206,55,0.06)',
          }}
        >
          {/* Film strip accent dots */}
          <span
            className="flex gap-[3px] items-center"
            aria-hidden="true"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-[3px] h-[5px] rounded-[1px]"
                style={{ background: '#8ea020', opacity: 0.7 + i * 0.1 }}
              />
            ))}
          </span>
          <span
            className="text-[9px] uppercase tracking-[0.22em] font-medium"
            style={{ ...Q, color: '#8ea020' }}
          >
            Videos
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
          Aprende en Video
        </h2>
      </div>

      <p
        className="text-sm leading-relaxed max-w-[38ch] md:pb-1"
        style={{ ...Q, color: 'rgba(20,19,24,0.45)' }}
      >
        Tutoriales, tips y contenido educativo en formato audiovisual, directo al punto.
      </p>
    </div>
  );
}

// ─── Main VideoSectionWrapper ─────────────────────────────────────────────────
export default function VideoSectionWrapper({ videos }: { videos: Video[] }) {
  return (
    <section
      id="blog-videos"
      className="relative w-full overflow-hidden px-4 md:px-20 py-28 md:py-36"
      style={{ background: '#F2F2F2' }}
    >
      {/* Dynamic cinematic background */}
      <CinematicBg />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <VideoHeader />
        <VideoSection videos={videos} />
      </div>
    </section>
  );
}
