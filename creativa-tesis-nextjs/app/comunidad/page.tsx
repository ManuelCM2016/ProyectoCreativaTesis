import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Comunidad - Creativa Tesis',
    description:
        'Únete a más de 700 estudiantes que ya están graduándose con nuestros recursos exclusivos, soporte con IA y asesoría experta.',
};

export default function CommunityPage() {
    const features = [
        {
            icon: 'smart_toy',
            title: 'Prompts de IA Optimizados',
            description:
                'Comandos listos para usar en ChatGPT y otras IAs, diseñados específicamente para redacción académica.',
            bgColor: 'bg-blue-50',
            iconColor: 'text-primary-blue',
        },
        {
            icon: 'menu_book',
            title: 'Explicaciones Detalladas',
            description:
                'Guías paso a paso para desarrollar cada capítulo de tu tesis, desde el planteamiento hasta las conclusiones.',
            bgColor: 'bg-blue-50',
            iconColor: 'text-primary-blue',
        },
        {
            icon: 'security',
            title: 'Anti-plagio y Uso de IA',
            description:
                'Mantente al día con las últimas herramientas de detección y aprende a humanizar tu redacción.',
            bgColor: 'bg-blue-50',
            iconColor: 'text-primary-blue',
        },
        {
            icon: 'diamond',
            title: 'Recursos Exclusivos',
            description:
                'Acceso a plantillas Word, formatos APA 7ma edición y e-books descargables gratis.',
            bgColor: 'bg-blue-50',
            iconColor: 'text-primary-blue',
        },
    ];

    const flags = [
        {
            name: 'Peru',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCBDU8JoxKKrakRPqqUqNiQ7iVZfgfwWOeJ32v2IHONavgI4bie3CiGlZIrGy0eyKK31g1t6Vb2KdrZLM478YU7kP5NxClBRwDnAd4O0lHH9Bd8UXq35fb2uCyiKI_-AENi8lIMZVVLCiag_WPWpD8kDivNgOq3IBfQiLkcOUmMTOgV_dCTkvyW0nfO3wP63usinhGjlE62R-HnJaPEvY2-9mtVSMOb2tRxmgeM9nY3z49pCAM-0CdNwQz5mMY9pfD9W0gXviWQC6s',
        },
        {
            name: 'Mexico',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuASEz_FvL65DAOFf39-eAsLl7jpMBWqMlhlIGmIF4HPS4IIqKruhPy8j2fdBQnQaoO57v58qmWXmxjfxiA8M2DQAldKWLJ-jFnQ22IIeIFEC2CqGO-4-GOsq4vRsFja4yhJDnvFKXD-PLl9qAFPH0prjIH5rseSR051NcoqXB5gAPDjL7NyU1x6fqbjiA0Npo4vDrGt_QrNyXBvj9cz0kXDNSDwDtZhoFX9-lvW7jJPQS9iXEsXGkpgQ6lSXxvcp6bWRWqD4QVf4Dk',
        },
        {
            name: 'Colombia',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAfudsiKecFf7j74GLLXgU4vuaj98sA5WA7Aq7U3U_Z5aHaW6SrtVDwlHDfeYjYARQaKgLXoRQzQQd6shYlzklWb6Ar4qmDMBABHH-ZbyDm4OuCIpEQwSUH3OgaC7cIK73j-TSbgzYHUVlPvH89c4xnlyIT_qi5hKYC3dsvx3odG5xBri7fLYGOxEuL2yMJ88U9ZBoEpPLoXXG7flnMkATm_a8MxASBQxNNaFmfbus_8HGtDGc7VJJ7CUcwchlJ2Ste-Bs-so56V90',
        },
        {
            name: 'Chile',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuALG7kI8uWLIm3g4vNaZfU8QeCeHqvD6wfSXdTPpkkzQUP17k2cM09RwvQ7X82o5RkudiZu7Ghd40VnTi3V1v00lwzedds8FFSV5RK_SZVwN5lz0rBUL1SQMj6uhIIyLX3uXWt-7XDYKJqPioTKhwiC7Vuop94sUw9cpiZF5Hl6UfB2lN98Y0f1RfrhFFxUfG3d5XW9c0m75L05XESdLiBVUSIPGyBv0CpS5SP6VGr37C8_4mcVZLFsFX_lDCCE0ZESUlbcKxzTHdY',
        },
        {
            name: 'Argentina',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBus2zWpycmYASH4uFClODj3SDfULR9qI710W4nt1l2XbV8zEy_N8cyeNObDJZwcQ-2yH4plBX30OwdBJO10rVt65KUMaPchF1-uIhgIfRFFdR-oYO-4rJkKLY2hoGdpOi17BIFu8PNHbh3g8rMxXuWvlyXYp8gLhx83V4zUTnSuDJvBmTwBj1qZaL_lrfSqn5raMsu1T1WIzN8WutkreBi2JKmYxOd434Et8KuHSC-A0aUI5OIbaI3hYZPvQZ9QIq3Fr3Boi5DLpY',
        },
        {
            name: 'Ecuador',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDLtG1tJqDlr7KpHWcD5RIb8JeIJ8fmONw-5N8b_OIuFN_Rtwg04D4PNYPy7V_PQbs1VUwP_BC94P-RVgeWyBLOxqfpsH77O7QZ2XsQ1vulMjH6UDO-9oPHufaSjtY7-jAWUp86fJVYsOTKhJSPAoCAdp0ojjOianwSbgrCztcJeieF2ohxupSuxquRqQ5HwNSUnLTsdHSaNDjMvOXMXqbbvIFjMd83Ipn6OCZQh9mCCut9pOgJmqJIBmNwv5dXpBuQOrLLJ2PnGBI',
        },
        {
            name: 'Bolivia',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDFKNVWaFEY6NGDg3wPjEHOFG97jCLEyj1x_MG1j6oOMyKfOVyEgR0gBXQciwPU8KbFK1HEJ-vhWHkyd9asZ3bDd9rYhkTOzknNYeOAPRanqKmfgXwc3ZCDsnMjctqOKoYAo1ube3NcLbbpu-MID5SARmrn85eZ5CClfU7Rk27ptqsytDFEUK3v3asNvXVnStaSiSxQJmJhHAl-aAEkrUT8vGRYP950iuOm9ClaZq3uAiX9zfoOYRp9hr7GVTv5rGmcddedI3L3oTE',
        },
        {
            name: 'Spain',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDEqnCAfgqT44sBG3WdJ6lOXfgwWeEeM_xN5TKNL3k80ThjQvEG6oYWDs1fzWkxtvJd55VQOKAWEYzP6iCKxxYVHj9ksgygGyLO2RhCE1ZZbNgDel1RF1R1PqWGCJL8JHOlGi_wDwznMabbGAZ3KMcyr9FsvL0vtNKDC-spD41kLJyYBTq2wvFT846XlxPEhJqLhH7l-b1_f4qw0lFlATwDRxdeQVplTas8YwPgUvbKwLzdRWt2dkEr0wLW7W9H68igy_zDvytFJKc',
        },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-secondary-blue dark:bg-background-dark">
            {/* Hero Section */}
            <header className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                    <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-white/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[10%] left-[5%] w-[30%] h-[30%] bg-primary-blue/10 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        {/* Hero Content */}
                        <div className="flex flex-col gap-6 text-center lg:text-left">
                            {/* Urgency Badge */}
                            <div className="inline-flex items-center gap-2 self-center lg:self-start bg-yellow-100/90 border border-yellow-200 px-4 py-2 rounded-full animate-pulse">
                                <span className="material-symbols-outlined text-yellow-700 text-sm">warning</span>
                                <span className="text-yellow-800 text-xs font-bold uppercase tracking-wider font-body">
                                    Próximamente servicio de pago
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-navy-text dark:text-white tracking-tight font-heading">
                                Acelera tu Tesis con la Comunidad{' '}
                                <span className="text-primary-blue">#1 en Latinoamérica</span>
                            </h1>

                            <p className="text-lg sm:text-xl text-navy-text/80 dark:text-gray-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0 font-body">
                                Únete a más de <span className="font-bold text-navy-text dark:text-white">700 estudiantes</span>{' '}
                                que ya están graduándose con nuestros recursos exclusivos, soporte con IA y asesoría experta.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                                <button className="flex items-center justify-center gap-2 bg-primary-blue hover:bg-blue-600 text-white text-lg font-bold py-4 px-8 rounded-xl transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 w-full sm:w-auto group font-body">
                                    <span>¡Quiero unirme GRATIS!</span>
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                                        arrow_forward
                                    </span>
                                </button>

                                <button className="flex items-center justify-center gap-2 bg-white/40 hover:bg-white/60 text-navy-text border border-white/50 text-lg font-bold py-4 px-8 rounded-xl transition-all backdrop-blur-sm w-full sm:w-auto font-body">
                                    <span className="material-symbols-outlined">play_circle</span>
                                    <span>Ver cómo funciona</span>
                                </button>
                            </div>

                            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm font-medium text-navy-text/70 dark:text-gray-300">
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-green-600 text-[20px]">
                                        check_circle
                                    </span>
                                    <span className="font-body">Sin tarjeta de crédito</span>
                                </div>
                                <div className="hidden sm:block text-navy-text/30">•</div>
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-green-600 text-[20px]">
                                        check_circle
                                    </span>
                                    <span className="font-body">Acceso inmediato</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Visual / Stats */}
                        <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 aspect-[4/3] bg-white group">
                                {/* Main Hero Image */}
                                <Image
                                    alt="Group of students working together"
                                    className="object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP_HQfBIlo7jiHV2dmWgif6hrU-rju_IPkDJQEVaqAM_DHunC9D3_TeDcTecJlzCkz1yS7lUqnpRZKKLMrv0DKzgg4zrdGzXJVJ9ByDyE6jfiXKiwwsr1x9pg5SaDMmO2RitZUu4W4C5S4QUfQgBUaWrF98tlnjXsMgLZ-_4uEoH2NkPrmcJzK-mUtnLYTbRPdaGNw0InsmjqTC0OrOgigszQGiQWaka8zdnWl47BQmsJhS77o670vemF4d89Z5Y49btiWkAq5fao"
                                    fill
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                {/* Floating Stat Card */}
                                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1 font-body">
                                            Estudiantes Activos
                                        </p>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-black text-navy-text font-heading">700+</span>
                                            <span className="text-sm text-green-500 font-bold flex items-center font-body">
                                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                                Creciendo
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-blue-50 p-2 rounded-lg">
                                        <span className="material-symbols-outlined text-primary-blue text-3xl">
                                            groups
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements behind image */}
                            <div className="absolute -z-10 -top-6 -right-6 w-full h-full border-2 border-white/30 rounded-2xl hidden sm:block"></div>
                            <div className="absolute -z-10 -bottom-6 -left-6 w-24 h-24 bg-yellow-300 rounded-full blur-xl opacity-60"></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-slate-900 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] relative z-10">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-navy-text dark:text-white text-3xl md:text-4xl font-black mb-4 font-heading">
                            Todo lo que necesitas para tu tesis
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 text-lg font-body">
                            Accede a herramientas y conocimientos validados que acelerarán tu investigación de meses a
                            semanas.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group"
                            >
                                <div
                                    className={`w-14 h-14 ${feature.bgColor} dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-blue transition-colors`}
                                >
                                    <span
                                        className={`material-symbols-outlined ${feature.iconColor} dark:text-blue-400 text-3xl group-hover:text-white transition-colors`}
                                    >
                                        {feature.icon}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-navy-text dark:text-white mb-2 font-heading">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 dark:text-gray-400 leading-relaxed font-body">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Community / Social Proof Section */}
            <section className="py-16 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-md text-center md:text-left">
                            <h3 className="text-2xl font-bold text-navy-text dark:text-white mb-2 font-heading">
                                Comunidad Hispanoamericana
                            </h3>
                            <p className="text-slate-600 dark:text-gray-400 font-body">
                                Estudiantes de toda la región confían en nuestra metodología.
                            </p>
                        </div>

                        <div className="flex-1 flex flex-col gap-4">
                            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 items-center opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                                {flags.map((flag, index) => (
                                    <div
                                        key={index}
                                        className="aspect-[3/2] rounded overflow-hidden shadow-sm bg-gray-100"
                                        title={flag.name}
                                    >
                                        <Image
                                            alt={`${flag.name} flag`}
                                            className="w-full h-full object-cover"
                                            src={flag.image}
                                            width={60}
                                            height={40}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA / Urgency */}
            <section className="py-20 relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-secondary-blue to-blue-300 dark:from-slate-800 dark:to-slate-900"></div>

                {/* Pattern Overlay */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                    }}
                ></div>

                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50 dark:border-slate-700">
                        <div className="inline-block bg-primary-blue/10 text-primary-blue font-bold px-4 py-1.5 rounded-full text-sm mb-6 uppercase tracking-wider font-body">
                            Oferta Limitada
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black text-navy-text dark:text-white mb-6 tracking-tight font-heading">
                            No esperes a que sea de pago
                        </h2>

                        <p className="text-xl text-navy-text/80 dark:text-gray-300 mb-8 max-w-2xl mx-auto font-body">
                            Estamos construyendo la biblioteca de recursos de tesis más grande de Latinoamérica. Únete
                            hoy y asegura tu acceso gratuito de por vida a los recursos actuales.
                        </p>

                        <button className="w-full md:w-auto bg-primary-blue hover:bg-blue-600 text-white text-xl font-bold py-4 px-12 rounded-xl transition-all shadow-lg hover:shadow-2xl hover:scale-105 font-body">
                            ¡Quiero unirme GRATIS ahora!
                        </button>

                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 font-body">
                            🔒 Acceso seguro y sin spam. Puedes darte de baja cuando quieras.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
