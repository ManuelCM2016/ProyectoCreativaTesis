import Badge from '@/components/ui/Badge';

export default function StudentTimeline() {
    const milestones = [
        {
            week: 'Semana 1-2',
            title: 'De la Confusión a la Claridad',
            description: 'Identificamos y validamos tu tema de investigación',
            from: '😰',
            to: '😊',
            achievement: 'Tema claro y aprobado',
        },
        {
            week: 'Mes 1',
            title: 'Propuesta Sólida',
            description: 'Tu propuesta está lista y aprobada por el jurado',
            from: '📝',
            to: '✅',
            achievement: 'Propuesta aprobada',
        },
        {
            week: 'Mes 2-3',
            title: 'Marco Teórico Completo',
            description: 'Fundamentación teórica robusta y bien estructurada',
            from: '📚',
            to: '📖',
            achievement: 'Base teórica sólida',
        },
        {
            week: 'Mes 4',
            title: 'Datos Recolectados',
            description: 'Información recopilada y lista para análisis',
            from: '🔍',
            to: '📊',
            achievement: 'Datos validados',
        },
        {
            week: 'Mes 5-6',
            title: 'Análisis Completado',
            description: 'Resultados procesados y discutidos profesionalmente',
            from: '💻',
            to: '📈',
            achievement: 'Análisis finalizado',
        },
        {
            week: 'Mes 7',
            title: '¡Graduación!',
            description: 'Tesis aprobada y lista para sustentación exitosa',
            from: '🎯',
            to: '🎓',
            achievement: 'Graduado(a)',
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-white dark:bg-slate-900" id="recorrido">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12 flex flex-col gap-4 text-center md:items-center">
                    <Badge icon="timeline">Tu Recorrido</Badge>
                    <h2 className="font-heading text-navy-text text-4xl font-bold tracking-tight md:text-5xl dark:text-white">
                        El Viaje de Nuestros Estudiantes
                    </h2>
                    <p className="mx-auto max-w-[800px] text-slate-600 font-body md:text-lg dark:text-gray-300">
                        Mira cómo transformamos el estrés en celebración, paso a paso.
                    </p>
                </div>

                {/* Timeline */}
                <div className="max-w-6xl mx-auto">
                    {/* Desktop: Horizontal */}
                    <div className="hidden lg:block relative">
                        {/* Connecting line */}
                        <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue via-secondary-blue to-primary-blue opacity-30" />

                        <div className="grid grid-cols-6 gap-4">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="relative text-center">
                                    {/* Emoji transition */}
                                    <div className="flex items-center justify-center gap-2 mb-4 text-4xl">
                                        <span className="opacity-50">{milestone.from}</span>
                                        <span className="material-symbols-outlined text-primary-blue text-2xl">
                                            arrow_forward
                                        </span>
                                        <span>{milestone.to}</span>
                                    </div>

                                    {/* Dot */}
                                    <div className="relative z-10 w-6 h-6 bg-primary-blue rounded-full mx-auto mb-4 shadow-lg" />

                                    {/* Content card */}
                                    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md border border-slate-100 dark:border-slate-700 min-h-[180px]">
                                        <div className="text-xs font-bold text-primary-blue mb-2">
                                            {milestone.week}
                                        </div>
                                        <h3 className="font-heading text-sm font-bold text-navy-text dark:text-white mb-2">
                                            {milestone.title}
                                        </h3>
                                        <p className="text-xs text-slate-600 dark:text-gray-400 mb-3">
                                            {milestone.description}
                                        </p>
                                        <div className="inline-block px-2 py-1 bg-green-50 dark:bg-green-900/20 rounded text-xs text-green-600 dark:text-green-400 font-semibold">
                                            ✓ {milestone.achievement}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile: Vertical */}
                    <div className="lg:hidden space-y-6">
                        {milestones.map((milestone, index) => (
                            <div key={index} className="flex gap-4">
                                {/* Left: Emoji + Line */}
                                <div className="flex flex-col items-center">
                                    <div className="text-3xl mb-2">{milestone.to}</div>
                                    <div className="w-4 h-4 bg-primary-blue rounded-full flex-shrink-0" />
                                    {index !== milestones.length - 1 && (
                                        <div className="w-0.5 h-full bg-primary-blue/30 mt-2" />
                                    )}
                                </div>

                                {/* Right: Content */}
                                <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md border border-slate-100 dark:border-slate-700 mb-4">
                                    <div className="text-xs font-bold text-primary-blue mb-1">{milestone.week}</div>
                                    <h3 className="font-heading text-base font-bold text-navy-text dark:text-white mb-1">
                                        {milestone.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-gray-400 mb-2">
                                        {milestone.description}
                                    </p>
                                    <div className="inline-block px-2 py-1 bg-green-50 dark:bg-green-900/20 rounded text-xs text-green-600 dark:text-green-400 font-semibold">
                                        ✓ {milestone.achievement}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <p className="text-slate-600 dark:text-gray-300 mb-4 text-lg font-semibold">
                        ¿Listo para comenzar tu propio viaje de éxito?
                    </p>
                </div>
            </div>
        </section>
    );
}
