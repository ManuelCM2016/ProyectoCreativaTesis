import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Otros Servicios de Investigación | Creativa Tesis',
    description: 'Servicios adicionales para tu investigación académica y desarrollo profesional.',
};

export default function OtrosServiciosPage() {
    return (
        <section className="w-full px-4 md:px-20 py-16 bg-background-light dark:bg-background-dark">
            <div className="max-w-[960px] mx-auto">
                <h1 className="text-navy-text font-heading text-4xl md:text-5xl font-black mb-6 dark:text-white">
                    Otros servicios de investigación
                </h1>
                <p className="text-slate-600 font-body text-xl leading-relaxed mb-12 dark:text-gray-300">
                    Servicios complementarios para apoyar tu desarrollo académico y profesional.
                </p>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                    <span className="material-symbols-outlined text-6xl text-primary-blue mb-4">construction</span>
                    <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-3">
                        Próximamente
                    </h2>
                    <p className="text-slate-600 dark:text-gray-400 font-body max-w-md mx-auto">
                        Estamos ampliando nuestra oferta de servicios para brindarte más opciones de asesoría académica.
                    </p>
                </div>

                <div className="mt-12 text-center">
                    <Button className="h-12 px-8">Contactar para Más Información</Button>
                </div>
            </div>
        </section>
    );
}
