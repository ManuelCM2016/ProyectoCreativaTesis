'use client';

import Link from 'next/link';
import { useState } from 'react';

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

    // New navigation structure according to SEO architecture
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
                { href: '/servicios/tesis-pregrado', label: 'Tesis de pregrado' },
                { href: '/servicios/tesis-postgrado', label: 'Tesis postgrado' },
                { href: '/servicios/tesis-maestria', label: 'Tesis de maestría' },
                { href: '/servicios/tesis-doctoral', label: 'Tesis doctoral' },
                { href: '/servicios/asesoria-especializada', label: 'Asesoría Especializada' },
                { href: '/servicios/otros-servicios', label: 'Otros servicios' },
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

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-light-grey-bg bg-background-light/95 backdrop-blur-sm px-6 py-4 lg:px-10 xl:px-20 dark:bg-background-dark/95 dark:border-gray-800 shadow-subtle">
            <div className="flex items-center gap-4 text-navy-text dark:text-white">
                <Link href="/" className="flex items-center gap-4">
                    <div className="flex items-center justify-center rounded-lg bg-primary-blue/10 p-2 text-primary-blue">
                        <span className="material-symbols-outlined">school</span>
                    </div>
                    <h2 className="text-navy-text text-lg font-bold leading-tight tracking-[-0.015em] dark:text-white">
                        Creativa Tesis
                    </h2>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden flex-1 justify-end items-center gap-1 lg:flex xl:gap-4">
                {navItems.map((item, index) => {
                    if (isDropdown(item)) {
                        return (
                            <div
                                key={`dropdown-${index}`}
                                className="relative"
                                onMouseEnter={() => setActiveDropdown(item.label)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <button className="text-sm leading-normal px-3 py-2 transition-colors text-navy-text dark:text-gray-300 font-medium hover:text-secondary-blue flex items-center gap-1">
                                    <span>{item.label}</span>
                                    <span className="material-symbols-outlined text-base">expand_more</span>
                                </button>

                                {activeDropdown === item.label && (
                                    <div className="absolute top-full left-0 pt-1 min-w-[220px]">
                                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 py-2">
                                            {item.items.map((subItem) => (
                                                <Link
                                                    key={subItem.href}
                                                    href={subItem.href}
                                                    className="block px-4 py-3 text-sm text-navy-text dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    } else {
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm leading-normal px-3 py-2 transition-colors text-navy-text dark:text-gray-300 font-medium hover:text-secondary-blue"
                            >
                                {item.label}
                            </Link>
                        );
                    }
                })}

                {/* Calculator Dropdown Button */}
                <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown('Calculadora')}
                    onMouseLeave={() => setActiveDropdown(null)}
                >
                    <button className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-navy-text font-bold px-4 py-2 rounded-lg transition-all shadow-sm text-sm">
                        <span className="material-symbols-outlined text-base">calculate</span>
                        <span>Calculadora de diagnósticos</span>
                        <span className="material-symbols-outlined text-base">expand_more</span>
                    </button>

                    {activeDropdown === 'Calculadora' && (
                        <div className="absolute top-full right-0 pt-1 w-64">
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 py-2">
                                {calculatorOptions.map((option) => (
                                    <Link
                                        key={option.href}
                                        href={option.href}
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-navy-text dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-primary-blue text-xl">
                                            {option.icon}
                                        </span>
                                        <span className="font-medium">{option.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
                className="lg:hidden p-2 text-navy-text dark:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
            >
                <span className="material-symbols-outlined">
                    {mobileMenuOpen ? 'close' : 'menu'}
                </span>
            </button>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-background-light dark:bg-background-dark border-b border-light-grey-bg dark:border-gray-800 shadow-lg lg:hidden">
                    <nav className="flex flex-col py-4">
                        {navItems.map((item, index) => {
                            if (isDropdown(item)) {
                                const isOpen = mobileDropdowns.has(item.label);
                                return (
                                    <div key={`mobile-dropdown-${index}`}>
                                        <button
                                            onClick={() => toggleMobileDropdown(item.label)}
                                            className="w-full flex items-center justify-between px-6 py-3 text-sm text-navy-text dark:text-gray-300 font-medium hover:bg-light-grey-bg dark:hover:bg-gray-800"
                                        >
                                            <span>{item.label}</span>
                                            <span className="material-symbols-outlined text-base">
                                                {isOpen ? 'expand_less' : 'expand_more'}
                                            </span>
                                        </button>
                                        {isOpen && (
                                            <div className="bg-light-grey-bg/50 dark:bg-gray-800/50">
                                                {item.items.map((subItem) => (
                                                    <Link
                                                        key={subItem.href}
                                                        href={subItem.href}
                                                        className="block px-10 py-2 text-sm text-navy-text dark:text-gray-300 hover:bg-light-grey-bg dark:hover:bg-gray-800"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            } else {
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="px-6 py-3 text-sm text-navy-text dark:text-gray-300 font-medium hover:bg-light-grey-bg dark:hover:bg-gray-800"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            }
                        })}

                        {/* Calculator Options in Mobile */}
                        <div className="px-6 py-2 mt-2 border-t border-light-grey-bg dark:border-gray-800">
                            <p className="text-xs font-bold text-gray-500 uppercase mb-2">
                                Calculadoras
                            </p>
                            {calculatorOptions.map((option) => (
                                <Link
                                    key={option.href}
                                    href={option.href}
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-navy-text dark:text-gray-300 font-medium hover:bg-light-grey-bg dark:hover:bg-gray-800 rounded-md transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="material-symbols-outlined text-primary-blue text-base">
                                        {option.icon}
                                    </span>
                                    {option.label}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
