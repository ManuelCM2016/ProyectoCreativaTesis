'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface NavLink {
    href: string;
    label: string;
}

interface NavItemWithDropdown {
    label: string;
    items: NavLink[];
}

type NavItem = NavLink | NavItemWithDropdown;

function isDropdown(item: NavItem): item is NavItemWithDropdown {
    return 'items' in item;
}

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileDropdowns, setMobileDropdowns] = useState<Set<string>>(new Set());
    const [scrolled, setScrolled] = useState(false);

    const navRef = useRef<HTMLElement>(null);
    const navInnerRef = useRef<HTMLDivElement>(null);

    // Navigation structure
    const navItems: NavItem[] = [
        { href: '/', label: 'Inicio' },
        {
            label: 'Creativa Tesis',
            items: [
                { href: '/creativa-tesis/quienes-somos', label: 'Quiénes Somos' },
                { href: '/creativa-tesis/equipo-de-asesores', label: 'Equipo de Asesores' },
            ],
        },
        {
            label: 'Servicios',
            items: [
                { href: '/servicios', label: 'Programa Flex' },
                { href: '/servicios#otros-servicios', label: 'Otros Servicios' },
                { href: '/contacto', label: 'Cotizar Ahora' },
            ],
        },
        { href: '/blog', label: 'Blog y Recursos' },
        { href: '/casos-de-exito', label: 'Casos de Éxitos' },
        { href: '/contacto', label: 'Contacto' },
    ];

    const calculatorOptions = [
        { href: '/calculadoras/fecha-de-graduacion', label: 'Fecha de graduación', icon: 'event' },
        { href: '/calculadoras/cronograma-de-tesis', label: 'Cronograma de tesis', icon: 'schedule' },
    ];

    const toggleMobileDropdown = (label: string) => {
        const newDropdowns = new Set(mobileDropdowns);
        if (newDropdowns.has(label)) {
            newDropdowns.delete(label);
        } else {
            newDropdowns.add(label);
        }
        setMobileDropdowns(newDropdowns);
    };

    // GSAP: Initial fade-in + slide-down animation on mount
    useGSAP(() => {
        if (!navRef.current) return;

        gsap.fromTo(
            navRef.current,
            { y: -80, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
        );
    }, { scope: navRef });

    // Scroll detection for glassmorphism intensity change
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            ref={navRef}
            className={`
                fixed top-0 left-0 right-0 z-50
                lg:top-4 lg:left-6 lg:right-6 xl:left-10 xl:right-10
                transition-all duration-500 ease-out
                ${scrolled
                    ? 'lg:rounded-2xl bg-white/80 dark:bg-[#141318]/80 shadow-[0_8px_32px_rgba(54,85,113,0.12)] backdrop-blur-xl border border-white/30 dark:border-white/10'
                    : 'lg:rounded-2xl bg-white/50 dark:bg-[#141318]/40 backdrop-blur-md border border-white/20 dark:border-white/5'
                }
            `}
        >
            <div
                ref={navInnerRef}
                className={`
                    flex items-center justify-between
                    transition-all duration-500 ease-out
                    px-5 lg:px-8 xl:px-10
                    ${scrolled ? 'py-2.5' : 'py-4'}
                `}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center group shrink-0">
                    <div className="relative flex items-center h-12 w-auto lg:h-14">
                        <Image
                            src="/logo-creativa-tesis.png"
                            alt="Creativa Tesis"
                            width={180}
                            height={60}
                            className="object-contain w-auto h-full max-h-[40px] lg:max-h-[48px] transition-transform duration-300 group-hover:scale-105 origin-left"
                            priority
                            quality={100}
                            unoptimized
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden flex-1 justify-end items-center gap-0.5 lg:flex xl:gap-1">
                    {navItems.map((item, index) => {
                        if (isDropdown(item)) {
                            return (
                                <div
                                    key={`dropdown-${index}`}
                                    className="relative"
                                    onMouseEnter={() => setActiveDropdown(item.label)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <button className="
                                        text-[13px] leading-normal px-3 py-2 rounded-lg
                                        transition-all duration-300
                                        text-[#365571] dark:text-gray-300
                                        font-medium tracking-wide
                                        hover:text-[#96C1E9] hover:bg-[#96C1E9]/8
                                        flex items-center gap-1
                                    ">
                                        <span>{item.label}</span>
                                        <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`}>
                                            expand_more
                                        </span>
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className={`
                                        absolute top-full left-0 pt-2 min-w-[240px]
                                        transition-all duration-300 origin-top
                                        ${activeDropdown === item.label
                                            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                                            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                                        }
                                    `}>
                                        <div className="
                                            bg-white/90 dark:bg-[#1c1c22]/90 backdrop-blur-xl
                                            rounded-xl
                                            shadow-[0_16px_48px_rgba(54,85,113,0.15)]
                                            border border-white/40 dark:border-white/10
                                            py-2 overflow-hidden
                                        ">
                                            {item.items.map((subItem) => (
                                                <Link
                                                    key={subItem.href}
                                                    href={subItem.href}
                                                    className="
                                                        block px-5 py-3 text-[13px]
                                                        text-[#365571] dark:text-gray-300
                                                        hover:bg-[#96C1E9]/10 hover:text-[#365571] dark:hover:bg-[#96C1E9]/10
                                                        transition-all duration-200
                                                        font-medium
                                                    "
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="
                                        text-[13px] leading-normal px-3 py-2 rounded-lg
                                        transition-all duration-300
                                        text-[#365571] dark:text-gray-300
                                        font-medium tracking-wide
                                        hover:text-[#96C1E9] hover:bg-[#96C1E9]/8
                                    "
                                >
                                    {item.label}
                                </Link>
                            );
                        }
                    })}

                    {/* Divider */}
                    <div className="w-px h-5 bg-[#365571]/15 dark:bg-white/10 mx-1" />

                    {/* Calculator Dropdown Button */}
                    <div
                        className="relative"
                        onMouseEnter={() => setActiveDropdown('Calculadora')}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button className="
                            flex items-center gap-2
                            bg-gradient-to-r from-[#BACE37] to-[#a8b830]
                            hover:from-[#a8b830] hover:to-[#96a62a]
                            text-[#141318] font-semibold
                            px-5 py-2 rounded-xl
                            transition-all duration-300
                            shadow-[0_2px_12px_rgba(186,206,55,0.25)]
                            hover:shadow-[0_4px_20px_rgba(186,206,55,0.35)]
                            text-[13px] tracking-wide
                        ">
                            <span className="material-symbols-outlined text-base">calculate</span>
                            <span>Calculadora</span>
                            <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${activeDropdown === 'Calculadora' ? 'rotate-180' : ''}`}>
                                expand_more
                            </span>
                        </button>

                        {/* Calculator Dropdown */}
                        <div className={`
                            absolute top-full right-0 pt-2 w-72
                            transition-all duration-300 origin-top-right
                            ${activeDropdown === 'Calculadora'
                                ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                            }
                        `}>
                            <div className="
                                bg-white/90 dark:bg-[#1c1c22]/90 backdrop-blur-xl
                                rounded-xl
                                shadow-[0_16px_48px_rgba(54,85,113,0.15)]
                                border border-white/40 dark:border-white/10
                                py-2 overflow-hidden
                            ">
                                {calculatorOptions.map((option) => (
                                    <Link
                                        key={option.href}
                                        href={option.href}
                                        className="
                                            flex items-center gap-3 px-5 py-3
                                            text-[13px] text-[#365571] dark:text-gray-300
                                            hover:bg-[#BACE37]/10
                                            transition-all duration-200
                                        "
                                    >
                                        <span className="
                                            material-symbols-outlined text-lg text-[#BACE37]
                                            flex items-center justify-center
                                            w-8 h-8 rounded-lg bg-[#BACE37]/10
                                        ">
                                            {option.icon}
                                        </span>
                                        <span className="font-medium">{option.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="
                        lg:hidden p-2.5 rounded-xl
                        text-[#365571] dark:text-white
                        hover:bg-[#96C1E9]/10
                        transition-all duration-300
                    "
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className="material-symbols-outlined text-2xl">
                        {mobileMenuOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`
                lg:hidden overflow-hidden
                transition-all duration-500 ease-out
                ${mobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}
            `}>
                <div className="border-t border-[#96C1E9]/15 dark:border-white/10">
                    <nav className="flex flex-col py-3 px-2">
                        {navItems.map((item, index) => {
                            if (isDropdown(item)) {
                                const isOpen = mobileDropdowns.has(item.label);
                                return (
                                    <div key={`mobile-dropdown-${index}`}>
                                        <button
                                            onClick={() => toggleMobileDropdown(item.label)}
                                            className="
                                                w-full flex items-center justify-between
                                                px-4 py-3.5 rounded-xl
                                                text-sm text-[#365571] dark:text-gray-200
                                                font-medium tracking-wide
                                                hover:bg-[#96C1E9]/8
                                                transition-all duration-300
                                            "
                                        >
                                            <span>{item.label}</span>
                                            <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                                expand_more
                                            </span>
                                        </button>
                                        <div className={`
                                            overflow-hidden transition-all duration-400 ease-out
                                            ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}
                                        `}>
                                            <div className="ml-4 pl-4 border-l-2 border-[#96C1E9]/25 my-1">
                                                {item.items.map((subItem) => (
                                                    <Link
                                                        key={subItem.href}
                                                        href={subItem.href}
                                                        className="
                                                            block px-4 py-2.5 text-sm rounded-lg
                                                            text-[#365571]/80 dark:text-gray-400
                                                            hover:text-[#365571] hover:bg-[#96C1E9]/8
                                                            transition-all duration-200
                                                        "
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="
                                            px-4 py-3.5 rounded-xl
                                            text-sm text-[#365571] dark:text-gray-200
                                            font-medium tracking-wide
                                            hover:bg-[#96C1E9]/8
                                            transition-all duration-300
                                        "
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            }
                        })}

                        {/* Mobile Calculator Options */}
                        <div className="mx-3 mt-3 pt-3 border-t border-[#96C1E9]/15 dark:border-white/10">
                            <p className="text-[11px] font-semibold text-[#365571]/50 dark:text-gray-500 uppercase tracking-widest px-4 mb-2">
                                Herramientas
                            </p>
                            {calculatorOptions.map((option) => (
                                <Link
                                    key={option.href}
                                    href={option.href}
                                    className="
                                        flex items-center gap-3 px-4 py-3 rounded-xl
                                        text-sm text-[#365571] dark:text-gray-300
                                        font-medium hover:bg-[#BACE37]/8
                                        transition-all duration-300
                                    "
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="
                                        material-symbols-outlined text-base text-[#BACE37]
                                        flex items-center justify-center
                                        w-7 h-7 rounded-lg bg-[#BACE37]/10
                                    ">
                                        {option.icon}
                                    </span>
                                    {option.label}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
