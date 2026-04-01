'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

// Datos de niveles académicos
const nivelesAcademicos = {
    pregrado: {
        titulo: 'PREGRADO',
        subniveles: ['Institutos', 'Escuelas Pedagógicas', 'Bachiller', 'Titulación'],
        descripcion: 'Servicios de asesoría para estudiantes de pregrado en institutos, escuelas pedagógicas y universidades.',
        color: 'from-blue-500 to-blue-600',
        imagen: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    },
    postgrado: {
        titulo: 'POSTGRADO',
        subniveles: ['Segunda Especialidad', 'Maestría', 'Doctorado'],
        descripcion: 'Asesoría especializada para estudios de posgrado con los más altos estándares académicos.',
        color: 'from-indigo-500 to-indigo-600',
        imagen: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
    },
};

// Servicios principales con imágenes
const serviciosPrincipales = [
    {
        titulo: 'Formato y Estilo',
        icono: 'format_paint',
        descripcion: 'Corrección y adaptación a normas APA, Vancouver, ISO o Chicago según los requisitos de tu institución.',
        tags: ['APA 7ma Ed.', 'Vancouver', 'Chicago'],
        imagen: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=600&q=80',
    },
    {
        titulo: 'Simulación de Sustentación',
        icono: 'record_voice_over',
        descripcion: 'Practica tu defensa de tesis con expertos. Te preparamos para responder preguntas del jurado con confianza.',
        tags: ['Práctica', 'Feedback', 'Preparación'],
        imagen: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=600&q=80',
    },
    {
        titulo: 'Asesoría de Proyecto de Tesis',
        icono: 'assignment',
        descripcion: 'Te guiamos en la elaboración completa de tu proyecto de investigación desde la elección del tema.',
        tags: ['Planteamiento', 'Objetivos', 'Metodología'],
        imagen: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80',
    },
    {
        titulo: 'Asesoría de Redacción de Tesis',
        icono: 'edit_document',
        descripcion: 'Acompañamiento integral en la redacción de tu tesis, desde el marco teórico hasta las conclusiones.',
        tags: ['Marco Teórico', 'Resultados', 'Conclusiones'],
        imagen: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=600&q=80',
    },
    {
        titulo: 'Asesoría de Redacción de Tesina',
        icono: 'description',
        descripcion: 'Apoyo especializado para la elaboración de tesinas con todos los requisitos académicos.',
        tags: ['Investigación', 'Redacción', 'Revisión'],
        imagen: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&q=80',
    },
    {
        titulo: 'Asesoría de TSP',
        icono: 'school',
        descripcion: 'Trabajo de Suficiencia Profesional para titulación. Te ayudamos a completar tu proceso de titulación.',
        tags: ['Suficiencia', 'Titulación', 'Profesional'],
        imagen: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=600&q=80',
    },
];

// Servicios estadísticos
const herramientasEstadisticas = [
    { nombre: 'EPIDATA', icono: 'database' },
    { nombre: 'STATA', icono: 'analytics' },
    { nombre: 'R-Studio', icono: 'code' },
    { nombre: 'Python', icono: 'terminal' },
    { nombre: 'JAMOVI', icono: 'calculate' },
    { nombre: 'SPSS', icono: 'query_stats' },
];

const tiposAnalisis = [
    {
        nombre: 'Estadística Descriptiva',
        icono: 'bar_chart',
        descripcion: 'Tablas, gráficos, medidas de tendencia central y dispersión.',
        imagen: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
    },
    {
        nombre: 'Estadística Correlacional',
        icono: 'scatter_plot',
        descripcion: 'Correlación de Pearson, Spearman, Chi-cuadrado.',
        imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
    },
    {
        nombre: 'Estadística Inferencial',
        icono: 'query_stats',
        descripcion: 'Pruebas de hipótesis, intervalos de confianza, pruebas t, ANOVA.',
        imagen: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=80',
    },
    {
        nombre: 'Estadística Experimental',
        icono: 'science',
        descripcion: 'Diseños experimentales, pre-experimentales, cuasi-experimentales.',
        imagen: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80',
    },
    {
        nombre: 'Regresión Logística',
        icono: 'trending_up',
        descripcion: 'Modelos predictivos binarios, multinomiales y ordinales.',
        imagen: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=400&q=80',
    },
    {
        nombre: 'Confiabilidad (Alfa de Cronbach)',
        icono: 'verified',
        descripcion: 'Validación de instrumentos, análisis de consistencia interna.',
        imagen: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80',
    },
];

