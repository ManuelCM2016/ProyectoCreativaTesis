'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─── Milestone Data ─── */
const milestones = [
    {
        month: 'Mes 1',
        title: 'Delimitación del tema',
        description: 'Definimos tu tema de investigación con precisión académica. Analizamos viabilidad, relevancia y acceso a fuentes.',
        icon: 'search',
        accent: '#BACE37',
        image: '/images/mes-1.jpg',
    },
    {
        month: 'Mes 2',
        title: 'Marco teórico y antecedentes',
        description: 'Construimos las bases teóricas con fuentes indexadas y actualizadas. Estructuramos antecedentes nacionales e internacionales.',
        icon: 'menu_book',
        accent: '#96C1E9',
        image: '/images/mes-2.jpg',
    },
    {
        month: 'Mes 3',
        title: 'Diseño metodológico',
        description: 'Definimos enfoque, tipo y diseño de investigación. Seleccionamos población, muestra e instrumentos de recolección.',
        icon: 'science',
        accent: '#BACE37',
        image: '/images/mes-3.jpg',
    },
    {
        month: 'Mes 4',
        title: 'Instrumentos y trabajo de campo',
        description: 'Construimos y validamos tus cuestionarios o guías. Supervisamos la recolección de datos y organización.',
        icon: 'assignment',
        accent: '#96C1E9',
        image: '/images/mes-4.jpg',
    },
    {
        month: 'Mes 5',
        title: 'Análisis estadístico',
        description: 'Procesamos tus datos con SPSS, R o Python. Generamos tablas APA, gráficos profesionales e interpretación rigurosa.',
        icon: 'analytics',
        accent: '#BACE37',
        image: '/images/mes-5.jpg',
    },
    {
        month: 'Mes 6',
        title: 'Resultados y discusión',
        description: 'Redactamos resultados contrastando con tus hipótesis y antecedentes. Discusión académica con argumentación sólida.',
        icon: 'insights',
        accent: '#96C1E9',
        image: '/images/mes-6.jpg',
    },
    {
        month: 'Mes 7',
        title: 'Sustentación y defensa',
        description: 'Ensayamos tu defensa con simulacros reales. Preparamos la presentación y anticipamos preguntas del jurado.',
        icon: 'school',
        accent: '#BACE37',
        image: '/images/mes-7.jpg',
    },
];

/* ─── SVG Logo "C" Path ─── */
const LOGO_C_PATH = 'M 140 30 C 85 30, 30 75, 30 130 C 30 185, 85 230, 140 230 C 165 230, 188 222, 205 208 M 140 30 L 140 10 L 180 10 L 180 30 L 160 30 L 160 20 L 140 20 M 155 30 L 155 50 M 155 50 L 145 50 L 145 55 L 165 55 L 165 50 L 155 50';

