'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BokehParticles from '@/components/shared/BokehParticles';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─── List Item Data ─── */
const traditionalItems = [
    { icon: 'schedule', text: 'Meses buscando un tema viable sin orientación' },
    { icon: 'psychology_alt', text: 'Correcciones interminables sin dirección clara' },
    { icon: 'warning', text: 'Riesgo de rechazo por errores metodológicos' },
    { icon: 'mood_bad', text: 'Estrés, ansiedad y procrastinación constante' },
    { icon: 'hourglass_empty', text: 'Plazos vencidos y extensiones de matrícula' },
];

const creativaItems = [
    { icon: 'target', text: 'Tema delimitado en la primera semana de trabajo' },
    { icon: 'verified', text: 'Revisiones estructuradas con feedback accionable' },
    { icon: 'school', text: 'Metodología validada por asesores con grado doctoral' },
    { icon: 'emoji_events', text: 'Confianza total rumbo a la sustentación final' },
    { icon: 'rocket_launch', text: 'Graduación en 7 meses con acompañamiento 24/7' },
];

export default function MethodologyComparison() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // ─── Section heading fade-up ───
        gsap.fromTo(
            '.method-heading',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.method-heading',
                    start: 'top 88%',
                    once: true,
                },
            }
        );

        // ─── Left card slides in from left ───
        gsap.fromTo(
            '.method-card-left',
            { x: -60, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.method-card-left',
                    start: 'top 85%',
                    once: true,
                },
            }
        );

        // ─── Right card slides in from right ───
        gsap.fromTo(
            '.method-card-right',
            { x: 60, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.method-card-right',
                    start: 'top 85%',
                    once: true,
                },
            }
        );

        // ─── Staggered list items ───
        const listItems = gsap.utils.toArray<HTMLElement>('.method-list-item');
        listItems.forEach((item, i) => {
            gsap.fromTo(
                item,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    delay: i * 0.06,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 92%',
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
            <BokehParticles sectionRef={sectionRef} color="#94C6F2" count={120} />
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">

                {/* ─── Section Header ─── */}
                <div className="method-heading opacity-0 text-center mb-14 lg:mb-20 max-w-3xl mx-auto">
                    <span
                        className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-semibold bg-[#BACE37]/12 text-[#365571] ring-1 ring-[#BACE37]/20 mb-6"
                    >
                        Compara y decide
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141318] tracking-tight leading-[1.1]"
                        style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                    >
                        Dos caminos,{' '}
                        <span className="text-[#365571]">un solo resultado correcto</span>
                    </h2>
                </div>

                {/* ─── Comparison Grid ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">

                    {/* ═══════ Card 1 — Traditional ═══════ */}
                    <div
                        className="
                            method-card-left opacity-0
                            rounded-[2rem] p-1.5
                            bg-[#96C1E9] ring-1 ring-[#141318]/5
                            transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                            hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)]
                        "
                    >
                        <div className="rounded-[calc(2rem-0.375rem)] p-8 lg:p-10 xl:p-12 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                            {/* Status badge */}
                            <div className="flex items-center gap-2.5 mb-8">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#141318]/20 animate-pulse" />
                                <span
                                    className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#141318]/40"
                                    style={{ fontFamily: '"Inter", sans-serif' }}
                                >
                                    Sin asesoría
                                </span>
                            </div>

                            {/* Title */}
                            <h3
                                className="text-2xl sm:text-3xl font-bold text-[#141318]/70 tracking-tight leading-tight mb-3"
                                style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                            >
                                El camino tradicional
                            </h3>
                            <p
                                className="text-sm text-[#141318]/35 leading-relaxed mb-10 max-w-[38ch]"
                                style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}
                            >
                                Sin guía especializada, el proceso se vuelve confuso, lento y estresante.
                            </p>

                            {/* List Items */}
                            <ul className="space-y-4">
                                {traditionalItems.map((item, i) => (
                                    <li
                                        key={i}
                                        className="method-list-item opacity-0 flex items-start gap-3.5"
                                    >
                                        <span className="material-symbols-outlined text-lg text-[#141318]/25 mt-0.5 shrink-0">
                                            {item.icon}
                                        </span>
                                        <span
                                            className="text-sm text-[#141318]/45 leading-relaxed"
                                            style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}
                                        >
                                            {item.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* ═══════ Card 2 — Creativa Tesis ═══════ */}
                    <div
                        className="
                            method-card-right opacity-0
                            rounded-[2rem] p-1.5
                            bg-[#141318] ring-1 ring-white/8
                            transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                            hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(54,85,113,0.3)]
                        "
                    >
                        <div className="rounded-[calc(2rem-0.375rem)] p-8 lg:p-10 xl:p-12 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                            {/* Status badge */}
                            <div className="flex items-center gap-2.5 mb-8">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#BACE37] animate-pulse" />
                                <span
                                    className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#BACE37]/80"
                                    style={{ fontFamily: '"Inter", sans-serif' }}
                                >
                                    Con Creativa Tesis
                                </span>
                            </div>

                            {/* Title */}
                            <h3
                                className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight mb-3"
                                style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                            >
                                La Vía{' '}
                                <span className="text-[#96C1E9]">Creativa Tesis</span>
                            </h3>
                            <p
                                className="text-sm text-white/35 leading-relaxed mb-10 max-w-[38ch]"
                                style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}
                            >
                                Acompañamiento integral que convierte tu tesis en un logro seguro y estructurado.
                            </p>

                            {/* List Items */}
                            <ul className="space-y-4">
                                {creativaItems.map((item, i) => (
                                    <li
                                        key={i}
                                        className="method-list-item opacity-0 flex items-start gap-3.5"
                                    >
                                        <span className="material-symbols-outlined text-lg text-[#BACE37] mt-0.5 shrink-0">
                                            {item.icon}
                                        </span>
                                        <span
                                            className="text-sm text-white/60 leading-relaxed"
                                            style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}
                                        >
                                            {item.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* Bottom accent line */}
                            <div className="mt-10 w-full h-px bg-gradient-to-r from-[#BACE37]/40 via-[#96C1E9]/20 to-transparent" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
