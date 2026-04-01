'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Q: React.CSSProperties = { fontFamily: '"Questrial", "Satoshi", sans-serif' };

export default function BlogCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    tl.from(wrapRef.current, {
      opacity: 0,
      y: 32,
      scale: 0.98,
      duration: 0.8,
      ease: 'power3.out',
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blog-cta-final"
      className="w-full px-4 md:px-20 py-32 md:py-40"
      style={{ background: '#84b0d4ff' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Outer shell — Double-Bezel */}
        <div
          ref={wrapRef}
          className="p-[1px] rounded-[2rem]"
          style={{
            background:
              'linear-gradient(135deg, rgba(150,193,233,0.35) 0%, rgba(54,85,113,0.18) 50%, rgba(150,193,233,0.1) 100%)',
          }}
        >
          {/* Inner core */}
          <div
            className="relative rounded-[calc(2rem-1px)] overflow-hidden px-10 py-16 md:px-20 md:py-24 text-center"
            style={{
              background: 'linear-gradient(145deg, #4391daff 0%, #161519 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59, 149, 228, 0.3) 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10 flex flex-col items-center">
              {/* Eyebrow */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
                style={{
                  borderColor: 'rgba(108, 165, 219, 0.2)',
                  background: 'rgba(150,193,233,0.05)',
                  boxShadow: 'inset 0 1px 0 rgba(150,193,233,0.08)',
                }}
              >
                <span
                  className="text-[10px] uppercase tracking-[0.22em] font-medium"
                  style={{ ...Q, color: '#96C1E9' }}
                >
                  Próximo paso
                </span>
              </div>

              <h2
                className="font-bold leading-none mb-5"
                style={{
                  ...Q,
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  color: '#F2F2F2',
                }}
              >
                Agenda tu Asesoría{' '}
                <span style={{ color: '#96C1E9' }}>Gratuita</span>
              </h2>

              <p
                className="text-base leading-relaxed max-w-[50ch] mb-10"
                style={{ ...Q, color: 'rgba(242,242,242,0.48)' }}
              >
                Conversemos sobre tu proyecto. En 30 minutos identificamos exactamente dónde estás
                y cuál es el camino más directo hacia tu titulación.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {/* Primary — lime accent */}
                <a
                  ref={primaryBtnRef}
                  id="cta-final-agendar"
                  href="/contacto"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm"
                  style={{
                    ...Q,
                    background: 'linear-gradient(135deg, #BACE37 0%, #a8b82e 100%)',
                    color: '#141318',
                    boxShadow: '0 8px 32px rgba(186,206,55,0.25)',
                    transition: 'transform 0.3s cubic-bezier(0.32,0.72,0,1), box-shadow 0.3s cubic-bezier(0.32,0.72,0,1)',
                  }}
                  onMouseEnter={() => {
                    if (primaryBtnRef.current) {
                      gsap.to(primaryBtnRef.current, {
                        scale: 1.04,
                        boxShadow: '0 12px 40px rgba(186,206,55,0.38)',
                        duration: 0.3,
                        ease: 'power2.out',
                      });
                    }
                  }}
                  onMouseLeave={() => {
                    if (primaryBtnRef.current) {
                      gsap.to(primaryBtnRef.current, {
                        scale: 1,
                        boxShadow: '0 8px 32px rgba(186,206,55,0.25)',
                        duration: 0.3,
                        ease: 'power2.out',
                      });
                    }
                  }}
                  onMouseDown={() => {
                    if (primaryBtnRef.current) {
                      gsap.to(primaryBtnRef.current, { scale: 0.975, duration: 0.1 });
                    }
                  }}
                  onMouseUp={() => {
                    if (primaryBtnRef.current) {
                      gsap.to(primaryBtnRef.current, { scale: 1.04, duration: 0.2, ease: 'back.out(2)' });
                    }
                  }}
                >
                  Agendar consulta gratuita
                  {/* Trailing icon circle — Button-in-Button */}
                  <span
                    className="flex items-center justify-center w-7 h-7 rounded-full"
                    style={{ background: 'rgba(20,19,24,0.12)' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path
                        d="M2 10L10 2M10 2H4M10 2V8"
                        stroke="#141318"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>

                {/* Secondary — ghost */}
                <a
                  ref={secondaryBtnRef}
                  id="cta-final-whatsapp"
                  href="https://wa.me/51916077800"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm"
                  style={{
                    ...Q,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(242,242,242,0.75)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                    transition: 'background 0.3s ease, color 0.3s ease',
                  }}
                  onMouseEnter={() => {
                    if (secondaryBtnRef.current) {
                      gsap.to(secondaryBtnRef.current, {
                        background: 'rgba(255,255,255,0.1)',
                        color: '#F2F2F2',
                        scale: 1.02,
                        duration: 0.3,
                        ease: 'power2.out',
                      });
                    }
                  }}
                  onMouseLeave={() => {
                    if (secondaryBtnRef.current) {
                      gsap.to(secondaryBtnRef.current, {
                        background: 'rgba(255,255,255,0.06)',
                        color: 'rgba(242,242,242,0.75)',
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out',
                      });
                    }
                  }}
                >
                  WhatsApp directo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
