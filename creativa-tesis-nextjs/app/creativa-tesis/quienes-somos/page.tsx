import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import AboutEssence from '@/components/about/AboutEssence';
import AboutValues from '@/components/about/AboutValues';
import AboutWhyUs from '@/components/about/AboutWhyUs';
import AboutCTA from '@/components/about/AboutCTA';

export const metadata: Metadata = {
    title: 'Quiénes Somos - Creativa Tesis',
    description:
        'Conoce a Creativa Tesis, tu aliado estratégico en la titulación. Más de 500 tesis aprobadas con ética, excelencia y empatía.',
};

export default function QuienesSomosPage() {
    return (
        <>
            {/* 1. Hero Inmersivo — Full-screen con parallax */}
            <AboutHero />

            {/* 2. Nuestra Esencia — Misión y Visión sticky scroll */}
            <AboutEssence />

            {/* 3. Nuestros Valores — Acordeón horizontal */}
            <AboutValues />

            {/* 4. ¿Por qué elegirnos? — Stats + Features */}
            <AboutWhyUs />

            {/* 5. CTA Final */}
            <AboutCTA />
        </>
    );
}
