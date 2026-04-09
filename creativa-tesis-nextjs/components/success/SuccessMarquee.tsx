'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ── Types ── */
interface ThesisCover {
    _id: string;
    title: string;
    fullTitle?: string;
    studentName?: string;
    university: string;
    universityFull?: string;
    career?: string;
    year?: string;
    coverColor: string;
    accentColor?: string;
    coverImage?: string;
}

/* ── Fallback data (used when no Sanity data) ── */
const FALLBACK_THESES: ThesisCover[] = [
    { _id: '1', title: 'Estrés Laboral', university: 'UAP', coverColor: '#141318', accentColor: 'rgba(255,255,255,0.2)' },
    { _id: '2', title: 'Gestión Pública', university: 'UNJBG', coverColor: '#14532d', accentColor: '#4ade80' },
    { _id: '3', title: 'Inteligencia Emocional', university: 'UPT', coverColor: '#581c87', accentColor: '#c084fc' },
    { _id: '4', title: 'Diseño Sísmico', university: 'UNJBG', coverColor: '#365571', accentColor: '#BACE37' },
    { _id: '5', title: 'Auditoría Interna', university: 'UNJBG', coverColor: '#475569', accentColor: '#94C6F2' },
    { _id: '6', title: 'Prisión Preventiva', university: 'UPT', coverColor: '#7f1d1d', accentColor: '#fbbf24' },
];

/* ═══════════════════════════════════════════════════════════════
   Modal Component
   ═══════════════════════════════════════════════════════════════ */
