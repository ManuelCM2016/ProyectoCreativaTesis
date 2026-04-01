'use client';

import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);

    // GSAP: Animate footer sections on scroll into view
    useGSAP(() => {
        if (!footerRef.current) return;

        // Stagger-animate the columns
        gsap.from('.footer-col', {
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 90%',
                toggleActions: 'play none none none',
                once: true,
            },
        });

        // Animate the bottom bar
        gsap.from('.footer-bottom', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.footer-bottom',
                start: 'top 95%',
                toggleActions: 'play none none none',
                once: true,
            },
        });
    }, { scope: footerRef });

    return (
        <footer
            ref={footerRef}
            className="relative bg-[#141318] text-white overflow-hidden"
        >
            {/* Subtle top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#96C1E9]/40 to-transparent" />

            {/* Main Footer Content */}
            <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-20 pt-20 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">

                    {/* Brand Section */}
                    <div className="footer-col flex flex-col gap-6 lg:pr-6">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#96C1E9]/15">
                                <span className="material-symbols-outlined text-[#96C1E9] text-lg">school</span>
                            </div>
                            <span className="text-xl font-bold font-heading tracking-tight">Creativa Tesis</span>
                        </div>
                        <p className="text-sm text-white/50 leading-relaxed font-body">
                            Asesoría profesional de tesis comprometida con tu éxito académico.
                            Ubicados en el corazón de Tacna, Perú.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-3 mt-1">
                            {[
                                { label: 'Fb', href: '#' },
                                { label: 'Ig', href: '#' },
                                { label: 'Wa', href: '#' },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="
                                        flex items-center justify-center
                                        w-9 h-9 rounded-xl
                                        bg-white/5 border border-white/8
                                        text-white/40 text-xs font-bold
                                        transition-all duration-300
                                        hover:bg-[#96C1E9]/15 hover:text-[#96C1E9] hover:border-[#96C1E9]/30
                                        hover:-translate-y-0.5
                                    "
                                >
                                    {social.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Explore Links */}
                    <div className="footer-col flex flex-col gap-5">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                            Explora
                        </h4>
                        <nav className="flex flex-col gap-1">
                            {[
                                { href: '/', label: 'Inicio' },
                                { href: '/creativa-tesis/quienes-somos', label: 'Quiénes Somos' },
                                { href: '/servicios', label: 'Servicios' },
                                { href: '/casos-de-exito', label: 'Casos de Éxito' },
                                { href: '/blog', label: 'Blog y Recursos' },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="
                                        group flex items-center gap-2
                                        text-sm text-white/50 py-1.5
                                        transition-all duration-300
                                        hover:text-[#96C1E9]
                                    "
                                >
                                    <span className="
                                        w-0 h-px bg-[#96C1E9]
                                        transition-all duration-300
                                        group-hover:w-3
                                    " />
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Help Links */}
                    <div className="footer-col flex flex-col gap-5">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                            Ayuda
                        </h4>
                        <nav className="flex flex-col gap-1">
                            {[
                                { href: '/creativa-tesis/equipo-de-asesores', label: 'Equipo de Asesores' },
                                { href: '/calculadoras/cronograma-de-tesis', label: 'Diagnóstico Gratis' },
                                { href: '/contacto', label: 'Contacto' },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="
                                        group flex items-center gap-2
                                        text-sm text-white/50 py-1.5
                                        transition-all duration-300
                                        hover:text-[#96C1E9]
                                    "
                                >
                                    <span className="
                                        w-0 h-px bg-[#96C1E9]
                                        transition-all duration-300
                                        group-hover:w-3
                                    " />
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Contact Info */}
                        <div className="flex flex-col gap-3 mt-3 pt-4 border-t border-white/5">
                            <a
                                href="mailto:informes@creativatesis.pe"
                                className="flex items-center gap-3 text-sm text-white/40 hover:text-[#96C1E9] transition-all duration-300"
                            >
                                <span className="material-symbols-outlined text-[16px]">mail</span>
                                informes@creativatesis.pe
                            </a>
                            <a
                                href="tel:918677900"
                                className="flex items-center gap-3 text-sm text-white/40 hover:text-[#96C1E9] transition-all duration-300"
                            >
                                <span className="material-symbols-outlined text-[16px]">call</span>
                                918 677 900
                            </a>
                            <span className="flex items-center gap-3 text-sm text-white/40">
                                <span className="material-symbols-outlined text-[16px]">badge</span>
                                RUC: 20123456789
                            </span>
                        </div>
                    </div>

                    {/* Office & Map */}
                    <div className="footer-col flex flex-col gap-5">
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                            Nuestras Oficinas
                        </h4>

                        {/* Sede Principal */}
                        <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#96C1E9]/10 mt-0.5 shrink-0">
                                <span className="material-symbols-outlined text-[#96C1E9] text-sm">location_on</span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white/80 mb-0.5">Sede Principal</p>
                                <p className="text-xs text-white/40 leading-relaxed">
                                    Central Boulevard / 2º Piso<br />Av. San Martín 561 - Tacna
                                </p>
                            </div>
                        </div>

                        {/* Próximas Sedes */}
                        <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#BACE37]/10 mt-0.5 shrink-0">
                                <span className="material-symbols-outlined text-[#BACE37] text-sm">near_me</span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white/80 mb-0.5">Próximas Sedes</p>
                                <p className="text-xs text-white/40 leading-relaxed">
                                    Próximamente en Lima, Arequipa, y demás ciudades.
                                </p>
                            </div>
                        </div>

                        {/* Google Maps */}
                        <div className="mt-1 w-full rounded-2xl overflow-hidden border border-white/8 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.2737505325044!2d-70.25159328895616!3d-18.01249488140356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915acf88047e8ffd%3A0x3e08e2cd07921de1!2sCreativa%20Tesis!5e0!3m2!1ses-419!2spe!4v1770222887005!5m2!1ses-419!2spe"
                                width="100%"
                                height="160"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full opacity-80 hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom border-t border-white/5">
                <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-20 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
                        <p>© {new Date().getFullYear()} Creativa Tesis. Todos los derechos reservados.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white/60 transition-colors duration-300">
                                Términos
                            </a>
                            <a href="#" className="hover:text-white/60 transition-colors duration-300">
                                Privacidad
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
