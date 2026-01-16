import Badge from '@/components/ui/Badge';

export default function ProblemsAndSolutions() {
    const problems = [
        {
            icon: 'error',
            title: 'Estrés y Ansiedad',
            description: 'La carga de la tesis puede ser abrumadora. Evita el bloqueo y el desgaste mental.',
        },
        {
            icon: 'calendar_today',
            title: 'Plazos Inmanejables',
            description: 'La gestión del tiempo es clave. No dejes que las fechas límite te superen.',
        },
        {
            icon: 'question_mark',
            title: 'Falta de Claridad',
            description: 'Desde la elección del tema hasta la metodología, la confusión puede paralizarte.',
        },
    ];

    const solutions = [
        {
            icon: 'check_circle',
            title: 'Soporte Continuo',
            description: 'Con asesoría experta y acompañamiento, mantén la calma y el enfoque.',
        },
        {
            icon: 'schedule',
            title: 'Cronogramas Efectivos',
            description: 'Diseñamos un plan de trabajo realista que te permite avanzar con seguridad.',
        },
        {
            icon: 'lightbulb_outline',
            title: 'Guía Estratégica',
            description: 'Definimos tu tema y objetivos con precisión, garantizando un camino claro al éxito.',
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-light-grey-bg dark:bg-slate-900" id="problema-solucion">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12 flex flex-col gap-4 text-center md:items-center">
                    <Badge icon="report">¿Te sientes identificado?</Badge>
                    <h2 className="font-heading text-navy-text text-4xl font-bold tracking-tight md:text-5xl dark:text-white">
                        Supera los Obstáculos en tu Tesis
                    </h2>
                    <p className="mx-auto max-w-[800px] text-slate-600 font-body md:text-lg dark:text-gray-300">
                        Entendemos tus desafíos: la presión, los plazos ajustados y la incertidumbre. En Creativa
                        Tesis, transformamos esos problemas en soluciones claras y resultados exitosos.
                    </p>
                </div>

                <div className="grid gap-12 md:grid-cols-2 lg:gap-16 items-start">
                    {/* Problems Column */}
                    <div className="flex flex-col gap-8">
                        {problems.map((problem, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 p-4 rounded-lg bg-white shadow-subtle dark:bg-slate-800"
                            >
                                <span className="material-symbols-outlined text-red-500 text-3xl">{problem.icon}</span>
                                <div>
                                    <h3 className="font-heading text-xl font-semibold text-navy-text dark:text-white">
                                        {problem.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-gray-400">{problem.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Solutions Column */}
                    <div className="flex flex-col gap-8">
                        {solutions.map((solution, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 p-4 rounded-lg bg-white shadow-subtle dark:bg-slate-800"
                            >
                                <span className="material-symbols-outlined text-green-500 text-3xl">
                                    {solution.icon}
                                </span>
                                <div>
                                    <h3 className="font-heading text-xl font-semibold text-navy-text dark:text-white">
                                        {solution.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-gray-400">{solution.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