export default function ServicesPage() {
    const [nivelSeleccionado, setNivelSeleccionado] = useState<'pregrado' | 'postgrado'>('pregrado');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            {/* Hero Section con animación de partículas */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
                {/* Background Image con overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&q=80"
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/90 via-primary-blue/80 to-secondary-blue/70"></div>
                </div>

                {/* Animated floating shapes */}
                {mounted && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(15)].map((_, i) => (
                            <div
                                key={i}
                                className="floating-shape"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 5}s`,
                                    animationDuration: `${15 + Math.random() * 10}s`,
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto text-center px-4 py-20">
                    {/* Logo Watermark with Animation */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 dark:opacity-8 overflow-hidden">
                        <div className="logo-watermark-float">
                            <Image
                                src="/logo-creativa-tesis.png"
                                alt="Creativa Tesis Background"
                                width={500}
                                height={500}
                                className="object-contain"
                                quality={80}
                                unoptimized
                            />
                        </div>
                    </div>

                    <span className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-medium mb-8 animate-fade-in-down border border-white/20">
                        ✨ Servicios Especializados en Investigación
                    </span>
                    <h1 className="text-white font-heading text-4xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-8 animate-fade-in-up">
                        Soluciones Académicas
                        <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                            Integrales
                        </span>
                    </h1>
                    <p className="text-gray-200 font-body text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in opacity-90">
                        Desde tu proyecto de tesis hasta la sustentación final. Te acompañamos en cada paso con expertos en investigación y análisis estadístico.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up-delayed">
                        <Button className="h-14 px-10 text-lg shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600">
                            Cotizar Servicio
                        </Button>
                        <Button
                            variant="ghost"
                            className="h-14 px-10 text-lg bg-white/10 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white/20 transition-all duration-300"
                        >
                            <span className="material-symbols-outlined mr-2">play_circle</span>
                            Ver Demo
                        </Button>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                    <span className="material-symbols-outlined text-white/70 text-4xl">expand_more</span>
                </div>
            </section>

            {/* Selector de Nivel Académico con imagen de fondo */}
            <section id="pregrado" className="relative py-24 px-4 overflow-hidden scroll-mt-20">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-14 animate-on-scroll">
                        <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                            Personaliza tu experiencia
                        </span>
                        <h2 className="text-navy-text font-heading text-3xl md:text-5xl font-bold mb-6 dark:text-white">
                            ¿En qué nivel académico te encuentras?
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                            Selecciona tu nivel para ver los servicios disponibles y precios específicos.
                        </p>
                    </div>

                    {/* Tabs de Nivel con animación */}
                    <div className="flex justify-center gap-6 mb-12">
                        {(['pregrado', 'postgrado'] as const).map((nivel) => (
                            <button
                                key={nivel}
                                onClick={() => setNivelSeleccionado(nivel)}
                                className={`relative px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform ${nivelSeleccionado === nivel
                                    ? `bg-gradient-to-r ${nivelesAcademicos[nivel].color} text-white shadow-2xl scale-105`
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border-2 border-gray-200 dark:border-slate-700 hover:scale-102'
                                    }`}
                            >
                                <span className="material-symbols-outlined mr-3 align-middle text-2xl">
                                    {nivel === 'pregrado' ? 'school' : 'workspace_premium'}
                                </span>
                                {nivel.toUpperCase()}
                                {nivelSeleccionado === nivel && (
                                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-inherit rotate-45"></span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Contenido del nivel con imagen */}
                    <div className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform`}>
                        <div className="absolute inset-0">
                            <Image
                                src={nivelesAcademicos[nivelSeleccionado].imagen}
                                alt={nivelesAcademicos[nivelSeleccionado].titulo}
                                fill
                                className="object-cover transition-all duration-700"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-r ${nivelesAcademicos[nivelSeleccionado].color} opacity-90`}></div>
                        </div>
                        <div className="relative z-10 p-10 md:p-14 text-white">
                            <div className="text-center mb-8">
                                <h3 className="text-4xl font-bold mb-4 animate-fade-in">{nivelesAcademicos[nivelSeleccionado].titulo}</h3>
                                <p className="text-white/80 text-lg max-w-2xl mx-auto">{nivelesAcademicos[nivelSeleccionado].descripcion}</p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4">
                                {nivelesAcademicos[nivelSeleccionado].subniveles.map((subnivel, idx) => (
                                    <span
                                        key={idx}
                                        className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium border border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer hover:scale-105"
                                        style={{ animationDelay: `${idx * 0.1}s` }}
                                    >
                                        {subnivel}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Servicios Principales con cards e imágenes */}
            <section id="postgrado" className="relative py-24 px-4 overflow-hidden scroll-mt-20">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                    <div className="absolute inset-0 opacity-30">
                        {mounted && [...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-900/30 blur-3xl animate-pulse-slow"
                                style={{
                                    width: `${200 + Math.random() * 300}px`,
                                    height: `${200 + Math.random() * 300}px`,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${i * 2}s`,
                                    animationDuration: `${8 + i * 2}s`,
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-white text-sm font-medium mb-6 shadow-lg">
                            🎯 Servicios de Asesoría
                        </span>
                        <h2 className="text-navy-text font-heading text-3xl md:text-5xl font-bold mb-6 dark:text-white">
                            Servicios Principales
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                            Soluciones completas para cada etapa de tu investigación académica.
                        </p>
                    </div>

                    {/* Grid de Servicios con imágenes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {serviciosPrincipales.map((servicio, idx) => (
                            <div
                                key={idx}
                                className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-slate-800"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                {/* Imagen */}
                                <div className="relative h-52 overflow-hidden">
                                    <Image
                                        src={servicio.imagen}
                                        alt={servicio.titulo}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <span className="material-symbols-outlined text-white text-2xl">{servicio.icono}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-navy-text dark:text-white font-bold text-xl mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {servicio.titulo}
                                    </h3>
                                    <p className="text-slate-600 dark:text-gray-400 text-sm mb-5 leading-relaxed">
                                        {servicio.descripcion}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {servicio.tags.map((tag, tagIdx) => (
                                            <span
                                                key={tagIdx}
                                                className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full text-xs text-blue-600 dark:text-blue-400 font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:from-blue-600 hover:to-indigo-700">
                                        Solicitar Información
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Servicios Estadísticos con fondo dinámico */}
            <section id="estadisticos" className="relative py-24 px-4 overflow-hidden scroll-mt-20">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-blue via-navy-text to-primary-blue">
                    {/* Animated grid */}
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                    }}></div>
                    {/* Glowing orbs */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '4s' }}></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full text-white text-sm font-medium mb-6 shadow-lg">
                            📊 Análisis de Datos
                        </span>
                        <h2 className="text-white font-heading text-3xl md:text-5xl font-bold mb-6">
                            Servicios Estadísticos
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Análisis de datos con herramientas profesionales y metodologías avanzadas.
                        </p>
                    </div>

                    {/* Herramientas con hover effects */}
                    <div className="mb-16">
                        <h3 className="text-white font-bold text-2xl mb-8 text-center">
                            <span className="material-symbols-outlined mr-2 align-middle text-green-400">build</span>
                            Herramientas Disponibles
                        </h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {herramientasEstadisticas.map((herramienta, idx) => (
                                <div
                                    key={idx}
                                    className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl px-8 py-5 flex items-center gap-4 hover:bg-gradient-to-r hover:from-green-500/20 hover:to-emerald-500/20 hover:border-green-500/50 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-green-500/10"
                                    style={{ animationDelay: `${idx * 0.1}s` }}
                                >
                                    <span className="material-symbols-outlined text-green-400 text-2xl group-hover:scale-125 transition-transform duration-300">{herramienta.icono}</span>
                                    <span className="text-white font-semibold text-lg">{herramienta.nombre}</span>
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/0 to-emerald-400/0 group-hover:from-green-400/5 group-hover:to-emerald-400/10 transition-all duration-500"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tipos de Análisis con imágenes */}
                    <div>
                        <h3 className="text-white font-bold text-2xl mb-8 text-center">
                            <span className="material-symbols-outlined mr-2 align-middle text-purple-400">analytics</span>
                            Tipos de Análisis
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tiposAnalisis.map((analisis, idx) => (
                                <div
                                    key={idx}
                                    className="group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
                                >
                                    {/* Image */}
                                    <div className="relative h-36 overflow-hidden">
                                        <Image
                                            src={analisis.imagen}
                                            alt={analisis.nombre}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 -mt-8 relative z-10">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                <span className="material-symbols-outlined text-white text-xl">{analisis.icono}</span>
                                            </div>
                                            <h4 className="text-white font-bold text-lg">{analisis.nombre}</h4>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed">{analisis.descripcion}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final con animación */}
            <section className="relative py-24 px-4 overflow-hidden bg-white dark:bg-slate-950">
                <div className="max-w-5xl mx-auto">
                    <div className="relative bg-gradient-to-r from-primary-blue via-[#3d6485] to-navy-text rounded-[2.5rem] p-10 md:p-16 overflow-hidden shadow-2xl">
                        {/* Animated background elements */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
                            <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-400 rounded-full blur-[100px] opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                                {[...Array(20)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute w-1 h-1 bg-white/30 rounded-full animate-twinkle"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                            animationDelay: `${Math.random() * 3}s`,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="relative z-10 text-center">
                            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mb-6 border border-white/20">
                                🎓 Comienza tu camino al éxito
                            </span>
                            <h2 className="text-white font-heading text-3xl md:text-5xl font-bold mb-6">
                                ¿Listo para empezar tu tesis?
                            </h2>
                            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                                Agenda una consulta gratuita de 15 minutos y descubre cómo podemos ayudarte a titularte este año.
                            </p>
                            <div className="flex gap-5 justify-center flex-wrap">
                                <Button className="h-14 px-10 text-lg shadow-2xl bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 hover:scale-105 transition-all duration-300">
                                    <span className="material-symbols-outlined mr-2">description</span>
                                    Cotizar mi Proyecto
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="h-14 px-10 text-lg bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
                                >
                                    <span className="material-symbols-outlined mr-2">chat</span>
                                    WhatsApp
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom Styles */}
            <style jsx>{`
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.1); }
                }
                @keyframes twinkle {
                    0%, 100% { opacity: 0; transform: scale(0.5); }
                    50% { opacity: 1; transform: scale(1); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    25% { transform: translateY(-20px) rotate(5deg); }
                    75% { transform: translateY(20px) rotate(-5deg); }
                }
                
                .animate-fade-in-down {
                    animation: fade-in-down 0.8s ease-out;
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out;
                }
                .animate-fade-in-up-delayed {
                    animation: fade-in-up 0.8s ease-out 0.3s both;
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
                .animate-pulse-slow {
                    animation: pulse-slow 8s ease-in-out infinite;
                }
                .animate-twinkle {
                    animation: twinkle 3s ease-in-out infinite;
                }
                
                .floating-shape {
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
                    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
                    animation: float 20s ease-in-out infinite;
                    pointer-events: none;
                }

                @keyframes logo-watermark-float {
                    0%, 100% { 
                        transform: translateY(0) rotate(0deg) scale(1); 
                    }
                    25% { 
                        transform: translateY(-15px) rotate(2deg) scale(1.02); 
                    }
                    50% { 
                        transform: translateY(-25px) rotate(-2deg) scale(1.05); 
                    }
                    75% { 
                        transform: translateY(-15px) rotate(2deg) scale(1.02); 
                    }
                }

                .logo-watermark-float {
                    animation: logo-watermark-float 8s ease-in-out infinite;
                    will-change: transform;
                }
            `}</style>
        </>
    );
}
