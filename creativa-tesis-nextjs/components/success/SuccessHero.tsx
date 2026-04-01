'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function SuccessHero() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const metricsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Entrance reveal for text
        gsap.fromTo(
            '.hero-text-item',
            { y: 60, opacity: 0, rotationX: -20 },
            {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 85%',
                }
            }
        );

        // Counter animation for metrics
        const counters = gsap.utils.toArray<HTMLElement>('.metric-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target') || '0', 10);
            gsap.fromTo(counter,
                { innerHTML: 0 },
                {
                    innerHTML: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { innerHTML: 1 },
                    scrollTrigger: {
                        trigger: metricsRef.current,
                        start: 'top 90%',
                    },
                    onUpdate: function () {
                        counter.innerHTML = Math.round(Number(this.targets()[0].innerHTML)).toString() + (counter.dataset.suffix || '');
                    }
                }
            );
        });

        // Background organic blob floating
        gsap.to('.hero-blob', {
            y: 'random(-30, 30)',
            x: 'random(-30, 30)',
            rotation: 'random(-15, 15)',
            duration: 'random(3, 6)',
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            stagger: 0.5
        });

        // Subtle background logo animation
        gsap.fromTo('.hero-bg-logo',
            { scale: 0.9, opacity: 0, rotation: -5 },
            {
                scale: 1.1,
                opacity: 0.07,
                rotation: 5,
                duration: 10,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true
            }
        );

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative min-h-[90vh] flex flex-col justify-center bg-[#141318] pt-32 pb-20 overflow-hidden"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
                <div className="absolute inset-0 mix-blend-overlay opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                {/* Animated Logo Watermark */}
                <div className="hero-bg-logo absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] opacity-0">
                    <Image
                        src="/images/logo/logo-completo-referencia.png"
                        alt="Logo Background"
                        fill
                        className="object-contain grayscale"
                        priority
                    />
                </div>

                <div className="hero-blob absolute top-[-10%] -left-[10%] w-[60vw] max-w-[800px] h-[60vw] max-h-[800px] bg-[#365571]/30 rounded-full blur-[120px]" />
                <div className="hero-blob absolute bottom-[-10%] -right-[10%] w-[50vw] max-w-[600px] h-[50vw] max-h-[600px] bg-[#94C6F2]/20 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center">
                {/* Main Text Area */}
                <div ref={textRef} className="max-w-4xl flex flex-col items-center mb-24 perspective-[1000px]">
                    <span
                        className="hero-text-item inline-block rounded-full px-5 py-2 text-xs uppercase tracking-[0.25em] font-bold bg-white/5 text-white/70 ring-1 ring-white/10 mb-8 backdrop-blur-md"
                        style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                        Lo que conseguimos juntos
                    </span>
                    <h1
                        className="hero-text-item text-4xl sm:text-6xl md:text-[5rem] lg:text-[6.5rem] font-bold tracking-tight leading-[0.95] text-white mb-8"
                        style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                    >
                        No nos creas.<br />
                        Créeles a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#94C6F2] to-[#BACE37]">sus resultados.</span>
                    </h1>
                    <p
                        className="hero-text-item text-lg sm:text-xl text-white/50 max-w-2xl leading-relaxed"
                        style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                        Cada tesis es un desafío único, pero el resultado siempre debe ser el mismo: un profesional más titulado superando el bloqueo académico.
                    </p>
                </div>

                {/* Metrics Area */}
                <div ref={metricsRef} className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 hidden md:block pointer-events-none" />

                    <div className="hero-text-item bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center">
                        <span className="text-[#94C6F2] text-5xl sm:text-7xl font-bold mb-4" style={{ fontFamily: '"Questrial", sans-serif' }}>
                            <span className="metric-number" data-target="100" data-suffix="+">0</span>
                        </span>
                        <span className="text-white/70 text-sm tracking-wider uppercase font-bold" style={{ fontFamily: '"Inter", sans-serif' }}>Tesistas Titulados</span>
                    </div>

                    <div className="hero-text-item bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center">
                        <span className="text-[#BACE37] text-5xl sm:text-7xl font-bold mb-4" style={{ fontFamily: '"Questrial", sans-serif' }}>
                            <span className="metric-number" data-target="98" data-suffix="%">0</span>
                        </span>
                        <span className="text-white/70 text-sm tracking-wider uppercase font-bold text-center" style={{ fontFamily: '"Inter", sans-serif' }}>Aprobación en 1ra Sustentación</span>
                    </div>

                    <div className="hero-text-item bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center">
                        <span className="text-[#94C6F2] text-5xl sm:text-7xl font-bold mb-4" style={{ fontFamily: '"Questrial", sans-serif' }}>
                            <span>100</span><span className="text-4xl sm:text-5xl">%</span>
                        </span>
                        <span className="text-white/70 text-sm tracking-wider uppercase font-bold text-center" style={{ fontFamily: '"Inter", sans-serif' }}>Confidencialidad Garantizada</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
