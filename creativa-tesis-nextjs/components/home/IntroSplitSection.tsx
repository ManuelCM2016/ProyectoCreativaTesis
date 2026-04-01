'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoPlayerWidget from '@/components/shared/VideoPlayerWidget';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Platform = 'youtube' | 'facebook' | 'instagram';
type AspectRatio = '16:9' | '9:16' | '1:1';

interface VideoData {
    url: string;
    platform: Platform;
    aspectRatio: AspectRatio;
    thumbnail?: string;
}

interface IntroSplitData {
    eyebrow?: string;
    headlineRaw?: string;
    headlineHighlight?: string;
    headlineEnd?: string;
    paragraph1?: string;
    paragraph2?: string;
    ctaText?: string;
    ctaLink?: string;
    mediaType?: 'image' | 'video';
    imageUrl?: string;
    video?: VideoData;
}

interface IntroSplitSectionProps {
    /** Data opcional desde Sanity. Si no se provee, usa el contenido por defecto. */
    data?: IntroSplitData | null;
}

export default function IntroSplitSection({ data }: IntroSplitSectionProps = {}) {
    const sectionRef = useRef<HTMLElement>(null);

    // Si hay data de sanity, desestructuramos, sino usamos letings por defecto
    const isVideo = data?.mediaType === 'video' && data?.video;
    const mediaImage = data?.imageUrl || '/images/split-placeholder.jpg';

    useGSAP(() => {
        // ─── Media column: parallax zoom-in sólo cuando hay imagen (no video) ───
        if (!isVideo) {
            gsap.fromTo(
                '.intro-media-img',
                { scale: 1.15 },
                {
                    scale: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.intro-media-wrapper',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 0.6,
                    },
                }
            );
        }

        // ─── Media wrapper: reveal clip-path desde el centro ───
        gsap.fromTo(
            '.intro-media-wrapper',
            { clipPath: 'inset(12% 12% 12% 12% round 1.5rem)' },
            {
                clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.intro-media-wrapper',
                    start: 'top 85%',
                    end: 'top 35%',
                    scrub: 0.8,
                },
            }
        );

        // ─── Content column: staggered fade-up ───
        const contentElements = gsap.utils.toArray<HTMLElement>('.intro-content-item');
        contentElements.forEach((el, i) => {
            gsap.fromTo(
                el,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 88%',
                        toggleActions: 'play none none none',
                        once: true,
                    },
                }
            );
        });

        // ─── BACKGROUND ORGANIC PARALLAX EFFECTS ───
        const shapes = gsap.utils.toArray<HTMLElement>('.organic-shape');

        // Endless subtle float animation
        shapes.forEach((shape, i) => {
            gsap.to(shape, {
                y: i % 2 === 0 ? '-=25' : '+=25',
                x: i % 2 === 0 ? '+=15' : '-=15',
                rotation: i % 2 === 0 ? '+=45' : '-=45',
                duration: 4 + i,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1
            });
        });

        // Mouse tracking parallax for the shapes
        const xTargets = shapes.map(s => gsap.quickTo(s, "x", { duration: 1.2, ease: "power3.out" }));
        const yTargets = shapes.map(s => gsap.quickTo(s, "y", { duration: 1.2, ease: "power3.out" }));

        const handleMouseMove = (e: MouseEvent) => {
            const xOffset = (e.clientX / window.innerWidth - 0.5) * 60; // Max move 30px
            const yOffset = (e.clientY / window.innerHeight - 0.5) * 60; // Max move 30px

            xTargets.forEach((xTo, i) => xTo(i % 2 === 0 ? -xOffset : xOffset * 1.5));
            yTargets.forEach((yTo, i) => yTo(i % 2 === 0 ? -yOffset : yOffset * 1.5));
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => window.removeEventListener('mousemove', handleMouseMove);

    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#F2F2F2] overflow-hidden"
            style={{ paddingTop: 'clamp(5rem, 10vw, 10rem)', paddingBottom: 'clamp(5rem, 10vw, 10rem)' }}
        >
            {/* ── Organic Background Shapes para TODA la sección ── */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden origin-center">
                {/* Shape 1 - Top Right - Brand Primary (#94C6F2) expandido hasta la mitad */}
                <div className="organic-shape absolute -top-[30%] -right-[20%] w-[100vw] h-[100vw] max-w-[2000px] max-h-[2000px] bg-[#94C6F2]/40 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[200px] will-change-transform" />
                {/* Shape 2 - Bottom Left - Darker Blue */}
                <div className="organic-shape absolute -bottom-32 left-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[#94C6F2]/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[120px] will-change-transform" />
                {/* Shape 3 - Center - Accent Greenish */}
                <div className="organic-shape absolute top-[30%] left-[40%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-[#94C6F2]/10 rounded-full blur-[80px] transform -translate-y-1/2 -translate-x-1/2 will-change-transform" />
            </div>

            {/* ─── Main Grid: 50/50 Split ─── */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-20 items-center">

                    {/* ═══════ Column 1 — Media ═══════ */}
                    <div className="intro-media-wrapper order-2 lg:order-1 relative">
                        {isVideo ? (
                            /* ── Video desde Sanity ── */
                            <div className="relative z-10 rounded-[2rem] bg-white/40 backdrop-blur-xl p-2 ring-1 ring-white/60 shadow-[0_20px_40px_-20px_rgba(54,85,113,0.2)] overflow-hidden">
                                <VideoPlayerWidget
                                    url={data.video!.url}
                                    platform={data.video!.platform}
                                    aspectRatio={data.video!.aspectRatio}
                                    title={data.headlineRaw || "Video de Creativa Tesis"}
                                    thumbnail={data.video!.thumbnail}
                                    className="rounded-[calc(2rem-0.375rem)]"
                                />
                            </div>
                        ) : (
                            /* ── Imagen estática por defecto ── */
                            <div className="relative z-10 rounded-[2rem] bg-white/40 backdrop-blur-xl p-2 ring-1 ring-white/60 shadow-[0_20px_40px_-20px_rgba(54,85,113,0.2)]">
                                <div
                                    className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] bg-[#365571]/10"
                                    style={{ height: 'clamp(400px, 50vw, 620px)' }}
                                >
                                    <Image
                                        src={mediaImage}
                                        alt={data?.headlineRaw || "Equipo de asesores de Creativa Tesis"}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="intro-media-img object-cover will-change-transform"
                                        priority={false}
                                    />
                                    <div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{
                                            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -40px 60px -20px rgba(20,19,24,0.15)',
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ═══════ Column 2 — Content ═══════ */}
                    <div className="order-1 lg:order-2 flex flex-col justify-center lg:pl-4 xl:pl-8">

                        {/* Eyebrow badge */}
                        <div className="intro-content-item opacity-0 mb-8">
                            <span
                                className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-semibold bg-[#BACE37]/15 text-[#365571] ring-1 ring-[#BACE37]/25"
                            >
                                {data?.eyebrow || 'Nuestra Metodología'}
                            </span>
                        </div>

                        {/* Headline */}
                        <h2
                            className="intro-content-item opacity-0 text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl font-bold text-[#141318] tracking-tight leading-[1.1] mb-6"
                            style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                        >
                            {data?.headlineRaw || 'Un enfoque que'}{' '}
                            <span className="text-[#365571]">{data?.headlineHighlight || 'transforma'}</span>{' '}
                            {data?.headlineEnd || 'tu investigación'}
                        </h2>

                        {/* Decorative accent line */}
                        <div className="intro-content-item opacity-0 w-16 h-[3px] bg-[#BACE37] rounded-full mb-8" />

                        {/* Paragraph 1 */}
                        {data?.paragraph1 ? (
                            <p
                                className="intro-content-item opacity-0 text-base lg:text-lg text-[#141318]/60 leading-relaxed mb-5 max-w-[52ch]"
                                style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}
                            >
                                {data.paragraph1}
                            </p>
                        ) : (
                            <p
                                className="intro-content-item opacity-0 text-base lg:text-lg text-[#141318]/60 leading-relaxed mb-5 max-w-[52ch]"
                                style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}
                            >
                                En Creativa Tesis, no creemos en fórmulas genéricas. Cada proyecto
                                de investigación es único, y nuestra metodología se adapta a tu
                                campo, tu ritmo y tus objetivos académicos.
                            </p>
                        )}

                        {/* Paragraph 2 */}
                        {data?.paragraph2 ? (
                            <p
                                className="intro-content-item opacity-0 text-base lg:text-lg text-[#141318]/50 leading-relaxed mb-10 max-w-[52ch]"
                                style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}
                            >
                                {data.paragraph2}
                            </p>
                        ) : (
                            <p
                                className="intro-content-item opacity-0 text-base lg:text-lg text-[#141318]/50 leading-relaxed mb-10 max-w-[52ch]"
                                style={{ fontFamily: '"Inter", "Questrial", sans-serif' }}
                            >
                                Desde la delimitación del tema hasta la defensa final, te
                                acompañamos con asesoría personalizada, herramientas
                                especializadas y un equipo comprometido con tu éxito.
                            </p>
                        )}

                        {/* CTA — Outline button with trailing arrow icon */}
                        <div className="intro-content-item opacity-0">
                            <Link
                                href={data?.ctaLink || "/creativa-tesis/quienes-somos"}
                                className="group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold text-[#365571] ring-1 ring-[#365571]/20 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-[#365571]/50 hover:bg-[#365571]/5 active:scale-[0.98]"
                            >
                                {data?.ctaText || "Conoce nuestro proceso"}
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#365571]/8 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105 group-hover:bg-[#BACE37]/20">
                                    <span className="material-symbols-outlined text-base text-[#365571]">arrow_forward</span>
                                </span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
