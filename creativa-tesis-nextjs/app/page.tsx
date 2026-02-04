import Hero from '@/components/home/Hero';
import SuccessCasesSection from '@/components/home/SuccessCasesSection';
import ComparativeMethodology from '@/components/home/ComparativeMethodology';
import SpecialtiesGallery from '@/components/home/SpecialtiesGallery';
import SatisfactionGuarantee from '@/components/home/SatisfactionGuarantee';
import ProcessSection from '@/components/home/ProcessSection';
import ToolsEcosystem from '@/components/home/ToolsEcosystem';
import StudentTimeline from '@/components/home/StudentTimeline';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import VisualFAQ from '@/components/home/VisualFAQ';
import CTASection from '@/components/home/CTASection';
import CertificationsSection from '@/components/home/CertificationsSection';

export default function Home() {
  return (
    <>
      {/* 1. Hero - Conservado */}
      <Hero />

      {/* 2. NUEVO: Casos de Éxito en Números */}
      <SuccessCasesSection />

      {/* 3. NUEVO: Metodología Comparativa (Con vs Sin Asesoría) */}
      <ComparativeMethodology />

      {/* 4. NUEVO: Galería de Especialidades Interactiva */}
      <SpecialtiesGallery />

      {/* 5. NUEVO: Garantía de Satisfacción */}
      <SatisfactionGuarantee />

      {/* 6. Tu Camino al Éxito en 4 Pasos - Conservado */}
      <ProcessSection />

      {/* 7. NUEVO: Ecosistema de Herramientas (sin calculadoras) */}
      <ToolsEcosystem />

      {/* 8. NUEVO: Timeline de Éxito del Estudiante */}
      <StudentTimeline />

      {/* 9. Testimonials - Conservado */}
      <TestimonialsSection />

      {/* 10. NUEVO: Preguntas Frecuentes Visuales */}
      <VisualFAQ />

      {/* 11. ¿Tienes dudas sobre tu tema? - Conservado */}
      <CTASection />

      {/* 12. NUEVO: Certificaciones y Alianzas */}
      <CertificationsSection />
    </>
  );
}
