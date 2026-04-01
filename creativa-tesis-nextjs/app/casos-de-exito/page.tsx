import type { Metadata } from 'next';
import { getChatTestimonials } from '@/lib/sanity/queries';
import SuccessHero from '@/components/success/SuccessHero';
import SuccessBeforeAfter from '@/components/success/SuccessBeforeAfter';
import ChatShowcase from '@/components/home/ChatShowcase';
import SuccessMarquee from '@/components/success/SuccessMarquee';
import SuccessCTA from '@/components/success/SuccessCTA';

export const metadata: Metadata = {
    title: 'Casos de Éxito - Creativa Tesis',
    description: 'Historias reales de éxito académico en Tacna. Más de 500 tesis aprobadas de estudiantes de diversas universidades guiados por nuestra mentoría especializada.',
};

export const revalidate = 60; // ISR cache for one minute

export default async function SuccessCasesPage() {
    // Fetch live testimonials from Sanity (or fallback empty if not available)
    const chatTestimonials = await getChatTestimonials().catch(() => []);

    return (
        <main className="w-full flex-col flex overflow-hidden lg:pt-20">
            {/* 1. Impact metrics hero */}
            <SuccessHero />
            
            {/* 2. Empathic timeline transition */}
            <SuccessBeforeAfter />
            
            {/* 3. The raw truth (Interactive iPhone Showcase) */}
            <ChatShowcase testimonials={chatTestimonials} />
            
            {/* 4. Physical evidence / Marquee */}
            <SuccessMarquee />
            
            {/* 5. Strong CTA */}
            <SuccessCTA />
        </main>
    );
}
