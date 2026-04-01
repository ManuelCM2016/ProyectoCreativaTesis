'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BokehParticles from '@/components/shared/BokehParticles';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─── Stat Data ─── */
const stats = [
    {
        value: 300,
        prefix: '+',
        suffix: '',
        label: 'Proyectos Finalizados',
        description: 'Tesis de de alta exigencia.',
    },
    {
        value: 98,
        prefix: '',
        suffix: '%',
        label: 'Tasa Aprobación',
        description: 'En primera sustentación.',
    },
    {
        value: 7,
        prefix: '',
        suffix: 'M',
        label: 'Tiempo Promedio',
        description: 'De trabajo ininterrumpido.',
    },
    {
        value: 24,
        prefix: '',
        suffix: '/7',
        label: 'Disponibilidad',
        description: 'Soporte vía WhatsApp.',
    },
    {
        value: 10,
        prefix: '+',
        suffix: '',
        label: 'Asesores Élite',
        description: 'Grados de maestría y doctorado.',
    },
];

export default function StatsMinimalRow() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        // 1. Líneas divisorias (crecen de arriba a abajo)
        gsap.set('.stat-divider', { scaleY: 0, transformOrigin: 'top center' });
        gsap.to('.stat-divider', {
            scaleY: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.inOut',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
                once: true,
            },
        });

        // 2. Títulos fade up
        gsap.fromTo(
            '.stats-heading-text',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    once: true,
                },
            }
        );

        // 3. Contadores Numéricos Fade + Count
        const counters = gsap.utils.toArray<HTMLElement>('.stat-number');
        counters.forEach((el, i) => {
            gsap.fromTo(el, { y: 40, opacity: 0 }, {
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                delay: i * 0.1, 
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    once: true,
                }
            });

            const target = parseFloat(el.dataset.target || '0');
            const prefix = el.dataset.prefix || '';
            const suffix = el.dataset.suffix || '';
            const obj = { val: 0 };

            gsap.to(obj, {
                val: target,
                duration: 2,
                delay: i * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    once: true,
                },
                onUpdate: () => {
                    const rounded = Math.round(obj.val);
                    el.textContent = `${prefix}${rounded}${suffix}`;
                },
            });
        });

        // 4. Textos Descriptivos (Fade de abajo hacia arriba)
        gsap.fromTo('.stat-meta',
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                delay: 0.4,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    once: true,
                }
            }
        );

        // 5. EFECTO MAGNÉTICO EN HOVER — Alta Precisión
        const magnetEls = gsap.utils.toArray<HTMLElement>('.magnet-wrapper');
        
        magnetEls.forEach((magnet) => {
            const inner = magnet.querySelector('.magnet-inner');
            if (!inner) return;

            // Variables de fuerza magnética
            const strength = 15; // px máximo de desplazamiento

            // Animaciones suavizadas para X e Y
            const xTo = gsap.quickTo(inner, "x", { duration: 0.6, ease: "power4.out" });
            const yTo = gsap.quickTo(inner, "y", { duration: 0.6, ease: "power4.out" });

            magnet.addEventListener('mousemove', (e) => {
                const rect = magnet.getBoundingClientRect();
                // Calcular la distancia del mouse respecto al centro del elemento (-1 a 1)
                const relX = (e.clientX - rect.left - (rect.width / 2)) / (rect.width / 2);
                const relY = (e.clientY - rect.top - (rect.height / 2)) / (rect.height / 2);

                xTo(relX * strength);
                yTo(relY * strength);
            });

            magnet.addEventListener('mouseleave', () => {
                xTo(0);
                yTo(0);
            });
        });

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-[#f2f2f2] text-[#141318] pt-24 pb-32 lg:pt-32 lg:pb-40 px-6 sm:px-10 lg:px-16 border-t border-[#141318]/5 overflow-hidden"
        >
            <BokehParticles sectionRef={sectionRef} color="#94C6F2" count={120} />
            <div className="relative z-10 max-w-[1400px] mx-auto">
                {/* ─── Encabezado ─── */}
                <div className="stats-heading-text mb-20 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <h2 
                        className="text-4xl sm:text-5xl lg:text-[4.5rem] font-bold tracking-tight leading-[1] max-w-[15ch]"
                        style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                    >
                        Resultados <span className="text-[#365571]">auditados</span>.
                    </h2>
                    <p 
                        className="text-base sm:text-lg text-[#141318]/50 max-w-[40ch] leading-relaxed"
                        style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                        No vendemos esperanzas, entregamos resultados tangibles. Evaluados y demostrados a través de cientos de sustentaciones de excelencia.
                    </p>
                </div>

                {/* ─── Fila de Datos (Diseño Suizo) ─── */}
                <div className="relative">
                    {/* Línea horizontal principal superior */}
                    <div className="absolute top-0 left-0 w-full h-px bg-[#141318]/10" />

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
                        {stats.map((stat, i) => (
                            <div 
                                key={i} 
                                className="relative magnet-wrapper px-6 py-14 flex flex-col justify-between group cursor-default"
                            >
                                {/* Línea divisoria izquierda (excepto el primero en móvil) */}
                                {i !== 0 && (
                                    <div className="stat-divider hidden md:block absolute top-0 left-0 w-px h-full bg-[#141318]/10" />
                                )}
                                {/* Línea inferior solo en móvil, o si rompe fila en MD */}
                                <div className="stat-divider md:hidden absolute bottom-0 left-0 w-full h-px bg-[#141318]/10" />

                                {/* Contenido con física magnética */}
                                <div className="magnet-inner w-full h-full flex flex-col items-start justify-between min-h-[160px]">
                                    {/* Número Gigante */}
                                    <div 
                                        className="stat-number text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-tighter text-[#365571] leading-none mb-10"
                                        style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                                        data-target={stat.value}
                                        data-prefix={stat.prefix}
                                        data-suffix={stat.suffix}
                                    >
                                        {stat.prefix}0{stat.suffix}
                                    </div>

                                    {/* Meta Text */}
                                    <div className="stat-meta">
                                        <h4 
                                            className="text-xs uppercase tracking-[0.2em] font-bold mb-2 text-[#141318]"
                                            style={{ fontFamily: '"Inter", sans-serif' }}
                                        >
                                            {stat.label}
                                        </h4>
                                        <p 
                                            className="text-sm text-[#141318]/40 leading-relaxed max-w-[20ch] group-hover:text-[#141318]/60 transition-colors duration-300"
                                            style={{ fontFamily: '"Inter", sans-serif' }}
                                        >
                                            {stat.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Línea horizontal principal inferior */}
                    <div className="absolute bottom-0 left-0 w-full h-px bg-[#141318]/10" />
                </div>
            </div>
        </section>
    );
}
