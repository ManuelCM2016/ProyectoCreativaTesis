'use client';

interface DownloadItem {
    title: string;
    description: string;
    icon: string;
    format: string;
    color: string;
    downloadUrl: string;
}

const downloads: DownloadItem[] = [
    {
        title: 'Plantilla de Tesis APA 7ma Edición',
        description: 'Documento Word con formato completo siguiendo las normas APA 7. Incluye portada, índice, capítulos y referencias.',
        icon: 'description',
        format: 'DOCX',
        color: 'from-blue-500 to-blue-600',
        downloadUrl: '#',
    },
    {
        title: 'Guía de Metodología de Investigación',
        description: 'PDF con los pasos esenciales para diseñar tu metodología: enfoque, diseño, población, muestra e instrumentos.',
        icon: 'menu_book',
        format: 'PDF',
        color: 'from-red-500 to-rose-600',
        downloadUrl: '#',
    },
    {
        title: 'Checklist de Sustentación',
        description: 'Lista de verificación con todo lo que necesitas preparar antes de tu defensa de tesis.',
        icon: 'checklist',
        format: 'PDF',
        color: 'from-green-500 to-emerald-600',
        downloadUrl: '#',
    },
    {
        title: 'Plantilla de Cronograma de Tesis',
        description: 'Diagrama de Gantt editable para planificar las etapas de tu investigación.',
        icon: 'event_note',
        format: 'XLSX',
        color: 'from-purple-500 to-indigo-600',
        downloadUrl: '#',
    },
];

export default function DownloadsSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {downloads.map((item, index) => (
                <div
                    key={index}
                    className="group bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 hover:-translate-y-1 relative overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`}></div>

                    <div className="relative z-10">
                        <div className="flex items-start gap-4">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                <span className="material-symbols-outlined text-white text-2xl">{item.icon}</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-navy-text dark:text-white font-bold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {item.title}
                                    </h3>
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold bg-gradient-to-r ${item.color} text-white`}>
                                        {item.format}
                                    </span>
                                </div>
                                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                                    {item.description}
                                </p>
                                <a
                                    href={item.downloadUrl}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${item.color} text-white text-sm font-medium hover:shadow-lg transition-all hover:scale-105`}
                                >
                                    <span className="material-symbols-outlined text-lg">download</span>
                                    Descargar Gratis
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
