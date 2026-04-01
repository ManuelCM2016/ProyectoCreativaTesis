'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats = [
    { value: '100+', label: 'Tesis Aprobadas', accent: true },
    { value: '98%', label: 'Clientes Satisfechos', accent: false },
];

const features = [
    {
        title: 'Asesoría Personalizada',
        description: 'No usamos plantillas genéricas. Tu investigación es única y la tratamos como tal.',
    },
    {
        title: 'Soporte Continuo',
        description: 'Resolvemos tus dudas rápidamente, incluso fuera de horario de oficina con nuestro asistente virtual.',
    },
    {
        title: 'Garantía de Originalidad',
        description: 'Utilizamos software anti-plagio avanzado para asegurar que tu trabajo sea 100% original.',
    },
];

export default function AboutWhyUs() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        // Heading
        gsap.fromTo(
            '.whyus-heading',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: { trigger: '.whyus-heading', start: 'top 88%', once: true },
            }
        );

        // Stats counter entrance
        gsap.fromTo(
            '.whyus-stat',
            { y: 30, opacity: 0, scale: 0.9 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: { trigger: '.whyus-stats', start: 'top 85%', once: true },
            }
        );

        // Feature items
        gsap.fromTo(
            '.whyus-feature',
            { x: 20, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: { trigger: '.whyus-features', start: 'top 85%', once: true },
            }
        );
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#F2F2F2] overflow-hidden"
            style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)', paddingBottom: 'clamp(5rem, 10vw, 9rem)' }}
        >
            {/* Organic bg */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] max-w-[1000px] max-h-[1000px] bg-[#94C6F2]/20 rounded-full blur-[180px]" />
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* ─── Left: Stats ─── */}
                    <div className="whyus-stats flex flex-col sm:flex-row lg:flex-col gap-4">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className={`
                                    whyus-stat opacity-0 flex-1 rounded-2xl p-8 flex flex-col items-center justify-center text-center
                                    ${stat.accent
                                        ? 'bg-[#365571] text-white'
                                        : 'bg-white ring-1 ring-[#141318]/5 text-[#141318]'
                                    }
                                `}
                            >
                                <span
                                    className={`text-4xl sm:text-5xl font-black tracking-tight mb-1 ${stat.accent ? 'text-[#BACE37]' : 'text-[#365571]'}`}
                                    style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                                >
                                    {stat.value}
                                </span>
                                <span
                                    className={`text-sm font-medium ${stat.accent ? 'text-white/70' : 'text-[#141318]/50'}`}
                                    style={{ fontFamily: '"Inter", sans-serif' }}
                                >
                                    {stat.label}
                                </span>
                            </div>
                        ))}

                        {/* Location stat */}
                        <div className="whyus-stat opacity-0 flex-1 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-white ring-1 ring-[#141318]/5">
                            <span
                                className="text-2xl sm:text-3xl font-black text-[#141318] tracking-tight mb-1"
                                style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                            >
                                Sur del Perú
                            </span>
                            <span
                                className="text-sm text-[#141318]/50 font-medium"
                                style={{ fontFamily: '"Inter", sans-serif' }}
                            >
                                Sede Principal
                            </span>
                            <span
                                className="text-xs text-[#BACE37] font-semibold mt-1"
                                style={{ fontFamily: '"Inter", sans-serif' }}
                            >
                                ¡Pronto más sedes en todo Perú!
                            </span>
                        </div>
                    </div>

                    {/* ─── Right: Features ─── */}
                    <div>
                        <div className="whyus-heading opacity-0 mb-8">
                            <h2
                                className="text-3xl sm:text-4xl font-bold text-[#141318] tracking-tight leading-[1.1]"
                                style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                            >
                                ¿Por qué elegir{' '}
                                <span className="text-[#365571]">Creativa Tesis?</span>
                            </h2>
                        </div>

                        <div className="whyus-features flex flex-col gap-5">
                            {features.map((feature, i) => (
                                <div
                                    key={i}
                                    className="whyus-feature opacity-0 flex gap-4 items-start p-5 rounded-2xl bg-white ring-1 ring-[#141318]/5 hover:ring-[#365571]/15 hover:shadow-subtle transition-all duration-300"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#BACE37]/15 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-lg text-[#365571]">
                                            check_circle
                                        </span>
                                    </div>
                                    <div>
                                        <h4
                                            className="text-base font-bold text-[#141318] mb-1 tracking-tight"
                                            style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                                        >
                                            {feature.title}
                                        </h4>
                                        <p
                                            className="text-sm text-[#141318]/50 leading-relaxed"
                                            style={{ fontFamily: '"Inter", sans-serif' }}
                                        >
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
