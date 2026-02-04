'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export default function Hero() {
    const [mounted, setMounted] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#95C2EC] to-[#345672]">
            {/* Animated Text Labels Background - Only render after mounted */}
            {mounted && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="text-labels-container">
                        {/* PREGRADO - Lado Derecho */}
                        {['PREGRADO', 'Institutos', 'Escuelas Pedagógicas', 'Bachiller', 'Titulación'].map((text, i, arr) => {
                            const baseAngle = -Math.PI / 4 + (i / (arr.length - 1)) * (Math.PI / 2);
                            const isTitle = text === 'PREGRADO';
                            return (
                                <div
                                    key={`pregrado-${i}`}
                                    className={`floating-text ${isTitle ? 'title-text' : 'subtitle-text'}`}
                                    style={{
                                        left: '50%',
                                        top: '50%',
                                        animationDelay: `${i * 0.3}s`,
                                        animationDuration: `${6 + i * 0.5}s`,
                                        '--angle': `${baseAngle}rad`,
                                        '--distance': `${isTitle ? '30vw' : `${32 + i * 2}vw`}`,
                                    } as React.CSSProperties}
                                >
                                    {text}
                                </div>
                            );
                        })}
                        {/* POSTGRADO - Lado Izquierdo */}
                        {['POSTGRADO', 'Segunda Especialidad', 'Maestría', 'Doctorado'].map((text, i, arr) => {
                            const baseAngle = (3 * Math.PI / 4) + (i / (arr.length - 1)) * (Math.PI / 2);
                            const isTitle = text === 'POSTGRADO';
                            return (
                                <div
                                    key={`postgrado-${i}`}
                                    className={`floating-text ${isTitle ? 'title-text' : 'subtitle-text'}`}
                                    style={{
                                        left: '50%',
                                        top: '50%',
                                        animationDelay: `${i * 0.3 + 0.15}s`,
                                        animationDuration: `${6 + i * 0.5}s`,
                                        '--angle': `${baseAngle}rad`,
                                        '--distance': `${isTitle ? '30vw' : `${32 + i * 2}vw`}`,
                                    } as React.CSSProperties}
                                >
                                    {text}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex flex-col items-center justify-center text-center">
                    {/* Logo Assembly Container - ALIGNED TO REFERENCE */}
                    <div className="logo-assembly-container relative mb-24 sm:mb-28 md:mb-32">
                        {/* Reserved space - matching reference proportions */}
                        <div className="w-[300px] h-[190px] sm:w-[440px] sm:h-[280px] md:w-[550px] md:h-[350px] lg:w-[650px] lg:h-[410px] relative">

                            {/* Letra C - slides from left - ALIGNED */}
                            <div
                                className={`absolute left-0 bottom-0 w-[32%] ${mounted && !shouldReduceMotion ? 'animate-slide-c' : 'opacity-100'
                                    }`}
                                style={{ animationFillMode: 'forwards' }}
                            >
                                <Image
                                    src="/images/logo/parte-2-C.svg"
                                    alt="C"
                                    width={280}
                                    height={360}
                                    className="w-full h-auto"
                                    priority
                                    unoptimized
                                />
                            </div>

                            {/* Texto "reativa Tesis" - slides from right - ALIGNED */}
                            <div
                                className={`absolute right-0 bottom-[6%] w-[64%] ${mounted && !shouldReduceMotion ? 'animate-slide-text' : 'opacity-100'
                                    }`}
                                style={{ animationFillMode: 'forwards' }}
                            >
                                <Image
                                    src="/images/logo/Parte-3-reativa-Tesis.svg"
                                    alt="reativa Tesis"
                                    width={420}
                                    height={200}
                                    className="w-full h-auto"
                                    priority
                                    unoptimized
                                />
                            </div>

                            {/* Sombrero - slides from top - ALIGNED TO CENTER OF C */}
                            <div
                                className={`absolute left-[2%] top-0 w-[29%] ${mounted && !shouldReduceMotion ? 'animate-slide-hat' : 'opacity-100'
                                    }`}
                                style={{ animationFillMode: 'forwards' }}
                            >
                                <Image
                                    src="/images/logo/parte-1-Sombrero.svg"
                                    alt="Sombrero"
                                    width={200}
                                    height={130}
                                    className="w-full h-auto"
                                    priority
                                    unoptimized
                                />
                            </div>
                        </div>
                    </div>

                    {/* Headline - MOVED DOWN MORE */}
                    <h1
                        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 sm:mb-7 px-4 ${mounted && !shouldReduceMotion ? 'animate-fade-up-headline' : 'opacity-100'
                            }`}
                        style={{
                            fontFamily: '"Questrial", "Montserrat", "Spartan", "Century Gothic", "Segoe UI", Arial, sans-serif',
                            textShadow: '0 3px 15px rgba(0,0,0,0.3)',
                            animationFillMode: 'forwards',
                        }}
                    >
                        ¡Titúlate ya! con Creativa Tesis
                    </h1>

                    {/* Subtitle */}
                    <p
                        className={`text-lg sm:text-xl md:text-2xl text-white/95 mb-10 sm:mb-12 max-w-2xl px-4 ${mounted && !shouldReduceMotion ? 'animate-fade-up-subtitle' : 'opacity-100'
                            }`}
                        style={{
                            fontFamily: '"Questrial", "Montserrat", "Spartan", "Century Gothic", "Segoe UI", Arial, sans-serif',
                            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                            animationFillMode: 'forwards',
                        }}
                    >
                        ¡Nosotros Empatizamos y valoramos tu perspectiva!
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className={`flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4 ${mounted && !shouldReduceMotion ? 'animate-fade-up-cta' : 'opacity-100'
                            }`}
                        style={{ animationFillMode: 'forwards' }}
                    >
                        {/* Primary CTA */}
                        <Link
                            href="/creativa-tesis/quienes-somos"
                            className="cta-primary group relative overflow-hidden px-8 py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
                            style={{
                                fontFamily: '"Questrial", "Montserrat", "Spartan", "Century Gothic", "Segoe UI", Arial, sans-serif',
                                background: 'linear-gradient(135deg, #345672 0%, #1B1D2C 100%)',
                                color: 'white',
                                boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                            }}
                        >
                            <span className="relative z-10">Más Información</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#4C4A58] to-[#345672] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>

                        {/* Secondary CTA */}
                        <Link
                            href="/contacto"
                            className="cta-secondary px-8 py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
                            style={{
                                fontFamily: '"Questrial", "Montserrat", "Spartan", "Century Gothic", "Segoe UI", Arial, sans-serif',
                                background: 'transparent',
                                color: 'white',
                                border: '2px solid white',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            }}
                        >
                            ¡Contáctanos!
                        </Link>
                    </div>
                </div>
            </div>

            {/* CSS Animations & Styles */}
            <style jsx>{`
                /* Floating Text Labels Animation - Expanding from center */
                .text-labels-container {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }

                .floating-text {
                    position: absolute;
                    font-family: 'Questrial', 'Montserrat', sans-serif;
                    color: rgba(255, 255, 255, 0.5);
                    animation: expandTextFromCenter infinite ease-in-out;
                    transform: translate(-50%, -50%);
                    white-space: nowrap;
                    text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
                    pointer-events: none;
                    user-select: none;
                }

                .title-text {
                    font-size: 1.5rem;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    color: rgba(255, 255, 255, 0.65);
                    text-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
                }

                .subtitle-text {
                    font-size: 1rem;
                    font-weight: 500;
                    letter-spacing: 0.08em;
                    color: rgba(255, 255, 255, 0.5);
                }

                @keyframes expandTextFromCenter {
                    0% {
                        transform: translate(-50%, -50%) 
                                   translate(0, 0) 
                                   scale(0.6);
                        opacity: 0.15;
                    }
                    50% {
                        transform: translate(-50%, -50%) 
                                   translate(
                                       calc(cos(var(--angle)) * var(--distance)), 
                                       calc(sin(var(--angle)) * var(--distance))
                                   ) 
                                   scale(1.1);
                        opacity: 0.85;
                    }
                    100% {
                        transform: translate(-50%, -50%) 
                                   translate(0, 0) 
                                   scale(0.6);
                        opacity: 0.15;
                    }
                }

                /* Logo Piece Animations - using cubic-bezier for easeOutCubic */
                @keyframes slideC {
                    0% {
                        transform: translateX(-120%);
                        opacity: 0.3;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes slideText {
                    0% {
                        transform: translateX(120%);
                        opacity: 0.3;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes slideHat {
                    0% {
                        transform: translateY(-120%);
                        opacity: 0.3;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .animate-slide-c {
                    animation: slideC 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s forwards;
                }

                .animate-slide-hat {
                    animation: slideHat 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s forwards;
                }

                .animate-slide-text {
                    animation: slideText 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.2s forwards;
                }

                /* Text and Button Animations */
                @keyframes fadeUpHeadline {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeUpSubtitle {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeUpCTA {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-up-headline {
                    animation: fadeUpHeadline 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.1s forwards;
                    opacity: 0;
                }

                .animate-fade-up-subtitle {
                    animation: fadeUpSubtitle 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.3s forwards;
                    opacity: 0;
                }

                .animate-fade-up-cta {
                    animation: fadeUpCTA 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.5s forwards;
                    opacity: 0;
                }

                /* Button Hover Effects */
                .cta-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
                }

                .cta-secondary:hover {
                    background: rgba(255, 255, 255, 0.15);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
                }

                .cta-primary:active,
                .cta-secondary:active {
                    transform: translateY(0);
                }

                /* Responsive adjustments */
                @media (max-width: 640px) {
                    .title-text {
                        font-size: 0.9rem;
                    }
                    .subtitle-text {
                        font-size: 0.7rem;
                    }
                }
            `}</style>
        </section>
    );
}
