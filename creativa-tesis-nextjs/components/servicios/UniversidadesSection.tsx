'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface University {
  _id: string;
  name: string;
  fullName: string;
  logo: string;
}

export default function UniversidadesSection({ universities }: { universities: University[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeTrack1 = useRef<HTMLDivElement>(null);
  const marqueeTrack2 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Title reveal
    gsap.fromTo('.uni-title',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.uni-title', start: 'top 85%', once: true },
      }
    );
    gsap.fromTo('.uni-subtitle',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: '.uni-title', start: 'top 85%', once: true },
      }
    );

    // Marquee: two rows, opposite directions
    if (marqueeTrack1.current) {
      const w = marqueeTrack1.current.scrollWidth / 2;
      gsap.to(marqueeTrack1.current, { x: -w, duration: 40, ease: 'none', repeat: -1 });
    }
    if (marqueeTrack2.current) {
      const w = marqueeTrack2.current.scrollWidth / 2;
      gsap.fromTo(marqueeTrack2.current, { x: -w }, { x: 0, duration: 45, ease: 'none', repeat: -1 });
    }

  }, { scope: sectionRef });

  if (!universities || universities.length === 0) return null;

  // Split universities into two rows
  const half = Math.ceil(universities.length / 2);
  const row1 = universities.slice(0, half);
  const row2 = universities.slice(half);

  // Duplicate for seamless loop
  const row1Double = [...row1, ...row1];
  const row2Double = [...row2, ...row2];

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #141318 0%, #1a1d24 50%, #141318 100%)' }}>
      {/* Subtle top/bottom edge lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Title */}
        <div className="text-center mb-16 lg:mb-20">
          <h2
            className="uni-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
          >
            Asesoramos todas las{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #95C2E9 0%, #7AAEDC 100%)' }}>
              universidades
            </span>
            <br className="hidden sm:block" />
            a nivel nacional
          </h2>
          <p
            className="uni-subtitle text-base sm:text-lg text-white/40 max-w-xl mx-auto italic"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            &ldquo;Empatizamos y valoramos tu perspectiva&rdquo;
          </p>
        </div>
      </div>

      {/* Marquee Row 1 → left */}
      <div className="relative z-10 overflow-hidden mb-6">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#141318] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#141318] to-transparent z-10 pointer-events-none" />
        <div ref={marqueeTrack1} className="flex gap-6 w-max will-change-transform">
          {row1Double.map((uni, i) => (
            <div
              key={`r1-${i}`}
              className="flex-shrink-0 flex items-center justify-center px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 group"
              style={{
                width: 180,
                height: 90,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <Image
                src={uni.logo}
                alt={uni.fullName || uni.name}
                width={140}
                height={60}
                className="object-contain max-h-[50px] w-auto grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 → right */}
      <div className="relative z-10 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#1a1d24] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#1a1d24] to-transparent z-10 pointer-events-none" />
        <div ref={marqueeTrack2} className="flex gap-6 w-max will-change-transform">
          {row2Double.map((uni, i) => (
            <div
              key={`r2-${i}`}
              className="flex-shrink-0 flex items-center justify-center px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 group"
              style={{
                width: 180,
                height: 90,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <Image
                src={uni.logo}
                alt={uni.fullName || uni.name}
                width={140}
                height={60}
                className="object-contain max-h-[50px] w-auto grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom stat badge */}
      <div className="relative z-10 flex justify-center mt-14">
        <div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
          style={{
            background: 'rgba(149,194,233,0.08)',
            border: '1px solid rgba(149,194,233,0.15)',
          }}
        >
          <span className="text-[#95C2E9] text-sm font-bold" style={{ fontFamily: '"Questrial", sans-serif' }}>
            MÁS DE 5 AÑOS
          </span>
          <span className="text-white/40 text-xs" style={{ fontFamily: '"Inter", sans-serif' }}>
            de experiencia a nivel nacional e internacional
          </span>
        </div>
      </div>
    </section>
  );
}
