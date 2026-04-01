'use client';

import { useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─── Testimonial Data ─── */
const testimonials = [
    {
        quote: 'Llegué sin tema definido y en dos semanas ya tenía mi proyecto aprobado. La claridad y profesionalismo que me brindaron fue excepcional.',
        name: 'Mariana Quispe Huanca',
        degree: 'Licenciatura en Educación — UNJBG',
    },
    {
        quote: 'El análisis estadístico con SPSS fue impecable. Mis tablas APA quedaron perfectas y el jurado elogió la rigurosidad de mis resultados.',
        name: 'Carlos Alejandro Mamani',
        degree: 'Maestría en Gestión Pública — UPT',
    },
    {
        quote: 'Después de un año estancada, terminé mi tesis en cinco meses con su asesoría. El acompañamiento por WhatsApp fue clave en todo momento.',
        name: 'Lucía Fernanda Torres',
        degree: 'Licenciatura en Derecho — UAP',
    },
    {
        quote: 'Mi tesis doctoral requería un nivel de profundidad que solo encontré aquí. La revisión de literatura y la discusión fueron publicables tal cual.',
        name: 'Roberto Iván Choque',
        degree: 'Doctorado en Ciencias de la Salud — UNJBG',
    },
    {
        quote: 'Contraté solo el servicio de análisis cualitativo y superó todas mis expectativas. Las categorías emergentes estaban muy bien fundamentadas.',
        name: 'Diana Paola Condori',
        degree: 'Maestría en Psicología Educativa — UCSM',
    },
    {
        quote: 'Me prepararon para la sustentación con simulacros reales. El día de mi defensa estaba completamente segura de mis respuestas. Aprobé con excelencia.',
        name: 'Sofía Valentina Ramos',
        degree: 'Licenciatura en Contabilidad — UNJBG',
    },
];

/* ─── Duplicate for seamless loop ─── */
const duplicatedTestimonials = [...testimonials, ...testimonials];

export default function TestimonialsMarquee() {
    const sectionRef = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    useGSAP(() => {
        // ─── Section heading fade-up ───
        gsap.fromTo(
            '.testimonials-heading',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.testimonials-heading',
                    start: 'top 88%',
                    once: true,
                },
            }
        );

        // ─── Marquee wrapper fade-in ───
        gsap.fromTo(
            '.marquee-wrapper',
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.marquee-wrapper',
                    start: 'top 90%',
                    once: true,
                },
            }
        );

        // ─── Infinite marquee loop ───
        if (marqueeRef.current) {
            const totalWidth = marqueeRef.current.scrollWidth / 2;

            tweenRef.current = gsap.to(marqueeRef.current, {
                x: -totalWidth,
                duration: 45,
                ease: 'none',
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize((x: number) => {
                        return x % totalWidth;
                    }),
                },
            });
        }
    }, { scope: sectionRef });

    const handleMouseEnter = useCallback(() => {
        if (tweenRef.current) {
            gsap.to(tweenRef.current, { timeScale: 0, duration: 0.8, ease: 'power2.out' });
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (tweenRef.current) {
            gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8, ease: 'power2.out' });
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#F2F2F2] overflow-hidden"
            style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)', paddingBottom: 'clamp(5rem, 10vw, 9rem)' }}
        >
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                {/* ─── Section Header ─── */}
                <div className="testimonials-heading opacity-0 text-center mb-14 lg:mb-20 max-w-3xl mx-auto">
                    <span
                        className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-semibold bg-[#365571]/8 text-[#365571] ring-1 ring-[#365571]/12 mb-6"
                    >
                        Lo que dicen nuestros tesistas
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141318] tracking-tight leading-[1.1]"
                        style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                    >
                        Historias reales de{' '}
                        <span className="text-[#365571]">éxito académico</span>
                    </h2>
                </div>
            </div>

            {/* ─── Marquee — Full-bleed, no container max-width ─── */}
            <div
                className="marquee-wrapper opacity-0 relative w-full"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#F2F2F2] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#F2F2F2] to-transparent z-10 pointer-events-none" />

                {/* Scrolling track */}
                <div
                    ref={marqueeRef}
                    className="flex gap-5 w-max will-change-transform"
                    style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
                >
                    {duplicatedTestimonials.map((t, i) => (
                        <div
                            key={i}
                            className="
                                w-[340px] sm:w-[400px] shrink-0
                                rounded-[2rem] p-1.5
                                bg-white ring-1 ring-[#141318]/5
                                transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                                hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)]
                            "
                        >
                            <div className="rounded-[calc(2rem-0.375rem)] p-7 lg:p-8 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] flex flex-col">
                                {/* Quote mark */}
                                <span
                                    className="text-4xl text-[#BACE37]/30 leading-none mb-4 block select-none"
                                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                                >
                                    &ldquo;
                                </span>

                                {/* Testimonial text — serif italic for editorial feel */}
                                <p
                                    className="text-sm text-[#141318]/65 leading-relaxed mb-8 flex-1 italic"
                                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                                >
                                    {t.quote}
                                </p>

                                {/* Author */}
                                <div className="border-t border-[#141318]/5 pt-5">
                                    <p
                                        className="text-xs font-bold text-[#141318] tracking-tight mb-1"
                                        style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                                    >
                                        {t.name}
                                    </p>
                                    <p
                                        className="text-[10px] text-[#141318]/35 leading-relaxed"
                                        style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}
                                    >
                                        {t.degree}
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
