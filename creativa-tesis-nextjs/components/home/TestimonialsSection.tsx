import Image from 'next/image';
import Badge from '@/components/ui/Badge';

export default function TestimonialsSection() {
    const testimonials = [
        {
            name: 'Juan A.',
            institution: 'Universidad XYZ',
            avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuA9Pd2ROzmjw6aqmF4qElDRsOFn7T9qAG2qSnsU8OxPHFQ7-xEmZ8qgPTJ-7dasHa6jGQX17V_Kgx2q9wRfGDQ4oisUVKHGqkokeRa88p7f3lFShodR6uyFnkSSYh9PqgLoBCX_z7CNUMKnmyTy7ZQ5dz92zGcAN57Ehis1Nl8M4t2dI-W2u7TCTS4zSn_LUsjF4Zn43wSqP0-i6DJBQwu8h5d5P4v94KBTThqcPTa5LxNUcWXKsA8dF7x4xZEBHTPUhbfk49KYk_I',
            quote: 'La asesoría de Creativa Tesis fue clave. Logré terminar mi tesis a tiempo y con una calidad que nunca imaginé.',
        },
        {
            name: 'María G.',
            institution: 'Facultad de Educación',
            avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCtE9aHtVQFSDeO8wanMhkYyJbHWicMqnfV4V4oZM-MxYFb3wxa7iNQPxeBVywZDIoNVIrLNVX11UNimahDxtjl-rZgIpfJtJ3PpSuwgJZyWjNew8amlbWsQ1SmTCt-t8lEEZHxlR-C0ULWD_upB6Vxme34zJfw7uAetbhwiBXV8sG-EpPW2O81AAYb85zEZls57xaUxleZ4qE-2vn3x3D-X8uGnEDaUN54LM-8LsOjAH2j2IgLABLYSHpIG_9lDeg98H6nNeWKkfs',
            quote: 'Su enfoque paso a paso hizo que el proceso fuera mucho menos estresante. ¡Altamente recomendados!',
        },
        {
            name: 'Roberto P.',
            institution: 'Ingeniería de Sistemas',
            avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCbUmwVEeaULq2ePYZJizK-oM1LiU3HDAEvw2IgXvdNF3g1Y-h-M1StAR1GvyNY1rIJLdUXnZdZunVaSGo7R-xwBHLgJ3gV_pAz6UtMDtNQiXJJOQwixyHeTtpc6X5qk7r45PKwCwdy7bPcz3WRWn5d022K1zz11y1Q0jf1hHKQf574dpO01ieURb7Rbtz0YHT4QccF1ygmR-zrHzqfCZiLdfaa8n1xtpGkZGJEmF9WocjUBG-LoOPIYPEU0BrVj_yqJfuiPKfTXDs',
            quote: 'Profesionales y empáticos. Me ayudaron a estructurar mis ideas y a presentar un trabajo impecable.',
        },
    ];

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
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="min-w-[85%] sm:min-w-[calc(50%-1rem)] lg:min-w-0 snap-center flex-shrink-0 bg-light-grey-bg p-8 rounded-lg shadow-md dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <Image
                                        alt={`Avatar ${testimonial.name}`}
                                        className="h-12 w-12 rounded-full object-cover"
                                        src={testimonial.avatar}
                                        width={48}
                                        height={48}
                                    />
                                    <div>
                                        <p className="font-semibold text-navy-text dark:text-white">{testimonial.name}</p>
                                        <p className="text-sm text-slate-500 dark:text-gray-400">
                                            {testimonial.institution}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-lg italic text-slate-700 dark:text-gray-300">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
