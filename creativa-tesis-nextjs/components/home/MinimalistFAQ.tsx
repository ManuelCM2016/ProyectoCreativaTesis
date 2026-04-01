'use client';

import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─── FAQ Data ─── */
const faqs = [
    {
        question: '¿Cuánto tiempo toma completar una tesis con asesoría?',
        answer: 'El tiempo promedio es de 7 meses para una tesis de licenciatura con dedicación parcial. Para maestría, entre 8 y 10 meses, y para doctorado, de 12 a 18 meses. El cronograma se ajusta a tu disponibilidad y al avance de cada capítulo.',
    },
    {
        question: '¿Mi tesis será original?',
        answer: 'Absolutamente. Cada investigación es única y desarrollada desde cero. Incluimos análisis antiplagio con Turnitin en cada entrega para garantizar un índice de similitud dentro del rango aceptable por tu universidad.',
    },
    {
        question: '¿Qué tipo de tesis pueden asesorar?',
        answer: 'Cubrimos tesis cuantitativas, cualitativas y mixtas en ciencias sociales, educación, salud, derecho, ingeniería, administración, contabilidad y psicología. También asesoramos tesinas, monografías, proyectos de suficiencia y artículos científicos.',
    },
    {
        question: '¿Cómo es la modalidad de trabajo?',
        answer: 'Trabajamos 100% en línea. La comunicación principal es por WhatsApp para consultas rápidas, y usamos Google Meet o Zoom para sesiones de asesoría en vivo. Toda la documentación se gestiona en nuestra plataforma virtual privada.',
    },
    {
        question: '¿Cuánto cuesta la asesoría?',
        answer: 'El costo varía según el tipo de tesis, nivel académico, especialidad y servicios requeridos. Ofrecemos una evaluación gratuita donde analizamos tu caso y te presentamos un presupuesto detallado sin compromiso. Contáctanos para una cotización personalizada.',
    },
    {
        question: '¿Ofrecen garantía de aprobación?',
        answer: 'Sí. Nuestra tasa de aprobación es del 98%. Ofrecemos revisiones ilimitadas de cada capítulo hasta que quede aprobado por tu asesor universitario. Además, te preparamos con simulacros de sustentación para que llegues con total confianza.',
    },
    {
        question: '¿Pueden ayudarme si ya tengo parte de mi tesis avanzada?',
        answer: 'Por supuesto. Evaluamos gratuitamente tu avance actual, identificamos las áreas que necesitan refuerzo y te proponemos un plan de trabajo personalizado. No necesitas empezar de cero.',
    },
];

/* ─── Accordion Item Component ─── */
function AccordionItem({
    faq,
    index,
    isOpen,
    onToggle,
}: {
    faq: (typeof faqs)[number];
    index: number;
    isOpen: boolean;
    onToggle: (index: number) => void;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    const handleClick = useCallback(() => {
        onToggle(index);
    }, [index, onToggle]);

    // Animate height when isOpen changes
    useGSAP(() => {
        const content = contentRef.current;
        const inner = innerRef.current;
        if (!content || !inner) return;

        if (isOpen) {
            const targetHeight = inner.offsetHeight;
            gsap.fromTo(
                content,
                { height: 0, opacity: 0 },
                {
                    height: targetHeight,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power3.inOut',
                }
            );
        } else {
            gsap.to(content, {
                height: 0,
                opacity: 0,
                duration: 0.4,
                ease: 'power3.inOut',
            });
        }
    }, { dependencies: [isOpen] });

    return (
        <div className="faq-item opacity-0 border-b border-[#141318]/6 last:border-b-0">
            <button
                onClick={handleClick}
                className="w-full flex items-start justify-between gap-4 py-7 lg:py-8 text-left group transition-colors duration-300"
            >
                <span
                    className={`
                        text-base sm:text-lg font-semibold tracking-tight leading-snug
                        transition-colors duration-300
                        ${isOpen ? 'text-[#365571]' : 'text-[#141318]/70 group-hover:text-[#141318]'}
                    `}
                    style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                >
                    {faq.question}
                </span>
                <span
                    className={`
                        material-symbols-outlined text-xl shrink-0 mt-0.5
                        transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                        ${isOpen ? 'rotate-45 text-[#BACE37]' : 'rotate-0 text-[#141318]/25 group-hover:text-[#141318]/50'}
                    `}
                >
                    add
                </span>
            </button>

            {/* Collapsible content */}
            <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
                <div ref={innerRef} className="pb-7 lg:pb-8">
                    <p
                        className="text-sm text-[#141318]/45 leading-relaxed max-w-[60ch]"
                        style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}
                    >
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ─── Main Section ─── */
export default function MinimalistFAQ() {
    const sectionRef = useRef<HTMLElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = useCallback((index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    }, []);

    useGSAP(() => {
        // ─── Left column heading fade-up ───
        gsap.fromTo(
            '.faq-heading',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.faq-heading',
                    start: 'top 88%',
                    once: true,
                },
            }
        );

        // ─── FAQ items staggered reveal ───
        const items = gsap.utils.toArray<HTMLElement>('.faq-item');
        items.forEach((item, i) => {
            gsap.fromTo(
                item,
                { y: 25, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    delay: i * 0.06,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 90%',
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
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20">

                    {/* ═══════ Left Column — Sticky Heading ═══════ */}
                    <div className="lg:col-span-4">
                        <div className="lg:sticky lg:top-29">
                            <div className="faq-heading opacity-0">
                                <span
                                    className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-semibold bg-[#365571]/8 text-[#365571] ring-1 ring-[#365571]/12 mb-6"
                                >
                                    Preguntas frecuentes
                                </span>
                                <h2
                                    className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#141318] tracking-tight leading-[1.1] mb-6"
                                    style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                                >
                                    Resolvemos{' '}
                                    <span className="text-[#365571]">tus dudas</span>
                                </h2>
                                <p
                                    className="text-sm text-[#141318]/40 leading-relaxed max-w-[30ch]"
                                    style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}
                                >
                                    Las respuestas que necesitas para tomar la mejor decisión sobre tu proyecto de tesis.
                                </p>

                                {/* FAQ Image */}
                                <div className="mt-5 relative rounded-2xl overflow-hidden ring-1 ring-[#141318]/5 shadow-subtle">
                                    <Image
                                        src="/images/creativa_preguntas.jpg"
                                        alt="Equipo de Creativa Tesis resolviendo dudas"
                                        width={600}
                                        height={400}
                                        className="w-full h-auto object-cover"
                                        sizes="(max-width: 1024px) 100vw, 33vw"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ═══════ Right Column — Accordion ═══════ */}
                    <div className="lg:col-span-8">
                        <div className="border-t border-[#141318]/6">
                            {faqs.map((faq, i) => (
                                <AccordionItem
                                    key={i}
                                    faq={faq}
                                    index={i}
                                    isOpen={openIndex === i}
                                    onToggle={handleToggle}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
