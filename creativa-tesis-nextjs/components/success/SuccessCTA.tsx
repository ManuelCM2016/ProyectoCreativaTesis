'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function SuccessCTA() {
    const ctaRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.fromTo(
            '.success-cta-item',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: 'top 80%',
                }
            }
        );

        // Slow scale loop for background blob
        gsap.to('.cta-blob', {
            scale: 1.1,
            rotation: 10,
            duration: 5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        });

    }, { scope: ctaRef });

    return (
        <section ref={ctaRef} className="relative py-24 sm:py-32 overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="relative rounded-[3rem] bg-[#365571] overflow-hidden p-8 sm:p-16 lg:p-24 shadow-2xl">
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E3D55] via-[#365571] to-[#4A7399] z-0" />
                    <div className="absolute inset-0 bg-black/20 z-0" />

                    {/* Ambient blob */}
                    <div className="cta-blob absolute top-0 -right-20 w-[400px] h-[400px] bg-[#BACE37]/30 rounded-full blur-[100px] z-0 pointer-events-none" />
                    
                    {/* Content */}
                    <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
                        
                        <div className="w-full lg:w-3/5 text-center lg:text-left">
                            <span className="success-cta-item inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-bold bg-[#94C6F2]/10 text-white/80 ring-1 ring-white/15 mb-6 backdrop-blur-sm">
                                Tu turno ha llegado
                            </span>
                            <h2 className="success-cta-item text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05] mb-6" style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}>
                                ¿Serás nuestro próximo <span className="text-[#BACE37]">caso de éxito?</span>
                            </h2>
                            <p className="success-cta-item text-white/70 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium" style={{ fontFamily: '"Inter", sans-serif' }}>
                                Deja de posponer tu sustentación. Contáctanos hoy para una evaluación inicial de tu proyecto y demos el primer paso hacia tu título profesional.
                            </p>
                        </div>

                        <div className="w-full lg:w-2/5 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-4">
                            <Link 
                                href="/contacto"
                                className="success-cta-item w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold bg-[#BACE37] text-[#141318] hover:bg-white transition-colors duration-300 shadow-[0_20px_40px_-15px_rgba(186,206,55,0.4)]"
                                style={{ fontFamily: '"Inter", sans-serif' }}
                            >
                                Iniciar Asesoría
                                <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                            </Link>

                            <a 
                                href="https://wa.me/51918677900" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="success-cta-item w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold bg-white/5 text-white ring-1 ring-white/20 hover:bg-white/10 transition-colors duration-300 backdrop-blur-md"
                                style={{ fontFamily: '"Inter", sans-serif' }}
                            >
                                WhatsApp Directo
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
