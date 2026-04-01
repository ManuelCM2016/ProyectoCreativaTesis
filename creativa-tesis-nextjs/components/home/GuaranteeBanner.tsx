'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─── Commitment Data ─── */
const commitments = [
    {
        icon: 'lock',
        title: 'Confidencialidad',
        description: 'Tu información académica está 100% protegida bajo acuerdo de privacidad.',
    },
    {
        icon: 'rate_review',
        title: 'Revisiones ilimitadas',
        description: 'Cada capítulo pasa por revisiones detalladas hasta tu aprobación total.',
    },
    {
        icon: 'bolt',
        title: 'Respuesta en 24h',
        description: 'Garantizamos respuesta a cualquier consulta en menos de 24 horas hábiles.',
    },
    {
        icon: 'psychology',
        title: 'Enfoque personalizado',
        description: 'Metodología adaptada a tu campo, universidad y objetivos de investigación.',
    },
];

export default function GuaranteeBanner() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // ─── Eyebrow label fade-in ───
        gsap.fromTo(
            '.guarantee-eyebrow',
            { y: 15, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.guarantee-eyebrow',
                    start: 'top 90%',
                    once: true,
                },
            }
        );

        // ─── Staggered icon glow + text fade-in ───
        const items = gsap.utils.toArray<HTMLElement>('.guarantee-item');
        items.forEach((item, i) => {
            const icon = item.querySelector('.guarantee-icon');
            const text = item.querySelector('.guarantee-text');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: 'top 88%',
                    once: true,
                },
                delay: i * 0.12,
            });

            // Icon glow pulse
            if (icon) {
                tl.fromTo(
                    icon,
                    { scale: 0.6, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
                );
                // Subtle glow flash
                tl.fromTo(
                    icon,
                    { boxShadow: '0 0 0px rgba(186,206,55,0)' },
                    { boxShadow: '0 0 24px rgba(186,206,55,0.4)', duration: 0.4, ease: 'power2.out' },
                    '-=0.3'
                );
                tl.to(
                    icon,
                    { boxShadow: '0 0 8px rgba(186,206,55,0.1)', duration: 0.6, ease: 'power2.inOut' },
                );
            }

            // Text slides in from left
            if (text) {
                tl.fromTo(
                    text,
                    { x: -20, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
                    '-=0.8'
                );
            }
        });

        // ─── Divider lines fade in ───
        const dividers = gsap.utils.toArray<HTMLElement>('.guarantee-divider');
        if (dividers.length > 0) {
            gsap.fromTo(
                dividers,
                { scaleY: 0, opacity: 0 },
                {
                    scaleY: 1,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 90%',
                        once: true,
                    },
                }
            );
        }
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#141318] overflow-hidden"
            style={{ paddingTop: 'clamp(3.5rem, 7vw, 6rem)', paddingBottom: 'clamp(3.5rem, 7vw, 6rem)' }}
        >
            {/* Subtle top/bottom edge lines */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">

                {/* ─── Eyebrow ─── */}
                <div className="guarantee-eyebrow opacity-0 text-center mb-10 lg:mb-14">
                    <span
                        className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-semibold bg-[#BACE37]/10 text-[#BACE37] ring-1 ring-[#BACE37]/20"
                    >
                        Nuestro compromiso contigo
                    </span>
                </div>

                {/* ─── Commitments Row ─── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
                    {commitments.map((item, i) => (
                        <div key={i} className="relative flex">
                            {/* Vertical divider — desktop only, between items */}
                            {i > 0 && (
                                <div className="guarantee-divider opacity-0 hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent origin-center" />
                            )}

                            <div className={`guarantee-item flex flex-col items-center text-center flex-1 ${i > 0 ? 'lg:pl-8' : ''}`}>
                                {/* Icon with glow */}
                                <div
                                    className="guarantee-icon w-14 h-14 rounded-2xl bg-[#BACE37]/10 ring-1 ring-[#BACE37]/15 flex items-center justify-center mb-5"
                                    style={{ boxShadow: '0 0 8px rgba(186,206,55,0.1)' }}
                                >
                                    <span className="material-symbols-outlined text-2xl text-[#BACE37]">
                                        {item.icon}
                                    </span>
                                </div>

                                {/* Text block */}
                                <div className="guarantee-text">
                                    <h3
                                        className="text-base font-bold text-white tracking-tight mb-2"
                                        style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p
                                        className="text-xs text-white/35 leading-relaxed max-w-[22ch] mx-auto"
                                        style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}
                                    >
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
