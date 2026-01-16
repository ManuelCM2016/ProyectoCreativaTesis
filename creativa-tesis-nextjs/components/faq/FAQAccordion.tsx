'use client';

import { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string | React.ReactNode;
}

const faqData: FAQItem[] = [
    {
        question: '¿Cuánto tiempo toma aprobar un tema de tesis?',
        answer:
            'El tiempo varía según la universidad y la complejidad del tema, pero con nuestra asesoría, solemos lograr la aprobación del plan de tesis en un rango de 2 a 4 semanas. Te ayudamos a estructurar la propuesta para minimizar las correcciones.',
    },
    {
        question: '¿Es plagio usar ChatGPT para mi tesis?',
        answer: (
            <>
                <p>
                    No necesariamente. La IA puede ser una herramienta poderosa para generar ideas, corregir
                    estilo o resumir textos. Sin embargo, copiar y pegar contenido generado por IA sin citar o sin
                    revisión crítica puede considerarse falta de originalidad. Nosotros te enseñamos a usarla
                    éticamente.
                </p>
                <a
                    className="text-primary-blue text-sm font-bold mt-2 inline-flex items-center gap-1 hover:underline font-body"
                    href="#"
                >
                    Lee nuestra guía sobre IA ética
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
            </>
        ),
    },
    {
        question: '¿Qué carreras asesoran en Tacna?',
        answer: (
            <>
                <p>
                    Cubrimos la mayoría de las carreras de ciencias sociales, ingenierías, salud y educación.
                    Trabajamos con estudiantes de la UNJBG, UPT y otras universidades de la región. Si tienes una
                    carrera muy específica, contáctanos para evaluar tu caso.
                </p>
                <div className="mt-3">
                    <button className="text-sm bg-primary-blue/10 text-primary-blue px-3 py-1 rounded-md font-medium hover:bg-primary-blue/20 transition font-body">
                        Consultar por mi carrera
                    </button>
                </div>
            </>
        ),
    },
    {
        question: '¿Realizan el análisis estadístico?',
        answer:
            'Sí, contamos con especialistas en SPSS, R y Excel para realizar el procesamiento de datos y la interpretación de resultados, asegurando que tus conclusiones sean sólidas.',
    },
];

export default function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 font-heading text-navy-text dark:text-white">
                <span className="material-symbols-outlined text-primary-blue">help</span>
                Preguntas Frecuentes
            </h2>

            <div className="flex flex-col gap-4">
                {faqData.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                    >
                        <button
                            onClick={() => toggleItem(index)}
                            className="flex cursor-pointer items-center justify-between gap-4 p-5 font-medium w-full text-left hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                            aria-expanded={openIndex === index}
                        >
                            <span className="text-lg font-semibold text-navy-text dark:text-white font-heading">
                                {item.question}
                            </span>
                            <span
                                className={`material-symbols-outlined transition-transform ${openIndex === index ? '-rotate-180' : ''
                                    }`}
                            >
                                expand_more
                            </span>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                }`}
                        >
                            <div className="px-5 pb-5 pt-0 text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                                {typeof item.answer === 'string' ? <p>{item.answer}</p> : item.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
