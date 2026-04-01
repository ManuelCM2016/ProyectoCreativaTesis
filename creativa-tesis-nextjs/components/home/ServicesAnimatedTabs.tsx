'use client';

import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─── Tab Data ─── */
interface ServiceItem {
    title: string;
    description: string;
    icon: string;
    href: string;
}

interface TabData {
    id: string;
    label: string;
    services: ServiceItem[];
}

const tabsData: TabData[] = [
    {
        id: 'pregrado',
        label: 'Pregrado',
        services: [
            {
                title: 'Tesis de Licenciatura',
                description: 'Asesoría integral desde la delimitación del tema hasta la sustentación. Metodología cuantitativa, cualitativa o mixta.',
                icon: 'description',
                href: '/servicios/tesis-pregrado',
            },
            {
                title: 'Tesina y Monografía',
                description: 'Estructuración académica rigurosa para trabajos de investigación de menor extensión con enfoque práctico.',
                icon: 'edit_document',
                href: '/servicios/tesis-pregrado',
            },
            {
                title: 'Proyecto de Suficiencia',
                description: 'Desarrollo de proyectos profesionales orientados a resolver problemáticas reales en tu campo de estudio.',
                icon: 'engineering',
                href: '/servicios/tesis-pregrado',
            },
        ],
    },
    {
        id: 'posgrado',
        label: 'Posgrado',
        services: [
            {
                title: 'Tesis de Maestría',
                description: 'Investigación avanzada con rigor metodológico. Asesores con grado de maestría y doctorado en tu área.',
                icon: 'workspace_premium',
                href: '/servicios/tesis-maestria',
            },
            {
                title: 'Tesis Doctoral',
                description: 'Acompañamiento especializado para investigaciones de alto impacto académico y contribución original al conocimiento.',
                icon: 'school',
                href: '/servicios/tesis-doctoral',
            },
            {
                title: 'Artículos Científicos',
                description: 'Redacción y preparación de artículos para publicación en revistas indexadas con estándares internacionales.',
                icon: 'science',
                href: '/servicios/tesis-postgrado',
            },
        ],
    },
    {
        id: 'analisis',
        label: 'Análisis Estadístico',
        services: [
            {
                title: 'Procesamiento de Datos',
                description: 'Análisis estadístico con SPSS, R, STATA y Python. Pruebas paramétricas, no paramétricas y modelos multivariantes.',
                icon: 'analytics',
                href: '/servicios/asesoria-especializada',
            },
            {
                title: 'Diseño de Instrumentos',
                description: 'Construcción y validación de cuestionarios, escalas y guías de entrevista con análisis de confiabilidad.',
                icon: 'assignment',
                href: '/servicios/asesoria-especializada',
            },
            {
                title: 'Resultados y Discusión',
                description: 'Interpretación profesional de resultados estadísticos con tablas APA y gráficos de alta calidad.',
                icon: 'insert_chart',
                href: '/servicios/asesoria-especializada',
            },
        ],
    },
];

