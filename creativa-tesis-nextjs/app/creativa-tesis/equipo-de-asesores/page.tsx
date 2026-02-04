import type { Metadata } from 'next';
import { getAdvisors } from '@/lib/sanity/queries';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Equipo de Asesores - Creativa Tesis',
    description:
        'Conoce a nuestro equipo de asesores especializados en metodología de investigación, redacción académica y análisis estadístico.',
};

// Social media icon components
const SocialIcon = ({ platform }: { platform: string }) => {
    const icons: Record<string, string> = {
        linkedin:
            'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
        twitter:
            'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z',
        instagram:
            'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
        facebook:
            'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z',
    };

    return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d={icons[platform] || ''} />
        </svg>
    );
};

export default async function EquipoDeAsesoresPage() {
    const advisors = await getAdvisors();

    return (
        <div className="w-full px-4 md:px-8 lg:px-20 py-16">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-navy-text font-heading text-4xl md:text-5xl font-black mb-4 dark:text-white">
                        Equipo de Asesores
                    </h1>
                    <p className="text-slate-600 font-body text-lg max-w-2xl mx-auto dark:text-gray-300">
                        Nuestro equipo está conformado por profesionales con amplia experiencia en metodología de
                        investigación, redacción académica y análisis de datos.
                    </p>
                </div>

                {advisors.length > 0 ? (
                    <div className="space-y-12">
                        {advisors.map((advisor: any) => (
                            <div key={advisor._id} className="w-full">
                                {/* Horizontal 3-Card Layout */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                    {/* CARD 1: Photo + Name + Role + Experience + Email + Social */}
                                    <div className="lg:col-span-3">
                                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                                            {/* Photo */}
                                            <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden group">
                                                {advisor.photo ? (
                                                    <Image
                                                        src={advisor.photo}
                                                        alt={advisor.name}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-6xl text-slate-400">
                                                            person
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Name and Role */}
                                            <div className="mb-4">
                                                <h3 className="text-navy-text dark:text-white font-heading text-xl font-bold mb-1">
                                                    {advisor.name}
                                                </h3>
                                                <p className="text-primary-blue font-semibold text-sm">
                                                    {advisor.role}
                                                </p>
                                            </div>

                                            {/* Years of Experience */}
                                            {advisor.yearsOfExperience !== undefined &&
                                                advisor.yearsOfExperience !== null && (
                                                    <div className="flex items-center gap-2 mb-3 text-slate-700 dark:text-gray-300">
                                                        <span className="material-symbols-outlined text-amber-500 text-lg">
                                                            workspace_premium
                                                        </span>
                                                        <span className="font-semibold text-xs">
                                                            +{advisor.yearsOfExperience}{' '}
                                                            {advisor.yearsOfExperience === 1 ? 'año' : 'años'} de
                                                            experiencia
                                                        </span>
                                                    </div>
                                                )}

                                            {/* Email */}
                                            {advisor.corporateEmail && (
                                                <a
                                                    href={`mailto:${advisor.corporateEmail}`}
                                                    className="flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-primary-blue dark:hover:text-primary-blue transition-colors mb-4 text-xs"
                                                >
                                                    <span className="material-symbols-outlined text-base">mail</span>
                                                    <span className="underline break-all">
                                                        {advisor.corporateEmail}
                                                    </span>
                                                </a>
                                            )}

                                            {/* Social Media */}
                                            {advisor.socialMedia && advisor.socialMedia.length > 0 && (
                                                <div className="flex gap-2 mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                                                    {advisor.socialMedia.map((social: any, idx: number) => (
                                                        <a
                                                            key={idx}
                                                            href={social.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 bg-gradient-to-br from-primary-blue to-secondary-blue text-white rounded-full hover:shadow-lg hover:scale-110 transition-all duration-300"
                                                            aria-label={social.platform}
                                                        >
                                                            <SocialIcon platform={social.platform} />
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* CARD 2: Biography */}
                                    <div className="lg:col-span-5">
                                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 h-full">
                                            <h4 className="text-navy-text dark:text-white font-heading text-lg font-bold mb-3">
                                                Biografía
                                            </h4>
                                            {advisor.bio ? (
                                                <p className="text-slate-600 dark:text-gray-400 font-body text-sm leading-relaxed">
                                                    {advisor.bio}
                                                </p>
                                            ) : (
                                                <p className="text-slate-400 dark:text-gray-500 font-body text-sm italic">
                                                    Biografía no disponible
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* CARD 3: Specialties */}
                                    <div className="lg:col-span-4">
                                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 h-full">
                                            <h4 className="text-navy-text dark:text-white font-heading text-lg font-bold mb-4">
                                                Áreas de Especialidad
                                            </h4>
                                            {advisor.specialties && advisor.specialties.length > 0 ? (
                                                <ul className="space-y-2">
                                                    {advisor.specialties.map((specialty: string, idx: number) => (
                                                        <li
                                                            key={idx}
                                                            className="flex items-start gap-2 text-slate-700 dark:text-gray-300"
                                                        >
                                                            <span className="material-symbols-outlined text-primary-blue text-sm mt-0.5">
                                                                chevron_right
                                                            </span>
                                                            <span className="font-medium text-sm">{specialty}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-slate-400 dark:text-gray-500 font-body text-sm italic">
                                                    No hay especialidades registradas
                                                </p>
                                            )}
                                        </div>
                                    </div>
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
