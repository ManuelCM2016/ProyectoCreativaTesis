import Badge from '@/components/ui/Badge';

export default function ProcessSection() {
    const steps = [
        {
            number: 1,
            title: 'Definición de Tema',
            description: 'Elegimos juntos un tema relevante y viable que te apasione.',
            icon: 'topic',
        },
        {
            number: 2,
            title: 'Desarrollo de Estructura',
            description: 'Creamos la base de tu tesis con objetivos y metodología.',
            icon: 'schema',
        },
        {
            number: 3,
            title: 'Redacción y Revisión',
            description: 'Te guiamos en la redacción y perfeccionamos cada capítulo.',
            icon: 'edit_note',
        },
        {
            number: 4,
            title: 'Sustentación y Aprobación',
            description: 'Preparamos para la defensa final y celebramos tu graduación.',
            icon: 'verified',
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-light-grey-bg dark:bg-slate-900" id="el-proceso">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12 flex flex-col gap-4 text-center md:items-center">
                    <Badge icon="how_to_reg">Nuestro Método</Badge>
                    <h2 className="font-heading text-navy-text text-4xl font-bold tracking-tight md:text-5xl dark:text-white">
                        Tu Camino al Éxito en 4 Simples Pasos
                    </h2>
                    <p className="mx-auto max-w-[800px] text-slate-600 font-body md:text-lg dark:text-gray-300">
                        Desde la idea inicial hasta la aprobación final, te acompañamos con un proceso claro y
                        estructurado.
                    </p>
                </div>

                <div className="relative flex flex-col items-center justify-center">
                    {/* Connecting line for desktop */}
                    <div className="hidden lg:block absolute h-0.5 bg-primary-blue/30 w-[calc(100%-10rem)] top-1/2 -translate-y-1/2"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full max-w-7xl">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="relative flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
                            >
                                {/* Step number circle */}
                                <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary-blue text-white font-bold text-xl shadow-md">
                                    {step.number}
                                </div>

                                <h3 className="font-heading text-xl font-bold text-navy-text mt-4 dark:text-white">
                                    {step.title}
                                </h3>

                                <p className="text-slate-600 mt-2 text-sm dark:text-gray-400">{step.description}</p>

                                {/* Background icon */}
                                <span className="material-symbols-outlined text-primary-blue text-5xl absolute top-4 right-4 opacity-10">
                                    {step.icon}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