export default function InteractiveJourney() {
    const wrapperRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Only enable horizontal scroll on desktop (1024px+)
        if (typeof window === 'undefined' || window.innerWidth < 1024) return;

        const panels = gsap.utils.toArray<HTMLElement>('.journey-panel');
        if (!trackRef.current || !wrapperRef.current || panels.length === 0) return;

        // Calculamos la distancia total a mover
        const getScrollAmount = () => -(trackRef.current!.scrollWidth - window.innerWidth);

        // ─── 1. Main horizontal scroll — con parámetros de seguridad ───
        const scrollTween = gsap.to(trackRef.current, {
            x: getScrollAmount,
            ease: 'none',
            scrollTrigger: {
                trigger: wrapperRef.current,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                pinType: 'fixed',
                scrub: 1,
                end: () => '+=' + (trackRef.current!.scrollWidth - window.innerWidth),
                invalidateOnRefresh: true,
            },
        });

        // ─── 2. Background parallax ───
        gsap.to('.journey-bg-parallax', {
            x: () => window.innerWidth * 0.1, // Movimiento exacto basado en el viewport
            ease: 'none',
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: 'top top',
                end: () => '+=' + (trackRef.current!.scrollWidth - window.innerWidth),
                scrub: 1.5,
                invalidateOnRefresh: true,
            },
        });

        // ─── 3. SVG Logo stroke draw ───
        const logoPath = document.querySelector('.journey-logo-path') as SVGPathElement | null;
        if (logoPath) {
            const pathLength = logoPath.getTotalLength();
            gsap.set(logoPath, {
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength,
            });
            gsap.to(logoPath, {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: 'top top',
                    end: () => '+=' + (trackRef.current!.scrollWidth - window.innerWidth),
                    scrub: 0.8,
                    invalidateOnRefresh: true,
                },
            });
        }

        // ─── 4. Logo watermark drifts right ───
        gsap.fromTo(
            '.journey-logo-watermark',
            { xPercent: 0 },
            {
                xPercent: 120,
                ease: 'none',
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: 'top top',
                    end: () => '+=' + (trackRef.current!.scrollWidth - window.innerWidth),
                    scrub: 1.2,
                    invalidateOnRefresh: true,
                },
            }
        );

        // ─── 5. Milestone card illumination ───
        const cards = gsap.utils.toArray<HTMLElement>('.journey-card-inner');
        cards.forEach((card) => {
            gsap.set(card, { opacity: 0.25, scale: 0.95 });

            gsap.to(card, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out',
                scrollTrigger: {
                    containerAnimation: scrollTween,
                    trigger: card,
                    start: 'left center+=20%',
                    end: 'right center-=20%',
                    toggleActions: 'play reverse play reverse',
                },
            });
        });

        // ─── 6. ScrollTrigger.refresh() después de que el DOM esté listo ───
        const refreshTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);

        return () => clearTimeout(refreshTimeout);

    }, { scope: wrapperRef });

    return (
        <section
            ref={wrapperRef}
            className="min-h-screen w-full bg-[#141318] overflow-hidden"
        // NO relative, NO transform, NO will-change-transform, NO overflow en este elemento
        >
            {/* ═══════ Background Parallax Image ═══════ */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div
                    className="journey-bg-parallax absolute inset-0 will-change-transform"
                    style={{ left: '-5%', width: '110%', maxWidth: '110vw' }}
                >
                    <Image
                        src="/images/CONTENEDOR_4.jpg"
                        alt=""
                        fill
                        sizes="110vw"
                        className="object-cover"
                        priority={false}
                    />
                </div>
                <div className="absolute inset-0 bg-[#141318]/85" />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
                />
            </div>

            {/* ═══════ SVG Logo Watermark ═══════ */}
            <div
                className="journey-logo-watermark absolute top-1/2 left-[5%] -translate-y-1/2 w-[200px] sm:w-[350px] lg:w-[600px] aspect-square pointer-events-none will-change-transform"
                style={{ zIndex: 1, opacity: 0.08 }}
            >
                <svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d={LOGO_C_PATH} stroke="#365571" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" fill="none" />
                    <path className="journey-logo-path" d={LOGO_C_PATH} stroke="#BACE37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
            </div>

            {/* ═══════ Horizontal Track ═══════ */}
            <div
                ref={trackRef}
                className="z-10 lg:flex h-auto lg:h-screen will-change-transform flex flex-col lg:flex-row"
                style={{ width: 'auto' }}
            >
                {/* ─── Panel 1: Intro ─── */}
                <div className="journey-panel w-full lg:w-screen min-h-screen lg:h-screen flex-shrink-0 flex justify-center items-center px-4 sm:px-6 lg:px-16 py-20 lg:py-0">
                    <div className="max-w-4xl text-center lg:text-left">
                        <span className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-semibold bg-[#BACE37]/12 text-[#BACE37] ring-1 ring-[#BACE37]/20 mb-6 lg:mb-8">
                            Tu camino al éxito
                        </span>
                        <h2
                            className="text-4xl sm:text-5xl lg:text-[5rem] font-bold text-white tracking-tight leading-[1.05] mb-6 lg:mb-8"
                            style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                        >
                            De la idea inicial <br className="hidden lg:block" />a la{' '}
                            <span className="text-[#96C1E9]">sustentación aprobada</span>
                        </h2>
                        <p
                            className="text-base sm:text-xl text-white/40 leading-relaxed max-w-[45ch] mx-auto lg:mx-0"
                            style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}
                        >
                            Un viaje de 7 meses estructurado para convertir tu investigación en una tesis de alto nivel. Desliza para explorar.
                        </p>
                        <div className="mt-12 lg:mt-16 flex items-center justify-center lg:justify-start gap-3 text-white/20">
                            <div className="w-10 h-px bg-white/20" />
                            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ fontFamily: '"Inter", sans-serif' }}>Haz scroll</span>
                            <span className="material-symbols-outlined text-sm animate-pulse">arrow_forward</span>
                        </div>
                    </div>
                </div>

                {/* ─── Panel 2: Video Preview ─── */}
                <div className="journey-panel w-full lg:w-screen min-h-[60vh] lg:h-screen flex-shrink-0 flex items-center justify-center px-4 sm:px-6 lg:px-16 py-12 lg:py-0">
                    <div className="w-full max-w-4xl rounded-[2rem] p-2 bg-white/5 ring-1 ring-white/10 backdrop-blur-sm">
                        <div className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                            <video autoPlay loop muted playsInline className="w-full aspect-video object-cover" poster="/images/asesoria-poster.jpg">
                                <source src="/videos/ASESORIA_15S.mp4" type="video/mp4" />
                            </video>
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#141318]/90 to-transparent pointer-events-none flex flex-col justify-end p-8">
                                <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/70 font-semibold" style={{ fontFamily: '"Inter", sans-serif' }}>
                                    Sesiones en vivo • Feedback continuo
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── Panels 3-9: Milestones ─── */}
                {milestones.map((milestone, i) => (
                    <div
                        key={i}
                        className="journey-panel w-full lg:w-screen min-h-[70vh] lg:h-screen flex-shrink-0 flex items-center justify-center px-4 sm:px-6 lg:px-16 py-12 lg:py-0"
                    >
                        <div className="journey-card-inner w-[95%] max-w-[1100px] rounded-[2.5rem] p-1.5 bg-white/[0.03] ring-1 ring-white/5 backdrop-blur-md">
                            <div className="rounded-[calc(2.5rem-0.375rem)] p-8 sm:p-10 lg:p-14 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] bg-[#141318]/40 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                                {/* Columna Izquierda: Textos */}
                                <div>
                                    <div className="flex justify-between items-center mb-10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: milestone.accent, boxShadow: `0 0 16px ${milestone.accent}40` }} />
                                            <span className="text-[11px] uppercase tracking-[0.3em] font-semibold" style={{ color: milestone.accent, fontFamily: '"Inter", sans-serif' }}>
                                                {milestone.month}
                                            </span>
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/10 font-bold" style={{ fontFamily: '"Inter", sans-serif' }}>
                                            {i + 1} / {milestones.length}
                                        </span>
                                    </div>

                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ring-1 ring-white/10" style={{ backgroundColor: `${milestone.accent}15` }}>
                                        <span className="material-symbols-outlined text-3xl" style={{ color: milestone.accent }}>{milestone.icon}</span>
                                    </div>

                                    <h3 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-white tracking-tight leading-[1.1] mb-6" style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}>
                                        {milestone.title}
                                    </h3>

                                    <p className="text-base sm:text-lg text-white/45 leading-relaxed" style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}>
                                        {milestone.description}
                                    </p>
                                </div>

                                {/* Columna Derecha: Imagen */}
                                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                                    <Image
                                        src={milestone.image}
                                        alt={milestone.title}
                                        fill
                                        sizes="(max-width: 1024px) 90vw, 50vw"
                                        className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
                                    />
                                    {/* Subtle overlay for better blending */}
                                    <div className="absolute inset-0 bg-[#141318]/10 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* ─── Panel 10: CTA Final ─── */}
                <div className="journey-panel w-full lg:w-screen min-h-[60vh] lg:h-screen flex-shrink-0 flex justify-center items-center px-4 sm:px-6 lg:px-16 py-20 lg:py-0">
                    <div className="max-w-3xl text-center">
                        <div className="w-20 h-20 rounded-[2rem] bg-[#BACE37]/10 ring-1 ring-[#BACE37]/20 flex items-center justify-center mx-auto mb-10">
                            <span className="material-symbols-outlined text-4xl text-[#BACE37]">emoji_events</span>
                        </div>
                        <h3
                            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6"
                            style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                        >
                            ¿Listo para{' '}<span className="text-[#BACE37]">titularte</span>?
                        </h3>
                        <p
                            className="text-lg sm:text-xl text-white/40 leading-relaxed mb-12 max-w-[45ch] mx-auto"
                            style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}
                        >
                            Comienza hoy con una evaluación gratuita de tu proyecto y recibe un cronograma de trabajo en tu primera sesión.
                        </p>
                        <a
                            href="/contacto"
                            className="inline-flex items-center gap-4 rounded-full px-10 py-5 bg-[#BACE37] text-[#141318] text-sm font-bold uppercase tracking-[0.15em] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_8px_40px_rgba(186,206,55,0.3)] hover:scale-[1.03] active:scale-[0.97]"
                            style={{ fontFamily: '"Inter", sans-serif' }}
                        >
                            Separar mi vacante
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#141318]/10">
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>

            {/* ═══════ Progress Line Bottom ═══════ */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 z-20 pointer-events-none">
                <div className="journey-h-progress h-full bg-gradient-to-r from-[#BACE37] via-[#96C1E9] to-[#365571] origin-left" style={{ transform: 'scaleX(0)' }} />
            </div>
        </section>
    );
}
