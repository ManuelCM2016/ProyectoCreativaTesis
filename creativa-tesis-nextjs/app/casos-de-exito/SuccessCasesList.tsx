'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';

interface SuccessCasesListProps {
    cases: any[];
}

export default function SuccessCasesList({ cases }: SuccessCasesListProps) {
    const [selectedCase, setSelectedCase] = useState<any | null>(null);

    // Close modal on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedCase(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedCase) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedCase]);

    if (!cases || cases.length === 0) {
        return (
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
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cases.map((caso: any) => (
                    <div
                        key={caso._id}
                        onClick={() => setSelectedCase(caso)}
                        className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow p-6 cursor-pointer group"
                    >
                        <h2 className="text-navy-text dark:text-white font-heading text-xl font-bold mb-2 group-hover:text-primary-blue transition-colors">
                            {caso.personName}
                        </h2>
                        {caso.career && (
                            <p className="text-primary-blue text-sm font-medium mb-3">{caso.career}</p>
                        )}
                        {caso.quote && (
                            <p className="text-slate-600 dark:text-gray-400 font-body text-sm italic mb-4 line-clamp-3">
                                "{caso.quote}"
                            </p>
                        )}
                        <div className="text-secondary-blue text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Ver historia completa <span className="text-lg">→</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedCase && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div
                        className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto relative animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedCase(null)}
                            className="absolute top-4 right-4 z-10 p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">close</span>
                        </button>

                        <div className="p-8 md:p-12">
                            {/* Header Content */}
                            <div className="flex flex-col md:flex-row gap-8 items-start mb-8 border-b border-slate-100 dark:border-slate-800 pb-8">
                                {selectedCase.avatar && (
                                    <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-lg">
                                        <Image
                                            src={selectedCase.avatar}
                                            alt={selectedCase.personName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-black text-navy-text dark:text-white font-heading mb-2">
                                        {selectedCase.title || 'Caso de Éxito'}
                                    </h2>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-xl font-bold text-primary-blue">
                                            {selectedCase.personName}
                                        </h3>
                                        {selectedCase.career && (
                                            <p className="text-slate-600 dark:text-gray-400 font-medium">
                                                {selectedCase.career}
                                            </p>
                                        )}
                                        {selectedCase.university && (
                                            <p className="text-slate-500 dark:text-gray-500 text-sm">
                                                {selectedCase.university}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Quote */}
                            {selectedCase.quote && (
                                <blockquote className="text-slate-600 dark:text-gray-300 font-body text-lg italic border-l-4 border-primary-blue pl-6 mb-8 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-r-lg">
                                    "{selectedCase.quote}"
                                </blockquote>
                            )}

                            {/* Tags/Badges */}
                            {selectedCase.resultsBadges && selectedCase.resultsBadges.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {selectedCase.resultsBadges.map((badge: string, idx: number) => (
                                        <span
                                            key={idx}
                                            className="bg-secondary-blue/10 text-navy-text dark:text-white px-4 py-2 rounded-full text-sm font-medium"
                                        >
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Main Content */}
                            {selectedCase.content && (
                                <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-gray-300">
                                    <PortableText value={selectedCase.content} />
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Click outside to close */}
                    <div className="absolute inset-0 -z-10" onClick={() => setSelectedCase(null)}></div>
                </div>
            )}
        </>
    );
}

