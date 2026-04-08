"use client";

import React from "react";

const tools = ["EPIDATA", "STATA", "R-Studio", "Python", "JAMOVI", "SPSS"];
// Duplicamos la lista para crear el efecto infinito y fluido del marquee
const marqueeItems = [...tools, ...tools, ...tools, ...tools];

export default function StatisticalTools() {
  return (
    <section className="bg-[#F2F2F2] py-20 lg:py-28 overflow-hidden relative border-y border-gray-200">
      {/* Inyección de Keyframes para el Marquee */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 1rem)); } 
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 40s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `
      }} />

      <div className="container mx-auto px-6 mb-16 text-center">
        <h3 className="text-3xl md:text-4xl font-extrabold text-[#141318] mb-4 tracking-tight">
          Ecosistema Estadístico Avanzado
        </h3>
        <p className="text-[#365470] text-lg font-medium max-w-2xl mx-auto">
          Potenciamos el rigor científico de tu investigación con las herramientas más robustas del mercado.
        </p>
      </div>

      <div className="relative w-full flex overflow-hidden group">
        {/* Desvanecimiento en los bordes para el efecto infinito */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#F2F2F2] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#F2F2F2] to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee gap-8 sm:gap-12 pl-8 sm:pl-12 cursor-ew-resize py-6">
          {marqueeItems.map((tool, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-8 sm:px-12 py-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 ease-out 
                grayscale opacity-50 
                hover:opacity-100 hover:grayscale-0 hover:scale-110 hover:shadow-[0_0_25px_rgba(149,194,233,0.4)] hover:border-[#95C2E9]"
            >
              <span className="text-2xl sm:text-3xl font-black text-[#365470] tracking-wider transition-colors duration-300 hover:text-[#141318]">
                {tool}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
