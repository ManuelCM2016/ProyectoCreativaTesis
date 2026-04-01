'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─── Types ─── */
interface ChatTestimonial {
    _id: string;
    studentName: string;
    universityInfo: string;
    highlightText: string;
    emojiBadge: string;
    chatScreenshot: string;
}

interface ChatShowcaseProps {
    testimonials: ChatTestimonial[];
}

/* ─── Fallback data (renders when Sanity has no entries yet) ─── */
const fallbackTestimonials: ChatTestimonial[] = [
    {
        _id: 'fallback-1',
        studentName: 'Karla',
        universityInfo: 'Medicina — UPT',
        highlightText: '¡Aprobé al 100%!',
        emojiBadge: '🎓',
        chatScreenshot: '',
    },
    {
        _id: 'fallback-2',
        studentName: 'Miguel Ángel',
        universityInfo: 'Ingeniería Civil — UNJBG',
        highlightText: 'Tesis lista en 4 meses',
        emojiBadge: '🏆',
        chatScreenshot: '',
    },
    {
        _id: 'fallback-3',
        studentName: 'Lucía',
        universityInfo: 'Derecho — UAP',
        highlightText: 'El jurado me felicitó',
        emojiBadge: '🎉',
        chatScreenshot: '',
    },
    {
        _id: 'fallback-4',
        studentName: 'Roberto',
        universityInfo: 'Maestría Gestión Pública — UPT',
        highlightText: 'Publicación en revista indexada',
        emojiBadge: '❤️',
        chatScreenshot: '',
    },
    {
        _id: 'fallback-5',
        studentName: 'Diana',
        universityInfo: 'Psicología Educativa — UCSM',
        highlightText: 'Defensa impecable',
        emojiBadge: '✨',
        chatScreenshot: '',
    },
];

