'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutHero() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        // ─── Word-by-word text reveal ───
        const words = gsap.utils.toArray<HTMLSpanElement>('.hero-word');
        gsap.fromTo(
            words,
            { y: '110%', opacity: 0, rotateX: 45 },
            {
                y: '0%',
                opacity: 1,
                rotateX: 0,
                duration: 1,
                stagger: 0.08,
                ease: 'power4.out',
                delay: 0.3,
            }
        );

        // ─── Subtitle & CTA fade-up ───
        gsap.fromTo(
            '.hero-sub-content',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.9,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.9,
            }
        );

        // ─── Badge fade ───
        gsap.fromTo(
            '.hero-badge',
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power3.out',
                delay: 0.15,
            }
        );

        // ─── Background image: blur-out + zoom-out on scroll ───
        gsap.fromTo(
            '.hero-bg-image',
            { scale: 1.15, filter: 'blur(6px)' },
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

        // ─── Overlay darkens on scroll for depth ───
        gsap.fromTo(
            '.hero-overlay',
            { opacity: 0.55 },
            {
                opacity: 0.8,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.8,
                },
            }
        );

        // ─── Content parallax upward on scroll ───
        gsap.to('.hero-content-wrapper', {
            y: -80,
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.6,
            },
        });

        // ─── Scroll indicator pulse ───
        gsap.fromTo(
            '.scroll-indicator',
            { opacity: 0, y: 10 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 1.6,
                ease: 'power3.out',
            }
        );
        gsap.to('.scroll-indicator-dot', {
            y: 8,
            duration: 1.2,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1,
        });
    }, { scope: sectionRef });

    /* Split title into words for animation */
    const titleWords = 'Impulsando el éxito académico'.split(' ');

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
        >
            {/* ─── Background Image ─── */}
            <div className="hero-bg-image absolute inset-0 z-0 will-change-transform">
                <Image
                    src="/team_photo.jpg"
                    alt="Equipo de Creativa Tesis"
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                    priority
                />
            </div>

            {/* ─── Dark Overlay ─── */}
            <div className="hero-overlay absolute inset-0 z-[1] bg-[#141318]/55" />

            {/* ─── Subtle grain texture ─── */}
            <div
                className="absolute inset-0 z-[2] opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '128px 128px',
                }}
            />

            {/* ─── Content ─── */}
            <div className="hero-content-wrapper relative z-10 w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 flex flex-col items-center text-center">

                {/* Badge */}
                <div className="hero-badge opacity-0 mb-8">
                    <span
                        className="inline-block rounded-full px-5 py-2 text-[10px] uppercase tracking-[0.3em] font-semibold bg-white/10 text-white/80 ring-1 ring-white/15 backdrop-blur-sm"
                    >
                        Nuestra Historia
                    </span>
                </div>

                {/* Title — Word-by-word reveal */}
                <h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-8"
                    style={{ fontFamily: '"Questrial", "Satoshi", sans-serif', perspective: '600px' }}
                >
                    {titleWords.map((word, i) => (
                        <span key={i} className="inline-block overflow-hidden mr-[0.3em] last:mr-0">
                            <span
                                className="hero-word inline-block opacity-0 will-change-transform"
                                style={{ transformOrigin: 'center bottom' }}
                            >
                                {word}
                            </span>
                        </span>
                    ))}
                </h1>

                {/* Subtitle */}
                <p
                    className="hero-sub-content opacity-0 text-base sm:text-lg lg:text-xl text-white/65 max-w-[52ch] mx-auto leading-relaxed mb-4"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                >
                    Somos Creativa Tesis, una consultora dedicada a transformar la experiencia de
                    investigación académica. Con más de 100 tesis aprobadas, somos tu aliado estratégico
                    para alcanzar la titulación.
                </p>

                {/* Quote */}
                <p
                    className="hero-sub-content opacity-0 text-sm sm:text-base text-white/40 italic mb-10"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                >
                    &ldquo;Empatizamos y valoramos tu perspectiva.&rdquo;
                </p>

                {/* CTA Buttons */}
                <div className="hero-sub-content opacity-0 flex flex-col sm:flex-row gap-4">
                    <Link
                        href="#equipo"
                        className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold bg-white text-[#141318] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#BACE37] hover:text-[#141318] active:scale-[0.97] shadow-[0_8px_30px_-8px_rgba(0,0,0,0.3)]"
                    >
                        Conoce al equipo
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#141318]/8 transition-all duration-500 group-hover:translate-x-1">
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </span>
                    </Link>
                    <Link
                        href="/casos-de-exito"
                        className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold text-white ring-1 ring-white/20 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-white/40 hover:bg-white/5 active:scale-[0.97]"
                    >
                        Ver casos de éxito
                    </Link>
                </div>
            </div>

            {/* ─── Scroll Indicator ─── */}
            <div className="scroll-indicator opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
                <div className="w-[1px] h-8 rounded-full border border-white/20 flex justify-center pt-1 overflow-hidden">
                    <div className="scroll-indicator-dot w-[3px] h-[3px] rounded-full bg-white/60" />
                </div>
                <span
                    className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-medium"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                >
                    Scroll
                </span>
            </div>
        </section>
    );
}
