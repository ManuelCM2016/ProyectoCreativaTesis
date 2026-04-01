import Hero from '@/components/home/Hero';
import IntroSplitSection from '@/components/home/IntroSplitSection';
import StatsBentoGrid from '@/components/home/StatsBentoGrid';
import FlyerPreviewHome from '@/components/home/FlyerPreviewHome';
import MethodologyComparison from '@/components/home/MethodologyComparison';
import ServicesAnimatedTabs from '@/components/home/ServicesAnimatedTabs';
import GuaranteeBanner from '@/components/home/GuaranteeBanner';
import InteractiveJourney from '@/components/home/InteractiveJourney';
import MagneticEcosystem from '@/components/home/MagneticEcosystem';
import ChatShowcase from '@/components/home/ChatShowcase';
import MinimalistFAQ from '@/components/home/MinimalistFAQ';
import CTASection from '@/components/home/CTASection';
import CertificationsSection from '@/components/home/CertificationsSection';
import { getHomeIntro, getChatTestimonials, getCertifications, getFeaturedFlyers } from '@/lib/sanity/queries';

export default async function Home() {
  // Fetch data from Sanity
  const [homeIntroData, chatTestimonials, certifications, featuredFlyers] = await Promise.all([
    getHomeIntro(),
    getChatTestimonials(),
    getCertifications(),
    getFeaturedFlyers(),
  ]);

  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Intro Split — Post-Hero (Dynamic from Sanity) */}
      <IntroSplitSection data={homeIntroData} />

      {/* 3. Stats Bento Grid — "Resultados auditados" */}
      <StatsBentoGrid />

      {/* 4. Vitrina Social — Preview de Flyers de RRSS */}
      <FlyerPreviewHome flyers={featuredFlyers} />

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

      {/* 9. Chat Showcase — WhatsApp Screenshots con iPhone Mockup */}
      <ChatShowcase testimonials={chatTestimonials} />

      {/* 10. FAQ — Acordeón minimalista */}
      <MinimalistFAQ />

      {/* 11. CTA Final */}
      <CTASection />

      {/* 12. Certificaciones — Marquee infinito */}
      <CertificationsSection certifications={certifications} />
    </>
  );
}
