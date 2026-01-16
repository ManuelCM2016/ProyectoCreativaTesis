import type { Metadata } from 'next';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Servicios de Creativa Tesis',
    description:
        'Servicios especializados en asesoría de tesis: redacción de tesis de pregrado, artículos científicos, corrección de estilo APA, y análisis estadístico en SPSS.',
};

export default function ServicesPage() {
    const services = [
        {
            icon: 'menu_book',
            title: 'Redacción de Tesis de Pregrado',
            description:
                'Asesoría integral desde la elección del tema hasta la sustentación final. Incluye revisión exhaustiva de antecedentes, desarrollo del marco teórico y metodología alineada a los estándares de tu universidad.',
            tags: ['Elección de tema', 'Marco Teórico', 'Sustentación'],
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDGCZEqcvI1Yv_QegMimma-FW_2GtbHHWaRsuLFR1K3p58chRTFfYy0qZYQiIxTyxkYLnb6_rVDNDUgA5jRMfggF6EMJQvXDFeS9g624GlnxhYXLn4XHP1B8wTItdzGz8_oGmeX1BCWfDAz6ybSQfvvTAX7nqL44LngPw0_0IUc2z-SLgUDBCup-iC0_TeoaHg0U8nRaF-r3gIkzwm6wvDUeCI1sKeo2UolxkAYpeS5_U0OFKz4ENkSjQpNPSED0-81Ymz5Hx18JO4',
        },
        {
            icon: 'article',
            title: 'Artículo Científico',
            description:
                'Guía completa para la redacción y publicación en revistas indexadas (Scopus, WoS, Latindex). Te ayudamos a transformar tu investigación en un aporte académico de alto impacto.',
            tags: ['Scopus', 'Web of Science', 'Publicación'],
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDttGcPDSMKfres8PaQ8DWt8krIIgfUNBw7HRFDKYWYwuioasmjL0bzXqvcyAUMngEdu6h4PGFOhWeLAw0ldq71ecB2oRnnHkMNQKbJDpkZmPvJIZlWu87HhUe6S9fIJRWQjRNNkS_BDlqA4yckbwoTSdvIk20O-Q69jH20o0YIBZF4YZYcHBbD69zwmwFyp3jCYg-JZSEWwqs2NF6jHt8sCymX80aUZIz60ZJNTs6gKYN5i6Mfn2Hfv7gCDD_sunnht72dVfEoIIg',
        },
        {
            icon: 'edit_note',
            title: 'Corrección de Estilo y Normas',
            description:
                'Revisión gramatical y ortográfica exhaustiva. Adaptación rigurosa a normas APA, Vancouver, ISO o Chicago según los requisitos de tu institución educativa.',
            tags: ['APA 7ma Ed.', 'Vancouver', 'Gramática'],
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuD6pZ1wFsTamYa5I-U3PSfyKvW-2mKcDoIilhv86PLWWVfDPoR1a4_jg6THjH5RLW7L6YmsEgAsO9T_Du2zxXVV1AovwILVuSYE-4UZACE0Jk6xq5Ls6ZRaW-JeyyCxBoOld2MzaIVB1mX0fGkymRDvq4vlVnES_xKjtXAN8R6ufnClIJKFLnuicB_Dwf7bPWlPosgNkMQrxZwSWRtARLAAiivvX2PA5oh8rHnfKhV4PLMxGm9E6ImrAjNbOUsear0slin7Axth1Dg',
        },
        {
            icon: 'bar_chart',
            title: 'Análisis Estadístico',
            description:
                'Procesamiento de datos cuantitativos y cualitativos utilizando software especializado como SPSS, R, Stata o Atlas.ti. Interpretación clara de resultados.',
            tags: ['SPSS', 'Software R', 'Ciencia de Datos'],
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCsh3FctAfWJKR6Ue-Ipkxg56AipGdlcU74Sn379VK8H2u1fOWLCt2MuKFpqWemYjEdsal-kun3bg8CnvJQeNyJOYOotZ_P8jSQwVXHzd4g3OrK5ZFqLbVCnAOSy-QqMzi3nKkCPV1470xRtxaxQTvZpUNaWv_ecyTgeMeW28XjbY9pPrHGPSsclpNMbtZbg9gjgovgrn0m16_MN9vCWDNiyALcXKa34BoJqbvrS2JALrgcUJrF1-ZGzn12PjFDFVChSZeWOVp0BWw',
        },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="mb-8 px-4">
                <div className="max-w-[960px] mx-auto">
                    <div
                        className="flex min-h-[400px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-8 text-center shadow-lg relative overflow-hidden"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(51, 86, 114, 0.75) 0%, rgba(16, 26, 34, 0.85) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCGGCKhjg8ArXMP7AooXC-sLp7cCat_EbO1R7lfj58piMGH4nRVZXYNPiVb_Q_NgK_ZXaBlSaMrDfhXTVXcBU9GnBPS-D7mD5_ZuJ3C2r2oBmC-mALZtBER2kacjfAAyNcb20Y4TeoRu2qf-scHPZP1oI4MB_kLgVMQtE5kf51Ph2HBrVMrC1zEblc8eIbY1ErFqX6J9bS_idVb26WY1pqlaFYNWtlErJ-e5YQzoBdNqKccr9DV8oVDwsdSgb7ehxRjVuzIbmYCb_w")',
                        }}
                    >
                        <div className="flex flex-col gap-3 max-w-2xl relative z-10">
                            <h1 className="text-white font-heading text-4xl md:text-5xl font-black leading-tight tracking-tight">
                                Impulsa tu carrera con nuestros servicios de asesoría
                            </h1>
                            <h2 className="text-gray-200 font-body text-base font-normal leading-relaxed">
                                Expertos en redacción, corrección y análisis estadístico para tesis en Tacna. Te
                                acompañamos en cada paso hasta tu titulación.
                            </h2>
                        </div>
                        <div className="flex gap-4 relative z-10 flex-wrap justify-center">
                            <Button className="h-12 px-6 shadow-md hover:scale-105 transition-transform">
                                Ver Servicios
                            </Button>
                            <Button
                                variant="ghost"
                                className="h-12 px-6 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20"
                            >
                                Contáctanos
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Header */}
            <div className="px-4 md:px-10 lg:px-40 max-w-[960px] mx-auto">
                <div className="flex flex-col gap-2 px-4 pb-6 pt-2">
                    <h2 className="text-navy-text font-heading text-[28px] font-bold leading-tight tracking-tight dark:text-white">
                        Nuestros Servicios Especializados
                    </h2>
                    <p className="text-slate-600 font-body text-base dark:text-gray-400">
                        Soluciones académicas diseñadas para garantizar tu éxito profesional.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 gap-6 p-4">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row items-stretch justify-between gap-6 rounded-xl bg-white p-5 shadow-subtle border border-slate-100 hover:border-secondary-blue transition-colors group dark:bg-slate-900 dark:border-slate-700"
                        >
                            <div className="flex flex-[2_2_0px] flex-col justify-between gap-4">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="p-2 rounded-lg bg-blue-50 text-navy-text dark:bg-blue-900/20 dark:text-blue-300">
                                            <span className="material-symbols-outlined">{service.icon}</span>
                                        </div>
                                        <p className="text-navy-text font-heading text-lg font-bold leading-tight dark:text-white">
                                            {service.title}
                                        </p>
                                    </div>
                                    <p className="text-slate-600 font-body text-sm font-normal leading-relaxed dark:text-gray-400">
                                        {service.description}
                                    </p>
                                    <ul className="flex flex-wrap gap-2 mt-2">
                                        {service.tags.map((tag, idx) => (
                                            <li
                                                key={idx}
                                                className="bg-gray-100 text-xs px-2 py-1 rounded text-slate-600 dark:bg-gray-800 dark:text-gray-300"
                                            >
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button className="flex items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-light-grey-bg text-navy-text text-sm font-medium w-fit hover:bg-secondary-blue/20 transition-colors group-hover:text-primary-blue dark:bg-gray-800 dark:text-white dark:hover:bg-primary-blue/20">
                                    <span className="truncate">Ver detalles</span>
                                    <span className="material-symbols-outlined text-sm ml-2">arrow_forward</span>
                                </button>
                            </div>
                            <div className="w-full md:w-1/3 min-h-[180px] relative rounded-lg flex-1 overflow-hidden">
                                <Image
                                    alt={service.title}
                                    className="object-cover w-full h-full"
                                    src={service.image}
                                    width={300}
                                    height={180}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="p-4 mt-8">
                    <div className="rounded-xl bg-navy-text p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-blue rounded-full blur-[80px] opacity-20 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                        <div className="flex flex-col gap-2 z-10 max-w-lg">
                            <h3 className="text-white font-heading text-2xl font-bold leading-tight">
                                ¿No sabes por dónde empezar?
                            </h3>
                            <p className="text-gray-300 font-body text-base">
                                Agenda una sesión de diagnóstico gratuita de 15 minutos y descubre cómo podemos
                                ayudarte a titularte este año.
                            </p>
                        </div>
                        <Button className="z-10 min-w-[160px] h-12 px-6 shadow-lg">Agendar Gratis</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
