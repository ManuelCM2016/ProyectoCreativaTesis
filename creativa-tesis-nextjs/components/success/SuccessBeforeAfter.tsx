'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function SuccessBeforeAfter() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Line growth animation
        gsap.fromTo(
            '.timeline-line-fill',
            { scaleY: 0 },
            {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.timeline-container',
                    start: 'top 60%',
                    end: 'bottom 60%',
                    scrub: true,
                }
            }
        );

        // Nodes entrance
        const nodes = gsap.utils.toArray<HTMLElement>('.timeline-node');
        nodes.forEach((node, i) => {
            gsap.fromTo(
                node,
                { scale: 0, opacity: 0 },
                {
                    scale: 1, 
                    opacity: 1,
                    duration: 0.6,
                    ease: 'back.out(1.5)',
                    scrollTrigger: {
                        trigger: node,
                        start: 'top 75%',
                    }
                }
            );
        });

        // Cards entrance
        const cards = gsap.utils.toArray<HTMLElement>('.timeline-card');
        cards.forEach((card, i) => {
            gsap.fromTo(
                card,
                { x: i % 2 === 0 ? 50 : -50, opacity: 0 },
                {
                    x: 0, 
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                    }
                }
            );
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative bg-[#F2F2F2] py-24 sm:py-32 overflow-hidden">
            {/* ── Organic Background Shapes ── */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Soft mesh background combined with shapes */}
                <div className="absolute inset-0 opacity-[0.25] pointer-events-none mix-blend-multiply" 
                     style={{ backgroundImage: 'radial-gradient(#365571 0.8px, transparent 1px)', backgroundSize: '32px 32px' }} />
                
                {/* Shape 1 — Top Right — Brand Primary expanded */}
                <div className="absolute -top-[30%] -right-[20%] w-[100vw] h-[100vw] max-w-[2000px] max-h-[2000px] bg-[#94C6F2]/40 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[200px]" />
                {/* Shape 2 — Bottom Left — Softer */}
                <div className="absolute -bottom-32 left-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[#94C6F2]/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-[120px]" />
                {/* Shape 3 — Center accent */}
                <div className="absolute top-[30%] left-[40%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-[#94C6F2]/10 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2" />
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                
                <div className="text-center max-w-2xl mx-auto mb-20 lg:mb-32">
                    <span className="inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-bold bg-[#365571]/10 text-[#365571] ring-1 ring-[#365571]/20 mb-6">
                        El Efecto Creativa Tesis
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#141318] tracking-tight leading-[1.1] mb-6" style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}>
                        De la incertidumbre a la <span className="text-[#365571]">celebración.</span>
                    </h2>
                    <p className="text-base sm:text-lg text-[#141318]/60 leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>
                        Sabemos exactamente cómo te sientes antes de empezar. Mira cómo cambia la historia de nuestros tesistas tras unirse a nuestro programa.
                    </p>
                </div>

                {/* Vertical Timeline */}
                <div className="timeline-container relative w-full max-w-4xl mx-auto flex flex-col items-center">
                    
                    {/* The central line */}
                    <div className="absolute top-0 bottom-0 left-[24px] md:left-1/2 md:-translate-x-1/2 w-[2px] bg-[#141318]/10" />
                    
                    {/* The filled line (grows on scroll) */}
                    <div className="timeline-line-fill absolute top-0 bottom-0 left-[24px] md:left-1/2 md:-translate-x-1/2 w-[2px] bg-gradient-to-b from-[#365571] via-[#94C6F2] to-[#BACE37] origin-top" />

                    {/* BEFORE ITEM */}
                    <div className="relative flex flex-col md:flex-row items-center justify-between w-full mb-20 group">
                        {/* Node */}
                        <div className="timeline-node absolute left-[24px] md:left-1/2 -ml-[24px] md:-translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-[#141318]/10 flex items-center justify-center shadow-lg z-10 transition-colors group-hover:border-[#365571]">
                            <span className="material-symbols-outlined text-[#141318]/40 group-hover:text-[#365571]">mood_bad</span>
                        </div>

                        {/* LEFT Spacer (Desktop only) */}
                        <div className="hidden md:block w-5/12" />

                        {/* RIGHT Content */}
                        <div className="timeline-card w-full pl-20 md:pl-0 md:w-5/12 flex flex-col justify-center">
                            <span className="text-[10px] font-bold tracking-widest text-[#141318]/40 uppercase mb-2">ANTES DE NOSOTROS</span>
                            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] ring-1 ring-[#141318]/5">
                                <h3 className="text-xl font-bold text-[#141318] mb-4" style={{ fontFamily: '"Questrial", sans-serif' }}>Dudas y estancamiento</h3>
                                <ul className="space-y-3">
                                    <li className="flex gap-3 text-sm text-[#141318]/60"><span className="text-[#365571]/50 font-bold">×</span> Meses sin avanzar ni una página de la tesis.</li>
                                    <li className="flex gap-3 text-sm text-[#141318]/60"><span className="text-[#365571]/50 font-bold">×</span> Observaciones constantes y ambiguas del asesor.</li>
                                    <li className="flex gap-3 text-sm text-[#141318]/60"><span className="text-[#365571]/50 font-bold">×</span> Terror a las preguntas rebuscadas del jurado.</li>
                                    <li className="flex gap-3 text-sm text-[#141318]/60"><span className="text-[#365571]/50 font-bold">×</span> Sentimiento de querer abandonar la titulación.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* PROCESS ITEM */}
                    <div className="relative flex flex-col md:flex-row items-center justify-between w-full mb-20 group">
                        {/* Node */}
                        <div className="timeline-node absolute left-[24px] md:left-1/2 -ml-[24px] md:-translate-x-1/2 w-12 h-12 rounded-full bg-[#365571] border-4 border-white flex items-center justify-center shadow-xl z-10 ring-2 ring-[#365571]/20">
                            <span className="material-symbols-outlined text-white text-[20px]">psychology</span>
                        </div>

                        {/* LEFT Content (swapped order on Desktop) */}
                        <div className="timeline-card w-full pl-20 md:pl-0 md:w-5/12 flex flex-col justify-center md:items-end md:text-right">
                            <span className="text-[10px] font-bold tracking-widest text-[#365571]/60 uppercase mb-2">DURANTE EL PROCESO</span>
                            <div className="bg-[#365571] rounded-3xl p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(54,85,113,0.3)] ring-1 ring-white/10 w-full text-left md:text-right">
                                <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: '"Questrial", sans-serif' }}>Acompañamiento Estratégico</h3>
                                <ul className="space-y-3">
                                    <li className="flex gap-3 md:flex-row-reverse text-sm text-white/80"><span className="text-[#94C6F2] font-bold">✓</span> Evaluamos tu tema y lo re-enfocamos rápidamente.</li>
                                    <li className="flex gap-3 md:flex-row-reverse text-sm text-white/80"><span className="text-[#94C6F2] font-bold">✓</span> Encontramos los artículos indexados que necesitas.</li>
                                    <li className="flex gap-3 md:flex-row-reverse text-sm text-white/80"><span className="text-[#94C6F2] font-bold">✓</span> Te ayudamos a recolectar y procesar datos.</li>
                                    <li className="flex gap-3 md:flex-row-reverse text-sm text-white/80"><span className="text-[#94C6F2] font-bold">✓</span> Simulaciones en vivo de preguntas de jurado.</li>
                                </ul>
                            </div>
                        </div>

                        {/* RIGHT Spacer (Desktop only) */}
                        <div className="hidden md:block w-5/12" />
                    </div>

                    {/* AFTER ITEM */}
                    <div className="relative flex flex-col md:flex-row items-center justify-between w-full group">
                        {/* Node */}
                        <div className="timeline-node absolute left-[24px] md:left-1/2 -ml-[24px] md:-translate-x-1/2 w-12 h-12 rounded-full bg-[#BACE37] border-4 border-white flex items-center justify-center shadow-[0_0_20px_rgba(186,206,55,0.4)] z-10">
                            <span className="material-symbols-outlined text-[#141318] text-[20px]">workspace_premium</span>
                        </div>

                        {/* LEFT Spacer (Desktop only) */}
                        <div className="hidden md:block w-5/12" />

                        {/* RIGHT Content */}
                        <div className="timeline-card w-full pl-20 md:pl-0 md:w-5/12 flex flex-col justify-center">
                            <span className="text-[10px] font-bold tracking-widest text-[#BACE37] uppercase mb-2">EL RESULTADO FINAL</span>
                            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_-15px_rgba(186,206,55,0.15)] ring-1 ring-[#BACE37]/30 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#BACE37]/10 rounded-bl-full pointer-events-none" />
                                <h3 className="text-xl font-bold text-[#141318] mb-4 relative z-10" style={{ fontFamily: '"Questrial", sans-serif' }}>Tesis Aprobada al 100%</h3>
                                <ul className="space-y-3 relative z-10">
                                    <li className="flex gap-3 text-sm text-[#141318]/70 font-medium"><span className="text-[#BACE37] font-bold">★</span> Manejo impecable de la teoría frente al jurado.</li>
                                    <li className="flex gap-3 text-sm text-[#141318]/70 font-medium"><span className="text-[#BACE37] font-bold">★</span> Firma del acta de sustentación sin observaciones.</li>
                                    <li className="flex gap-3 text-sm text-[#141318]/70 font-medium"><span className="text-[#BACE37] font-bold">★</span> Tesis empastada e ingresada a repositorio.</li>
                                    <li className="flex gap-3 text-sm text-[#141318]/70 font-bold text-[#365571]"><span className="text-[#BACE37] font-bold">★</span> ¡Por fin tienes tu Título Profesional!</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
