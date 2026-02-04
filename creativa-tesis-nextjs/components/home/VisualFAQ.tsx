'use client';

import { useState } from 'react';
import Badge from '@/components/ui/Badge';

export default function VisualFAQ() {
    const [openId, setOpenId] = useState<number | null>(0);

    const faqs = [
        {
            id: 0,
            category: 'Inversión',
            icon: 'payments',
            iconColor: 'text-green-500',
            question: '¿Cuánto cuesta el servicio de asesoría?',
            answer: 'Nuestros planes se adaptan a tus necesidades y presupuesto. Ofrecemos paquetes desde asesoría puntual hasta acompañamiento completo. Agenda una consulta gratuita para conocer precios específicos.',
        },
        {
            id: 1,
            category: 'Inversión',
            icon: 'account_balance',
            iconColor: 'text-green-500',
            question: '¿Tienen planes de pago o facilidades?',
            answer: 'Sí, ofrecemos facilidades de pago fraccionado según el plan elegido. Puedes pagar por etapas o mensualidades. Consultanos para estructurar un plan que se ajuste a ti.',
        },
        {
            id: 2,
            category: 'Tiempo',
            icon: 'schedule',
            iconColor: 'text-blue-500',
            question: '¿Cuánto tiempo demora completar una tesis con su asesoría?',
            answer: 'En promedio, nuestros estudiantes completan su tesis en 6-8 meses con acompañamiento integral. El tiempo real depende de tu dedicación, complejidad del tema y requisitos institucionales.',
        },
        {
            id: 3,
            category: 'Tiempo',
            icon: 'event_available',
            iconColor: 'text-blue-500',
            question: '¿Puedo empezar inmediatamente?',
            answer: 'Sí! Tenemos disponibilidad para iniciar tu asesoría dentro de las próximas 48 horas. Solo necesitas agendar una consulta inicial para evaluar tu proyecto.',
        },
        {
            id: 4,
            category: 'Proceso',
            icon: 'info',
            iconColor: 'text-purple-500',
            question: '¿Cómo funciona el proceso de asesoría?',
            answer: 'Primero, evaluamos tu proyecto en una consulta gratuita. Luego diseñamos un plan personalizado con cronograma. Te asignamos un asesor experto y trabajamos juntos con reuniones regulares, revisiones continuas y soporte 24/7.',
        },
        {
            id: 5,
            category: 'Proceso',
            icon: 'person',
            iconColor: 'text-purple-500',
            question: '¿Quién será mi asesor?',
            answer: 'Te asignamos un asesor con expertise en tu área de estudio y metodología. Todos nuestros asesores tienen grado de maestría o doctorado y experiencia comprobada en investigación académica.',
        },
        {
            id: 6,
            category: 'Garantías',
            icon: 'verified',
            iconColor: 'text-amber-500',
            question: '¿Qué pasa si no aprueban mi tesis?',
            answer: 'Nuestra tasa de aprobación es del 95%. Si por alguna razón no aprueban tu tesis, continuamos trabajando contigo sin costo adicional hasta lograr la aprobación (según términos del contrato).',
        },
        {
            id: 7,
            category: 'Garantías',
            icon: 'policy',
            iconColor: 'text-amber-500',
            question: '¿Mi tesis es completamente original?',
            answer: 'Absolutamente. Tu tesis es 100% tuya. Nosotros te guiamos, asesoramos y revisamos, pero TÚ eres el autor. Verificamos originalidad con Turnitin y garantizamos cumplimiento de normas éticas académicas.',
        },
    ];

    const categories = ['Inversión', 'Tiempo', 'Proceso', 'Garantías'];

    return (
        <section className="py-16 lg:py-24 bg-light-grey-bg dark:bg-background-dark" id="faq">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12 flex flex-col gap-4 text-center md:items-center">
                    <Badge icon="contact_support">Preguntas Frecuentes</Badge>
                    <h2 className="font-heading text-navy-text text-4xl font-bold tracking-tight md:text-5xl dark:text-white">
                        ¿Tienes Dudas? Te Respondemos
                    </h2>
                    <p className="mx-auto max-w-[800px] text-slate-600 font-body md:text-lg dark:text-gray-300">
                        Encuentra respuestas rápidas a las preguntas más comunes sobre nuestros servicios.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Category tabs */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className="px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-navy-text dark:text-white hover:bg-primary-blue hover:text-white hover:border-primary-blue transition-colors"
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Accordion */}
                    <div className="space-y-3">
                        {faqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 overflow-hidden"
                            >
                                {/* Question */}
                                <button
                                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                    className="w-full flex items-center gap-4 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                >
                                    <span className={`material-symbols-outlined ${faq.iconColor} text-2xl`}>
                                        {faq.icon}
                                    </span>
                                    <span className="flex-1 font-heading text-base font-semibold text-navy-text dark:text-white">
                                        {faq.question}
                                    </span>
                                    <span
                                        className={`material-symbols-outlined text-primary-blue transition-transform ${openId === faq.id ? 'rotate-180' : ''
                                            }`}
                                    >
                                        expand_more
                                    </span>
                                </button>

                                {/* Answer */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="p-4 pt-0 pl-14 pr-14 text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional help */}
                    <div className="mt-10 text-center p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                        <p className="text-slate-600 dark:text-gray-300 mb-3">
                            ¿No encontraste lo que buscabas?
                        </p>
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-blue text-white rounded-full font-semibold hover:bg-secondary-blue transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-lg">chat</span>
                            <span>Habla con un Asesor</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
