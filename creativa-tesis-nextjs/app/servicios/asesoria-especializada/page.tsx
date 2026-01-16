import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Asesoría Especializada para Tesis | Creativa Tesis',
    description:
        'Servicios especializados de asesoría en metodología, análisis estadístico, redacción académica y publicación científica.',
};

export default function AsesoriaEspecializadaPage() {
    return (
        <section className="w-full px-4 md:px-20 py-16 ">
            <div className="max-w-[960px] mx-auto">
                <h1 className="text-navy-text font-heading text-4xl md:text-5xl font-black mb-6 dark:text-white">
                    Asesoría especializada para tesis y proyectos de investigación
                </h1>
                <p className="text-slate-600 font-body text-xl leading-relaxed mb-12 dark:text-gray-300">
                    Servicios especializados en áreas críticas de tu investigación: metodología, estadística,
                    redacción académica y más. Asistencia puntual o integral según tus necesidades.
                </p>

                <div className="space-y-12">
                    <div>
                        <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-4">
                            Asesoría metodológica
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                            Orientación experta en diseño de investigación, selección de enfoque metodológico, desarrollo
                            de instrumentos y estrategias de recolección de datos validados científicamente.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-4">
                            Análisis estadístico
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                            Procesamiento y análisis de datos cuantitativos con software especializado (SPSS, R, Stata,
                            AMOS). Estadística descriptiva, inferencial, análisis multivariado y modelación estructural.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-4">
                            Redacción académica y estilo
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                            Corrección de estilo, coherencia textual y aplicación rigurosa de normas (APA 7ma edición,
                            Vancouver, ISO, Chicago). Revisión gramatical y ortográfica profesional.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-4">
                            Preparación para publicación
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                            Transformación de tu tesis en artículos científicos. Orientación para someter a revistas
                            indexadas, manejo de proceso editorial y respuesta a comentarios de revisores.
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Button className="h-12 px-8">Consultar Servicios</Button>
                </div>
            </div>
        </section>
    );
}

