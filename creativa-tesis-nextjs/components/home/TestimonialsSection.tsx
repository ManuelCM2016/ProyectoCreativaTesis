import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { getSuccessCases } from '@/lib/sanity/queries';

export default async function TestimonialsSection() {
    // Fetch success cases from Sanity CMS and limit to 5
    const allCases = await getSuccessCases();
    const testimonials = allCases.slice(0, 5);

    return (
        <section className="py-16 lg:py-24 bg-background-light dark:bg-background-dark" id="testimonios">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12 flex flex-col gap-4 text-center md:items-center">
                    <Badge icon="reviews">Experiencias Reales</Badge>
                    <h2 className="font-heading text-navy-text text-4xl font-bold tracking-tight md:text-5xl dark:text-white">
                        Lo que Dicen Nuestros Estudiantes
                    </h2>
                    <p className="mx-auto max-w-[800px] text-slate-600 font-body md:text-lg dark:text-gray-300">
                        Historias de éxito que inspiran y demuestran la calidad de nuestra asesoría.
                    </p>
                </div>

                <div className="relative w-full overflow-hidden">
                    <div className="flex space-x-8 snap-x snap-mandatory overflow-x-auto pb-4 scrollbar-hide lg:grid lg:grid-cols-3 lg:space-x-0 lg:gap-8">
                        {testimonials.length > 0 ? (
                            testimonials.map((testimonial: any) => (
                                <div
                                    key={testimonial._id}
                                    className="min-w-[85%] sm:min-w-[calc(50%-1rem)] lg:min-w-0 snap-center flex-shrink-0 bg-light-grey-bg p-8 rounded-lg shadow-md dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        {testimonial.avatar ? (
                                            <Image
                                                alt={`Avatar ${testimonial.personName}`}
                                                className="h-12 w-12 rounded-full object-cover"
                                                src={testimonial.avatar}
                                                width={48}
                                                height={48}
                                            />
                                        ) : (
                                            <div className="h-12 w-12 rounded-full bg-primary-blue/20 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-primary-blue">
                                                    person
                                                </span>
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-semibold text-navy-text dark:text-white">
                                                {testimonial.personName || 'Estudiante'}
                                            </p>
                                            <p className="text-sm text-slate-500 dark:text-gray-400">
                                                {testimonial.career || testimonial.university || 'Universidad'}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-lg italic text-slate-700 dark:text-gray-300">
                                        &ldquo;{testimonial.quote || testimonial.title}&rdquo;
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-12">
                                <p className="text-slate-500 dark:text-gray-400">
                                    No hay testimonios disponibles en este momento.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* CTA Button */}
                <div className="mt-10 text-center">
                    <Link
                        href="/casos-exito"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-blue to-secondary-blue text-white rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        <span>Ver Todos los Casos de Éxito</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
