"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function FlexTimeline() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  const setStepRef = (el: HTMLDivElement | null, index: number) => {
    stepsRef.current[index] = el;
  };

  const timelineData = [
    { label: "Entrega de sus 03 temas", time: "2 a 3 días" },
    { label: "Proyecto de tesis", time: "10 a 15 días" },
    { label: "Entrega de Tesis final", time: "10 a 15 días" },
    { label: "Turnitin", time: "3 a 5 días" },
    { label: "Levantamiento de observaciones", time: "2 a 3 días" },
  ];

  const phases = [
    {
      id: "01",
      title: "Plan o proyecto de tesis",
      description: "Construimos la base sólida de tu investigación de forma guiada y estructurada.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop",
      geometryClass: "rounded-[3rem] aspect-[16/9]", 
      substeps: [
        { label: "1. POSIBLES TEMAS", text: "Construimos la base de la investigación mediante la realidad problemática con sustento bibliográfico, formulación del problema, objetivos, justificación e hipótesis." },
        { label: "2. CAPÍTULO I – PLANTEAMIENTO DEL PROBLEMA", text: "Elegimos el tema correcto para tu carrera y universidad. Te entregamos 03 propuestas de temas y te explicamos cada uno para que elijas el más viable." },
        { label: "3. CAPÍTULO II – MARCO TEÓRICO", text: "Desarrollamos los antecedentes relevantes, teorías vinculadas al tema y bases conceptuales que respaldan científicamente el estudio." },
        { label: "4. CAPÍTULO III – METODOLOGÍA", text: "Definimos el diseño de la investigación, población y elaboramos los instrumentos, así como el análisis de datos y aspectos éticos." },
        { label: "5. CAPÍTULO IV – ASPECTOS ADMINISTRATIVOS", text: "Detallamos los recursos, presupuesto, financiamiento y cronograma de ejecución del proyecto." },
        { label: "6. ANEXOS DEL PLAN", text: "Matrices, instrumentos, confiabilidad, validación de instrumentos, entre otros." }
      ]
    },
    {
      id: "02",
      title: "Tesis final o Informe final",
      description: "Desarrollamos los capítulos vitales para presentar tu estudio ante el jurado.",
      image: "https://images.unsplash.com/photo-1555431189-0af5d0af9263?q=80&w=1469&auto=format&fit=crop",
      geometryClass: "rounded-[2rem] aspect-[16/9]", 
      substeps: [
        { label: "7. CAPÍTULO V – RESULTADOS", text: "Presentamos los resultados descriptivos e inferenciales en función de los objetivos e hipótesis planteadas." },
        { label: "8. CAPÍTULO VI – DISCUSIÓN", text: "Contrastamos los resultados obtenidos con los antecedentes y el marco teórico." },
        { label: "9. CAPÍTULO VII – CONCLUSIONES", text: "Formulamos conclusiones claras, coherentes derivadas de los objetivos y resultados del estudio." },
        { label: "10. CAPÍTULO VIII – RECOMENDACIONES", text: "Planteamos propuestas de mejora dirigidas a la población de estudio, según el contexto investigado." },
        { label: "11. ANEXOS DE LA TESIS", text: "Se incorporan evidencias, reportes de originalidad, actas y documentos institucionales (la información es provista)." }
      ]
    },
    {
      id: "03",
      title: "Programa de simulación de sustentación",
      description: "Te preparamos para una defensa segura y exitosa con acompañamiento integral.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470&auto=format&fit=crop",
      geometryClass: "rounded-[3rem] aspect-[16/9] w-full",
      substeps: [
        { label: "12. DIAPOSITIVAS O PPT", text: "Se desarrollan PPT personalizadas con diseño profesional y línea gráfica académica." },
        { label: "13. BANCO DE PREGUNTAS DE JURADO", text: "Banco de preguntas con respuestas estratégicas y bien fundamentadas." },
        { label: "14. CAPACITACIÓN INTEGRAL", text: "Capacitación estadística y temática aplicada directamente a tu investigación para reforzar teoría y coherencia." },
        { label: "15. SIMULACIONES", text: "(2) Simulaciones guiadas de exposición para fortalecer seguridad y dominio escénico." }
      ]
    },
  ];

  useGSAP(() => {
    if (!stepsContainerRef.current) return;

    // 1. Línea vertical que crece con el scroll
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: stepsContainerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );

    // 2. Transición de las Fases
    stepsRef.current.forEach((step) => {
      if (!step) return;

      const imgWrapper = step.querySelector(".geo-wrapper");
      const img = step.querySelector(".geo-image");

      // Entrada por opacidad
      gsap.to(step, {
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: step,
          start: "top 75%",
          end: "top 40%",
          scrub: true,
        },
      });

      // Zoom sutil en la imagen
      if (imgWrapper && img) {
        gsap.fromTo(
          img,
          { scale: 1 },
          {
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
              trigger: step,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section id="programa-flex" ref={containerRef} className="bg-[#F2F2F2] py-24 sm:py-32 relative text-[#141318]">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Nuevo Encabezado de Sección Agregado */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
          <span className="text-[#95C2E9] font-bold tracking-widest uppercase text-sm mb-4 block">
            Nuestra Metodología
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#141318] leading-tight mb-6">
            Conoce a fondo el <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#365470] to-[#95C2E9]">Programa Flex</span>
          </h2>
          <p className="text-lg text-[#365470] font-medium leading-relaxed">
            Te guiamos paso a paso desde la selección de tu tema hasta el día de tu 
            sustentación, garantizando calidad académica, rapidez y acompañamiento constante.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-16 xl:gap-24 items-start">
          
          {/* Tiempos de Entrega (Panel Sticky) */}
          <div className="w-full xl:w-[35%] xl:sticky xl:top-32 z-10 flex-shrink-0">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-[#365470]/10 border border-gray-100">
              <h3 className="text-2xl font-bold mb-8 text-[#141318] flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[#95C2E9]/20 flex items-center justify-center text-[#365470] flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </span>
                Tiempos de Entrega
              </h3>
              
              <ul className="space-y-5">
                {timelineData.map((item, i) => (
                  <li key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <span className="text-[#365470] font-semibold text-sm sm:text-base leading-tight max-w-[200px]">
                      {item.label}
                    </span>
                    <span className="text-[#141318] font-bold bg-[#F2F2F2] px-3 py-1.5 rounded-lg text-sm sm:text-sm whitespace-nowrap text-right">
                      {item.time}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-5 bg-[#365470] rounded-2xl relative overflow-hidden text-center sm:text-left">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#95C2E9]/30 rounded-full blur-2xl"></div>
                <p className="text-sm font-medium text-[#F2F2F2] relative z-10">
                  Procesos ágiles optimizados para la máxima calidad normativa y académica.
                </p>
              </div>
            </div>
          </div>

          {/* Fases (Panel de Scroll) */}
          <div 
            ref={stepsContainerRef}
            className="w-full xl:w-[65%] relative pl-10 sm:pl-16 mt-10 xl:mt-0 pb-12"
          >
            {/* Línea Track */}
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gray-200 rounded-full overflow-hidden">
              <div 
                ref={lineRef} 
                className="w-full h-full bg-gradient-to-b from-[#95C2E9] to-[#365470] origin-top transform scale-y-0" 
              />
            </div>

            <div className="space-y-32">
              {phases.map((phase, i) => (
                <div 
                  key={phase.id} 
                  ref={(el) => setStepRef(el, i)}
                  className="relative opacity-30 flex flex-col gap-10"
                >
                  {/* Círculo indicador */}
                  <div className="absolute -left-[48px] sm:-left-[73px] top-6 w-6 h-6 rounded-full bg-white border-[5px] border-[#365470] shadow-lg shadow-[#365470]/30 z-10"></div>

                  {/* Cabecera del Paso */}
                  <div>
                    <div className="text-[4rem] md:text-[5rem] font-black leading-none mb-4 tracking-tighter" style={{ WebkitTextStroke: "1.5px rgba(54, 84, 112, 0.15)", color: "transparent" }}>
                      Paso {phase.id}
                    </div>
                    <h4 className="text-3xl md:text-4xl font-black text-[#365470] mb-4">
                      {phase.title}
                    </h4>
                    <p className="text-xl text-[#141318] font-medium max-w-2xl">
                      {phase.description}
                    </p>
                  </div>

                  {/* Imagen Ilustrativa (Background de apoyo visual) */}
                  <div className="w-full">
                    <div className={`geo-wrapper relative w-full overflow-hidden shadow-2xl bg-gray-200 ${phase.geometryClass}`}>
                      <Image
                        src={phase.image}
                        alt={`Creativa Tesis - ${phase.title}`}
                        fill
                        className="geo-image object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141318]/60 to-[#141318]/10 mix-blend-multiply"></div>
                    </div>
                  </div>

                  {/* Lista de Detalles Constructivos - Nuevo Formato */}
                  <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {phase.substeps.map((sub, idx) => (
                        <div key={idx} className="bg-white p-5 lg:p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-[#95C2E9]/50 transition-colors duration-300 group">
                          <h5 className="font-bold text-[#141318] text-sm md:text-sm mb-2 leading-tight uppercase tracking-wider group-hover:text-[#365470] transition-colors">
                            {sub.label}
                          </h5>
                          <p className="text-[#365470] text-sm leading-relaxed">
                            {sub.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
