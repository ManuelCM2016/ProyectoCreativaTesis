import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Tesis de Pregrado - Asesoría Paso a Paso | Creativa Tesis',
    description:
        'Asesoría integral para tu tesis de pregrado: desde la elección del tema hasta la sustentación. Metodología garantizada.',
};

export default function TesisPregradoPage() {
    return (
        <>
            <section className="w-full px-4 md:px-20 py-16 ">
                <div className="max-w-[960px] mx-auto">
                    <h1 className="text-navy-text font-heading text-4xl md:text-5xl font-black mb-6 dark:text-white">
                        Tesis de pregrado: asesoría paso a paso
                    </h1>
                    <p className="text-slate-600 font-body text-xl leading-relaxed mb-8 dark:text-gray-300">
                        Te acompañamos en cada etapa de tu tesis de pregrado con metodología probada y resultados
                        garantizados. Desde la primera idea hasta tu sustentación exitosa.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        <div className="flex flex-col gap-6">
                            <div>
                                <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-4">
                                    Elección y delimitación del tema
                                </h2>
                                <p className="text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                                    Identificamos temas viables y relevantes según tu carrera profesional. Te ayudamos a
                                    delimitar el problema de investigación con precisión metodológica.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-4">
                                    Marco teórico y antecedentes
                                </h2>
                                <p className="text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                                    Construimos un marco conceptual sólido con fuentes académicas actualizadas y revisión
                                    exhaustiva de investigaciones previas.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-4">
                                    Metodología y diseño
                                </h2>
                                <p className="text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                                    Diseñamos la metodología adecuada para tu investigación: cuantitativa, cualitativa o
                                    mixta. Incluye instrumentos de recolección y validación de datos.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-4">
                                    Redacción y sustentación
                                </h2>
                                <p className="text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                                    Redacción académica impecable según normas APA y preparación completa para tu defensa
                                    oral con simulacros y retroalimentación.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                <h3 className="text-navy-text dark:text-white font-heading text-xl font-bold mb-4">
                                    ¿Qué incluye?
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        'Asesoría personalizada con expertos',
                                        'Revisión exhaustiva de cada capítulo',
                                        'Validación de instrumentos',
                                        'Análisis estadístico (si aplica)',
                                        'Corrección de estilo y normas APA',
                                        'Preparación para sustentación',
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="material-symbols-outlined text-primary-blue mt-0.5">
                                                check_circle
                                            </span>
                                            <span className="text-slate-600 dark:text-gray-400 font-body">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-secondary-blue/10 dark:bg-secondary-blue/20 p-6 rounded-xl">
                                <h3 className="text-navy-text dark:text-white font-heading text-lg font-bold mb-2">
                                    Garantía de calidad
                                </h3>
                                <p className="text-slate-600 dark:text-gray-400 font-body text-sm">
                                    Revisión anti-plagio, cumplimiento de normas institucionales y acompañamiento hasta la
                                    aprobación.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <Button className="h-12 px-8">Solicitar Asesoría</Button>
                    </div>
                </div>
            </section>
        </>
    );
}

