'use client';

import { useRef, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─── Types ─── */
interface Certification {
    _id: string;
    name: string;
    fullName: string;
    logo: string;
    category: string;
    url?: string;
}

interface CertificationsSectionProps {
    certifications: Certification[];
}

/* ─── Fallback data (renders when Sanity has no entries yet) ─── */
const fallbackCertifications: Certification[] = [
    { _id: 'f-1', name: 'UNMSM', fullName: 'Universidad Nacional Mayor de San Marcos', logo: '', category: 'universidad' },
    { _id: 'f-2', name: 'PUCP', fullName: 'Pontificia Universidad Católica del Perú', logo: '', category: 'universidad' },
    { _id: 'f-3', name: 'U. Pacífico', fullName: 'Universidad del Pacífico', logo: '', category: 'universidad' },
    { _id: 'f-4', name: 'U. de Lima', fullName: 'Universidad de Lima', logo: '', category: 'universidad' },
    { _id: 'f-5', name: 'CONCYTEC', fullName: 'CONCYTEC', logo: '', category: 'institucion' },
    { _id: 'f-6', name: 'SPSS', fullName: 'SPSS Statistics', logo: '', category: 'software' },
    { _id: 'f-7', name: 'Mendeley', fullName: 'Mendeley', logo: '', category: 'software' },
    { _id: 'f-8', name: 'Turnitin', fullName: 'Turnitin', logo: '', category: 'software' },
];

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
    const data = certifications && certifications.length > 0 ? certifications : fallbackCertifications;

    const sectionRef = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    /* Triplicate array for seamless infinite loop */
    const duplicated = [...data, ...data, ...data];

    useGSAP(() => {
        if (!sectionRef.current) return;

        // ─── Heading fade-up ───
        gsap.fromTo(
            '.cert-heading',
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.cert-heading',
                    start: 'top 90%',
                    once: true,
                },
            }
        );

        // ─── Marquee track fade-in ───
        gsap.fromTo(
            '.cert-marquee-wrapper',
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.cert-marquee-wrapper',
                    start: 'top 92%',
                    once: true,
                },
            }
        );

        // ─── Infinite marquee loop ───
        if (marqueeRef.current) {
            const totalWidth = marqueeRef.current.scrollWidth / 3;

            tweenRef.current = gsap.to(marqueeRef.current, {
                x: -totalWidth,
                duration: 35,
                ease: 'none',
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize((x: number) => {
                        return x % totalWidth;
                    }),
                },
            });
        }

        // ─── Disclaimer fade ───
        gsap.fromTo(
            '.cert-disclaimer',
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.6,
                delay: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.cert-disclaimer',
                    start: 'top 95%',
                    once: true,
                },
            }
        );
    }, { scope: sectionRef });

    /* ─── Pause/resume marquee on hover ─── */
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
            className="relative bg-white overflow-hidden"
            style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}
            id="certificaciones"
        >
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                {/* ─── Heading ─── */}
                <div className="cert-heading opacity-0 text-center mb-10 lg:mb-12">
                    <p
                        className="text-xs uppercase tracking-[0.25em] font-semibold text-[#141318]/30 mb-2"
                        style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                        Respaldados por
                    </p>
                    <h3
                        className="text-lg sm:text-xl font-bold text-[#141318]/70 tracking-tight"
                        style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                    >
                        Instituciones de Prestigio
                    </h3>
                </div>
            </div>

            {/* ─── Marquee — Full-bleed ─── */}
            <div
                className="cert-marquee-wrapper opacity-0 relative w-full"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 lg:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 lg:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Scrolling track */}
                <div
                    ref={marqueeRef}
                    className="flex items-center gap-12 sm:gap-16 lg:gap-20 w-max will-change-transform"
                    style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
                >
                    {duplicated.map((cert, i) => (
                        <div
                            key={`${cert._id}-${i}`}
                            className="flex-shrink-0 group cursor-default"
                            title={cert.fullName}
                        >
                            {cert.logo ? (
                                <div className="relative h-16 sm:h-18 w-auto grayscale opacity-40 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110">
                                    <Image
                                        src={cert.logo}
                                        alt={cert.fullName}
                                        width={280}
                                        height={72}
                                        className="h-full w-auto object-contain"
                                        sizes="280px"
                                    />
                                </div>
                            ) : (
                                /* Text fallback when no logo uploaded */
                                <span
                                    className="text-base sm:text-lg font-bold uppercase tracking-[0.15em] text-[#141318]/20 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:text-[#365571]/60 group-hover:scale-105 whitespace-nowrap select-none"
                                    style={{ fontFamily: '"Inter", sans-serif' }}
                                >
                                    {cert.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── Disclaimer ─── */}
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
                <p
                    className="cert-disclaimer opacity-0 text-center text-[10px] text-[#141318]/25 mt-8 lg:mt-10"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                >
                    * Colaboramos con estudiantes de estas instituciones. No implica endorsement oficial.
                </p>
            </div>
        </section>
    );
}
