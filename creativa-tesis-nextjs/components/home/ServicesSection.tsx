import Image from 'next/image';
import Badge from '@/components/ui/Badge';

export default function ServicesSection() {
    const services = [
        {
            icon: 'lightbulb',
            title: 'Planificación Estratégica del Tema',
            description:
                'Te ayudamos a seleccionar un tema innovador y relevante, asegurando que se alinee con tus intereses y las exigencias académicas. Nuestra guía experta te facilita el camino desde la concepción hasta la aprobación.',
            features: [
                'Investigación de factibilidad y originalidad.',
                'Delimitación precisa del alcance del estudio.',
                'Asesoría personalizada para la propuesta inicial.',
            ],
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDr1XFs5O6O-iXrKjWnRPBuPhjg-TaFbJPVS0mttG9CSdUy6ZSVMJRTMyR5AeBpQ8NQtZ4FscCqn31khxvcEnUlw6OilwGWDI3Sdupq8kntcbYvGdJ6VMFWVT4179hqS_dcUr1UGi52Mah33SDfyrgdctK_iL5QLGnPhEPTw8n_eq17QcyMShbt6GhFKh3YHOYVuI0ECo9v-DIhHJuEWxnCZfeaSTy2IUklCoNmZ8KzFqmb6WbTAglOT7YkT_WoAJtecbZw5GZnlyc',
            imageFirst: true,
        },
        {
            icon: 'ads_click',
            title: 'Objetivos SMART y Metodología Clara',
            description:
                'Establecemos objetivos específicos, medibles, alcanzables, relevantes y con un tiempo definido. Desarrollamos una metodología sólida que te permitirá alcanzar tus metas de investigación con eficiencia.',
            features: [
                'Formulación de objetivos generales y específicos.',
                'Selección de enfoques de investigación (cuantitativo/cualitativo).',
                'Diseño de instrumentos y técnicas de recolección de datos.',
            ],
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBfbmLEFDNPtLg67trrpxwGQOfUm1OxlM8GxlElxXPsYS7pSU3cKOEkJoU93e3eslGoAHC2dxg1DGksDWHM8LWdTRSsl5Q-nu_rZqH6p_7mk7gwNk3M5req8g1KrUnQo-3IqEr1X9-Y71DBVjwjeIuSgT1lD13FYZ4n4JU066R1qe0dA-EhTTGXG_zuHrIc-tl4-wr-pjDjYZ9oEe88Aui4fnaPy3B01vmL4z11kzxr2cdpXH78HYKeO-Kxln-vjB3hDcFcurgZb34',
            imageFirst: false,
        },
        {
            icon: 'calendar_month',
            title: 'Gestión Efectiva del Cronograma y Recursos',
            description:
                'Creamos un cronograma de trabajo detallado y realista, asignando tareas y recursos eficientemente para que cumplas con cada etapa sin estrés y asegures tu graduación a tiempo.',
            features: [
                'Desarrollo de un calendario de hitos y entregables.',
                'Optimización de tiempo y recursos disponibles.',
                'Monitoreo y ajuste continuo del plan de trabajo.',
            ],
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDtbWzjtf2avGJuZusB5v8R5Yoep8AvjHxa9SCp9Fqy1Tm7dOk8PA0aKzNWQt_Gfb9yJPJf-351rYNJbfdeMVMybFySuRb405jLelxEzfZ9dwJp2FpmgdXlmCR1gHkzHB_EOCAtpepqmj4JL26d2BOX81bcY7Q7UuCfg32FUqUp05j6lZaVVFsZ5svcl2k3JDsuYxauAZFTBRjx-4QAmlpUder04rVBWQykTVlDDuV5Aiw36mbiq3Dgsfh_-VWFTQ40ds3I1KlGNeE',
            imageFirst: true,
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-background-light dark:bg-background-dark" id="servicios">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12 flex flex-col gap-4 text-center md:items-center">
                    <Badge icon="menu_book">Nuestra Metodología</Badge>
                    <h2 className="font-heading text-navy-text text-4xl font-bold tracking-tight md:text-5xl dark:text-white">
                        Servicios Diseñados para Tu Éxito
                    </h2>
                    <p className="mx-auto max-w-[800px] text-slate-600 font-body md:text-lg dark:text-gray-300">
                        Una metodología probada y un acompañamiento integral para cada etapa crucial de tu
                        investigación académica.
                    </p>
                </div>

                <div className="flex flex-col gap-20">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`grid gap-8 lg:grid-cols-2 lg:gap-16 items-center ${!service.imageFirst ? 'lg:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Image */}
                            <div
                                className={`relative rounded-xl overflow-hidden shadow-md ${service.imageFirst ? 'order-1' : 'order-2 lg:order-1'
                                    }`}
                            >
                                <Image
                                    alt={service.title}
                                    className="w-full h-auto object-cover rounded-xl shadow-subtle"
                                    src={service.image}
                                    width={600}
                                    height={450}
                                />
                                <div className="absolute inset-0 bg-primary-blue/10 mix-blend-multiply"></div>
                            </div>

                            {/* Content */}
                            <div className={`flex flex-col gap-4 text-left ${service.imageFirst ? 'order-2' : 'order-1 lg:order-2'}`}>
                                <span className="material-symbols-outlined text-primary-blue text-5xl">
                                    {service.icon}
                                </span>
                                <h3 className="font-heading text-3xl font-bold text-navy-text dark:text-white">
                                    {service.title}
                                </h3>
                                <p className="text-slate-600 font-body text-lg dark:text-gray-400">
                                    {service.description}
                                </p>
                                <ul className="list-disc list-inside text-slate-600 dark:text-gray-400 space-y-2 text-sm">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
