import type { Metadata } from 'next';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Casos de Éxito - Creativa Tesis',
    description:
        'Historias reales de éxito académico en Tacna. Más de 500 tesis aprobadas de estudiantes de UNJBG, UPT y otras universidades.',
};

export default function SuccessCasesPage() {
    const testimonials = [
        {
            name: 'Maria G.',
            career: 'Contabilidad - UNJBG',
            avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAlyjJrLpjiSZN7nADzNigdqdUEAVpAnzTTbQh8Q9MzYlESTaKXyrurIpeIWKuXVl_L6TNB3TNihDKuOWpHcOmU3PuieAQcNRuI7vkqAcbr4cOrIjQjy0CUN3lhBvwWNFR2LZ9AAiT30Rh1i0ChuqdiKjjM9zaB5dXNgXcpA7sH8_7wOZsWAOCJqHAbihmBxjLMbjCYDqIB74LLcsHkbZ9Pyv3WBtsNNhuZfRymwo4dxVPMQVlU7lvtIEQZHxaU5jzKY8JjGgtT5Kk',
            thesis: 'Estrategias de auditoría interna para la optimización de recursos financieros.',
            quote:
                'Me sentía estancada con el marco teórico. En Creativa Tesis me ayudaron a encontrar bibliografía actual. ¡Aprobé mi proyecto en el primer intento!',
            result: 'Sustentación Unánime',
            resultColor: 'green',
            resultIcon: 'verified',
        },
        {
            name: 'Carlos R.',
            career: 'Derecho - UPT',
            avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCqEBIMvqVQughtjQbc7_jQgNOsntDK4Rn01ZIypeNTUr1ZxKwZOV5VRlnIIRSZWzzacy5krHShB7wdjirj2AbpLW26I0eH_U4YmfQIbw-yDzOqNcZADlU0TrpJP3zkDRPzsJ46GVxPj3KEug9AANy8tj7aiEwU6w9FQTg49lyfrINUSvUjuNERjiCncOOo023bpL55dQtKUXG2t0DAkZdSU4Ktif2po8COkPwx1c3s4pmdqGiytTNd7DsokdJjmYWepmwh_gDlejg',
            thesis:
                'La prisión preventiva y el principio de presunción de inocencia en el Código Procesal Penal.',
            quote:
                'El servicio de corrección de estilo y normas APA fue impecable. Mi asesor de tesis no encontró ni un solo error de formato. Totalmente recomendados.',
            result: 'Excelencia Académica',
            resultColor: 'blue',
            resultIcon: 'star',
        },
        {
            name: 'Ana T.',
            career: 'Enfermería - UNJBG',
            avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBwpVRG8HPEOATiX6gZa8vYzYqVkR4D8luESGOikjU5QgR5xSpqsRpsygMTDuF7Pxo2a0s1Tbymsr--Vcu3oNkS3fYTICdnqDn0EMng0ZWhPfNRIOAhp5uemxgB3QQq9RpBZMGMxEOexUptbpCJSamUHewpVNchwKXae_6HgLNchoLdHlZHT-_wWUwU3QTEAn5rqRPh2BxcuhUzDfPnmCIC6VyqptMu3XubWg-XcS2Y3tIg8fHiz-JCalpnONkRRW0-VIe46bWAqQI',
            thesis:
                'Nivel de estrés laboral y calidad de atención en enfermeras del servicio de emergencia.',
            quote:
                'Gracias a su asesoría metodológica pude replantear mis objetivos. Pasé de tener mi tesis observada a ser felicitada por la claridad del estudio.',
            result: 'Sin Observaciones',
            resultColor: 'green',
            resultIcon: 'check_circle',
        },
        {
            name: 'Luis M.',
            career: 'Administración - UAP',
            avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuC2F_pCJpieJEqQ04wBSP9LX447O77053KbXhGOOi7u38RsW9fQHl_ylZqfoqRugQJirT-aU_DUsrFn3YSnzbZagv85PCEJrSxB3hwGVwpbeLv-ABbCt7Ls0bxhyJauTwEY0_BW2UmPtzAdTHOxaQaARkXgSl10JHYlW48pdtk8jDdl5_IcrHW39b9kLlbX9qVaKgY69FC1vgL8dUJmU4nHIYwgNxt07RQp2_QY07TsaWR0cr_EWZr_onPe211W0nH2WH9PukrTH2U',
            thesis:
                'Gestión del talento humano y su impacto en la productividad laboral del sector público.',
            quote:
                'Lo mejor fue la rapidez. Tenía un plazo muy corto para entregar el borrador final y cumplieron con las fechas exactas. ¡Son unos salvavidas!',
            result: 'Proyecto Aprobado',
            resultColor: 'purple',
            resultIcon: 'bolt',
        },
        {
            name: 'Sofía R.',
            career: 'Psicología - UPT',
            avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuC6Y6Fsh3gVnhIqrWgaZ5kIC9U41AklZkDeIIKpIA9PRY0OQ0Y2v1fJEUWrkSzmA8usfMCzuwPg4bCoG3REnPF9AQFdVfslOVYRvtZ9BJ4l0XR8pcO21CG0IqwMwW76YMslK5_7ncZW0FEu4GWo1jXd_P5XIr2ogRn80qp1UwoM-AdScZYR1yw8XojqLEMoNtY2aUYQTFj4eV7IVdn3Jj7CTBqn0Dhl-8GT-2Ob_4vur800ImWcEwItBdVUumEAPJzSbgD22pE4KAc',
            thesis:
                'Inteligencia emocional y estrategias de afrontamiento en estudiantes universitarios.',
            quote:
                'La asesoría personalizada por Zoom me ayudó mucho. El asesor siempre estuvo dispuesto a responder mis dudas, incluso fines de semana.',
            result: 'Felicitación Pública',
            resultColor: 'yellow',
            resultIcon: 'trophy',
        },
        {
            name: 'Miguel A.',
            career: 'Arquitectura - UPT',
            avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAVQmelGBW_oz-FTUXbMpr_jbcrNdUMxPDbQVYjxVREmfr9SWkwloFRvYTLYA0k7dMnR-rQauSmszU5zV8_0HzC0OiWqPnhOlxiXV34Ft-mD8rE7Qsi4Q_UMxxj-u7hvAweCZHIx_X3Ofo4wnxGJJLVry2LdByZLNOpLz9m6LNJiViyMlK10saDx9-lYuM6A1Mi3vlKAjhOLzxlvBe-Moqx8W7iv0mxKgojIRpKkVPLbLgd5dEsTQVShYoIX1BYlkwPlpAg4Ga0hZY',
            thesis:
                'Centro de interpretación cultural para la promoción del turismo vivencial en Tacna.',
            quote:
                'Honestidad y transparencia. Desde el primer día me dijeron qué era viable y qué no. Gracias a su guía, mi tesis es una realidad.',
            result: 'Aprobado con Distinción',
            resultColor: 'blue',
            resultIcon: 'workspace_premium',
        },
    ];

    const resultColorClasses = {
        green: 'bg-green-50 dark:bg-green-900/20',
        blue: 'bg-blue-50 dark:bg-blue-900/20',
        purple: 'bg-purple-50 dark:bg-purple-900/20',
        yellow: 'bg-yellow-50 dark:bg-yellow-900/20',
    };

    const resultIconColors = {
        green: 'text-green-600 dark:text-green-400',
        blue: 'text-blue-600 dark:text-blue-400',
        purple: 'text-purple-600 dark:text-purple-400',
        yellow: 'text-yellow-600 dark:text-yellow-400',
    };

    return (
        <>
            {/* Hero Section */}
            <header className="relative overflow-hidden  pt-16 pb-12 lg:pt-24 lg:pb-20">
                <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div className="flex flex-col gap-6">
                            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary-blue/10 px-3 py-1 text-sm font-semibold text-navy-text dark:bg-secondary-blue/20 dark:text-secondary-blue font-body">
                                <span className="material-symbols-outlined text-[18px]">verified</span>
                                <span>Más de 500 tesis aprobadas</span>
                            </div>

                            <h2 className="text-4xl font-black leading-[1.1] tracking-tight text-navy-text lg:text-5xl dark:text-white font-heading">
                                Historias Reales de{' '}
                                <span className="bg-gradient-to-r from-navy-text to-secondary-blue bg-clip-text text-transparent dark:from-secondary-blue dark:to-white">
                                    Éxito Académico
                                </span>{' '}
                                en Tacna
                            </h2>

                            <p className="text-lg leading-relaxed text-slate-600 dark:text-gray-400 font-body">
                                Descubre cómo estudiantes de la UNJBG, UPT y otras universidades lograron obtener su
                                título profesional superando los retos de investigación con nuestra metodología.
                            </p>

                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Button className="h-12 gap-2 shadow-lg shadow-primary-blue/20">
                                    <span>Ver testimonios</span>
                                    <span className="material-symbols-outlined text-[20px]">arrow_downward</span>
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="h-12 gap-2 border border-gray-200 dark:border-gray-700"
                                >
                                    <span>Cómo funciona</span>
                                </Button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-secondary-blue/20 blur-3xl filter dark:bg-primary-blue/20"></div>
                            <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl bg-gray-200">
                                <Image
                                    alt="Estudiantes graduados celebrando"
                                    className="h-full w-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoKVtEtIA5s5kjayUVcKrtytn-pgWnG9IDw5L6FP98KumYqKk0nrvmRPSY0tkT9B2cGGgXllZ3amMM1yS7ZLb0qkewSfP8ZwBFibQYFxVPMjUh_rkBsfIposMJCg5UR6I2ULykwadRh-Hiy64DDG69QWXJqKmpX0gKNrMyq-2n0RlYJyiWJ0E7EHW3gqh4hi3UAJCTMmu3wMaVMdzL58zOA3i1ePU7Cze7IDxJsii0EBpuGx9vDkKFZYw0zQIcl_Lw1eoUvtfKcOo"
                                    width={800}
                                    height={450}
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20 group cursor-pointer">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110">
                                        <span className="material-symbols-outlined text-primary-blue text-[32px] ml-1">
                                            play_arrow
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* University Logos */}
            <div className="border-y border-gray-100 bg-white py-8 dark:border-gray-800 dark:bg-slate-900">
                <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
                    <p className="mb-6 text-center text-sm font-medium text-gray-400 font-body">
                        ESTUDIANTES DE ESTAS UNIVERSIDADES CONFÍAN EN NOSOTROS
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-12 opacity-60 grayscale transition-all hover:grayscale-0">
                        <div className="flex items-center gap-2 text-xl font-bold text-gray-600 dark:text-gray-400 font-heading">
                            <span className="material-symbols-outlined text-[32px]">account_balance</span>
                            UNJBG
                        </div>
                        <div className="flex items-center gap-2 text-xl font-bold text-gray-600 dark:text-gray-400 font-heading">
                            <span className="material-symbols-outlined text-[32px]">school</span>
                            UPT
                        </div>
                        <div className="flex items-center gap-2 text-xl font-bold text-gray-600 dark:text-gray-400 font-heading">
                            <span className="material-symbols-outlined text-[32px]">menu_book</span>
                            U. Privada de Tacna
                        </div>
                        <div className="flex items-center gap-2 text-xl font-bold text-gray-600 dark:text-gray-400 font-heading">
                            <span className="material-symbols-outlined text-[32px]">history_edu</span>
                            U. Alas Peruanas
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Thesis */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
                    <div className="mb-8 flex items-end justify-between">
                        <div>
                            <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-secondary-blue font-body">
                                Destacado
                            </span>
                            <h2 className="text-3xl font-bold tracking-tight text-navy-text dark:text-white font-heading">
                                Tesis del Mes
                            </h2>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-900">
                        <div className="grid lg:grid-cols-5">
                            <div className="flex flex-col justify-center p-8 lg:col-span-3 lg:p-12">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                                        <Image
                                            alt="Juan Perez"
                                            className="h-full w-full object-cover"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_ijkpst_3LiegOw_hTBYm4atcLcWzKny3VxnlG0ptak3A769qvT9wdcL1D8N7ug2jM15EFj44qH7lbxaYLKkIDbA8QgpW8pTSweGJaMVgt_ic-URx5223n-JSM_m9luqozxYTHH_7rhikRuLm9SRetQtV2AAikQRMTRuvgEm7hamJPaHw14YrAtKmlD58w3Tk1XqAWVXUeF85wI-LyxoC-vqDF_IuE_kA_QeY9FgyRDC-b-m-NSn5LJxOEVfulcLzwrAbUmec4YQ"
                                            width={48}
                                            height={48}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-navy-text dark:text-white font-heading">
                                            Ing. Juan Pérez
                                        </h3>
                                        <p className="text-sm text-gray-500 font-body">Ingeniería Civil - UPT</p>
                                    </div>
                                    <div className="ml-auto rounded bg-green-100 px-2 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400 font-body">
                                        Aprobado con Distinción
                                    </div>
                                </div>

                                <blockquote className="mb-6 text-xl leading-relaxed font-medium text-navy-text dark:text-gray-200 font-body">
                                    &quot;Tenía los datos de campo pero no sabía cómo procesarlos estadísticamente. El equipo
                                    de Creativa Tesis no solo me ayudó con el SPSS, sino que me enseñaron a interpretar
                                    los resultados para sustentarlos con seguridad ante el jurado.&quot;
                                </blockquote>

                                <div className="mb-8 space-y-3 rounded-lg bg-gray-50 p-4 dark:bg-background-dark">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined mt-0.5 text-primary-blue">
                                            check_circle
                                        </span>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 font-body">
                                            <span className="font-semibold text-navy-text dark:text-white">Desafío:</span>{' '}
                                            Análisis estadístico complejo de resistencia de materiales.
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined mt-0.5 text-primary-blue">
                                            check_circle
                                        </span>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 font-body">
                                            <span className="font-semibold text-navy-text dark:text-white">Resultado:</span>{' '}
                                            Tesis aprobada en 4 meses sin observaciones mayores.
                                        </p>
                                    </div>
                                </div>

                                <button className="flex w-fit items-center gap-2 rounded-lg bg-primary-blue/10 px-5 py-2.5 text-sm font-bold text-primary-blue transition-colors hover:bg-primary-blue/20 dark:bg-primary-blue/20 dark:text-secondary-blue dark:hover:bg-primary-blue/30 font-body">
                                    Leer caso completo
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </button>
                            </div>

                            <div className="relative h-64 bg-gray-100 lg:col-span-2 lg:h-auto">
                                <Image
                                    alt="Planos de ingeniería"
                                    className="h-full w-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDck31lRPtzFktNrKnU8h2aCPUB3EwXvWIG59GEzEeGjjPHGEdhTE5I_US7CLsc9cWU7L1Uxgi4UHDJKCrwYKoO6J-hU2Ge9iCuub0OvKsc9wyXZk1oT6n0E4sCiwK2ZioCxrO0fHYFKXputYj57OUlkEUlSCvu_ejPdQIjfdl4At6aBYRcBAzBeDaPAEubX-onYOwJOqKcxq5bRTFpqZtte1bQ8ChoTjw_upsmQFb5xXTVh9uqCnYLWEoRizTs0gvP4yCtktGtvRU"
                                    fill
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-l"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <p className="text-sm font-medium opacity-90 font-body">Proyecto de Estructuras</p>
                                    <p className="font-bold font-heading">Diseño Sísmico en Tacna</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="relative overflow-hidden py-16 lg:py-24">
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,#FCFCFC,rgba(150,194,233,0.15))] dark:bg-background-dark dark:bg-none"></div>

                <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
                    <div className="mx-auto mb-10 max-w-[800px] text-center">
                        <h2 className="mb-4 text-3xl font-black tracking-tight text-navy-text dark:text-white font-heading">
                            Casos de Éxito y Testimonios
                        </h2>
                        <p className="text-lg leading-relaxed text-slate-600 dark:text-gray-400 font-body">
                            Cada tesis es única, pero el resultado siempre es el mismo: un profesional más titulado
                            en Tacna.
                        </p>
                    </div>

                    {/* Filter Buttons */}
                    <div className="mb-12 flex flex-wrap justify-center gap-3">
                        <button className="rounded-full bg-navy-text px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-navy-text/20 transition-transform hover:scale-105 font-body">
                            Todos
                        </button>
                        <button className="rounded-full bg-white border border-gray-200 px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-gray-50 hover:text-navy-text transition-colors dark:bg-background-dark dark:border-gray-700 dark:text-gray-300 font-body">
                            Ingeniería
                        </button>
                        <button className="rounded-full bg-white border border-gray-200 px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-gray-50 hover:text-navy-text transition-colors dark:bg-background-dark dark:border-gray-700 dark:text-gray-300 font-body">
                            Salud
                        </button>
                        <button className="rounded-full bg-white border border-gray-200 px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-gray-50 hover:text-navy-text transition-colors dark:bg-background-dark dark:border-gray-700 dark:text-gray-300 font-body">
                            Ciencias Sociales
                        </button>
                        <button className="rounded-full bg-white border border-gray-200 px-6 py-2.5 text-sm font-bold text-slate-600 hover:bg-gray-50 hover:text-navy-text transition-colors dark:bg-background-dark dark:border-gray-700 dark:text-gray-300 font-body">
                            Empresariales
                        </button>
                    </div>

                    {/* Testimonials Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-secondary-blue/50 dark:bg-background-dark dark:ring-gray-800"
                            >
                                <div>
                                    <div className="mb-5 flex items-center gap-4">
                                        <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-secondary-blue p-0.5">
                                            <Image
                                                alt={testimonial.name}
                                                className="h-full w-full rounded-full object-cover"
                                                src={testimonial.avatar}
                                                width={56}
                                                height={56}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-navy-text dark:text-white font-heading">
                                                {testimonial.name}
                                            </h3>
                                            <p className="text-xs font-medium text-slate-600 dark:text-gray-400 font-body">
                                                {testimonial.career}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-secondary-blue font-body">
                                            Tema de Tesis
                                        </p>
                                        <h4 className="text-sm font-bold leading-snug text-navy-text line-clamp-2 dark:text-gray-200 font-heading">
                                            &quot;{testimonial.thesis}&quot;
                                        </h4>
                                    </div>

                                    <blockquote className="mb-6 relative">
                                        <span className="absolute -left-2 -top-2 text-4xl text-gray-200 dark:text-gray-700">
                                            &quot;
                                        </span>
                                        <p className="relative z-10 text-sm leading-relaxed text-slate-600 italic dark:text-gray-400 pl-2 font-body">
                                            {testimonial.quote}
                                        </p>
                                    </blockquote>
                                </div>

                                <div className="border-t border-gray-100 pt-5 dark:border-gray-800">
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1 font-body">
                                                Resultado Obtenido
                                            </p>
                                            <div
                                                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 ${resultColorClasses[testimonial.resultColor as keyof typeof resultColorClasses]
                                                    }`}
                                            >
                                                <span
                                                    className={`material-symbols-outlined text-[16px] ${resultIconColors[testimonial.resultColor as keyof typeof resultIconColors]
                                                        }`}
                                                >
                                                    {testimonial.resultIcon}
                                                </span>
                                                <span className="text-xs font-bold text-navy-text dark:text-white font-body">
                                                    {testimonial.result}
                                                </span>
                                            </div>
                                        </div>
                                        <button className="rounded-lg bg-secondary-blue px-4 py-2 text-xs font-bold text-navy-text transition-colors hover:bg-blue-300 font-body">
                                            Ver más
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="mt-12 flex justify-center">
                        <button className="flex items-center gap-2 rounded-lg border border-secondary-blue/30 bg-white px-8 py-3 text-sm font-bold text-navy-text shadow-sm transition-all hover:bg-secondary-blue/10 hover:shadow-md dark:border-gray-700 dark:bg-transparent dark:text-white dark:hover:bg-gray-800 font-body">
                            Cargar más historias
                            <span className="material-symbols-outlined text-[18px]">expand_more</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative overflow-hidden bg-navy-text py-16 dark:bg-slate-800">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                ></div>

                <div className="relative mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-8 px-6 text-center lg:flex-row lg:px-10 lg:text-left">
                    <div className="max-w-2xl">
                        <h2 className="mb-4 text-3xl font-bold text-white font-heading">
                            ¿Listo para ser nuestra próxima historia de éxito?
                        </h2>
                        <p className="text-lg text-white/90 font-body">
                            Agenda una asesoría gratuita de 15 minutos y evaluemos juntos el estado actual de tu
                            tesis.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <button className="flex h-12 min-w-[180px] cursor-pointer items-center justify-center rounded-lg bg-white px-6 text-base font-bold text-navy-text shadow-lg transition-transform hover:scale-105 font-body">
                            Agendar Asesoría
                        </button>
                        <button className="flex h-12 min-w-[180px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 text-base font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20 font-body">
                            <span className="material-symbols-outlined text-[20px]">chat</span>
                            Hablar con Asesor
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

