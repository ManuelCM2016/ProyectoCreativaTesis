'use client';

import { useState } from 'react';

interface CalculationResult {
    isViable: boolean;
    totalMonths: number;
    estimatedDate: string;
    phases: {
        name: string;
        duration: string;
        tasks: string[];
        icon: string;
    }[];
    recommendation: string;
}

export default function PreDiagnosisCalculatorPage() {
    const [formData, setFormData] = useState({
        level: 'pregrado',
        field: '',
        targetDate: '',
    });

    const [result, setResult] = useState<CalculationResult | null>(null);
    const [showResult, setShowResult] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const calculateTimeline = (): CalculationResult => {
        // Duración base por campo (en meses)
        const baseDuration: Record<string, number> = {
            ingenieria: 8,
            salud: 10,
            derecho: 7,
            educacion: 6,
            negocios: 7,
        };

        const duration = baseDuration[formData.field] || 8;
        const adjustedDuration = formData.level === 'posgrado' ? duration + 4 : duration;

        // Calcular fecha estimada
        const today = new Date();
        const estimatedDate = new Date(today);
        estimatedDate.setMonth(estimatedDate.getMonth() + adjustedDuration);

        // Verificar viabilidad
        const targetDate = formData.targetDate ? new Date(formData.targetDate) : null;
        const isViable = targetDate ? estimatedDate <= targetDate : true;

        // Fases con iconos
        const phases = [
            {
                name: 'Planificación y Aprobación',
                duration: '1-2 meses',
                tasks: ['Elección del tema', 'Revisión bibliográfica', 'Plan de tesis', 'Aprobación'],
                icon: 'edit_note',
            },
            {
                name: 'Marco Teórico',
                duration: formData.level === 'posgrado' ? '3-4 meses' : '2-3 meses',
                tasks: ['Revisión exhaustiva', 'Marco teórico', 'Metodología', 'Instrumentos'],
                icon: 'menu_book',
            },
            {
                name: 'Trabajo de Campo',
                duration: '2-3 meses',
                tasks: ['Recolección de datos', 'Análisis estadístico', 'Resultados', 'Gráficos'],
                icon: 'analytics',
            },
            {
                name: 'Redacción Final',
                duration: '2-3 meses',
                tasks: ['Redacción', 'Correcciones', 'Revisión', 'Sustentación'],
                icon: 'trophy',
            },
        ];

        let recommendation = '';
        if (!isViable && targetDate) {
            recommendation =
                '⚠️ Tu fecha objetivo es ajustada. Recomendamos plan acelerado con asesoría intensiva.';
        } else {
            recommendation = '✅ Tu fecha objetivo es realista. Con organización puedes lograrlo.';
        }

        return {
            isViable,
            totalMonths: adjustedDuration,
            estimatedDate: estimatedDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' }),
            phases,
            recommendation,
        };
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.field || !formData.targetDate) {
            alert('Por favor completa todos los campos');
            return;
        }
        const calculatedResult = calculateTimeline();
        setResult(calculatedResult);
        setShowResult(true);
        setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    const progress = formData.field && formData.targetDate ? 100 : formData.field ? 66 : 33;
    const isFieldComplete = formData.field !== '';
    const isDateComplete = formData.targetDate !== '';

    return (
        <div className="relative flex min-h-screen flex-col ">
            <main className="flex-grow py-12 px-4 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Left: Info */}
                        <div className="flex flex-col gap-6">
                            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-xs font-bold text-primary-blue dark:text-blue-300">
                                <span className="material-symbols-outlined text-sm">schedule</span>
                                Pre-diagnóstico Gratuito
                            </div>

                            <h1 className="text-5xl font-black text-navy-text dark:text-white">
                                Calcula tu fecha de <span className="text-primary-blue">graduación</span>
                            </h1>

                            <p className="text-lg text-slate-700 dark:text-gray-300">
                                Descubre cuánto tiempo necesitas para terminar tu tesis con un cronograma personalizado.
                            </p>
                        </div>

                        {/* Right: Form */}
                        <div className="relative">
                            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
                                <div className="bg-primary-blue/5 dark:bg-primary-blue/10 px-6 py-4 border-b dark:border-slate-700">
                                    <span className="text-sm font-bold text-primary-blue">Calculadora de Tesis</span>
                                </div>

                                <div className="p-8">
                                    <div className="mb-8">
                                        <div className="flex justify-between mb-2">
                                            <p className="font-medium text-navy-text dark:text-white">Datos Académicos</p>
                                            <span className="text-sm font-bold text-primary-blue">{progress}%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-primary-blue transition-all duration-500 ease-out"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        <div>
                                            <label className="text-sm font-medium block mb-2 text-navy-text dark:text-white">Nivel Académico</label>
                                            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 dark:bg-slate-800 rounded-lg">
                                                {['pregrado', 'posgrado'].map((level) => (
                                                    <label key={level} className="cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="level"
                                                            value={level}
                                                            checked={formData.level === level}
                                                            onChange={handleChange}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="text-center py-2.5 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 peer-checked:bg-white peer-checked:text-primary-blue peer-checked:dark:bg-slate-800 capitalize transition-all">
                                                            {level}
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <label className="text-sm font-medium block mb-2 text-navy-text dark:text-white">
                                                Campo de Estudio <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="field"
                                                value={formData.field}
                                                onChange={handleChange}
                                                required
                                                className="w-full rounded-lg border border-gray-300 dark:border-slate-600 px-4 py-3 pr-10 text-gray-900 dark:text-white bg-white dark:bg-slate-800 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all"
                                            >
                                                <option value="">Selecciona tu carrera</option>
                                                <option value="ingenieria">Ingeniería y Arquitectura</option>
                                                <option value="salud">Ciencias de la Salud</option>
                                                <option value="derecho">Derecho y Ciencias Políticas</option>
                                                <option value="educacion">Educación y Humanidades</option>
                                                <option value="negocios">Administración y Negocios</option>
                                            </select>
                                            {isFieldComplete && (
                                                <span className="absolute right-3 top-11 text-green-500 animate-in fade-in zoom-in duration-300">
                                                    <span className="material-symbols-outlined">check_circle</span>
                                                </span>
                                            )}
                                        </div>

                                        <div className="relative">
                                            <label className="text-sm font-medium block mb-2 text-navy-text dark:text-white">
                                                Fecha deseada <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                name="targetDate"
                                                value={formData.targetDate}
                                                onChange={handleChange}
                                                required
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full rounded-lg border border-gray-300 dark:border-slate-600 px-4 py-3 pr-10 text-gray-900 dark:text-white bg-white dark:bg-slate-800 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all"
                                            />
                                            {isDateComplete && (
                                                <span className="absolute right-3 top-11 text-green-500 animate-in fade-in zoom-in duration-300">
                                                    <span className="material-symbols-outlined">check_circle</span>
                                                </span>
                                            )}
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-base">info</span>
                                                Te diremos si esta fecha es realista.
                                            </p>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full flex items-center justify-center gap-2 bg-primary-blue text-white font-bold px-6 py-4 rounded-xl hover:bg-blue-600 hover:shadow-lg transition-all duration-300 group"
                                        >
                                            <span>Calcular Cronograma</span>
                                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    {showResult && result && (
                        <div id="results" className="mt-16 animate-in fade-in slide-in-from-bottom duration-500">
                            <div className="max-w-5xl mx-auto">
                                <div className="text-center mb-12">
                                    <div
                                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 animate-in zoom-in duration-500 ${result.isViable ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                                            }`}
                                    >
                                        <span className="material-symbols-outlined">
                                            {result.isViable ? 'check_circle' : 'warning'}
                                        </span>
                                        <span className="font-bold">
                                            {result.isViable ? 'Fecha Viable' : 'Fecha Ajustada'}
                                        </span>
                                    </div>

                                    <h2 className="text-3xl font-black mb-4 text-navy-text dark:text-white">Tu Cronograma Personalizado</h2>
                                    <p className="text-lg text-gray-700 dark:text-gray-300">{result.recommendation}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
                                            <p className="text-sm text-gray-700 dark:text-gray-400 mb-2 flex items-center justify-center gap-1">
                                                <span className="material-symbols-outlined text-base text-primary-blue">schedule</span>
                                                Duración Estimada
                                            </p>
                                            <p className="text-3xl font-black text-primary-blue">{result.totalMonths} meses</p>
                                        </div>
                                        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
                                            <p className="text-sm text-gray-700 dark:text-gray-400 mb-2 flex items-center justify-center gap-1">
                                                <span className="material-symbols-outlined text-base text-secondary-blue">event</span>
                                                Fecha Estimada
                                            </p>
                                            <p className="text-2xl font-black text-navy-text dark:text-white">{result.estimatedDate}</p>
                                        </div>
                                        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
                                            <p className="text-sm text-gray-700 dark:text-gray-400 mb-2 flex items-center justify-center gap-1">
                                                <span className="material-symbols-outlined text-base text-primary-blue">school</span>
                                                Nivel
                                            </p>
                                            <p className="text-2xl font-black capitalize text-navy-text dark:text-white">{formData.level}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-navy-text dark:text-white mb-6">Fases de tu Tesis</h3>
                                    <div className="relative">
                                        {/* Timeline connector line */}
                                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-blue via-secondary-blue to-green-500 hidden md:block"></div>

                                        {result.phases.map((phase, i) => (
                                            <div key={i} className="relative bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-slate-700 mb-4 hover:shadow-lg transition-all duration-300 hover:border-primary-blue animate-in slide-in-from-left" style={{ animationDelay: `${i * 100}ms` }}>
                                                <div className="flex gap-4">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-blue to-secondary-blue text-white font-bold shadow-lg relative z-10">
                                                        <span className="material-symbols-outlined">{phase.icon}</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
                                                            <h4 className="text-lg font-bold text-navy-text dark:text-white">{phase.name}</h4>
                                                            <span className="text-sm font-bold text-primary-blue bg-primary-blue/10 dark:bg-primary-blue/20 px-3 py-1 rounded-full w-fit">
                                                                {phase.duration}
                                                            </span>
                                                        </div>
                                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            {phase.tasks.map((task, j) => (
                                                                <li key={j} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                                    <span className="material-symbols-outlined text-primary-blue text-base mt-0.5">
                                                                        check_circle
                                                                    </span>
                                                                    {task}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-12 bg-gradient-to-r from-primary-blue to-secondary-blue p-8 rounded-2xl text-center text-white shadow-xl">
                                    <span className="material-symbols-outlined text-5xl mb-4 inline-block">celebration</span>
                                    <h3 className="text-2xl font-bold mb-4">¿Necesitas ayuda para cumplir este cronograma?</h3>
                                    <p className="text-lg mb-6 opacity-90">
                                        Nuestros asesores pueden ayudarte a optimizar cada fase
                                    </p>
                                    <button className="bg-white text-primary-blue font-bold px-8 py-3 rounded-lg hover:bg-gray-100 hover:shadow-lg transition-all">
                                        Agendar Asesoría Gratuita
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