function ThesisModal({
    thesis,
    onClose,
}: {
    thesis: ThesisCover | null;
    onClose: () => void;
}) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!thesis) return;

        // Entrance animation
        gsap.fromTo(overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
        gsap.fromTo(contentRef.current,
            { y: 40, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 }
        );

        // Escape key handler
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [thesis, onClose]);

    if (!thesis) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) onClose();
    };

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
            style={{ background: 'rgba(20,19,24,0.75)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            onClick={handleOverlayClick}
        >
            <div
                ref={contentRef}
                className="relative w-full max-w-lg rounded-[2rem] overflow-hidden"
                style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
                }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 hover:bg-white/10"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>

                {/* Top: Book cover mini */}
                <div className="flex justify-center pt-10 pb-6">
                    <div
                        className="w-[140px] h-[200px] rounded-r-xl rounded-l flex flex-col justify-between p-4 relative overflow-hidden"
                        style={{
                            background: thesis.coverColor,
                            borderLeft: `6px solid ${thesis.accentColor || '#94C6F2'}`,
                            boxShadow: `15px 15px 40px -10px rgba(0,0,0,0.4)`,
                        }}
                    >
                        <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                        <div className="text-center mt-2 relative z-10">
                            <span className="block text-white/50 text-[8px] font-bold tracking-[0.2em] mb-3">TESIS</span>
                            <h3 className="text-white font-serif font-bold text-xs leading-tight uppercase tracking-wide">
                                &ldquo;{thesis.title}&rdquo;
                            </h3>
                        </div>
                        <div className="flex flex-col items-center relative z-10">
                            <div className="w-6 h-[1.5px] bg-white/25 mb-2" />
                            <span className="text-white font-bold text-sm tracking-widest">{thesis.university}</span>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="px-8 pb-10 space-y-4">
                    <h3
                        className="text-xl font-bold text-white text-center"
                        style={{ fontFamily: '"Questrial", sans-serif' }}
                    >
                        &ldquo;{thesis.fullTitle || thesis.title}&rdquo;
                    </h3>

                    <div className="space-y-3 pt-2">
                        {thesis.universityFull && (
                            <DetailRow label="Universidad" value={thesis.universityFull} />
                        )}
                        {!thesis.universityFull && (
                            <DetailRow label="Universidad" value={thesis.university} />
                        )}
                        {thesis.career && <DetailRow label="Carrera" value={thesis.career} />}
                        {thesis.year && <DetailRow label="Año" value={thesis.year} />}
                        {thesis.studentName && <DetailRow label="Tesista" value={thesis.studentName} />}
                    </div>

                    {thesis.coverImage && (
                        <div className="mt-6 rounded-xl overflow-hidden border border-white/10 relative aspect-[4/3]">
                            <Image
                                src={thesis.coverImage}
                                alt={`Tesis de ${thesis.title}`}
                                fill
                                className="object-cover"
                                sizes="500px"
                            />
                        </div>
                    )}

                    {/* CTA */}
                    <div className="pt-4 flex justify-center">
                        <a
                            href="https://wa.me/51918677900"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-[0.97]"
                            style={{
                                background: 'linear-gradient(135deg, #95C2E9, #7BB0DC)',
                                color: '#141318',
                                boxShadow: '0 6px 20px rgba(149,194,233,0.3)',
                            }}
                        >
                            Consultar servicio similar
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-start gap-3 text-sm">
            <span className="text-white/35 font-medium w-24 flex-shrink-0" style={{ fontFamily: '"Inter", sans-serif' }}>{label}</span>
            <span className="text-white/80 font-semibold" style={{ fontFamily: '"Questrial", sans-serif' }}>{value}</span>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   Main SuccessMarquee
   ═══════════════════════════════════════════════════════════════ */
export default function SuccessMarquee({ theses }: { theses?: ThesisCover[] }) {
    const sectionRef = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [selectedThesis, setSelectedThesis] = useState<ThesisCover | null>(null);

    const handleClose = useCallback(() => setSelectedThesis(null), []);

    const data = theses && theses.length > 0 ? theses : FALLBACK_THESES;

    useGSAP(() => {
        // Simple entrance
        gsap.fromTo(
            '.marquee-header',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            }
        );

        // Infinite marquee
        if (marqueeRef.current) {
            const track = marqueeRef.current.querySelector('.marquee-track');
            gsap.to(track, {
                xPercent: -50,
                ease: 'none',
                duration: 30,
                repeat: -1,
            });
        }
    }, { scope: sectionRef });

    // Render array twice for seamless looping
    const displayTheses = [...data, ...data];

    return (
        <>
            <section ref={sectionRef} className="py-20 sm:py-24 overflow-hidden bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 text-center">
                    <h2 className="marquee-header text-2xl sm:text-3xl md:text-4xl font-bold text-[#141318] tracking-tight" style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}>
                        De la idea a la <span className="text-[#365571]">impresión final</span>
                    </h2>
                    <p className="marquee-header text-[#141318]/50 mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-wider">
                        Tesis empastadas y aprobadas en distintas universidades
                    </p>
                </div>

                {/* Marquee Container */}
                <div ref={marqueeRef} className="w-full relative py-4 sm:py-8">
                    {/* Fade edges */}
                    <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 md:w-40 bg-gradient-to-r from-white to-transparent z-10" />
                    <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 md:w-40 bg-gradient-to-l from-white to-transparent z-10" />

                    <div className="marquee-track flex gap-4 sm:gap-6 md:gap-10 w-max pr-4 sm:pr-10">
                        {displayTheses.map((thesis, i) => (
                            <button
                                key={`${thesis._id}-${i}`}
                                onClick={() => setSelectedThesis(thesis)}
                                className="relative shrink-0 w-[140px] h-[200px] sm:w-[200px] sm:h-[280px] md:w-[240px] md:h-[340px] 
                                    rounded-r-2xl rounded-l-md overflow-hidden flex flex-col justify-between p-4 sm:p-6 text-left
                                    transform transition-all duration-500 hover:scale-[1.05] hover:-translate-y-2 cursor-pointer
                                    focus:outline-none focus:ring-2 focus:ring-[#95C2E9] focus:ring-offset-2 focus:ring-offset-white"
                                style={{
                                    background: thesis.coverColor,
                                    borderLeft: `6px solid ${thesis.accentColor || '#94C6F2'}`,
                                    borderTop: '1px solid rgba(0,0,0,0.2)',
                                    borderRight: '1px solid rgba(0,0,0,0.2)',
                                    borderBottom: '1px solid rgba(0,0,0,0.2)',
                                    boxShadow: '15px 15px 40px -10px rgba(0,0,0,0.3)',
                                }}
                            >
                                {/* Inner spine shadow */}
                                <div className="absolute top-0 bottom-0 left-0 w-4 sm:w-6 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />

                                {/* Book cover content */}
                                <div className="text-center mt-2 sm:mt-4 relative z-10">
                                    <span className="block text-white/50 text-[8px] sm:text-[10px] font-bold tracking-[0.2em] mb-2 sm:mb-4">TESIS</span>
                                    <h3 className="text-white font-serif font-bold text-[11px] sm:text-sm md:text-base leading-snug uppercase tracking-wide px-1 sm:px-2">
                                        &ldquo;{thesis.title}&rdquo;
                                    </h3>
                                </div>

                                <div className="flex flex-col items-center relative z-10">
                                    <div className="w-6 sm:w-8 h-[2px] bg-white/30 mb-2 sm:mb-4" />
                                    <span className="text-white font-bold text-xs sm:text-base md:text-lg tracking-widest">{thesis.university}</span>
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                                    <span className="bg-white/90 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold text-[#141318] shadow-lg">
                                        Ver detalles
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            <ThesisModal thesis={selectedThesis} onClose={handleClose} />
        </>
    );
}
