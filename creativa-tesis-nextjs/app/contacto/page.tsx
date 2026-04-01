import type { Metadata } from 'next';
import ContactSplitScreen from '@/components/contact/ContactSplitScreen';

export const metadata: Metadata = {
    title: 'Contacto - Creativa Tesis',
    description:
        'Contáctanos para asesoría personalizada en tu tesis. Visítanos en Tacna, llámanos al 918 677 900 o escríbenos a informes@creativatesis.pe',
};

export default function ContactPage() {
    return (
        <main className="w-full">
            <ContactSplitScreen />
        </main>
    );
}
