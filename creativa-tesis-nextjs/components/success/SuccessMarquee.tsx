'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Mock data for thesis bound books
const physicalTheses = [
    { id: 1, title: 'Auditoría Interna', uni: 'UNJBG', color: 'bg-[#365571]', accent: 'border-[#94C6F2]' },
    { id: 2, title: 'Prisión Preventiva', uni: 'UPT', color: 'bg-red-800', accent: 'border-yellow-500' },
    { id: 3, title: 'Estrés Laboral', uni: 'UAP', color: 'bg-[#141318]', accent: 'border-white/20' },
    { id: 4, title: 'Gestión Pública', uni: 'UNJBG', color: 'bg-green-900', accent: 'border-green-400' },
    { id: 5, title: 'Inteligencia Emocional', uni: 'UPT', color: 'bg-purple-900', accent: 'border-purple-300' },
    { id: 6, title: 'Diseño Sísmico', uni: 'UNJBG', color: 'bg-[#365571]', accent: 'border-[#BACE37]' },
];

export default function SuccessMarquee() {
    const sectionRef = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

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

        // Infinite marquee animation using GSAP
        if (marqueeRef.current) {
            const track = marqueeRef.current.querySelector('.marquee-track');
            
            // Clone the items so it loops seamlessly. 
            // In React we can just render the array twice, which I'll do in the JSX.
            
            // Calculate total width to animate
            gsap.to(track, {
                xPercent: -50,
                ease: 'none',
                duration: 25,
                repeat: -1,
            });
        }
    }, { scope: sectionRef });

    // We render the array twice to ensure seamless looping
    const displayTheses = [...physicalTheses, ...physicalTheses];

    return (
        <section ref={sectionRef} className="py-24 overflow-hidden bg-white relative">
            
            <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 text-center">
                <h2 className="marquee-header text-3xl sm:text-4xl font-bold text-[#141318] tracking-tight" style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}>
                    De la idea a la <span className="text-[#365571]">impresión final</span>
                </h2>
                <p className="marquee-header text-[#141318]/50 mt-4 text-sm sm:text-base font-medium uppercase tracking-wider">Tesis empastadas y aprobadas en distintas universidades</p>
            </div>

            {/* Marquee Container */}
            <div ref={marqueeRef} className="w-full relative py-8">
                {/* Fade edges */}
                <div className="absolute top-0 bottom-0 left-0 w-16 md:w-40 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute top-0 bottom-0 right-0 w-16 md:w-40 bg-gradient-to-l from-white to-transparent z-10" />
                
                <div className="marquee-track flex gap-6 sm:gap-10 w-max pr-6 sm:pr-10">
                    {displayTheses.map((thesis, i) => (
                        <div 
                            key={`${thesis.id}-${i}`}
                            className={`
                                relative shrink-0 w-[200px] h-[280px] sm:w-[240px] sm:h-[340px] 
                                rounded-r-2xl rounded-l-md ${thesis.color}
                                shadow-[20px_20px_50px_-15px_rgba(0,0,0,0.3)]
                                border-l-8 ${thesis.accent} border-y border-y-black/20 border-r border-r-black/20
                                overflow-hidden flex flex-col justify-between p-6
                                transform transition-transform duration-500 hover:scale-[1.03] hover:-translate-y-2
                            `}
                        >
                            {/* Inner spine shadow */}
                            <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                            
                            {/* Book cover content */}
                            <div className="text-center mt-4">
                                <span className="block text-white/50 text-[10px] font-bold tracking-[0.2em] mb-4">TESIS</span>
                                <h3 className="text-white font-serif font-bold text-sm sm:text-base leading-snug uppercase tracking-wide px-2">
                                    "{thesis.title}"
                                </h3>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-8 h-[2px] bg-white/30 mb-4" />
                                <span className="text-white font-bold text-lg tracking-widest">{thesis.uni}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