export default function ChatShowcase({ testimonials }: ChatShowcaseProps) {
    const data = testimonials && testimonials.length > 0 ? testimonials : fallbackTestimonials;

    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const phoneScreenRef = useRef<HTMLDivElement>(null);
    const phoneFrameRef = useRef<HTMLDivElement>(null);
    const listItemsRef = useRef<HTMLDivElement>(null);

    /* ─── Scroll-triggered entrance animations ─── */
    useGSAP(() => {
        if (!sectionRef.current) return;

        // Section heading entrance
        gsap.fromTo(
            '.chat-showcase-heading',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.chat-showcase-heading',
                    start: 'top 88%',
                    once: true,
                },
            }
        );

        // List cards stagger entrance
        gsap.fromTo(
            '.chat-student-card',
            { x: -30, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.chat-student-list',
                    start: 'top 85%',
                    once: true,
                },
            }
        );

        // Phone mockup entrance
        gsap.fromTo(
            '.phone-mockup-wrapper',
            { y: 60, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.phone-mockup-wrapper',
                    start: 'top 85%',
                    once: true,
                },
            }
        );
    }, { scope: sectionRef });

    /* ─── Image swap + haptic vibration animation (fires on activeIndex change) ─── */
    useGSAP(() => {
        if (!phoneScreenRef.current) return;

        // Screenshot slide-up entrance
        gsap.fromTo(
            phoneScreenRef.current,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out',
                overwrite: true,
            }
        );

        // Haptic vibration on the entire phone frame
        if (phoneFrameRef.current) {
            const tl = gsap.timeline({ overwrite: true });
            tl.to(phoneFrameRef.current, { x: -3, duration: 0.04, ease: 'power2.in' })
              .to(phoneFrameRef.current, { x: 3, duration: 0.05, ease: 'power2.inOut' })
              .to(phoneFrameRef.current, { x: -2, duration: 0.04, ease: 'power2.inOut' })
              .to(phoneFrameRef.current, { x: 2, duration: 0.04, ease: 'power2.inOut' })
              .to(phoneFrameRef.current, { x: -1, duration: 0.03, ease: 'power2.inOut' })
              .to(phoneFrameRef.current, { x: 0, duration: 0.06, ease: 'power3.out' });
        }
    }, { dependencies: [activeIndex] });

    /* ─── Click handler ─── */
    const handleSelect = useCallback((index: number) => {
        if (index === activeIndex) return;

        // Quick exit animation on the current image before swapping
        if (phoneScreenRef.current) {
            gsap.to(phoneScreenRef.current, {
                y: -20,
                opacity: 0,
                duration: 0.25,
                ease: 'power2.in',
                onComplete: () => {
                    setActiveIndex(index);
                },
            });
        } else {
            setActiveIndex(index);
        }
    }, [activeIndex]);

    const activeItem = data[activeIndex];

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#F2F2F2] overflow-hidden"
            style={{ paddingTop: 'clamp(5rem, 10vw, 9rem)', paddingBottom: 'clamp(5rem, 10vw, 9rem)' }}
        >
            {/* ── Organic Background Shapes (matching IntroSplitSection) ── */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Shape 1 — Top Right — Brand Primary expanded */}
                <div className="absolute -top-[30%] -right-[20%] w-[100vw] h-[100vw] max-w-[2000px] max-h-[2000px] bg-[#94C6F2]/40 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[200px]" />
                {/* Shape 2 — Bottom Left — Softer */}
                <div className="absolute -bottom-32 left-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[#94C6F2]/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[120px]" />
                {/* Shape 3 — Center accent */}
                <div className="absolute top-[30%] left-[40%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-[#94C6F2]/10 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">

                {/* ─── Section Header ─── */}
                <div className="chat-showcase-heading opacity-0 text-center mb-14 lg:mb-20 max-w-3xl mx-auto">
                    <span
                        className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-semibold bg-[#365571]/8 text-[#365571] ring-1 ring-[#365571]/12 mb-6"
                    >
                        Evidencia real
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141318] tracking-tight leading-[1.1]"
                        style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                    >
                        Lo que dicen{' '}
                        <span className="text-[#365571]">nuestros tesistas</span>
                    </h2>
                    <p
                        className="mt-5 text-base sm:text-lg text-[#141318]/50 max-w-[50ch] mx-auto leading-relaxed"
                        style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                        Conversaciones reales, resultados reales. Sin edición, sin filtros.
                    </p>
                </div>

                {/* ─── 50/50 Layout ─── */}
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

                    {/* ─── LEFT: Student List ─── */}
                    <div
                        ref={listItemsRef}
                        className="chat-student-list w-full lg:w-1/2 flex flex-col gap-3"
                    >
                        {data.map((item, i) => {
                            const isActive = i === activeIndex;
                            return (
                                <button
                                    key={item._id}
                                    onClick={() => handleSelect(i)}
                                    className={`
                                        chat-student-card opacity-0
                                        group relative w-full text-left
                                        rounded-2xl p-5 sm:p-6
                                        transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                                        cursor-pointer
                                        ${isActive
                                            ? 'bg-white ring-2 ring-[#96C1E9] shadow-[0_8px_30px_-12px_rgba(54,85,113,0.15)]'
                                            : 'bg-white/50 ring-1 ring-[#141318]/5 opacity-60 hover:opacity-90 hover:bg-white/80 hover:ring-[#141318]/10 hover:shadow-subtle'
                                        }
                                    `}
                                >
                                    {/* Active indicator bar */}
                                    <div
                                        className={`
                                            absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-full
                                            transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                                            ${isActive ? 'h-10 bg-[#96C1E9]' : 'h-0 bg-transparent'}
                                        `}
                                    />

                                    <div className="flex items-center gap-4">
                                        {/* Emoji Badge */}
                                        <div
                                            className={`
                                                flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl
                                                transition-all duration-500
                                                ${isActive
                                                    ? 'bg-[#96C1E9]/15 scale-110'
                                                    : 'bg-[#141318]/[0.03] group-hover:bg-[#96C1E9]/8'
                                                }
                                            `}
                                        >
                                            {item.emojiBadge}
                                        </div>

                                        {/* Text Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <h3
                                                    className={`
                                                        text-sm font-bold tracking-tight truncate
                                                        transition-colors duration-300
                                                        ${isActive ? 'text-[#141318]' : 'text-[#141318]/70'}
                                                    `}
                                                    style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                                                >
                                                    {item.studentName}
                                                </h3>
                                            </div>
                                            <p
                                                className="text-[11px] text-[#141318]/40 truncate mb-1.5"
                                                style={{ fontFamily: '"Inter", sans-serif' }}
                                            >
                                                {item.universityInfo}
                                            </p>
                                            <p
                                                className={`
                                                    text-xs font-semibold truncate
                                                    transition-colors duration-300
                                                    ${isActive ? 'text-[#365571]' : 'text-[#365571]/50'}
                                                `}
                                                style={{ fontFamily: '"Inter", sans-serif' }}
                                            >
                                                {item.highlightText}
                                            </p>
                                        </div>

                                        {/* Arrow indicator */}
                                        <div
                                            className={`
                                                flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                                                transition-all duration-500
                                                ${isActive
                                                    ? 'bg-[#96C1E9]/15 text-[#365571]'
                                                    : 'bg-transparent text-[#141318]/20 group-hover:text-[#141318]/40'
                                                }
                                            `}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* ─── RIGHT: iPhone Mockup (Sticky) ─── */}
                    <div className="phone-mockup-wrapper opacity-0 w-full lg:w-1/2 flex justify-center lg:sticky lg:top-24">
                        <div className="relative">
                            {/* ─── Ambient glow behind phone ─── */}
                            <div className="absolute -inset-10 rounded-[4rem] bg-gradient-to-br from-[#96C1E9]/20 via-[#365571]/10 to-[#BACE37]/10 blur-3xl opacity-60 pointer-events-none" />

                            {/* ─── Phone Frame ─── */}
                            <div
                                ref={phoneFrameRef}
                                className="
                                    relative z-10
                                    w-[280px] sm:w-[300px]
                                    rounded-[3rem]
                                    border-[8px] border-[#1a1a1f]
                                    bg-[#1a1a1f]
                                    shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.05)_inset]
                                    overflow-hidden
                                "
                            >
                                {/* ─── Dynamic Island ─── */}
                                <div className="absolute top-0 left-0 right-0 z-30 flex justify-center pt-3">
                                    <div className="w-[90px] h-[28px] bg-[#0a0a0a] rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]" />
                                </div>

                                {/* ─── Status Bar (time + icons) ─── */}
                                <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-7 pt-[14px]">
                                    <span
                                        className="text-[11px] font-semibold text-white/90"
                                        style={{ fontFamily: '"Inter", system-ui, sans-serif' }}
                                    >
                                        9:41
                                    </span>
                                    <div className="flex items-center gap-1">
                                        {/* Signal bars */}
                                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="text-white/80">
                                            <rect x="0" y="8" width="3" height="4" rx="0.5" fill="currentColor"/>
                                            <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" fill="currentColor"/>
                                            <rect x="9" y="3" width="3" height="9" rx="0.5" fill="currentColor"/>
                                            <rect x="13" y="0" width="3" height="12" rx="0.5" fill="currentColor"/>
                                        </svg>
                                        {/* WiFi */}
                                        <svg width="14" height="12" viewBox="0 0 14 12" fill="none" className="text-white/80">
                                            <path d="M7 10.5C7.82843 10.5 8.5 9.82843 8.5 9C8.5 8.17157 7.82843 7.5 7 7.5C6.17157 7.5 5.5 8.17157 5.5 9C5.5 9.82843 6.17157 10.5 7 10.5Z" fill="currentColor"/>
                                            <path d="M3.5 6.5C4.42 5.57 5.65 5 7 5C8.35 5 9.58 5.57 10.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                                            <path d="M1 4C2.6 2.4 4.7 1.5 7 1.5C9.3 1.5 11.4 2.4 13 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                                        </svg>
                                        {/* Battery */}
                                        <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="text-white/80">
                                            <rect x="0.5" y="1" width="20" height="10" rx="2" stroke="currentColor" strokeWidth="1"/>
                                            <rect x="21.5" y="3.5" width="2" height="5" rx="1" fill="currentColor" opacity="0.4"/>
                                            <rect x="2" y="2.5" width="17" height="7" rx="1" fill="currentColor"/>
                                        </svg>
                                    </div>
                                </div>

                                {/* ─── WhatsApp Header Bar ─── */}
                                <div className="relative z-20 bg-[#075E54] pt-12 pb-3 px-4 flex items-center gap-3">
                                    {/* Back arrow */}
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-white/90 flex-shrink-0">
                                        <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    {/* Avatar circle */}
                                    <div className="w-8 h-8 rounded-full bg-[#25D366]/30 flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm">{activeItem.emojiBadge}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p
                                            className="text-xs font-semibold text-white truncate"
                                            style={{ fontFamily: '"Inter", system-ui, sans-serif' }}
                                        >
                                            {activeItem.studentName}
                                        </p>
                                        <p className="text-[10px] text-white/60">en línea</p>
                                    </div>
                                </div>

                                {/* ─── Chat Screenshot Container ─── */}
                                <div
                                    ref={phoneScreenRef}
                                    className="relative w-full bg-[#ECE5DD]"
                                    style={{ aspectRatio: '9 / 16' }}
                                >
                                    {activeItem.chatScreenshot ? (
                                        <Image
                                            src={activeItem.chatScreenshot}
                                            alt={`Chat de WhatsApp con ${activeItem.studentName}`}
                                            fill
                                            className="object-cover object-top"
                                            sizes="(max-width: 640px) 280px, 300px"
                                            priority
                                        />
                                    ) : (
                                        /* Placeholder when no Sanity image uploaded yet */
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#ECE5DD] p-6">
                                            <div className="w-16 h-16 rounded-full bg-[#25D366]/15 flex items-center justify-center mb-4">
                                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-[#25D366]">
                                                    <path d="M14 2C7.373 2 2 7.373 2 14C2 16.386 2.706 18.614 3.94 20.5L2.5 25.5L7.7 24.1C9.51 25.21 11.68 25.88 14 25.88C20.627 25.88 26 20.507 26 13.88C26 7.373 20.627 2 14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M10 13H10.01M14 13H14.01M18 13H18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                </svg>
                                            </div>
                                            <p
                                                className="text-xs text-[#141318]/40 text-center leading-relaxed"
                                                style={{ fontFamily: '"Inter", sans-serif' }}
                                            >
                                                Sube capturas de chat desde Sanity Studio
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* ─── Bottom Home Indicator Bar ─── */}
                                <div className="relative z-20 bg-[#1a1a1f] py-2 flex justify-center">
                                    <div className="w-[100px] h-[4px] rounded-full bg-white/20" />
                                </div>
                            </div>

                            {/* ─── Phone reflective edge highlight ─── */}
                            <div className="absolute top-0 left-0 right-0 h-1/3 z-20 rounded-t-[3rem] bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
