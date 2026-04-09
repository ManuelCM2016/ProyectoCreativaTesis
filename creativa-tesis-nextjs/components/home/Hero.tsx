'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // 1. Headline slides up
        tl.fromTo(
            '.hero-headline',
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 }
        );

        // 2. Subtitle slides up
        tl.fromTo(
            '.hero-subtitle',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            '-=0.25'
        );

        // 3. CTA buttons stagger in
        tl.fromTo(
            '.hero-cta',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.12 },
            '-=0.15'
        );


    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative min-h-screen flex items-end overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                poster="/images/hero-poster.jpg"
            >
                <source src="/videos/HERO_PRINCIPAL.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay — strong at the bottom so text is legible, clear at top so video shows */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141318]/80 via-transparent to-transparent" />
            <div className="relative z-10 w-full flex flex-col min-h-screen">
                {/* Spacer — pushes content to the bottom */}
                <div className="flex-1" />

                {/* Bottom content band */}
                <div className="w-full px-4 sm:px-6 pb-10 sm:pb-14 flex flex-col items-center">

                    {/* Center Text Column */}
                    <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                        {/* Headline */}
                        <h1 className="mb-2 lg:mb-3">
                            <span
                                className="hero-headline opacity-0 block text-[26px] sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[46px] font-bold tracking-tight whitespace-normal lg:whitespace-nowrap leading-tight"
                                style={{ fontFamily: '"Questrial", "Inter", sans-serif' }}
                            >
                                <span className="text-white">¡Titúlate ya! con </span>
                                <span className="text-[#96C1E9]">Creativa Tesis</span>
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p
                            className="hero-subtitle opacity-0 text-xs sm:text-sm md:text-base lg:text-lg text-white/55 mb-8 leading-relaxed font-light whitespace-normal lg:whitespace-nowrap"
                            style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}
                        >
                            Empatizamos y valoramos tu perspectiva. Tu éxito académico es nuestra misión.
                        </p>

                        {/* CTA Buttons - Centered below subtitle */}
                        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">

                            {/* Secondary Button */}
                            <Link
                                href="/contacto"
                                className="
                                    hero-cta opacity-0
                                    inline-flex items-center justify-center gap-2
                                    px-7 py-3.5 rounded-xl
                                    bg-white/5 backdrop-blur-sm
                                    border border-white/20 hover:border-white/40
                                    text-white font-semibold text-sm
                                    transition-all duration-300
                                    hover:bg-white/10 hover:-translate-y-0.5
                                    whitespace-nowrap w-full sm:w-auto
                                "
                            >
                                ¡Contáctanos!
                            </Link>

                            {/* Primary Button */}
                            <Link
                                href="/creativa-tesis/quienes-somos"
                                className="
                                    hero-cta opacity-0
                                    inline-flex items-center justify-center gap-2
                                    px-7 py-3.5 rounded-xl
                                    bg-[#BACE37] hover:bg-[#a8b830]
                                    text-[#141318] font-semibold text-sm
                                    transition-all duration-300
                                    shadow-[0_4px_20px_rgba(186,206,55,0.25)]
                                    hover:shadow-[0_8px_28px_rgba(186,206,55,0.35)]
                                    hover:-translate-y-0.5
                                    whitespace-nowrap w-full sm:w-auto
                                "
                            >
                                Más Información
                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
