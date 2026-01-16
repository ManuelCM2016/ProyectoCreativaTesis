import type { Metadata } from 'next';
import Image from 'next/image';
import FAQAccordion from '@/components/faq/FAQAccordion';

export const metadata: Metadata = {
    title: 'FAQ y Recursos - Creativa Tesis',
    description:
        'Centro de ayuda con preguntas frecuentes sobre tesis, artículos del blog y recursos para estudiantes en Tacna.',
};

export default function FAQPage() {
    const blogPosts = [
        {
            title: '5 Errores comunes al elegir tu tema de tesis',
            excerpt:
                'Elegir mal el tema puede retrasarte meses. Descubre qué evitar antes de inscribir tu proyecto en la facultad.',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCiHEaG514HFxCCb5B-FYX1uMHfegwtdq9EIOPEjQEyyZnBDv4Eom4ByBNl_lcVZ1_ufDG859sZ272omDuMPfg635EOyzSogO1EE2bbas1mvjoYh4TCcnbphBS2LFhEjdGdOeRV1jreaGsSd5uwm_sBgtIquf4K6cqFPUeyYzUu4jP1JtkKrpQP8VJ_0Be4ML5kp8PgheOCCeam3I1c0pwDEiRbYfmC8XSvS24ppbgd9V3A-t7naVRwyuG4nIj-xthlNa5RwsvUHo8',
            category: 'Guías',
            timeAgo: 'Hace 2 días',
            readTime: '5 min lectura',
        },
        {
            title: 'La inteligencia artificial como aliada en tu investigación',
            excerpt:
                'Aprende a usar herramientas de IA para optimizar tu revisión bibliográfica sin caer en malas prácticas académicas.',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAh7pc6mw71EghJlJKeujCSGohKMZGWcMbs2I3NmLUU6NRLvKR30PKT3RnPvSZC2G3Phd9GjUDOG3CREtUK1ljjkQ1JDd0hzL3BCXqIVi9CThaN2mdIWvGV8BELFeegSGV8qpkdNE1NzIeH4VoQHbpTAqkUXpU17o9T56DFaBlYCuc6L9Q48wZvhJzTiQCbg3VWRBE6REiUcdjWwcv3rp64-MtOFbhI1CVuy8rDXbLex5zgN9fmpwAhP8q_s5LKSbXt68ivTAlQ8fQ',
            category: 'Tecnología',
            timeAgo: 'Hace 1 semana',
            readTime: '8 min lectura',
        },
    ];

    return (
        <>
            {/* Hero & Search Section */}
            <section className="bg-white dark:bg-background-dark pt-12 pb-10 px-6 lg:px-40 border-b border-slate-200 dark:border-slate-700">
                <div className="max-w-[960px] mx-auto flex flex-col gap-6 text-center lg:text-left">
                    <div className="space-y-3">
                        <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-navy-text dark:text-white font-heading">
                            Centro de Ayuda y Recursos
                        </h1>
                        <p className="text-slate-600 dark:text-gray-400 font-body text-lg font-normal leading-normal max-w-2xl">
                            Resuelve tus dudas sobre el proceso de tesis y mejora tu investigación con nuestros
                            artículos y guías prácticas.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="w-full max-w-2xl mt-4">
                        <label className="relative block w-full h-14">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
                                <span className="material-symbols-outlined">search</span>
                            </span>
                            <input
                                className="block w-full h-full rounded-xl bg-light-grey-bg dark:bg-slate-800 border-transparent focus:border-primary-blue focus:bg-white dark:focus:bg-slate-900 focus:ring-0 pl-12 pr-4 text-base font-body placeholder:text-slate-500 transition-all"
                                placeholder="Buscar preguntas, guías o artículos..."
                                type="text"
                            />
                        </label>
                    </div>

                    {/* Filter Chips */}
                    <div className="flex flex-wrap gap-3 mt-2 justify-center lg:justify-start">
                        <button className="flex h-9 items-center gap-x-2 rounded-full bg-primary-blue text-white px-4 hover:opacity-90 transition-opacity font-body">
                            <span className="material-symbols-outlined text-[20px]">star</span>
                            <span className="text-sm font-medium">Todos</span>
                        </button>
                        <button className="flex h-9 items-center gap-x-2 rounded-full bg-light-grey-bg dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-4 transition-colors font-body">
                            <span className="material-symbols-outlined text-[20px] text-slate-600">
                                work
                            </span>
                            <span className="text-sm font-medium text-navy-text dark:text-gray-200">
                                Servicios
                            </span>
                        </button>
                        <button className="flex h-9 items-center gap-x-2 rounded-full bg-light-grey-bg dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-4 transition-colors font-body">
                            <span className="material-symbols-outlined text-[20px] text-slate-600">school</span>
                            <span className="text-sm font-medium text-navy-text dark:text-gray-200">
                                Proceso Tesis
                            </span>
                        </button>
                        <button className="flex h-9 items-center gap-x-2 rounded-full bg-light-grey-bg dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-4 transition-colors font-body">
                            <span className="material-symbols-outlined text-[20px] text-slate-600">
                                smart_toy
                            </span>
                            <span className="text-sm font-medium text-navy-text dark:text-gray-200">
                                Uso de IA
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="flex-1  px-6 lg:px-40 py-12">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* FAQ Section (Left Column) */}
                    <div className="lg:col-span-7 flex flex-col gap-8">
                        <FAQAccordion />
                    </div>

                    {/* Blog Section (Right Column) */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-2xl font-bold flex items-center gap-2 font-heading text-navy-text dark:text-white">
                                <span className="material-symbols-outlined text-primary-blue">article</span>
                                Blog Reciente
                            </h2>
                            <a className="text-sm font-bold text-primary-blue hover:underline font-body" href="#">
                                Ver todo
                            </a>
                        </div>

                        {/* Blog Cards */}
                        {blogPosts.map((post, index) => (
                            <article key={index} className="flex flex-col gap-3 group">
                                <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-200 relative">
                                    <Image
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        src={post.image}
                                        width={600}
                                        height={192}
                                    />
                                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-navy-text font-body">
                                        {post.category}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-lg font-bold text-navy-text dark:text-white leading-tight group-hover:text-primary-blue transition-colors font-heading">
                                        <a href="#">{post.title}</a>
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-gray-400 line-clamp-2 font-body">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs font-medium text-slate-600 font-body">
                                            {post.timeAgo}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                        <span className="text-xs font-medium text-slate-600 font-body">
                                            {post.readTime}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}

                        {/* Newsletter Card */}
                        <div className="bg-primary-blue/10 dark:bg-slate-900 p-6 rounded-xl border border-primary-blue/20 mt-4">
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary-blue text-3xl">mail</span>
                                <div>
                                    <h4 className="font-bold text-navy-text dark:text-white font-heading">
                                        Tips de tesis semanales
                                    </h4>
                                    <p className="text-sm text-slate-600 dark:text-gray-400 font-body mt-1 mb-3">
                                        Recibe consejos y guías exclusivas en tu correo.
                                    </p>
                                    <form className="flex gap-2">
                                        <input
                                            className="flex-1 rounded-lg border-none text-sm px-3 py-2 focus:ring-2 focus:ring-primary-blue font-body"
                                            placeholder="Tu correo"
                                            type="email"
                                        />
                                        <button
                                            className="bg-primary-blue text-white rounded-lg px-4 py-2 text-sm font-bold hover:bg-blue-600 transition font-body"
                                            type="button"
                                        >
                                            Enviar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <section className="bg-white dark:bg-background-dark py-16 px-6 lg:px-40 border-t border-slate-200 dark:border-slate-700">
                <div className="max-w-[960px] mx-auto text-center flex flex-col items-center gap-6">
                    <h2 className="text-3xl font-bold text-navy-text dark:text-white font-heading">
                        ¿No encontraste lo que buscabas?
                    </h2>
                    <p className="text-slate-600 dark:text-gray-400 font-body text-lg max-w-xl">
                        Nuestro equipo está listo para ayudarte con tu caso específico. Habla con nuestro asistente
                        virtual o agenda una asesoría personalizada.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-2">
                        <button className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-primary-blue hover:bg-blue-600 text-white font-bold transition-all shadow-lg shadow-blue-500/30 font-body">
                            <span className="material-symbols-outlined">chat</span>
                            Hablar con Asesor
                        </button>
                        <button className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-light-grey-bg dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-navy-text dark:text-white font-bold transition-all font-body">
                            Ver planes y precios
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

