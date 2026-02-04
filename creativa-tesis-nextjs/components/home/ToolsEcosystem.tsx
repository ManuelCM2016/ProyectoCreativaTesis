import Badge from '@/components/ui/Badge';

export default function ToolsEcosystem() {
    const tools = [
        {
            name: 'Portal de Seguimiento',
            description: 'Visualiza tu progreso en tiempo real',
            icon: 'dashboard',
            badge: 'Exclusivo',
        },
        {
            name: 'Chat 24/7 con Asesores',
            description: 'Soporte cuando lo necesites',
            icon: 'support_agent',
            badge: 'Exclusivo',
        },
        {
            name: 'Biblioteca de Templates',
            description: 'Formatos APA listos para usar',
            icon: 'folder_open',
            badge: 'Gratis',
        },
        {
            name: 'Sesiones de Mentoría',
            description: 'Videoconferencias personalizadas',
            icon: 'video_call',
            badge: 'Incluido',
        },
        {
            name: 'Revisión de Plagio',
            description: 'Verificamos originalidad con Turnitin',
            icon: 'fact_check',
            badge: 'Ilimitado',
        },
        {
            name: 'Biblioteca Digital',
            description: 'Acceso a bases de datos académicas',
            icon: 'local_library',
            badge: 'Premium',
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-light-grey-bg dark:bg-background-dark" id="herramientas">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12 flex flex-col gap-4 text-center md:items-center">
                    <Badge icon="construction">Recursos y Herramientas</Badge>
                    <h2 className="font-heading text-navy-text text-4xl font-bold tracking-tight md:text-5xl dark:text-white">
                        Tu Ecosistema de Apoyo
                    </h2>
                    <p className="mx-auto max-w-[800px] text-slate-600 font-body md:text-lg dark:text-gray-300">
                        Más que asesoría: accede a un conjunto completo de herramientas y recursos diseñados para tu
                        éxito académico.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {tools.map((tool, index) => (
                        <div
                            key={index}
                            className="relative group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Badge */}
                            <div className="absolute top-4 right-4">
                                <span className="px-3 py-1 bg-gradient-to-r from-primary-blue to-secondary-blue text-white text-xs font-semibold rounded-full">
                                    {tool.badge}
                                </span>
                            </div>

                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-blue to-secondary-blue flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-white text-2xl">{tool.icon}</span>
                            </div>

                            {/* Title */}
                            <h3 className="font-heading text-lg font-bold text-navy-text dark:text-white mb-2">
                                {tool.name}
                            </h3>

                            {/* Description */}
                            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                                {tool.description}
                            </p>

                            {/* Hover indicator */}
                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2 text-primary-blue opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs font-semibold">Leer más</span>
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <p className="text-slate-600 dark:text-gray-300 mb-4 font-semibold">
                        Todo esto incluido en tu plan de asesoría
                    </p>
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border-2 border-primary-blue text-primary-blue rounded-full font-semibold hover:bg-primary-blue hover:text-white transition-colors">
                        <span>Conocer Planes</span>
                        <span className="material-symbols-outlined">open_in_new</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
