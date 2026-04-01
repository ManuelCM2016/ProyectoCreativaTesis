'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─── TOOL DATA ─── */
interface Tool {
    title: string;
    description: string;
    icon: string;
    accentBg: string;
    accentText: string;
}

const tools: Tool[] = [
    {
        title: 'WhatsApp Directo',
        description:
            'Canal abierto 24/7 para dudas rápidas, envío de avances y coordinación con tu asesor.',
        icon: 'chat',
        accentBg: '#E1F3FE',
        accentText: '#1F6C9F',
    },
    {
        title: 'Programa Flex',
        description:
            'Flexibilidad para incorporar más referencias, atender observaciones de último momento, realizar horas extra y evaluar correcciones de manera inmediata.',
        icon: 'dashboard',
        accentBg: '#EDF3EC',
        accentText: '#346538',
    },
    {
        title: 'Turnitin Integrado',
        description:
            'Análisis antiplagio profesional incluido en cada entrega para garantizar originalidad.',
        icon: 'verified_user',
        accentBg: '#FBF3DB',
        accentText: '#956400',
    },
    {
        title: 'SPSS & R Studio',
        description:
            'Procesamiento estadístico avanzado con software profesional para resultados confiables.',
        icon: 'analytics',
        accentBg: '#FDEBEC',
        accentText: '#9F2F2D',
    },
    {
        title: 'Programa de Presustentación',
        description:
            'Prepara al tesista antes de su defensa mediante examen, balotario de posibles preguntas, apoyo con presentación PPT, evaluación estadística y simulaciones de sustentación.',
        icon: 'local_library',
        accentBg: '#E1F3FE',
        accentText: '#1F6C9F',
    },
    {
        title: 'Videollamadas',
        description:
            'Sesiones en Google Meet o Zoom para asesorías en vivo, revisión de avances y simulacros de defensa.',
        icon: 'videocam',
        accentBg: '#EDF3EC',
        accentText: '#346538',
    },
];

/* ─── EDITORIAL CARD ─── */
function EditorialCard({ tool, index }: { tool: Tool; index: number }) {
    const num = String(index + 1).padStart(2, '0');

    return (
        <div
            className="
                editorial-card opacity-0
                group w-full
                border-b border-[#EAEAEA]
                transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                hover:bg-[#F7F6F3]/80
            "
        >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 py-8 md:py-10 lg:py-12 px-2 md:px-4">

                {/* ── Index Number ── */}
                <span
                    className="
                        shrink-0
                        text-5xl md:text-6xl lg:text-7xl
                        font-black tracking-[-0.04em] leading-none
                        text-[#141318]/[0.06]
                        transition-colors duration-500
                        group-hover:text-[#94C6F2]/40
                    "
                    style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                >
                    {num}
                </span>

                {/* ── Icon Circle ── */}
                <div
                    className="
                        shrink-0 w-12 h-12 md:w-14 md:h-14
                        rounded-full flex items-center justify-center
                        transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                        group-hover:scale-110
                    "
                    style={{ backgroundColor: tool.accentBg }}
                >
                    <span
                        className="material-symbols-outlined text-xl md:text-2xl"
                        style={{ color: tool.accentText }}
                    >
                        {tool.icon}
                    </span>
                </div>

                {/* ── Content ── */}
                <div className="flex-1 min-w-0">
                    <h3
                        className="
                            text-lg md:text-xl lg:text-2xl
                            font-bold text-[#2F3437] tracking-tight leading-tight
                            mb-1.5
                            transition-colors duration-300
                            group-hover:text-[#141318]
                        "
                        style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                    >
                        {tool.title}
                    </h3>
                    <p
                        className="
                            text-sm md:text-base
                            text-[#787774] leading-relaxed
                            max-w-[55ch]
                        "
                        style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}
                    >
                        {tool.description}
                    </p>
                </div>

                {/* ── Trailing Arrow ── */}
                <div
                    className="
                        shrink-0 hidden md:flex
                        items-center justify-center
                        w-10 h-10 rounded-full
                        bg-[#141318]/[0.03] ring-1 ring-[#141318]/[0.04]
                        transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                        group-hover:bg-[#94C6F2]/15 group-hover:ring-[#94C6F2]/25
                        group-hover:translate-x-1
                    "
                >
                    <span className="material-symbols-outlined text-base text-[#141318]/30 transition-colors duration-300 group-hover:text-[#94C6F2]">
                        arrow_forward
                    </span>
                </div>
            </div>
        </div>
    );
}

/* ─── MAIN SECTION ─── */
export default function MagneticEcosystem() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            // ── Heading fade-up ──
            gsap.fromTo(
                '.editorial-heading',
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.editorial-heading',
                        start: 'top 88%',
                        once: true,
                    },
                }
            );

            // ── Staggered card reveals ──
            const cards = gsap.utils.toArray<HTMLElement>('.editorial-card');
            cards.forEach((card, i) => {
                gsap.fromTo(
                    card,
                    { y: 24, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        delay: i * 0.08,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 92%',
                            once: true,
                        },
                    }
                );
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#FBFBFA] overflow-hidden"
            style={{
                paddingTop: 'clamp(5rem, 10vw, 10rem)',
                paddingBottom: 'clamp(5rem, 10vw, 10rem)',
            }}
        >
            {/* Subtle warm radial depth */}
            <div
                className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.04]"
                style={{
                    background:
                        'radial-gradient(circle, #94C6F2 0%, transparent 70%)',
                }}
            />

            <div className="relative w-full max-w-[960px] mx-auto px-4 sm:px-6">
                {/* ─── Section Header ─── */}
                <div className="editorial-heading opacity-0 mb-14 lg:mb-20">
                    <span className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-semibold bg-[#E1F3FE] text-[#1F6C9F] mb-6">
                        Tu ecosistema de apoyo
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2F3437] tracking-tight leading-[1.1]"
                        style={{
                            fontFamily: '"Questrial", "Satoshi", sans-serif',
                        }}
                    >
                        Herramientas{' '}
                        <span
                            className="italic font-normal text-[#94C6F2]"
                            style={{
                                fontFamily:
                                    '"Playfair Display", "Newsreader", serif',
                            }}
                        >
                            profesionales
                        </span>{' '}
                        a tu alcance
                    </h2>
                </div>

                {/* ─── Editorial Card List ─── */}
                <div className="border-t border-[#EAEAEA]">
                    {tools.map((tool, i) => (
                        <EditorialCard key={i} tool={tool} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
