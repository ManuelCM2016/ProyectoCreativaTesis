export default function CertificationsSection() {
    const certifications = [
        {
            name: 'Universidad Nacional Mayor de San Marcos',
            type: 'university',
        },
        {
            name: 'Pontificia Universidad Católica del Perú',
            type: 'university',
        },
        {
            name: 'Universidad del Pacífico',
            type: 'university',
        },
        {
            name: 'Universidad de Lima',
            type: 'university',
        },
        {
            name: 'CONCYTEC',
            type: 'institution',
        },
        {
            name: 'SPSS Statistics',
            type: 'software',
        },
        {
            name: 'Mendeley',
            type: 'software',
        },
        {
            name: 'Turnitin',
            type: 'software',
        },
    ];

    return (
        <section className="py-12 bg-slate-100 dark:bg-slate-800/50" id="certificaciones">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-8">
                    <h3 className="font-heading text-2xl font-bold text-navy-text dark:text-white mb-2">
                        Respaldados por Instituciones de Prestigio
                    </h3>
                    <p className="text-slate-600 dark:text-gray-400 text-sm">
                        Trabajamos con las principales universidades y utilizamos software profesional certificado
                    </p>
                </div>

                {/* Logos grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center max-w-5xl mx-auto">
                    {certifications.map((cert, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-lg hover:shadow-md transition-shadow grayscale hover:grayscale-0"
                        >
                            <div className="text-center">
                                <div className="text-slate-400 dark:text-gray-500 font-bold text-sm uppercase tracking-wide">
                                    {cert.name}
                                </div>
                                <div className="text-xs text-slate-400 dark:text-gray-600 mt-1">
                                    {cert.type === 'university' && '🎓'}
                                    {cert.type === 'institution' && '🏛️'}
                                    {cert.type === 'software' && '💻'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Disclaimer */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-slate-500 dark:text-gray-500">
                        * Colaboramos con estudiantes de estas instituciones. No implica endorsement oficial.
                    </p>
                </div>
            </div>
        </section>
    );
}
