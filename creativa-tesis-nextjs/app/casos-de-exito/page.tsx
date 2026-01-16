import type { Metadata } from 'next';
import { getSuccessCases } from '@/lib/sanity/queries';
import SuccessCasesList from './SuccessCasesList';

export const metadata: Metadata = {
    title: 'Casos de Éxito - Creativa Tesis',
    description:
        'Conoce las historias de éxito de nuestros tesistas que lograron su titulación con nuestra asesoría.',
};

export default async function CasosDeExitoPage() {
    const cases = await getSuccessCases();

    return (
        <div className="w-full px-4 md:px-20 py-16 ">
            <div className="max-w-[1024px] mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-navy-text font-heading text-4xl md:text-5xl font-black mb-4 dark:text-white">
                        Casos de Éxito
                    </h1>
                    <p className="text-slate-600 font-body text-lg max-w-2xl mx-auto dark:text-gray-300">
                        Historias reales de tesistas que alcanzaron sus metas académicas con nuestro acompañamiento.
                    </p>
                </div>

                <SuccessCasesList cases={cases} />
            </div>
        </div>
    );
}

