import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
    title: 'Contacto - Creativa Tesis',
    description:
        'Contáctanos para asesoría personalizada en tu tesis. Visítanos en Tacna, llámanos al 918 677 900 o escríbenos a informes@creativatesis.pe',
};

export default function ContactPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="w-full px-6 lg:px-40 py-12 flex justify-center bg-gradient-to-b from-light-grey-bg to-background-light dark:from-gray-900 dark:to-background-dark">
                <div className="max-w-[1200px] w-full flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col gap-4 max-w-2xl">
                        <h1 className="text-navy-text dark:text-white font-heading text-4xl md:text-5xl font-black leading-tight tracking-tight">
                            Contáctanos
                        </h1>
                        <p className="text-slate-600 dark:text-gray-400 font-body text-lg font-normal leading-relaxed max-w-lg">
                            ¿Listo para aprobar tu tesis? Déjanos tus datos o visítanos en nuestra oficina en Tacna
                            para una asesoría personalizada.
                        </p>
                    </div>
                    {/* Abstract decorative element */}
                    <div className="hidden md:block opacity-80">
                        <span className="material-symbols-outlined text-[120px] text-secondary-blue/30">
                            edit_document
                        </span>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <ContactForm />
        </>
    );
}

