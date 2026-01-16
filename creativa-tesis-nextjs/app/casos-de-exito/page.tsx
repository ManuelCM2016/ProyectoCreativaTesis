import type { Metadata } from 'next';
import { getSuccessCases } from '@/lib/sanity/queries';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Casos de Éxito - Creativa Tesis',
    description:
        'Conoce las historias de éxito de nuestros tesistas que lograron su titulación con nuestra asesoría.',
};

export default async function CasosDeExitoPage() {
    const cases = await getSuccessCases();

    return (
        <div className="w-full px-4 md:px-20 py-16 bg-background-light dark:bg-background-dark">
            <div className="max-w-[1024px] mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-navy-text font-heading text-4xl md:text-5xl font-black mb-4 dark:text-white">
                        Casos de Éxito
                    </h1>
                    <p className="text-slate-600 font-body text-lg max-w-2xl mx-auto dark:text-gray-300">
                        Historias reales de tesistas que alcanzaron sus metas académicas con nuestro acompañamiento.
                    </p>
                </div>

                {cases.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {cases.map((caso: any) => (
                            <Link
                                key={caso._id}
                                href={`/casos-de-exito/${caso.slug.current}`}
                                className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow p-6"
                            >
                                <h2 className="text-navy-text dark:text-white font-heading text-xl font-bold mb-2">
                                    {caso.personName}
                                </h2>
                                {caso.career && (
                                    <p className="text-primary-blue text-sm font-medium mb-3">{caso.career}</p>
                                )}
                                {caso.quote && (
                                    <p className="text-slate-600 dark:text-gray-400 font-body text-sm italic mb-4">
                                        "{caso.quote}"
                                    </p>
                                )}
                                <div className="text-secondary-blue text-sm font-medium">
                                    Ver historia completa →
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-full size-20 flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-4xl text-slate-400">star</span>
                        </div>
                        <h3 className="text-navy-text dark:text-white font-heading text-xl font-bold mb-2">
                            Historias en camino
                        </h3>
                        <p className="text-slate-600 dark:text-gray-400 font-body">
                            Pronto compartiremos más casos de éxito de nuestros tesistas.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