export default function ServicesAnimatedTabs() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState(0);
    const isAnimating = useRef(false);

    // ─── Entry animations ───
    useGSAP(() => {
        gsap.fromTo(
            '.services-heading',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.services-heading',
                    start: 'top 88%',
                    once: true,
                },
            }
        );

        gsap.fromTo(
            '.services-tabs-bar',
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.services-tabs-bar',
                    start: 'top 90%',
                    once: true,
                },
            }
        );

        gsap.fromTo(
            '.services-content-wrapper',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.services-content-wrapper',
                    start: 'top 88%',
                    once: true,
                },
            }
        );
    }, { scope: sectionRef });

    // ─── Tab switch animation ───
    const handleTabChange = useCallback((newIndex: number) => {
        if (newIndex === activeTab || isAnimating.current || !contentRef.current) return;
        isAnimating.current = true;

        const cards = contentRef.current.querySelectorAll('.service-card');
        const tl = gsap.timeline({
            onComplete: () => {
                setActiveTab(newIndex);
                isAnimating.current = false;
            },
        });

        // Fade-out current cards downward
        tl.to(cards, {
            y: 30,
            opacity: 0,
            duration: 0.3,
            stagger: 0.04,
            ease: 'power2.in',
        });

    }, [activeTab]);

    // ─── Animate new cards in after state update ───
    useGSAP(() => {
        if (!contentRef.current) return;
        const cards = contentRef.current.querySelectorAll('.service-card');
        gsap.fromTo(
            cards,
            { y: -25, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.45,
                stagger: 0.06,
                ease: 'power3.out',
            }
        );
    }, { scope: contentRef, dependencies: [activeTab] });

    const currentTab = tabsData[activeTab];

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#F2F2F2] overflow-hidden py-20 px-4 sm:px-6"
        >
            {/* ─── ENVELOPE CONTENEDOR - LIQUID ENERGY BORDER ─── */}
            <div className="w-full max-w-[1400px] mx-auto relative group rounded-[2.5rem] p-[2px] overflow-hidden isolate">
                
                {/* Glowing rotating border (Energy edge) */}
                <div className="absolute inset-[-50%] z-0 bg-[conic-gradient(from_0deg,transparent_0_300deg,#96C1E8_360deg)] animate-[spin_4s_linear_infinite]" />
                
                {/* Subtle pulse glow (Breathing effect) */}
                <div className="absolute inset-0 z-0 bg-[#96C1E8]/20 blur-3xl flex animate-[pulse_4s_ease-in-out_infinite]" />

                {/* Inner Container (Deep dark blue background) */}
                <div className="relative z-10 bg-[#0B141D] rounded-[calc(2.5rem-2px)] w-full h-full p-8 md:p-14 lg:p-20 overflow-hidden">

                {/* ─── Section Header ─── */}
                <div className="services-heading opacity-0 text-center mb-10 lg:mb-14 max-w-3xl mx-auto">
                    <span
                        className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-semibold bg-[#96C1E8]/10 text-[#96C1E8] ring-1 ring-[#96C1E8]/20 mb-6"
                    >
                        Nuestros servicios
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]"
                        style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                    >
                        Soluciones{' '}
                        <span className="text-[#96C1E8]">especializadas</span>{' '}
                        para cada etapa
                    </h2>
                </div>

                {/* ─── Pill Tabs Bar ─── */}
                <div className="services-tabs-bar opacity-0 flex justify-center mb-10 lg:mb-14">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#122130] p-1.5 ring-1 ring-[#96C1E8]/10 shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
                        {tabsData.map((tab, i) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(i)}
                                className={`
                                    relative rounded-full px-5 sm:px-7 py-2.5 text-sm font-semibold
                                    transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                                    whitespace-nowrap
                                    ${activeTab === i
                                        ? 'bg-[#96C1E8] text-[#0B141D] shadow-[0_4px_16px_rgba(150,193,232,0.3)]'
                                        : 'bg-transparent text-white/50 hover:text-white/90 hover:bg-white/5'
                                    }
                                `}
                                style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ─── Content Area ─── */}
                <div ref={contentRef} className="services-content-wrapper opacity-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {currentTab.services.map((service, i) => (
                            <Link
                                key={`${currentTab.id}-${i}`}
                                href={service.href}
                                className="
                                    service-card group
                                    rounded-[2rem] p-[1px] bg-gradient-to-b from-[#96C1E8]/20 to-[#96C1E8]/5
                                    transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                                    hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(150,193,232,0.15)]
                                    active:scale-[0.98]
                                    block no-underline
                                "
                            >
                                <div className="rounded-[calc(2rem-1px)] p-8 lg:p-10 h-full bg-[#122130]/90 backdrop-blur-md flex flex-col">

                                    {/* Icon container */}
                                    <div className="w-12 h-12 rounded-2xl bg-[#96C1E8]/10 ring-1 ring-[#96C1E8]/20 flex items-center justify-center mb-7 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-[#96C1E8]/20 group-hover:ring-[#96C1E8]/40">
                                        <span className="material-symbols-outlined text-xl text-[#96C1E8] transition-colors duration-500 group-hover:text-white">
                                            {service.icon}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight mb-3 transition-colors duration-300 group-hover:text-[#96C1E8]"
                                        style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                                    >
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p
                                        className="text-sm text-white/50 leading-relaxed mb-8 flex-1 max-w-[40ch] transition-colors duration-300 group-hover:text-white/70"
                                        style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}
                                    >
                                        {service.description}
                                    </p>

                                    {/* CTA Row */}
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="text-xs font-semibold text-[#96C1E8]/70 uppercase tracking-[0.15em] transition-colors duration-300 group-hover:text-[#96C1E8]"
                                            style={{ fontFamily: '"Inter", sans-serif' }}
                                        >
                                            Ver detalles
                                        </span>
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#96C1E8]/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:bg-[#96C1E8]/30">
                                            <span className="material-symbols-outlined text-xs text-[#96C1E8]">arrow_forward</span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                </div>
            </div>
        </section>
    );
}
