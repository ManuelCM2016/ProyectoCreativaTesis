'use client';

import { useState } from 'react';
import Badge from '@/components/ui/Badge';

export default function SpecialtiesGallery() {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const specialties = [
        {
            id: 1,
            category: 'Metodología de Investigación',
            icon: 'science',
            color: 'from-blue-500 to-cyan-500',
            services: [
                'Diseños experimentales y cuasi-experimentales',
                'Estudios cualitativos (fenomenología, etnografía)',
                'Investigación mixta (cuanti + cuali)',
                'Revisiones sistemáticas y metaanálisis',
            ],
        },
        {
            id: 2,
            category: 'Análisis Estadístico',
            icon: 'query_stats',
            color: 'from-purple-500 to-pink-500',
            services: [
                'SPSS, R, Python para análisis de datos',
                'Estadística descriptiva e inferencial',
                'Regresión lineal y logística',
                'Visualización profesional de datos',
            ],
        },
        {
            id: 3,
            category: 'Redacción Académica',
            icon: 'edit_note',
            color: 'from-emerald-500 to-teal-500',
            services: [
                'Normas APA 7ma edición',
                'Vancouver, ISO, Chicago',
                'Estructura y coherencia textual',
                'Corrección de estilo y gramática',
            ],
        },
        {
            id: 4,
            category: 'Apoyo por Disciplina',
            icon: 'school',
            color: 'from-orange-500 to-amber-500',
            services: [
                'Ciencias de la Salud (Medicina, Enfermería)',
                'Ingeniería (Civil, Industrial, Sistemas)',
                'Ciencias Sociales (Psicología, Sociología)',
                'Educación y Pedagogía',
            ],
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900" id="especialidades">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12 flex flex-col gap-4 text-center md:items-center">
                    <Badge icon="workspace">Áreas de Expertise</Badge>
                    <h2 className="font-heading text-navy-text text-4xl font-bold tracking-tight md:text-5xl dark:text-white">
                        Nuestras Especialidades
                    </h2>
                    <p className="mx-auto max-w-[800px] text-slate-600 font-body md:text-lg dark:text-gray-300">
                        Explora nuestras áreas de expertise. Haz clic en cada categoría para ver servicios específicos.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {specialties.map((specialty) => (
                        <div
                            key={specialty.id}
                            className={`relative cursor-pointer bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 transition-all duration-300 ${expandedId === specialty.id
                                ? 'ring-2 ring-primary-blue shadow-2xl'
                                : 'hover:shadow-xl hover:-translate-y-1'
                                }`}
                            onClick={() => setExpandedId(expandedId === specialty.id ? null : specialty.id)}
                        >
                            {/* Gradient top bar */}
                            <div
                                className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r ${specialty.color}`}
                            />

                            {/* Header */}
                            <div className="flex items-center gap-4 mb-4">
                                <div
                                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${specialty.color} flex items-center justify-center flex-shrink-0`}
                                >
                                    <span className="material-symbols-outlined text-white text-3xl">
                                        {specialty.icon}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-heading text-xl font-bold text-navy-text dark:text-white">
                                        {specialty.category}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-gray-400">
                                        {specialty.services.length} servicios disponibles
                                    </p>
                                </div>
                                <span
                                    className={`material-symbols-outlined text-primary-blue transition-transform ${expandedId === specialty.id ? 'rotate-180' : ''
                                        }`}
                                >
                                    expand_more
                                </span>
                            </div>

                            {/* Expanded Content */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ${expandedId === specialty.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                                    <ul className="space-y-3">
                                        {specialty.services.map((service, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="material-symbols-outlined text-primary-blue text-sm mt-0.5">
                                                    check_circle
                                                </span>
                                                <span className="text-slate-600 dark:text-gray-300 text-sm">
                                                    {service}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Preview text when collapsed */}
                            {expandedId !== specialty.id && (
                                <p className="text-slate-500 dark:text-gray-400 text-sm mt-2">
                                    Haz clic para ver más detalles →
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
