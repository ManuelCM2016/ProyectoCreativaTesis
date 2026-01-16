import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Tesis de Postgrado - Rigor Metodológico | Creativa Tesis',
    description:
        'Asesoría especializada para tesis de postgrado con rigor metodológico y estándares académicos de excelencia.',
};

export default function TesisPostgradoPage() {
    return (
        <section className="w-full px-4 md:px-20 py-16 ">
            <div className="max-w-[960px] mx-auto">
                <h1 className="text-navy-text font-heading text-4xl md:text-5xl font-black mb-6 dark:text-white">
                    Tesis de postgrado: rigor metodológico y excelencia académica
                </h1>
                <p className="text-slate-600 font-body text-xl leading-relaxed mb-12 dark:text-gray-300">
                    Asesoría especializada para investigaciones de postgrado que demandan el más alto rigor científico y
                    metodológico. Trabajamos con estándares internacionales.
                </p>

                <div className="space-y-12">
                    <div>
                        <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-4">
                            Diseño metodológico avanzado
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                            Desarrollamos diseños de investigación sofisticados que cumplen con los estándares de programas
                            de postgrado. Metodología cuantitativa, cualitativa o mixta con validación rigurosa.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-4">
                            Revisión sistemática de literatura
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                            Revisión exhaustiva de literatura académica de alto impacto. Incluye análisis de investigaciones
                            publicadas en revistas indexadas (Scopus, WoS, SciELO).
                        </p>
                    </div>

                    <div>
                        <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-4">
                            Análisis estadístico especializado
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                            Aplicación de técnicas estadísticas avanzadas según la naturaleza de tu investigación. Uso de
                            software especializado (SPSS, R, Stata, AMOS) con interpretación detallada de resultados.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-4">
                            Publicación científica
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                            Preparación de artículos científicos derivados de tu tesis para publicación en revistas indexadas.
                            Orientación en el proceso editorial y respuesta a revisores.
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Button className="h-12 px-8">Consultar Ahora</Button>
                </div>
            </div>
        </section>
    );
}

