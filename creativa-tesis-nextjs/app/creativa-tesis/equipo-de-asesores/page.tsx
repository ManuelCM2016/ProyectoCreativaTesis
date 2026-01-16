import type { Metadata } from 'next';
import { getAdvisors } from '@/lib/sanity/queries';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Equipo de Asesores - Creativa Tesis',
    description:
        'Conoce a nuestro equipo de asesores especializados en metodología de investigación, redacción académica y análisis estadístico.',
};

export default async function EquipoDeAsesoresPage() {
    const advisors = await getAdvisors();

    return (
        <div className="w-full px-4 md:px-20 py-16 bg-background-light dark:bg-background-dark">
            <div className="max-w-[1024px] mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-navy-text font-heading text-4xl md:text-5xl font-black mb-4 dark:text-white">
                        Equipo de Asesores
                    </h1>
                    <p className="text-slate-600 font-body text-lg max-w-2xl mx-auto dark:text-gray-300">
                        Nuestro equipo está conformado por profesionales con amplia experiencia en metodología de
                        investigación, redacción académica y análisis de datos.
                    </p>
                </div>

                {advisors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {advisors.map((advisor: any) => (
                            <div
                                key={advisor._id}
                                className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow"
                            >
                                {advisor.photo && (
                                    <div className="relative w-full aspect-square">
                                        <Image
                                            src={advisor.photo}
                                            alt={advisor.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <h3 className="text-navy-text dark:text-white font-heading text-xl font-bold mb-1">
                                        {advisor.name}
                                    </h3>
                                    <p className="text-primary-blue font-body text-sm mb-3">{advisor.role}</p>
                                    {advisor.bio && (
                                        <p className="text-slate-600 dark:text-gray-400 font-body text-sm leading-relaxed mb-4">
                                            {advisor.bio}
                                        </p>
                                    )}
                                    {advisor.specialties && advisor.specialties.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {advisor.specialties.map((specialty: string, idx: number) => (
                                                <span
                                                    key={idx}
                                                    className="bg-secondary-blue/10 text-navy-text dark:text-white text-xs px-3 py-1 rounded-full"
                                                >
                                                    {specialty}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-full size-20 flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-4xl text-slate-400">group</span>
                        </div>
                        <h3 className="text-navy-text dark:text-white font-heading text-xl font-bold mb-2">
                            Equipo en construcción
                        </h3>
                        <p className="text-slate-600 dark:text-gray-400 font-body">
                            Estamos actualizando los perfiles de nuestro equipo. Vuelve pronto.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
