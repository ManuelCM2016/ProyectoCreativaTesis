'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const essenceItems = [
    {
        icon: 'flag',
        title: 'Nuestra Misión',
        text: 'Acompañar a estudiantes y profesionales en su proceso de investigación académica, ofreciendo orientación especializada, ética y personalizada, empatizando y valorando tu perspectiva en cada etapa.',
        image: '/team-vision2.jpg',
    },
    {
        icon: 'visibility',
        title: 'Nuestra Visión',
        text: 'Ser un referente en acompañamiento académico a nivel regional y nacional, reconocidos por la calidad, el compromiso y un enfoque humano que empatiza y valora la perspectiva de cada investigador.',
        image: '/team-mision2.jpg',
    },
];

export default function AboutEssence() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        // ─── Heading fade-up ───
        gsap.fromTo(
            '.essence-heading',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.essence-heading',
                    start: 'top 85%',
                    once: true,
                },
            }
        );

        // ─── Timeline line grows downward ───
        gsap.fromTo(
            '.timeline-line-fill',
            { scaleY: 0 },
            {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.timeline-wrapper',
                    start: 'top 70%',
                    end: 'bottom 60%',
                    scrub: 0.6,
                },
            }
        );

        // ─── Timeline nodes pulse in ───
        const nodes = gsap.utils.toArray<HTMLElement>('.timeline-node');
        nodes.forEach((node) => {
            gsap.fromTo(
                node,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'back.out(2)',
                    scrollTrigger: {
                        trigger: node,
                        start: 'top 75%',
                        once: true,
                    },
                }
            );
        });

        // ─── Cards entrance ───
        const cards = gsap.utils.toArray<HTMLElement>('.timeline-card');
        cards.forEach((card, i) => {
            const direction = i % 2 === 0 ? -40 : 40;
            gsap.fromTo(
                card,
                { x: direction, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        once: true,
                    },
                }
            );
        });

        // ─── Image thumbnails entrance ───
        const thumbs = gsap.utils.toArray<HTMLElement>('.timeline-thumb');
        thumbs.forEach((thumb) => {
            gsap.fromTo(
                thumb,
                { scale: 0.7, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: thumb,
                        start: 'top 80%',
                        once: true,
                    },
                }
            );
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#F2F2F2] overflow-hidden"
            style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)', paddingBottom: 'clamp(5rem, 10vw, 9rem)' }}
        >
            {/* ── Organic background shapes ── */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[30%] -right-[20%] w-[80vw] h-[80vw] max-w-[1600px] max-h-[1600px] bg-[#94C6F2]/25 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[200px]" />
                <div className="absolute -bottom-[20%] left-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[#94C6F2]/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-[900px] mx-auto px-4 sm:px-6 lg:px-10">

                {/* ─── Section Heading ─── */}
                <div className="essence-heading opacity-0 text-center mb-16 lg:mb-20">
                    <span
                        className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-semibold bg-[#365571]/8 text-[#365571] ring-1 ring-[#365571]/12 mb-6"
                    >
                        Lo que nos define
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141318] tracking-tight leading-[1.1] mb-5"
                        style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                    >
                        Nuestra{' '}
                        <span className="text-[#365571]">Esencia</span>
                    </h2>
                    <p
                        className="text-sm sm:text-base text-[#141318]/45 leading-relaxed max-w-[48ch] mx-auto"
                        style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}
                    >
                        Nos guiamos por principios sólidos y una visión clara del futuro académico que queremos construir junto a ti.
                    </p>
                </div>

                {/* ─── Vertical Timeline ─── */}
                <div className="timeline-wrapper relative">

                    {/* Central line — background (grey) */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#141318]/8 rounded-full" />

                    {/* Central line — fill (animated, accent) */}
                    <div
                        className="timeline-line-fill absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#BACE37] rounded-full origin-top"
                        style={{ transformOrigin: 'top center' }}
                    />

                    {/* ─── Timeline Items ─── */}
                    <div className="flex flex-col gap-20 lg:gap-24 relative">
                        {essenceItems.map((item, i) => {
                            const isLeft = i % 2 === 0;

                            return (
                                <div key={i} className="relative">

                                    {/* ── Node dot on the timeline ── */}
                                    <div className="timeline-node absolute left-1/2 -translate-x-1/2 top-8 z-20">
                                        <div className="w-5 h-5 rounded-full bg-[#BACE37] ring-4 ring-[#F2F2F2] shadow-[0_0_0_2px_rgba(186,206,55,0.3)]" />
                                    </div>

                                    {/* ── Card row ── */}
                                    <div
                                        className={`
                                            flex flex-col items-center gap-6
                                            lg:flex-row lg:items-start lg:gap-12
                                            ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}
                                        `}
                                    >
                                        {/* Card — Content side */}
                                        <div
                                            className={`
                                                timeline-card opacity-0
                                                flex-1 max-w-[380px]
                                                ${isLeft ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'}
                                            `}
                                        >
                                            {/* Icon */}
                                            <div
                                                className={`
                                                    w-12 h-12 rounded-2xl bg-[#365571]/8 flex items-center justify-center mb-4
                                                    ${isLeft ? 'lg:ml-auto' : ''}
                                                `}
                                            >
                                                <span className="material-symbols-outlined text-xl text-[#365571]">
                                                    {item.icon}
                                                </span>
                                            </div>

                                            <h3
                                                className="text-xl sm:text-2xl font-bold text-[#141318] tracking-tight mb-3"
                                                style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                                            >
                                                {item.title}
                                            </h3>
                                            <p
                                                className="text-sm text-[#141318]/50 leading-relaxed"
                                                style={{ fontFamily: '"Inter", sans-serif' }}
                                            >
                                                {item.text}
                                            </p>
                                        </div>

                                        {/* Image — Thumbnail side */}
                                        <div
                                            className={`
                                                timeline-thumb opacity-0
                                                flex-1 max-w-[380px]
                                                ${isLeft ? 'lg:pl-12' : 'lg:pr-12'}
                                            `}
                                        >
                                            <div className="relative rounded-2xl overflow-hidden ring-1 ring-[#141318]/5 shadow-[0_15px_40px_-12px_rgba(0,0,0,0.12)] group">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    width={380}
                                                    height={260}
                                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                                    sizes="(max-width: 1024px) 100vw, 380px"
                                                />
                                                {/* Subtle overlay on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#141318]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
