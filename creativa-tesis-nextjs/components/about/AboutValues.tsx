'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const values = [
    {
        icon: 'verified',
        title: 'Integridad',
        description: 'Trabajamos con total transparencia y honestidad académica.',
        accent: '#365571',
    },
    {
        icon: 'psychology',
        title: 'Excelencia',
        description: 'Buscamos la máxima calidad en cada capítulo y análisis.',
        accent: '#94C6F2',
    },
    {
        icon: 'favorite',
        title: 'Empatía',
        description: 'Entendemos tus retos y te acompañamos en el proceso.',
        accent: '#BACE37',
    },
    {
        icon: 'lightbulb',
        title: 'Innovación',
        description: 'Usamos herramientas modernas para optimizar tu tiempo.',
        accent: '#365571',
    },
];

export default function AboutValues() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        // ─── Heading ───
        gsap.fromTo(
            '.values-heading',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.values-heading',
                    start: 'top 88%',
                    once: true,
                },
            }
        );

        // ─── Connector line grows left → right ───
        gsap.fromTo(
            '.values-connector-fill',
            { scaleX: 0 },
            {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.values-flow',
                    start: 'top 75%',
                    end: 'top 40%',
                    scrub: 0.6,
                },
            }
        );

        // ─── Each value node: scale-bounce triggered by scroll ───
        const nodes = gsap.utils.toArray<HTMLElement>('.value-node');
        nodes.forEach((node, i) => {
            gsap.fromTo(
                node,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'back.out(2.5)',
                    scrollTrigger: {
                        trigger: '.values-flow',
                        start: `top ${75 - i * 8}%`,
                        once: true,
                    },
                }
            );
        });

        // ─── Labels fade-up after nodes appear ───
        const labels = gsap.utils.toArray<HTMLElement>('.value-label');
        labels.forEach((label, i) => {
            gsap.fromTo(
                label,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.values-flow',
                        start: `top ${72 - i * 8}%`,
                        once: true,
                    },
                }
            );
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative bg-white overflow-hidden"
            style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)', paddingBottom: 'clamp(5rem, 10vw, 9rem)' }}
        >
            <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">

                {/* ─── Heading ─── */}
                <div className="values-heading opacity-0 text-center mb-16 lg:mb-20">
                    <span
                        className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-semibold bg-[#BACE37]/12 text-[#365571] ring-1 ring-[#BACE37]/20 mb-6"
                    >
                        Lo que nos impulsa
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141318] tracking-tight leading-[1.1]"
                        style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                    >
                        Nuestros{' '}
                        <span className="text-[#365571]">Valores</span>
                    </h2>
                </div>

                {/* ─── Process Flow — Desktop ─── */}
                <div className="values-flow hidden lg:block relative">

                    {/* Connector line — background (grey) */}
                    <div className="absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-[#141318]/8 rounded-full" />

                    {/* Connector line — fill (animated, accent green) */}
                    <div
                        className="values-connector-fill absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-[#BACE37] rounded-full origin-left"
                    />

                    {/* Nodes row */}
                    <div className="relative flex justify-between px-[10%]">
                        {values.map((value, i) => (
                            <div key={i} className="flex flex-col items-center w-[200px]">

                                {/* Circle node */}
                                <div
                                    className="value-node opacity-0 w-20 h-20 rounded-full flex items-center justify-center mb-6 ring-4 ring-white shadow-[0_8px_25px_-6px_rgba(0,0,0,0.1)] transition-transform duration-500 hover:scale-110 cursor-default"
                                    style={{ backgroundColor: `${value.accent}15`, boxShadow: `0 8px 25px -6px ${value.accent}30` }}
                                >
                                    <span
                                        className="material-symbols-outlined text-3xl"
                                        style={{ color: value.accent }}
                                    >
                                        {value.icon}
                                    </span>
                                </div>

                                {/* Label */}
                                <div className="value-label opacity-0 text-center">
                                    <h3
                                        className="text-base font-bold text-[#141318] tracking-tight mb-2"
                                        style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                                    >
                                        {value.title}
                                    </h3>
                                    <p
                                        className="text-xs text-[#141318]/45 leading-relaxed max-w-[18ch] mx-auto"
                                        style={{ fontFamily: '"Inter", sans-serif' }}
                                    >
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── Mobile fallback — Vertical flow ─── */}
                <div className="lg:hidden relative flex flex-col items-center gap-10">

                    {/* Vertical connector */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-[40px] bottom-[40px] w-[2px] bg-[#BACE37]/30 rounded-full" />

                    {values.map((value, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center text-center">
                            {/* Circle */}
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 ring-4 ring-white shadow-lg"
                                style={{ backgroundColor: `${value.accent}15` }}
                            >
                                <span
                                    className="material-symbols-outlined text-2xl"
                                    style={{ color: value.accent }}
                                >
                                    {value.icon}
                                </span>
                            </div>
                            <h3
                                className="text-base font-bold text-[#141318] tracking-tight mb-1"
                                style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                            >
                                {value.title}
                            </h3>
                            <p
                                className="text-xs text-[#141318]/45 leading-relaxed max-w-[24ch]"
                                style={{ fontFamily: '"Inter", sans-serif' }}
                            >
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
