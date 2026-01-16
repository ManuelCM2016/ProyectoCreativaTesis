'use client';

import { useState } from 'react';

interface FormDataType {
    career: string;
    university: string;
    researchType: string;
    currentStage: string;
    dedication: string;
}

interface TimelineResult {
    estimatedMonths: number;
    graduationDate: string;
    milestones: {
        name: string;
        duration: string;
        startMonth: number;
    }[];
    recommendation: string;
}

export default function GraduationCalculatorPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormDataType>({
        career: '',
        university: '',
        researchType: '',
        currentStage: '',
        dedication: '',
    });
    const [result, setResult] = useState<TimelineResult | null>(null);
    const [showResult, setShowResult] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const calculateTimeline = (): TimelineResult => {
        // Base months by research type
        const baseMonths = formData.researchType === 'cuantitativa' ? 8 : 7;

        // Adjust by current stage
        const stageAdjustment: Record<string, number> = {
            tema: 0,
            marco: -2,
            campo: -4,
            redaccion: -6,
        };

        // Adjust by dedication
        const dedicationMultiplier: Record<string, number> = {
            completo: 1,
            medio: 1.5,
            parcial: 2,
        };

        const adjusted = (baseMonths + (stageAdjustment[formData.currentStage] || 0)) *
            (dedicationMultiplier[formData.dedication] || 1);

        const estimatedMonths = Math.ceil(adjusted);

        // Calculate graduation date
        const today = new Date();
        const gradDate = new Date(today);
        gradDate.setMonth(gradDate.getMonth() + estimatedMonths);

        // Generate milestones
        const milestones = [
            { name: 'Aprobación de Tema', duration: '2 semanas', startMonth: 0 },
            { name: 'Marco Teórico Completo', duration: '2-3 meses', startMonth: 1 },
            { name: 'Trabajo de Campo', duration: '2-4 meses', startMonth: 3 },
            { name: 'Análisis de Datos', duration: '1-2 meses', startMonth: 5 },
            { name: 'Redacción Final', duration: '1-2 meses', startMonth: 6 },
            { name: 'Revisión y Correcciones', duration: '2-4 semanas', startMonth: 7 },
            { name: 'Sustentación', duration: '1 día', startMonth: estimatedMonths },
        ];

        let recommendation = '';
        if (formData.dedication === 'completo') {
            recommendation = '🎯 Excelente! Con dedicación completa podrás avanzar rápidamente.';
        } else if (formData.dedication === 'medio') {
            recommendation = '⏰ Buen ritmo. Mantén la constancia para cumplir el cronograma.';
        } else {
            recommendation = '📚 Requiere más tiempo. Considera aumentar las horas semanales.';
        }

        return {
            estimatedMonths,
            graduationDate: gradDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
            milestones,
            recommendation,
        };
    };

    const handleNext = () => {
        if (step === 1 && (!formData.career || !formData.university)) {
            alert('Por favor completa todos los campos');
            return;
        }
        if (step === 2 && !formData.researchType) {
            alert('Por favor selecciona el tipo de investigación');
            return;
        }
        if (step < 3) setStep(step + 1);
    };

    const handlePrev = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleCalculate = () => {
        if (!formData.currentStage || !formData.dedication) {
            alert('Por favor completa todos los campos');
            return;
        }
        const timeline = calculateTimeline();
        setResult(timeline);
        setShowResult(true);
        setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    const progress = (step / 3) * 100;

    return (
        <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
            <main className="flex-1 flex flex-col items-center py-10 px-4 lg:px-20">
                <div className="max-w-4xl w-full text-center mb-10">
                    <h1 className="text-5xl font-black text-navy-text dark:text-white mb-4">
                        Calculadora de Cronograma de Tesis
                    </h1>
                    <p className="text-lg text-slate-600">
                        Planifica tu camino hacia la graduación en menos de 2 minutos
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900 w-full max-w-[960px] rounded-2xl shadow-lg border overflow-hidden flex flex-col md:flex-row">
                    {/* Left: Form */}
                    <div className="flex-1 p-10 flex flex-col gap-8">
                        {/* Progress */}
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <p className="text-sm font-bold uppercase text-navy-text">Paso {step} de 3</p>
                                <span className="text-xs text-gray-500">
                                    {step === 1 && 'Datos Académicos'}
                                    {step === 2 && 'Tipo de Investigación'}
                                    {step === 3 && 'Situación Actual'}
                                </span>
                            </div>
                            <div className="rounded-full bg-gray-200 h-2 w-full overflow-hidden">
                                <div
                                    className="h-full bg-secondary-blue rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Step 1 */}
                        {step === 1 && (
                            <div className="flex flex-col gap-6">
                                <h3 className="text-xl font-bold">Cuéntanos sobre tu carrera</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Carrera Profesional</label>
                                        <input
                                            name="career"
                                            value={formData.career}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border px-4 py-3 focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue"
                                            placeholder="Ej. Ingeniería Civil"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Universidad</label>
                                        <input
                                            name="university"
                                            value={formData.university}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border px-4 py-3 focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue"
                                            placeholder="Ej. UNJBG"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2 */}
                        {step === 2 && (
                            <div className="flex flex-col gap-6">
                                <h3 className="text-xl font-bold">¿Qué tipo de investigación planeas?</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { value: 'cuantitativa', label: 'Cuantitativa', desc: 'Datos y estadísticas', icon: 'analytics' },
                                        { value: 'cualitativa', label: 'Cualitativa', desc: 'Entrevistas y análisis', icon: 'psychology' },
                                    ].map((type) => (
                                        <label key={type.value} className="cursor-pointer">
                                            <input
                                                type="radio"
                                                name="researchType"
                                                value={type.value}
                                                checked={formData.researchType === type.value}
                                                onChange={handleChange}
                                                className="sr-only peer"
                                            />
                                            <div className="rounded-xl border p-4 peer-checked:border-secondary-blue peer-checked:bg-secondary-blue/10 hover:border-secondary-blue transition">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-blue-600">{type.icon}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block font-bold">{type.label}</span>
                                                        <span className="text-xs text-gray-600">{type.desc}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 3 */}
                        {step === 3 && (
                            <div className="flex flex-col gap-6">
                                <h3 className="text-xl font-bold">Situación actual de tu tesis</h3>

                                <div>
                                    <label className="block text-sm font-medium mb-2">¿En qué etapa estás?</label>
                                    <select
                                        name="currentStage"
                                        value={formData.currentStage}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border px-4 py-3 focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue"
                                    >
                                        <option value="">Selecciona tu etapa</option>
                                        <option value="tema">Definiendo tema</option>
                                        <option value="marco">Marco teórico en progreso</option>
                                        <option value="campo">Trabajo de campo</option>
                                        <option value="redaccion">Redacción final</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">¿Cuántas horas semanales puedes dedicar?</label>
                                    <select
                                        name="dedication"
                                        value={formData.dedication}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border px-4 py-3 focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue"
                                    >
                                        <option value="">Selecciona tu dedicación</option>
                                        <option value="completo">Tiempo completo (30+ horas/semana)</option>
                                        <option value="medio">Medio tiempo (15-30 horas/semana)</option>
                                        <option value="parcial">Tiempo parcial (&lt; 15 horas/semana)</option>
                                    </select>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                                    <p className="text-sm text-gray-700">
                                        <strong>Resumen:</strong> {formData.career} en {formData.university},{' '}
                                        investigación {formData.researchType}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className="mt-auto pt-6 border-t flex justify-between gap-4">
                            {step > 1 && (
                                <button
                                    onClick={handlePrev}
                                    className="flex items-center gap-2 px-6 py-3 rounded-lg border font-bold hover:bg-gray-100 transition"
                                >
                                    <span className="material-symbols-outlined">arrow_back</span>
                                    Anterior
                                </button>
                            )}

                            <button
                                onClick={step === 3 ? handleCalculate : handleNext}
                                className="ml-auto flex items-center gap-2 bg-secondary-blue px-8 py-3 rounded-lg font-bold hover:bg-blue-300 transition shadow-md"
                            >
                                <span>{step === 3 ? 'Calcular' : 'Siguiente'}</span>
                                <span className="material-symbols-outlined">
                                    {step === 3 ? 'calculate' : 'arrow_forward'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Right: Preview */}
                    <div className="w-full md:w-[320px] bg-gray-50 dark:bg-slate-800 border-l p-6 flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined">lightbulb</span>
                            <h4 className="font-bold text-sm uppercase">Pre-visualización</h4>
                        </div>

                        <div className="bg-white rounded-xl p-4 border">
                            <h5 className="text-xs font-bold text-gray-500 uppercase mb-3">Cronograma Estimado</h5>
                            <div className="flex flex-col gap-4 relative">
                                <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-200" />
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className="flex gap-3 items-center" style={{ opacity: 1 - i * 0.3 }}>
                                        <div className={`size-4 rounded-full border-2 ${i === 0 ? 'border-secondary-blue bg-white' : 'border-gray-300 bg-white'}`} />
                                        <div className={`h-2 bg-gray-200 rounded ${i === 0 ? 'w-20' : i === 1 ? 'w-16' : 'w-24'}`} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-secondary-blue/10 p-5 rounded-xl border border-secondary-blue/20">
                            <h4 className="font-bold text-lg mb-2">¿Sabías que?</h4>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                El 65% de los estudiantes se retrasan más de 6 meses por no elegir correctamente su metodología al inicio.
                            </p>
                        </div>

                        <div className="mt-auto">
                            <p className="text-xs text-gray-600 mb-3 font-medium text-center">Más de 500 estudiantes asesorados</p>
                            <div className="flex justify-center -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="size-8 rounded-full border-2 border-white bg-gray-300" />
                                ))}
                                <div className="size-8 rounded-full border-2 border-white bg-secondary-blue text-white flex items-center justify-center text-[10px] font-bold">
                                    +500
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                {showResult && result && (
                    <div id="results" className="w-full max-w-[960px] mt-16">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 mb-4">
                                <span className="material-symbols-outlined">celebration</span>
                                <span className="font-bold">Cronograma Calculado</span>
                            </div>

                            <h2 className="text-3xl font-black mb-4">Tu Fecha Estimada de Graduación</h2>
                            <p className="text-lg text-gray-600">{result.recommendation}</p>

                            <div className="grid grid-cols-2 gap-6 mt-8">
                                <div className="bg-white p-6 rounded-xl border">
                                    <p className="text-sm text-gray-600 mb-2">Tiempo Estimado</p>
                                    <p className="text-4xl font-black text-secondary-blue">{result.estimatedMonths} meses</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl border">
                                    <p className="text-sm text-gray-600 mb-2">Fecha de Graduación</p>
                                    <p className="text-2xl font-black">{result.graduationDate}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold">Hitos de tu Cronograma</h3>
                            {result.milestones.map((milestone, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl border flex items-center gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-blue text-white font-bold">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold">{milestone.name}</h4>
                                        <p className="text-sm text-gray-600">Duración: {milestone.duration}</p>
                                    </div>
                                    <div className="text-sm font-bold text-secondary-blue bg-secondary-blue/10 px-3 py-1 rounded-full">
                                        Mes {milestone.startMonth === 0 ? 1 : milestone.startMonth}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 bg-gradient-to-r from-primary-blue to-secondary-blue p-8 rounded-2xl text-center text-white">
                            <h3 className="text-2xl font-bold mb-4">¿Listo para empezar?</h3>
                            <p className="text-lg mb-6 opacity-90">Nuestros asesores pueden ayudarte en cada paso</p>
                            <button className="bg-white text-primary-blue font-bold px-8 py-3 rounded-lg hover:bg-gray-100">
                                Agendar Asesoría Gratuita
                            </button>
                        </div>
                    </div>
                )}

                {/* Features */}
                <div className="w-full max-w-[960px] mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: 'timer', title: 'Ahorra Tiempo', desc: 'Plan estructurado adaptado a tu ritmo' },
                        { icon: 'verified', title: 'Diagnóstico Preciso', desc: 'Identifica cuellos de botella antes' },
                        { icon: 'support_agent', title: 'Asesoría Experta', desc: 'Asesores especializados en tu carrera' },
                    ].map((feature, i) => (
                        <div key={i} className="flex flex-col items-center text-center gap-3 p-4">
                            <div className={`size-12 rounded-full ${i === 0 ? 'bg-green-100 text-green-600' : i === 1 ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'} flex items-center justify-center`}>
                                <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
                            </div>
                            <h3 className="font-bold text-lg">{feature.title}</h3>
                            <p className="text-sm text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
