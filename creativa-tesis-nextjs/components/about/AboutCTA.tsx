'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutCTA() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        gsap.fromTo(
            '.cta-content',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.9,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.cta-content',
                    start: 'top 88%',
                    once: true,
                },
            }
        );
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden"
            style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)', paddingBottom: 'clamp(5rem, 10vw, 9rem)' }}
        >
            {/* ─── Dark background ─── */}
            <div className="absolute inset-0 bg-[#141318]" />

            {/* ─── Ambient glow ─── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-30%] left-[20%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#365571]/20 rounded-full blur-[200px]" />
                <div className="absolute bottom-[-20%] right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#BACE37]/8 rounded-full blur-[150px]" />
            </div>

            {/* ─── Content ─── */}
            <div className="relative z-10 w-full max-w-[720px] mx-auto px-4 sm:px-6 lg:px-10 text-center flex flex-col items-center">
                <h2
                    className="cta-content opacity-0 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6"
                    style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                >
                    ¿Listo para dar el{' '}
                    <span className="text-[#BACE37]">siguiente paso</span>?
                </h2>

                <p
                    className="cta-content opacity-0 text-base sm:text-lg text-white/50 leading-relaxed max-w-[48ch] mb-10"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                >
                    Agenda una consulta gratuita de 15 minutos y descubre cómo podemos ayudarte a terminar tu tesis en tiempo récord.
                </p>

                <div className="cta-content opacity-0">
                    <Link
                        href="/contacto"
                        className="group inline-flex items-center gap-3 rounded-full px-10 py-4 text-sm font-semibold bg-[#BACE37] text-[#141318] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#d4e84a] hover:shadow-[0_8px_30px_-8px_rgba(186,206,55,0.4)] active:scale-[0.97]"
                    >
                        Reservar mi asesoría
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#141318]/10 transition-all duration-500 group-hover:translate-x-1">
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
