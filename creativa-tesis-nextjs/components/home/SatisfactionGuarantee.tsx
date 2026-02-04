import Badge from '@/components/ui/Badge';

export default function SatisfactionGuarantee() {
    const guarantees = [
        {
            icon: 'lock',
            title: 'Confidencialidad Total',
            description: 'Tu tesis es 100% tuya y privada',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: 'verified',
            title: 'Revisión Ilimitada',
            description: 'Ajustamos hasta que estés satisfecho',
            color: 'from-emerald-500 to-teal-500',
        },
        {
            icon: 'bolt',
            title: 'Respuesta en 24h',
            description: 'Nunca esperas más de un día',
            color: 'from-amber-500 to-orange-500',
        },
        {
            icon: 'military_tech',
            title: 'Enfoque Aprobatorio',
            description: 'Te acompañamos hasta la aprobación',
            color: 'from-purple-500 to-pink-500',
        },
    ];

    return (
        <section
            className="py-16 lg:py-24 bg-gradient-to-br from-primary-blue/5 via-secondary-blue/5 to-primary-blue/5 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800"
            id="garantias"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12 flex flex-col gap-4 text-center md:items-center">
                    <Badge icon="shield">Nuestro Compromiso</Badge>
                    <h2 className="font-heading text-navy-text text-4xl font-bold tracking-tight md:text-5xl dark:text-white">
                        Garantía de Satisfacción
                    </h2>
                    <p className="mx-auto max-w-[800px] text-slate-600 font-body md:text-lg dark:text-gray-300">
                        Trabajamos contigo hasta que alcances tus objetivos. Estas son nuestras promesas inquebrantables.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {guarantees.map((guarantee, index) => (
                        <div
                            key={index}
                            className="relative group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center"
                        >
                            {/* Animated icon */}
                            <div className="relative mb-6 mx-auto">
                                <div
                                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${guarantee.color} flex items-center justify-center mx-auto transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                                >
                                    <span className="material-symbols-outlined text-white text-4xl">
                                        {guarantee.icon}
                                    </span>
                                </div>
                                {/* Glow effect */}
                                <div
                                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${guarantee.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
                                />
                            </div>

                            {/* Title */}
                            <h3 className="font-heading text-xl font-bold text-navy-text dark:text-white mb-3">
                                {guarantee.title}
                            </h3>

                            {/* Description */}
                            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                                {guarantee.description}
                            </p>

                            {/* Checkmark */}
                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                <div className="flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-green-500 text-lg">
                                        check_circle
                                    </span>
                                    <span className="text-xs text-slate-500 dark:text-gray-400 font-semibold">
                                        Garantizado
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional note */}
                <div className="mt-10 text-center">
                    <p className="text-slate-500 dark:text-gray-400 text-sm max-w-2xl mx-auto">
                        * Nuestro compromiso es apoyarte hasta lograr la aprobación de tu tesis, con revisiones y
                        ajustes incluidos en el servicio.
                    </p>
                </div>
            </div>
        </section>
    );
}
