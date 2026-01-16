import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Tesis Doctoral - Acompañamiento Integral | Creativa Tesis',
    description:
        'Asesoría especializada para tesis doctoral con máximos estándares de rigor científico y originalidad.',
};

export default function TesisDoctoralPage() {
    return (
        <section className="w-full px-4 md:px-20 py-16 ">
            <div className="max-w-[960px] mx-auto">
                <h1 className="text-navy-text font-heading text-4xl md:text-5xl font-black mb-6 dark:text-white">
                    Tesis doctoral: acompañamiento integral para investigación de alto impacto
                </h1>
                <p className="text-slate-600 font-body text-xl leading-relaxed mb-12 dark:text-gray-300">
                    La investigación doctoral exige los más altos estándares de rigor científico y originalidad.
                    Te acompañamos en este desafío académico con experiencia y metodología probada.
                </p>

                <div className="space-y-12">
                    <div>
                        <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-4">
                            Originalidad y contribución teórica
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                            Aseguramos que tu tesis doctoral aporte conocimiento nuevo y significativo. Desarrollo de
                            marcos conceptuales innovadores o extensión/refinamiento de teorías existentes.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-4">
                            Diseño de investigación complejo
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                            Asesoría en diseños avanzados: experimentales, cuasiexperimentales, estudios longitudinales,
                            investigación-acción, etnografía, teoría fundamentada, entre otros.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-4">
                            Publicación en revistas de alto impacto
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                            Preparación de artículos científicos derivados de tu tesis para publicación en revistas Q1 y Q2
                            (Scopus, WoS). Orientación en el proceso de revisión por pares.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-4">
                            Defensa doctoral
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                            Preparación exhaustiva para la defensa de tesis doctoral. Simulación de sesiones, anticipación
                            de preguntas críticas y estrategias de argumentación académica.
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Button className="h-12 px-8">Agendar Consulta</Button>
                </div>
            </div>
        </section>
    );
}

