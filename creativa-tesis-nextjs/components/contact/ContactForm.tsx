'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        university: '',
        message: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'El correo es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Correo electrónico inválido';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'El teléfono es requerido';
        } else if (!/^\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Teléfono debe tener 9 dígitos';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'El mensaje es requerido';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        // Simulate API call
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Success
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                university: '',
                message: '',
            });
            setErrors({});

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="w-full px-6 lg:px-40 pb-20 flex justify-center">
            <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
                {/* Left Column: Form */}
                <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold leading-tight mb-6">
                        Envíanos un mensaje
                    </h2>

                    {submitStatus === 'success' && (
                        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
                            <span className="material-symbols-outlined text-green-600 dark:text-green-400">
                                check_circle
                            </span>
                            <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                                ¡Gracias por contactarnos! Te responderemos pronto.
                            </p>
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                            <span className="material-symbols-outlined text-red-600 dark:text-red-400">error</span>
                            <p className="text-red-800 dark:text-red-200 text-sm font-medium">
                                Hubo un error al enviar el mensaje. Por favor intenta nuevamente.
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Name */}
                        <label className="flex flex-col flex-1">
                            <p className="text-navy-text dark:text-gray-300 font-body text-sm font-medium leading-normal pb-2">
                                Nombre Completo <span className="text-red-500">*</span>
                            </p>
                            <input
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-600 dark:text-white font-body focus:outline-0 focus:ring-2 focus:ring-primary-blue/20 border ${errors.name
                                    ? 'border-red-500'
                                    : 'border-slate-300 dark:border-slate-600'
                                    } bg-white dark:bg-slate-800 focus:border-primary-blue h-12 placeholder:text-gray-400 px-4 text-base transition-all`}
                                placeholder="Juan Pérez"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1 font-body">{errors.name}</p>
                            )}
                        </label>

                        {/* Email and Phone */}
                        <div className="flex flex-col md:flex-row gap-5">
                            <label className="flex flex-col flex-1">
                                <p className="text-navy-text dark:text-gray-300 font-body text-sm font-medium leading-normal pb-2">
                                    Correo Electrónico <span className="text-red-500">*</span>
                                </p>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-600 dark:text-white font-body focus:outline-0 focus:ring-2 focus:ring-primary-blue/20 border ${errors.email
                                        ? 'border-red-500'
                                        : 'border-slate-300 dark:border-slate-600'
                                        } bg-white dark:bg-slate-800 focus:border-primary-blue h-12 placeholder:text-gray-400 px-4 text-base transition-all`}
                                    placeholder="juan@ejemplo.com"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1 font-body">{errors.email}</p>
                                )}
                            </label>

                            <label className="flex flex-col flex-1">
                                <p className="text-navy-text dark:text-gray-300 font-body text-sm font-medium leading-normal pb-2">
                                    Celular / WhatsApp <span className="text-red-500">*</span>
                                </p>
                                <input
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-600 dark:text-white font-body focus:outline-0 focus:ring-2 focus:ring-primary-blue/20 border ${errors.phone
                                        ? 'border-red-500'
                                        : 'border-slate-300 dark:border-slate-600'
                                        } bg-white dark:bg-slate-800 focus:border-primary-blue h-12 placeholder:text-gray-400 px-4 text-base transition-all`}
                                    placeholder="918 677 900"
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-xs mt-1 font-body">{errors.phone}</p>
                                )}
                            </label>
                        </div>

                        {/* University */}
                        <label className="flex flex-col flex-1">
                            <p className="text-navy-text dark:text-gray-300 font-body text-sm font-medium leading-normal pb-2">
                                Universidad / Carrera
                            </p>
                            <input
                                name="university"
                                type="text"
                                value={formData.university}
                                onChange={handleChange}
                                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-600 dark:text-white font-body focus:outline-0 focus:ring-2 focus:ring-primary-blue/20 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:border-primary-blue h-12 placeholder:text-gray-400 px-4 text-base transition-all"
                                placeholder="Ej. UNJBG - Ingeniería Comercial"
                            />
                        </label>

                        {/* Message */}
                        <label className="flex flex-col flex-1">
                            <p className="text-navy-text dark:text-gray-300 font-body text-sm font-medium leading-normal pb-2">
                                ¿En qué podemos ayudarte? <span className="text-red-500">*</span>
                            </p>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className={`flex w-full min-w-0 flex-1 resize-none rounded-lg text-slate-600 dark:text-white font-body focus:outline-0 focus:ring-2 focus:ring-primary-blue/20 border ${errors.message
                                    ? 'border-red-500'
                                    : 'border-slate-300 dark:border-slate-600'
                                    } bg-white dark:bg-slate-800 focus:border-primary-blue min-h-[140px] placeholder:text-gray-400 p-4 text-base transition-all`}
                                placeholder="Cuéntanos brevemente sobre tu tema de tesis o el problema que tienes..."
                            />
                            {errors.message && (
                                <p className="text-red-500 text-xs mt-1 font-body">{errors.message}</p>
                            )}
                        </label>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full md:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary-blue hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-base font-bold leading-normal tracking-[0.015em] font-body shadow-md transition-all active:scale-[0.98] disabled:active:scale-100"
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar Consulta'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Column: Contact Info */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-navy-text dark:text-white font-heading text-2xl font-bold leading-tight mb-2">
                            Información de contacto
                        </h2>

                        {/* Sede Principal */}
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-transparent hover:border-secondary-blue transition-all shadow-sm group">
                            <div className="size-12 rounded-full bg-secondary-blue/20 flex items-center justify-center shrink-0 group-hover:bg-secondary-blue/40 transition-colors">
                                <span className="material-symbols-outlined text-primary-blue dark:text-secondary-blue">
                                    location_on
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-navy-text dark:text-white font-heading font-bold text-lg">
                                    Sede Principal
                                </p>
                                <p className="text-slate-600 dark:text-gray-400 font-body text-sm leading-relaxed">
                                    Central Boulevard / 2º Piso
                                    <br />
                                    Av. San Martín 561 - Tacna
                                </p>
                            </div>
                        </div>

                        {/* Próximas Sedes */}
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-primary-blue/5 to-secondary-blue/10 dark:from-primary-blue/10 dark:to-secondary-blue/20 border border-dashed border-primary-blue/30 dark:border-secondary-blue/30 shadow-sm">
                            <div className="size-12 rounded-full bg-primary-blue/20 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-primary-blue dark:text-secondary-blue">
                                    near_me
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-navy-text dark:text-white font-heading font-bold text-lg">
                                    Próximas Sedes
                                </p>
                                <p className="text-slate-600 dark:text-gray-300 font-body text-sm leading-relaxed">
                                    Próximamente en Lima, Arequipa, y demás ciudades.
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-transparent hover:border-secondary-blue transition-all shadow-sm group">
                            <div className="size-12 rounded-full bg-secondary-blue/20 flex items-center justify-center shrink-0 group-hover:bg-secondary-blue/40 transition-colors">
                                <span className="material-symbols-outlined text-primary-blue dark:text-secondary-blue">
                                    call
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-navy-text dark:text-white font-heading font-bold text-lg">
                                    Llámanos
                                </p>
                                <a
                                    className="text-slate-600 dark:text-gray-400 hover:text-primary-blue dark:hover:text-secondary-blue font-body text-sm font-medium transition-colors"
                                    href="tel:918677900"
                                >
                                    918 677 900
                                </a>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-transparent hover:border-secondary-blue transition-all shadow-sm group">
                            <div className="size-12 rounded-full bg-secondary-blue/20 flex items-center justify-center shrink-0 group-hover:bg-secondary-blue/40 transition-colors">
                                <span className="material-symbols-outlined text-primary-blue dark:text-secondary-blue">
                                    mail
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-navy-text dark:text-white font-heading font-bold text-lg">
                                    Escríbenos
                                </p>
                                <a
                                    className="text-slate-600 dark:text-gray-400 hover:text-primary-blue dark:hover:text-secondary-blue font-body text-sm font-medium transition-colors"
                                    href="mailto:informes@creativatesis.pe"
                                >
                                    informes@creativatesis.pe
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Google Maps */}
                    <div className="w-full rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.2737505325044!2d-70.25159328895616!3d-18.01249488140356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915acf88047e8ffd%3A0x3e08e2cd07921de1!2sCreativa%20Tesis!5e0!3m2!1ses-419!2spe!4v1770222887005!5m2!1ses-419!2spe"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full"
                        ></iframe>
                    </div>

                    {/* 3D Map Link */}
                    <div className="w-full text-center mt-3">
                        <a
                            href="https://maps.app.goo.gl/iBMg9pumLJYS763KA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-primary-blue dark:text-secondary-blue hover:text-white hover:bg-primary-blue dark:hover:bg-secondary-blue border-2 border-primary-blue dark:border-secondary-blue rounded-lg transition-all duration-300 font-body"
                        >
                            <span className="material-symbols-outlined text-[20px]">3d_rotation</span>
                            <span>Visualiza cómo ubicarnos</span>
                            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
