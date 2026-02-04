'use client';

import { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
    icon?: string;
}

const faqData: FAQItem[] = [
    {
        question: '¿Cuánto tiempo toma hacer una tesis con asesoría?',
        answer: 'El tiempo varía según el tipo de tesis y tu dedicación. Con nuestra asesoría, una tesis de pregrado puede completarse en 3-6 meses, mientras que una de maestría puede tomar 6-12 meses. Te ayudamos a crear un cronograma realista y te acompañamos en cada etapa.',
        icon: 'schedule',
    },
    {
        question: '¿Qué diferencia hay entre tesis, tesina y TSP?',
        answer: 'La tesis es una investigación original y profunda, generalmente para licenciatura o posgrado. La tesina es un trabajo de menor extensión, común en algunas instituciones. El TSP (Trabajo de Suficiencia Profesional) es una modalidad alternativa para titulación basada en experiencia laboral.',
        icon: 'school',
    },
    {
        question: '¿Cómo elijo un buen tema de investigación?',
        answer: 'Un buen tema debe ser: relevante para tu área, viable (acceso a datos/recursos), original, y de tu interés personal. Te ayudamos a identificar temas con potencial, revisar literatura existente y definir objetivos claros.',
        icon: 'lightbulb',
    },
    {
        question: '¿Qué incluye el servicio de asesoría estadística?',
        answer: 'Incluye: diseño del instrumento de recolección, procesamiento de datos en SPSS/STATA/R, análisis descriptivo e inferencial, interpretación de resultados, elaboración de tablas y gráficos, y explicación detallada de cada procedimiento.',
        icon: 'analytics',
    },
    {
        question: '¿Pueden ayudarme si ya tengo avances de mi tesis?',
        answer: '¡Por supuesto! Revisamos tu avance actual, identificamos áreas de mejora y continuamos desde donde te quedaste. Muchos estudiantes nos contactan cuando se sienten estancados en algún capítulo específico.',
        icon: 'edit_document',
    },
    {
        question: '¿Cómo funciona el proceso de cotización?',
        answer: 'Es simple: 1) Nos contactas por WhatsApp o el formulario, 2) Nos cuentas sobre tu proyecto y necesidades, 3) Evaluamos el alcance y te enviamos una propuesta detallada, 4) Si aceptas, comenzamos inmediatamente con un asesor asignado.',
        icon: 'request_quote',
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
                {faqData.map((item, index) => (
                    <div
                        key={index}
                        className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === index
                                ? 'border-blue-500 shadow-lg shadow-blue-500/10'
                                : 'border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700'
                            }`}
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex items-center justify-between p-6 text-left"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${openIndex === index
                                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                                        : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                    }`}>
                                    <span className="material-symbols-outlined">{item.icon || 'help'}</span>
                                </div>
                                <h3 className={`font-bold text-lg transition-colors ${openIndex === index
                                        ? 'text-blue-600 dark:text-blue-400'
                                        : 'text-navy-text dark:text-white'
                                    }`}>
                                    {item.question}
                                </h3>
                            </div>
                            <span className={`material-symbols-outlined text-2xl transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-blue-600' : 'text-slate-400'
                                }`}>
                                expand_more
                            </span>
                        </button>

                        <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                            <div className="px-6 pb-6 pt-0">
                                <div className="pl-16">
                                    <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
