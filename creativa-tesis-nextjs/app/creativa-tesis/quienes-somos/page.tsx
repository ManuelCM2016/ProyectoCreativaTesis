import type { Metadata } from 'next';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export const metadata: Metadata = {
    title: 'Quiénes Somos - Creativa Tesis',
    description:
        'Conoce a Creativa Tesis, tu aliado estratégico en la titulación. Más de 500 tesis aprobadas con ética, excelencia y empatía.',
};

export default function QuienesSomosPage() {
    const values = [
        {
            icon: 'verified',
            title: 'Integridad',
            description: 'Trabajamos con total transparencia y honestidad académica.',
        },
        {
            icon: 'psychology',
            title: 'Excelencia',
            description: 'Buscamos la máxima calidad en cada capítulo y análisis.',
        },
        {
            icon: 'favorite',
            title: 'Empatía',
            description: 'Entendemos tus retos y te acompañamos en el proceso.',
        },
        {
            icon: 'lightbulb',
            title: 'Innovación',
            description: 'Usamos herramientas modernas para optimizar tu tiempo.',
        },
    ];

    const features = [
        {
            title: 'Asesoría Personalizada',
            description: 'No usamos plantillas genéricas. Tu investigación es única y la tratamos como tal.',
        },
        {
            title: 'Soporte Continuo',
            description:
                'Resolvemos tus dudas rápidamente, incluso fuera de horario de oficina con nuestro asistente virtual.',
        },
        {
            title: 'Garantía de Originalidad',
            description: 'Utilizamos software anti-plagio avanzado para asegurar que tu trabajo sea 100% original.',
        },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="w-full px-4 md:px-20 py-16 bg-background-light dark:bg-background-dark">
                <div className="max-w-[960px] mx-auto flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1 flex flex-col gap-6">
                        <Badge>Nuestra Historia</Badge>

                        <h1 className="text-navy-text font-heading text-4xl md:text-5xl font-black leading-[1.15] tracking-tight dark:text-white">
                            Impulsando el éxito académico
                        </h1>

                        <p className="text-slate-600 font-body text-lg leading-relaxed dark:text-gray-300">
                            Somos Creativa Tesis, una consultora dedicada a transformar la experiencia de
                            investigación académica. Con más de 500 tesis aprobadas, somos tu aliado estratégico
                            para alcanzar la titulación.
                        </p>

                        <div className="flex gap-4 pt-2">
                            <Button>Conoce al equipo</Button>
                            <Button variant="secondary">Ver casos de éxito</Button>
                        </div>
                    </div>

                    <div className="flex-1 w-full">
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                alt="Group of university students collaborating on a project in a library"
                                className="object-cover w-full h-full"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAaK00b-ts7qQb97nK1B4lnzjF6jznapA4cJ3hPVwRzPmJZlEBXW88Un0pxyb-De0O_U2SEebQzDTRimT9rVC2ENfH7kSFOVjSoXu9Spi3vzDBxIkuT29MJCJZhmEjAbHQVOXvNd-Hr_ZzZ-p4xn3JWDjfSVDlQdY32DPEveAoAnCqG0CZDUvlldPdNrk24MgXlHR7_O8-ViGyOnQzF243Y6cOiFDf8e-xq0FTAO-YKsvyFwcXIU3bDkcSCsNxcMb3zlWaPxEBc30"
                                width={600}
                                height={450}
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-navy-text/20 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Cards */}
            <section className="w-full px-4 md:px-20 py-12 bg-white dark:bg-slate-900">
                <div className="max-w-[1024px] mx-auto">
                    <div className="flex flex-col items-center text-center mb-12">
                        <h2 className="text-navy-text font-heading text-3xl font-bold mb-4 dark:text-white">
                            Nuestra Esencia
                        </h2>
                        <p className="text-slate-600 font-body max-w-2xl dark:text-gray-300">
                            Nos guiamos por principios sólidos y una visión clara del futuro académico que queremos
                            construir junto a ti.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Mission Card */}
                        <div className="group relative overflow-hidden rounded-xl h-[400px] shadow-lg hover:shadow-xl transition-all duration-300">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBO95ezgPERSd7ksvvkOHWwk6Y9lC-1U6NzGJAcpFnuJ8TLNGu2ynbSLgF4bhgNmH8f4XIwfARpclE2ZQdgUNxgfuYi3RovPov6Nl8_-es63ymwKa01R5CcTHJgB-AAh6G9-jPsHi2vL95zMwxB_bnoPd5HvkLCQuGWGHODC0cZmauP6qceEWhZp4llTwQKAUxBfHHWfAdSd2ySfNkWJMQGvQCqn5w2DZxDtzczktSMwM3j5L-yhhWZa7TZSF5Q5wgJ9FIyvuGoHrA")',
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-text/95 via-navy-text/60 to-transparent"></div>
                            <div className="relative h-full flex flex-col justify-end p-8">
                                <div className="bg-primary-blue/20 backdrop-blur-sm p-3 rounded-lg w-fit mb-4 text-white">
                                    <span className="material-symbols-outlined">flag</span>
                                </div>
                                <h3 className="text-white font-heading text-2xl font-bold mb-3">Nuestra Misión</h3>
                                <p className="text-white/90 font-body text-base leading-relaxed">
                                    Facilitar el camino a la titulación mediante asesoría personalizada, eliminando
                                    barreras metodológicas y garantizando la rigurosidad académica en cada investigación.
                                </p>
                            </div>
                        </div>

                        {/* Vision Card */}
                        <div className="group relative overflow-hidden rounded-xl h-[400px] shadow-lg hover:shadow-xl transition-all duration-300">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDwLrTJ9Op9Mx1y8QrIpdiaUlnzm07E8-0YSE1FNV63s-FR22fbypI1GmUN1T8fm-YTwa69RlFSz47ApHd-g7mDdIlMnG5ZlslvC3_1KagwBSg89JfaHfJc_yhhpTxGgcN5kgjnBKxt93I5CFbZlU1JkCRPZVXGcboQQ1sRyl1U3149p9vidXTYGBo9-Ee6NaKd2MytBxsRqvetqu9QJxUL1m0rSNtdYK7PiVqpnSnyEyRpDL6igbeV_I0Y6vW5GRj4AvY0oAwF42I")',
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-text/95 via-navy-text/60 to-transparent"></div>
                            <div className="relative h-full flex flex-col justify-end p-8">
                                <div className="bg-secondary-blue/30 backdrop-blur-sm p-3 rounded-lg w-fit mb-4 text-white">
                                    <span className="material-symbols-outlined">visibility</span>
                                </div>
                                <h3 className="text-white font-heading text-2xl font-bold mb-3">Nuestra Visión</h3>
                                <p className="text-white/90 font-body text-base leading-relaxed">
                                    Ser la consultora líder en el sur del Perú, reconocida por nuestra ética
                                    inquebrantable, innovación en métodos de estudio y resultados garantizados para
                                    nuestros tesistas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="w-full px-4 md:px-20 py-16 bg-light-grey-bg dark:bg-slate-800">
                <div className="max-w-[960px] mx-auto">
                    <h2 className="text-navy-text font-heading text-3xl font-bold mb-10 text-center dark:text-white">
                        Nuestros Valores
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center dark:bg-slate-900 dark:border-slate-700"
                            >
                                <div className="size-12 rounded-full bg-secondary-blue/20 text-navy-text flex items-center justify-center mb-4 dark:text-white">
                                    <span className="material-symbols-outlined">{value.icon}</span>
                                </div>
                                <h4 className="text-navy-text font-heading font-bold text-lg mb-2 dark:text-white">
                                    {value.title}
                                </h4>
                                <p className="text-slate-600 font-body text-sm leading-relaxed dark:text-gray-400">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="w-full px-4 md:px-20 py-20 bg-white dark:bg-background-dark overflow-hidden">
                <div className="max-w-[960px] mx-auto flex flex-col-reverse md:flex-row gap-16 items-center">
                    <div className="flex-1 w-full">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-secondary-blue/10 p-6 rounded-xl flex flex-col justify-center items-center dark:bg-secondary-blue/20">
                                <span className="text-3xl font-black text-primary-blue mb-1">500+</span>
                                <span className="text-slate-600 font-body text-sm font-medium dark:text-gray-400">
                                    Tesis Aprobadas
                                </span>
                            </div>
                            <div className="bg-navy-text/5 p-6 rounded-xl flex flex-col justify-center items-center dark:bg-slate-800">
                                <span className="text-3xl font-black text-navy-text mb-1 dark:text-white">98%</span>
                                <span className="text-slate-600 font-body text-sm font-medium dark:text-gray-400">
                                    Clientes Satisfechos
                                </span>
                            </div>
                            <div className="bg-navy-text/5 p-6 rounded-xl flex flex-col justify-center items-center col-span-2 dark:bg-slate-800">
                                <span className="text-3xl font-black text-navy-text mb-1 dark:text-white">Sur del Perú</span>
                                <span className="text-slate-600 font-body text-sm font-medium dark:text-gray-400">
                                    Sede Principal
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-6">
                        <h2 className="text-navy-text font-heading text-3xl font-bold leading-tight dark:text-white">
                            ¿Por qué elegir Creativa Tesis?
                        </h2>
                        <div className="flex flex-col gap-4">
                            {features.map((feature, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="mt-1">
                                        <span className="material-symbols-outlined text-primary-blue">check_circle</span>
                                    </div>
                                    <div>
                                        <h4 className="text-navy-text font-heading font-bold text-base dark:text-white">
                                            {feature.title}
                                        </h4>
                                        <p className="text-slate-600 font-body text-sm mt-1 dark:text-gray-400">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full px-4 md:px-20 py-16 bg-navy-text text-white">
                <div className="max-w-[720px] mx-auto text-center flex flex-col items-center gap-6">
                    <h2 className="font-heading text-3xl font-bold">¿Listo para dar el siguiente paso?</h2>
                    <p className="text-white/80 font-body text-lg">
                        Agenda una consulta gratuita de 15 minutos y descubre cómo podemos ayudarte a terminar tu
                        tesis en tiempo récord.
                    </p>
                    <Button className="mt-2 h-12 px-8 bg-primary-blue hover:bg-blue-400">
                        Reservar mi asesoría
                    </Button>
                </div>
            </section>
        </>
    );
}
