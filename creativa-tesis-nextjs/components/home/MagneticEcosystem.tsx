'use client';

import { useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─── TOOL DATA ─── */
interface Tool {
    title: string;
    description: string;
    icon: string;
    span: string; // grid span class
}

const tools: Tool[] = [
    {
        title: 'WhatsApp Directo',
        description:
            'Canal abierto 24/7 para dudas rápidas, envío de avances y coordinación con tu asesor.',
        icon: 'chat',
        span: 'md:col-span-2 lg:col-span-4 lg:row-span-2',
    },
    {
        title: 'Programa Flex',
        description:
            'Flexibilidad para incorporar más referencias, atender observaciones de último momento y evaluar correcciones de manera inmediata.',
        icon: 'dashboard',
        span: 'md:col-span-2 lg:col-span-4',
    },
    {
        title: 'Turnitin Integrado',
        description:
            'Análisis antiplagio profesional incluido en cada entrega para garantizar originalidad.',
        icon: 'verified_user',
        span: 'md:col-span-2 lg:col-span-4',
    },
    {
        title: 'SPSS & R Studio',
        description:
            'Procesamiento estadístico avanzado con software profesional para resultados confiables.',
        icon: 'analytics',
        span: 'md:col-span-2 lg:col-span-4',
    },
    {
        title: 'Programa de Presustentación',
        description:
            'Prepara al tesista antes de su defensa con examen, balotario de preguntas, apoyo con PPT y simulaciones de sustentación.',
        icon: 'local_library',
        span: 'md:col-span-2 lg:col-span-4',
    },
    {
        title: 'Videollamadas',
        description:
            'Sesiones en Google Meet o Zoom para asesorías en vivo, revisión de avances y simulacros de defensa.',
        icon: 'videocam',
        span: 'md:col-span-2 lg:col-span-4 lg:row-span-2',
    },
];

/* ─── 3D TILT CARD ─── */
function TiltCard({ tool, index }: { tool: Tool; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const card = cardRef.current;
            const glow = glowRef.current;
            if (!card || !glow) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            gsap.to(card, {
                rotateX,
                rotateY,
                duration: 0.4,
                ease: 'power2.out',
                transformPerspective: 800,
            });

            gsap.to(glow, {
                x: x - 120,
                y: y - 120,
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out',
            });
        },
        []
    );

    const handleMouseLeave = useCallback(() => {
        const card = cardRef.current;
        const glow = glowRef.current;
        if (!card) return;

        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.5)',
        });

        if (glow) {
            gsap.to(glow, {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.out',
            });
        }
    }, []);

    return (
        <div
            className={`orbital-card opacity-0 ${tool.span}`}
            style={{ perspective: '800px' }}
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="
                    relative h-full
                    rounded-[2rem] p-[1.5px]
                    bg-gradient-to-br from-[#94C6F2]/25 via-white/60 to-[#94C6F2]/10
                    will-change-transform cursor-default
                    transition-shadow duration-500
                    hover:shadow-[0_30px_60px_-20px_rgba(148,198,242,0.25)]
                "
            >
                {/* Inner glass panel */}
                <div className="relative h-full rounded-[calc(2rem-1.5px)] p-7 lg:p-9 bg-white/80 backdrop-blur-sm overflow-hidden flex flex-col min-h-[200px]">
                    {/* Radial glow that follows cursor */}
                    <div
                        ref={glowRef}
                        className="absolute w-[240px] h-[240px] rounded-full pointer-events-none opacity-0"
                        style={{
                            background:
                                'radial-gradient(circle, rgba(148,198,242,0.25) 0%, transparent 70%)',
                        }}
                    />

                    {/* Icon */}
                    <div className="relative z-10 w-12 h-12 rounded-2xl bg-[#94C6F2]/12 ring-1 ring-[#94C6F2]/15 flex items-center justify-center mb-6 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-[#94C6F2]/20">
                        <span className="material-symbols-outlined text-xl text-[#365571]">
                            {tool.icon}
                        </span>
                    </div>

                    {/* Title */}
                    <h3
                        className="relative z-10 text-base lg:text-lg font-bold text-[#2F3437] tracking-tight mb-2"
                        style={{
                            fontFamily: '"Questrial", "Satoshi", sans-serif',
                        }}
                    >
                        {tool.title}
                    </h3>

                    {/* Description */}
                    <p
                        className="relative z-10 text-xs lg:text-sm text-[#787774] leading-relaxed max-w-[35ch]"
                        style={{
                            fontFamily: '"Inter", "Questrial", sans-serif',
                        }}
                    >
                        {tool.description}
                    </p>
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
                '.orbital-heading',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.orbital-heading',
                        start: 'top 88%',
                        once: true,
                    },
                }
            );

            // ── Staggered card reveals ──
            const cards = gsap.utils.toArray<HTMLElement>('.orbital-card');
            cards.forEach((card, i) => {
                gsap.fromTo(
                    card,
                    { y: 50, opacity: 0, rotateX: 8 },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        duration: 0.7,
                        delay: i * 0.08,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
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
            className="relative bg-[#F2F2F2] overflow-hidden"
            style={{
                paddingTop: 'clamp(5rem, 10vw, 9rem)',
                paddingBottom: 'clamp(5rem, 10vw, 9rem)',
            }}
        >
            {/* Ambient background blobs */}
            <div
                className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.07]"
                style={{
                    background:
                        'radial-gradient(circle, #94C6F2 0%, transparent 70%)',
                }}
            />
            <div
                className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.05]"
                style={{
                    background:
                        'radial-gradient(circle, #BACE37 0%, transparent 70%)',
                }}
            />

            <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                {/* ─── Section Header ─── */}
                <div className="orbital-heading opacity-0 text-center mb-14 lg:mb-20 max-w-3xl mx-auto">
                    <span className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-semibold bg-[#94C6F2]/10 text-[#365571] ring-1 ring-[#94C6F2]/15 mb-6">
                        Tu ecosistema de apoyo
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2F3437] tracking-tight leading-[1.1]"
                        style={{
                            fontFamily: '"Questrial", "Satoshi", sans-serif',
                        }}
                    >
                        Herramientas{' '}
                        <span className="text-[#94C6F2]">profesionales</span> a
                        tu alcance
                    </h2>
                </div>

                {/* ─── Asymmetric Bento Grid ─── */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 lg:gap-5 auto-rows-auto">
                    {tools.map((tool, i) => (
                        <TiltCard key={i} tool={tool} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
