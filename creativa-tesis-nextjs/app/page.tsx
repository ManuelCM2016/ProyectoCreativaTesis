import Hero from '@/components/home/Hero';
import ProblemsAndSolutions from '@/components/home/ProblemsAndSolutions';
import ServicesSection from '@/components/home/ServicesSection';
import ProcessSection from '@/components/home/ProcessSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemsAndSolutions />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}

