'use client';

import { useEffect, useState, useRef } from 'react';

interface Stat {
    value: number;
    suffix: string;
    label: string;
    icon: string;
    color: string;
}

const statsData: Stat[] = [
    {
        value: 500,
        suffix: '+',
        label: 'Tesis Asesoradas',
        icon: 'description',
        color: 'from-blue-500 to-blue-600',
    },
    {
        value: 95,
        suffix: '%',
        label: 'Tasa de Aprobación',
        icon: 'verified',
        color: 'from-green-500 to-emerald-600',
    },
    {
        value: 50,
        suffix: '+',
        label: 'Asesores Expertos',
        icon: 'groups',
        color: 'from-purple-500 to-indigo-600',
    },
    {
        value: 8,
        suffix: ' años',
        label: 'De Experiencia',
        icon: 'history',
        color: 'from-orange-500 to-amber-600',
    },
];

const curiosidades = [
    {
        icon: '📊',
        title: 'El 70% de estudiantes',
        description: 'abandonan su tesis en el capítulo de metodología por falta de guía.',
    },
    {
        icon: '⏱️',
        title: 'Promedio de 18 meses',
        description: 'es lo que tarda un estudiante sin asesoría en terminar su tesis.',
    },
    {
        icon: '🎯',
        title: 'Con asesoría profesional',
        description: 'el tiempo se reduce hasta un 50% y la calidad aumenta significativamente.',
    },
    {
        icon: '📈',
        title: 'El análisis estadístico',
        description: 'es el mayor obstáculo para el 65% de los tesistas en ciencias sociales.',
    },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;

        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value, inView]);

    return (
        <span className="tabular-nums">
            {count}{suffix}
        </span>
    );
}

export default function StatsSection() {
    const [inView, setInView] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={sectionRef} className="space-y-16">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {statsData.map((stat, index) => (
                    <div
                        key={index}
                        className="group relative bg-white dark:bg-slate-900 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 overflow-hidden hover:-translate-y-1"
                    >
                        {/* Background gradient on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                        <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                            <span className="material-symbols-outlined text-white text-2xl">{stat.icon}</span>
                        </div>
                        <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
                        </div>
                        <p className="text-slate-600 dark:text-gray-400 font-medium text-sm">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Curiosidades */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-[100px]"></div>
                </div>

                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mb-4">
                            💡 ¿Sabías que...?
                        </span>
                        <h3 className="text-white font-heading text-2xl md:text-3xl font-bold">
                            Datos Curiosos sobre Tesis
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {curiosidades.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:border-white/20"
                            >
                                <div className="flex items-start gap-4">
                                    <span className="text-4xl">{item.icon}</span>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-1">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
