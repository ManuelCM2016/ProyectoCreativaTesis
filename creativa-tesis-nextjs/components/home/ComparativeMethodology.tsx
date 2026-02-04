import Badge from '@/components/ui/Badge';

export default function ComparativeMethodology() {
    const comparisons = [
        {
            metric: 'Tiempo Promedio',
            without: '12-18 meses',
            with: '6-8 meses',
            icon: 'schedule',
        },
        {
            metric: 'Tasa de Finalización',
            without: '60%',
            with: '95%',
            icon: 'trending_up',
        },
        {
            metric: 'Nivel de Estrés',
            without: 'Alto',
            with: 'Controlado',
            icon: 'sentiment_satisfied',
        },
        {
            metric: 'Revisiones Necesarias',
            without: '5-8 veces',
            with: '1-2 veces',
            icon: 'fact_check',
        },
        {
            metric: 'Claridad del Proceso',
            without: 'Confuso',
            with: 'Cristalino',
            icon: 'lightbulb',
        },
        {
            metric: 'Soporte',
            without: 'Ocasional',
            with: '24/7',
            icon: 'support_agent',
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-light-grey-bg dark:bg-background-dark" id="metodologia">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12 flex flex-col gap-4 text-center md:items-center">
                    <Badge icon="compare_arrows">La Diferencia es Clara</Badge>
                    <h2 className="font-heading text-navy-text text-4xl font-bold tracking-tight md:text-5xl dark:text-white">
                        Con Nuestra Asesoría vs Sin Ella
                    </h2>
                    <p className="mx-auto max-w-[800px] text-slate-600 font-body md:text-lg dark:text-gray-300">
                        Los números hablan por sí solos. Mira cómo nuestra metodología marca la diferencia.
                    </p>
                </div>

                {/* Comparison Table */}
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className=""></div>
                        <div className="text-center">
                            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
                                <span className="material-symbols-outlined text-red-500 text-3xl mb-2">close</span>
                                <h3 className="font-heading text-lg font-bold text-navy-text dark:text-white">
                                    Sin Asesoría
                                </h3>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                                <span className="material-symbols-outlined text-green-500 text-3xl mb-2">
                                    check_circle
                                </span>
                                <h3 className="font-heading text-lg font-bold text-primary-blue dark:text-secondary-blue">
                                    Con Creativa Tesis
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Rows */}
                    <div className="space-y-3">
                        {comparisons.map((item, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-3 gap-4 items-center bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700"
                            >
                                {/* Metric */}
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary-blue text-2xl">
                                        {item.icon}
                                    </span>
                                    <span className="font-semibold text-navy-text dark:text-white text-sm">
                                        {item.metric}
                                    </span>
                                </div>

                                {/* Without */}
                                <div className="text-center">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                        <span className="material-symbols-outlined text-red-500 text-sm">close</span>
                                        <span className="text-slate-700 dark:text-gray-300 font-medium text-sm">
                                            {item.without}
                                        </span>
                                    </div>
                                </div>

                                {/* With */}
                                <div className="text-center">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                        <span className="material-symbols-outlined text-green-500 text-sm">done</span>
                                        <span className="text-primary-blue dark:text-secondary-blue font-bold text-sm">
                                            {item.with}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-10 text-center">
                        <p className="text-slate-600 dark:text-gray-300 mb-4 text-lg font-semibold">
                            La decisión es tuya. ¿Quieres resultados comprobados?
                        </p>
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-blue to-secondary-blue text-white rounded-full font-semibold hover:shadow-lg transition-shadow">
                            <span>Comenzar Ahora</span>
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
