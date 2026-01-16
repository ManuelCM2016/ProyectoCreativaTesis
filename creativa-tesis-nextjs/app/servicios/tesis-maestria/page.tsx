import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Tesis de Maestría - Asesoría Especializada | Creativa Tesis',
    description:
        'Asesoría integral para tu tesis de maestría con metodología avanzada y enfoque en contribución científica.',
};

export default function TesisMaestriaPage() {
    return (
        <section className="w-full px-4 md:px-20 py-16 bg-background-light dark:bg-background-dark">
            <div className="max-w-[960px] mx-auto">
                <h1 className="text-navy-text font-heading text-4xl md:text-5xl font-black mb-6 dark:text-white">
                    Tesis de maestría: asesoría con enfoque en contribución científica
                </h1>
                <p className="text-slate-600 font-body text-xl leading-relaxed mb-12 dark:text-gray-300">
                    Tu tesis de maestría requiere aportes significativos al conocimiento. Te guiamos para que tu
                    investigación genere impacto académico y profesional.
                </p>

                <div className="space-y-12">
                    <div>
                        <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-4">
                            Identificación de vacíos de investigación
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                            Análisis profundo de la literatura para identificar vacíos teóricos o empíricos donde tu tesis
                            pueda hacer una contribución originaly relevante.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-4">
                            Marco teórico consolidado
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                            Construcción de un andamiaje teórico sólido que sustente tu investigación. Integración de
                            teorías clásicas y contemporáneas relevantes a tu campo de estudio.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-4">
                            Metodología robusta
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                            Diseño metodológico que garantice validez y confiabilidad de resultados. Incluye validación de
                            instrumentos por juicio de expertos y pruebas piloto.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-4">
                            Discusión y conclusiones con impacto
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 font-body leading-relaxed">
                            Interpretación profunda de resultados y formulación de conclusiones que destaquen la
                            contribución de tu investigación al campo profesional y académico.
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Button className="h-12 px-8">Solicitar Información</Button>
                </div>
            </div>
        </section>
    );
}
