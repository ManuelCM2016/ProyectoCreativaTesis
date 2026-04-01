import Hero from '@/components/home/Hero';
import IntroSplitSection from '@/components/home/IntroSplitSection';
import StatsBentoGrid from '@/components/home/StatsBentoGrid';
import MethodologyComparison from '@/components/home/MethodologyComparison';
import ServicesAnimatedTabs from '@/components/home/ServicesAnimatedTabs';
import GuaranteeBanner from '@/components/home/GuaranteeBanner';
import InteractiveJourney from '@/components/home/InteractiveJourney';
import MagneticEcosystem from '@/components/home/MagneticEcosystem';
import TestimonialsMarquee from '@/components/home/TestimonialsMarquee';
import MinimalistFAQ from '@/components/home/MinimalistFAQ';
import CTASection from '@/components/home/CTASection';
import CertificationsSection from '@/components/home/CertificationsSection';
import { getHomeIntro } from '@/lib/sanity/queries';

export default async function Home() {
  // Fetch home intro data from Sanity
  const homeIntroData = await getHomeIntro();

  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Intro Split — Post-Hero (Dynamic from Sanity) */}
      <IntroSplitSection data={homeIntroData} />

      {/* 3. Stats Bento Grid */}
      <StatsBentoGrid />

      {/* 4. Metodología Comparativa */}
      <MethodologyComparison />

      {/* 5. Servicios con Tabs Animados */}
      <ServicesAnimatedTabs />

      {/* 6. Garantía — Banner oscuro */}
      <GuaranteeBanner />

      {/* 7. Viaje Interactivo — Sticky Scroll */}
      <InteractiveJourney />

      {/* 8. Ecosistema Magnético — Dark Bento */}
      <MagneticEcosystem />

      {/* 9. Testimonios — Marquee infinito */}
      <TestimonialsMarquee />

      {/* 10. FAQ — Acordeón minimalista */}
      <MinimalistFAQ />

      {/* 11. CTA Final */}
      <CTASection />

      {/* 12. Certificaciones */}
      <CertificationsSection />
    </>
  );
}
