import Badge from '@/components/ui/Badge';

export default function SuccessCasesSection() {
    const cases = [
        {
            area: 'Ciencias de la Salud',
            icon: 'local_hospital',
            challenge: 'Tesis sobre COVID-19',
            time: '7 meses',
            grade: '18/20',
            achievement: 'Primera sustentación',
            color: 'from-emerald-500 to-teal-500',
        },
        {
            area: 'Ingeniería Civil',
            icon: 'engineering',
            challenge: 'Análisis sísmico con ETABS',
            time: '6 meses',
            grade: '19/20',
            achievement: 'Publicación en revista',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            area: 'Ciencias Sociales',
            icon: 'groups',
            challenge: 'Estudio cualit ativo de impacto social',
            time: '8 meses',
            grade: '17/20',
            achievement: 'Mención honorífica',
            color: 'from-purple-500 to-pink-500',
        },
        {
            area: 'Educación',
            icon: 'school',
            challenge: 'Propuesta pedagógica innovadora',
            time: '7 meses',
            grade: '18/20',
            achievement: 'Aprobado con mérito',
            color: 'from-orange-500 to-amber-500',
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900" id="casos-exito">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12 flex flex-col gap-4 text-center md:items-center">
                    <Badge icon="workspace_premium">Resultados Comprobados</Badge>
                    <h2 className="font-heading text-navy-text text-4xl font-bold tracking-tight md:text-5xl dark:text-white">
                        Casos de Éxito en Números
                    </h2>
                    <p className="mx-auto max-w-[800px] text-slate-600 font-body md:text-lg dark:text-gray-300">
                        Proyectos reales, resultados tangibles. Así es como ayudamos a nuestros estudiantes a lograr
                        sus metas académicas.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cases.map((caso, index) => (
                        <div
                            key={index}
                            className="relative group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        >
                            {/* Gradient header */}
                            <div
                                className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${caso.color}`}
                            />

                            {/* Icon */}
                            <div
                                className={`w-14 h-14 rounded-full bg-gradient-to-br ${caso.color} flex items-center justify-center mb-4`}
                            >
                                <span className="material-symbols-outlined text-white text-2xl">{caso.icon}</span>
                            </div>

                            {/* Area */}
                            <h3 className="font-heading text-lg font-bold text-navy-text dark:text-white mb-2">
                                {caso.area}
                            </h3>

                            {/* Challenge */}
                            <p className="text-slate-600 dark:text-gray-400 text-sm mb-4 italic">
                                "{caso.challenge}"
                            </p>

                            {/* Metrics */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="material-symbols-outlined text-primary-blue text-base">
                                        schedule
                                    </span>
                                    <span className="text-slate-700 dark:text-gray-300 font-semibold">
                                        {caso.time}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="material-symbols-outlined text-amber-500 text-base">star</span>
                                    <span className="text-slate-700 dark:text-gray-300 font-semibold">
                                        Nota: {caso.grade}
                                    </span>
                                </div>
                            </div>

                            {/* Achievement badge */}
                            <div className="flex items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                                <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                <span className="text-green-600 dark:text-green-400 text-xs font-semibold">
                                    {caso.achievement}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats summary */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="text-4xl font-black text-primary-blue mb-2">100+</div>
                        <div className="text-sm text-slate-600 dark:text-gray-400">Tesis Completadas</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-black text-primary-blue mb-2">95%</div>
                        <div className="text-sm text-slate-600 dark:text-gray-400">Tasa de Aprobación</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-black text-primary-blue mb-2">7.5</div>
                        <div className="text-sm text-slate-600 dark:text-gray-400">Meses Promedio</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-black text-primary-blue mb-2">24/7</div>
                        <div className="text-sm text-slate-600 dark:text-gray-400">Soporte Disponible</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
