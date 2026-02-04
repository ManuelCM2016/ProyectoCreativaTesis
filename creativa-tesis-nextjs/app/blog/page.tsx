import type { Metadata } from 'next';
import { getBlogPosts, getVideos } from '@/lib/sanity/queries';
import BlogPostsList from './BlogPostsList';
import VideoSection from './VideoSection';
import FAQSection from './FAQSection';
import StatsSection from './StatsSection';
import DownloadsSection from './DownloadsSection';

export const metadata: Metadata = {
    title: 'Blog y Recursos - Creativa Tesis',
    description:
        'Artículos, guías, videos y recursos académicos para apoyar tu investigación y proceso de titulación.',
};

export default async function BlogPage() {
    const [posts, videos] = await Promise.all([
        getBlogPosts(),
        getVideos(),
    ]);

    return (
        <>
            {/* Hero Section */}
            <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-[100px] opacity-50"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-[120px] opacity-40"></div>
                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>

                <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-white text-sm font-medium mb-6 shadow-lg shadow-blue-500/30">
                        <span className="material-symbols-outlined text-base">auto_stories</span>
                        Centro de Recursos Académicos
                    </span>
                    <h1 className="text-navy-text font-heading text-4xl md:text-5xl lg:text-6xl font-black mb-6 dark:text-white">
                        Blog y{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Recursos
                        </span>
                    </h1>
                    <p className="text-slate-600 font-body text-lg md:text-xl max-w-3xl mx-auto dark:text-gray-300 leading-relaxed">
                        Guías prácticas, videos educativos, plantillas descargables y todo lo que necesitas para triunfar en tu investigación.
                    </p>

                    {/* Quick stats */}
                    <div className="flex flex-wrap justify-center gap-8 mt-10">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">article</span>
                            </div>
                            <div className="text-left">
                                <p className="text-2xl font-bold text-navy-text dark:text-white">{posts.length}+</p>
                                <p className="text-sm text-slate-500 dark:text-gray-400">Artículos</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">videocam</span>
                            </div>
                            <div className="text-left">
                                <p className="text-2xl font-bold text-navy-text dark:text-white">{videos.length}+</p>
                                <p className="text-sm text-slate-500 dark:text-gray-400">Videos</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-green-600 dark:text-green-400">download</span>
                            </div>
                            <div className="text-left">
                                <p className="text-2xl font-bold text-navy-text dark:text-white">4+</p>
                                <p className="text-sm text-slate-500 dark:text-gray-400">Recursos Gratis</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="w-full px-4 md:px-20 py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white text-sm font-medium mb-4 shadow-lg">
                            📈 Nuestro Impacto
                        </span>
                        <h2 className="text-navy-text font-heading text-3xl md:text-4xl font-bold dark:text-white">
                            Estadísticas y Datos Curiosos
                        </h2>
                    </div>
                    <StatsSection />
                </div>
            </section>

            {/* Blog Posts Section */}
            <section className="w-full px-4 md:px-20 py-20 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-white text-sm font-medium mb-4 shadow-lg">
                            📚 Artículos Destacados
                        </span>
                        <h2 className="text-navy-text font-heading text-3xl md:text-4xl font-bold dark:text-white">
                            Blog de Investigación
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                            Consejos prácticos y guías detalladas para cada etapa de tu tesis.
                        </p>
                    </div>
                    <BlogPostsList posts={posts} />
                </div>
            </section>

            {/* Videos Section */}
            <section className="w-full px-4 md:px-20 py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-white text-sm font-medium mb-4 shadow-lg">
                            🎬 Videos Educativos
                        </span>
                        <h2 className="text-navy-text font-heading text-3xl md:text-4xl font-bold dark:text-white">
                            Aprende en Video
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                            Tutoriales, tips y contenido educativo en formato audiovisual.
                        </p>
                    </div>
                    <VideoSection videos={videos} />
                </div>
            </section>

            {/* Downloads Section */}
            <section className="w-full px-4 md:px-20 py-20 bg-white dark:bg-slate-950">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full text-white text-sm font-medium mb-4 shadow-lg">
                            📥 Recursos Gratuitos
                        </span>
                        <h2 className="text-navy-text font-heading text-3xl md:text-4xl font-bold dark:text-white">
                            Descarga Gratis
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                            Plantillas, guías y herramientas para acelerar tu investigación.
                        </p>
                    </div>
                    <DownloadsSection />
                </div>
            </section>

            {/* FAQ Section */}
            <section className="w-full px-4 md:px-20 py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white text-sm font-medium mb-4 shadow-lg">
                            ❓ Preguntas Frecuentes
                        </span>
                        <h2 className="text-navy-text font-heading text-3xl md:text-4xl font-bold dark:text-white">
                            Resolvemos tus Dudas
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                            Las preguntas más comunes sobre tesis e investigación académica.
                        </p>
                    </div>
                    <FAQSection />
                </div>
            </section>

            {/* CTA Final */}
            <section className="w-full px-4 md:px-20 py-20 bg-white dark:bg-slate-950">
                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-gradient-to-r from-[#345672] via-[#3d6485] to-[#2a4158] rounded-3xl p-10 md:p-16 overflow-hidden shadow-2xl text-center">
                        {/* Background effects */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400 rounded-full blur-[120px] opacity-20"></div>
                            <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-400 rounded-full blur-[100px] opacity-15"></div>
                        </div>

                        <div className="relative z-10">
                            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mb-6 border border-white/20">
                                🎓 ¿Listo para comenzar?
                            </span>
                            <h2 className="text-white font-heading text-3xl md:text-4xl font-bold mb-6">
                                Agenda tu Asesoría Gratuita
                            </h2>
                            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                                Conversemos sobre tu proyecto y cómo podemos ayudarte a lograr tu titulación este año.
                            </p>
                            <div className="flex gap-4 justify-center flex-wrap">
                                <a
                                    href="/contacto"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-navy-text font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                                >
                                    <span className="material-symbols-outlined">calendar_month</span>
                                    Agendar Consulta
                                </a>
                                <a
                                    href="https://wa.me/51916077800"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 font-bold rounded-xl transition-all hover:scale-105"
                                >
                                    <span className="material-symbols-outlined">chat</span>
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
