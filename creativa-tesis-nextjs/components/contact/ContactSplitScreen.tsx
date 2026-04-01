'use client';

import { useState, FormEvent, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ContactSplitScreen() {
    // ─── Form State ───
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

    // ─── Animations ───
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({ delay: 0.1 });

        // Left panel elements fade up
        tl.fromTo(
            '.contact-left-item',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
            }
        );

        // Right panel form elements fade up
        tl.fromTo(
            '.contact-form-item',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.08,
                ease: 'power3.out',
            },
            '-=0.6'
        );
    }, { scope: containerRef });

    // ─── Handlers ───
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
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
        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Simular API
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', university: '', message: '' });
            setErrors({});
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    return (
        <div ref={containerRef} className="flex flex-col lg:flex-row min-h-screen w-full bg-[#141318]">

            {/* ════════════ LEFT HYBRID PANEL (Dark) ════════════ */}
            <div className="w-full lg:w-[45%] flex flex-col px-8 sm:px-12 lg:px-16 xl:px-20 pt-32 lg:pt-40 pb-16 lg:pb-20 relative overflow-hidden">

                {/* Ambient glow */}
                <div className="absolute top-[-10%] left-[-20%] w-[60vw] max-w-[600px] h-[60vw] max-h-[600px] bg-[#94C6F2]/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-20%] w-[50vw] max-w-[500px] h-[50vw] max-h-[500px] bg-[#365571]/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full max-w-[480px] mx-auto lg:mx-0">

                    {/* Header */}
                    <div className="mb-10 lg:mb-14">
                        <span className="contact-left-item inline-block rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-semibold bg-white/5 text-white/50 ring-1 ring-white/10 mb-6 backdrop-blur-sm">
                            Empecemos
                        </span>
                        <h1
                            className="contact-left-item text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight mb-6 leading-[1.05] text-white"
                            style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}
                        >
                            Hablemos de tu <br className="hidden lg:block" />
                            <span className="text-[#94C6F2]">proyecto</span>
                        </h1>
                        <p
                            className="contact-left-item text-white/50 text-sm sm:text-base leading-relaxed"
                            style={{ fontFamily: '"Inter", sans-serif' }}
                        >
                            ¿Listo para aprobar tu tesis? Déjanos tus datos o visítanos en nuestra oficina en Tacna para una asesoría personalizada.
                        </p>
                    </div>

                    {/* Contact Info Items */}
                    <div className="flex flex-col gap-8 flex-1">

                        <div className="contact-left-item flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[#94C6F2] text-lg">location_on</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-sm mb-1" style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}>Sede Principal</span>
                                <span className="text-white/50 text-xs leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>
                                    Central Boulevard / 2º Piso<br />
                                    Av. San Martín 561 - Tacna
                                </span>
                            </div>
                        </div>

                        <div className="contact-left-item flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-white/70 text-lg">near_me</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-bold text-sm mb-1" style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}>Próximas Sedes</span>
                                <span className="text-[#94C6F2]/80 font-medium text-xs leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>
                                    Próximamente en Lima, Arequipa, y demás ciudades.
                                </span>
                            </div>
                        </div>

                        <div className="contact-left-item flex flex-col sm:flex-row gap-8 lg:gap-4 lg:flex-col xl:flex-row mt-2">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#94C6F2]/10 flex items-center justify-center shrink-0 group hover:bg-[#94C6F2]/20 transition-colors">
                                    <span className="material-symbols-outlined text-[#94C6F2] text-lg">call</span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider mb-0.5" style={{ fontFamily: '"Inter", sans-serif' }}>Llámanos</span>
                                    <a href="tel:918677900" className="text-white text-sm hover:text-[#94C6F2] transition-colors" style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}>
                                        918 677 900
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#365571]/20 flex items-center justify-center shrink-0 group hover:bg-[#365571]/40 transition-colors">
                                    <span className="material-symbols-outlined text-[#94C6F2] text-lg">mail</span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider mb-0.5" style={{ fontFamily: '"Inter", sans-serif' }}>Escríbenos</span>
                                    <a href="mailto:informes@creativatesis.pe" className="text-white text-sm hover:text-[#94C6F2] transition-colors" style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}>
                                        informes@creativatesis.pe
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Minimal Map Preview */}
                        <div className="contact-left-item mt-6 mb-8 lg:mb-0 hidden sm:block">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-black/50 h-[160px] group">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.2737505325044!2d-70.25159328895616!3d-18.01249488140356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915acf88047e8ffd%3A0x3e08e2cd07921de1!2sCreativa%20Tesis!5e0!3m2!1ses-419!2spe!4v1770222887005!5m2!1ses-419!2spe"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'grayscale(1) invert(0.9) hue-rotate(180deg) opacity(0.8)' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="transition-all duration-500 group-hover:filter-none object-cover"
                                ></iframe>
                                <div className="absolute inset-0 pointer-events-none ring-inset ring-1 ring-white/10 rounded-2xl" />
                            </div>
                            <div className="mt-3 text-center lg:text-left">
                                <a
                                    href="https://maps.app.goo.gl/iBMg9pumLJYS763KA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/40 hover:text-white transition-colors tracking-wide"
                                    style={{ fontFamily: '"Inter", sans-serif' }}
                                >
                                    <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                                    Abrir en Google Maps
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ════════════ RIGHT FORM PANEL (Primary Gradient) ════════════ */}
            <div className="w-full lg:w-[55%] bg-[#96C2E9] bg-gradient-to-br from-[#96C2E9] via-[#365571] to-[##96C2E9] flex items-center justify-center px-8 sm:px-12 lg:px-16 xl:px-20 pt-16 lg:pt-40 pb-16 lg:pb-24 relative overflow-hidden">

                {/* Decorative mesh bg (lightened for dark bg) */}
                <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
                    style={{ backgroundImage: 'radial-gradient(#ffffff 1.2px, transparent 1px)', backgroundSize: '32px 32px' }} />

                {/* Ambient glow to give depth */}
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-[#94C6F2]/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 w-full max-w-[600px] bg-white rounded-3xl p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] ring-1 ring-white/20">

                    <h2 className="contact-form-item text-2xl sm:text-3xl font-bold text-[#141318] mb-8 tracking-tight" style={{ fontFamily: '"Questrial", "Satoshi", sans-serif' }}>
                        Envíanos un mensaje
                    </h2>

                    {submitStatus === 'success' && (
                        <div className="contact-form-item mb-8 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-3">
                            <span className="material-symbols-outlined text-green-600">check_circle</span>
                            <p className="text-green-800 text-sm font-medium pt-0.5">
                                ¡Excelente! Hemos recibido tu información, nuestro equipo te contactará muy pronto.
                            </p>
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="contact-form-item mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                            <span className="material-symbols-outlined text-red-600">error</span>
                            <p className="text-red-800 text-sm font-medium pt-0.5">
                                Ocurrió un error al enviar tu consulta. Por favor, intenta de nuevo o escríbenos a WhatsApp.
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Name */}
                        <label className="contact-form-item flex flex-col group">
                            <p className="text-[#141318]/70 text-xs font-bold uppercase tracking-widest mb-2 px-1 transition-colors group-focus-within:text-[#365571]" style={{ fontFamily: '"Inter", sans-serif' }}>
                                Nombre Completo <span className="text-red-500">*</span>
                            </p>
                            <input
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className={`h-14 w-full bg-[#F2F2F2]/50 border ${errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-[#141318]/5 focus:border-[#365571] focus:ring-[#365571]/20'} hover:bg-[#F2F2F2] rounded-xl px-5 text-[#141318] text-base outline-none focus:ring-4 transition-all duration-300 font-body placeholder:text-[#141318]/30`}
                                placeholder="Ingresa tu nombre"
                            />
                            {errors.name && <p className="text-red-500 text-[11px] mt-1.5 px-1 font-medium">{errors.name}</p>}
                        </label>

                        {/* Email & Phone Grip */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <label className="contact-form-item flex flex-col flex-1 group">
                                <p className="text-[#141318]/70 text-xs font-bold uppercase tracking-widest mb-2 px-1 transition-colors group-focus-within:text-[#365571]" style={{ fontFamily: '"Inter", sans-serif' }}>
                                    Correo Electrónico <span className="text-red-500">*</span>
                                </p>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`h-14 w-full bg-[#F2F2F2]/50 border ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-[#141318]/5 focus:border-[#365571] focus:ring-[#365571]/20'} hover:bg-[#F2F2F2] rounded-xl px-5 text-[#141318] text-base outline-none focus:ring-4 transition-all duration-300 font-body placeholder:text-[#141318]/30`}
                                    placeholder="tu@correo.com"
                                />
                                {errors.email && <p className="text-red-500 text-[11px] mt-1.5 px-1 font-medium">{errors.email}</p>}
                            </label>

                            <label className="contact-form-item flex flex-col flex-1 group">
                                <p className="text-[#141318]/70 text-xs font-bold uppercase tracking-widest mb-2 px-1 transition-colors group-focus-within:text-[#365571]" style={{ fontFamily: '"Inter", sans-serif' }}>
                                    Celular / WhatsApp <span className="text-red-500">*</span>
                                </p>
                                <input
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`h-14 w-full bg-[#F2F2F2]/50 border ${errors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-[#141318]/5 focus:border-[#365571] focus:ring-[#365571]/20'} hover:bg-[#F2F2F2] rounded-xl px-5 text-[#141318] text-base outline-none focus:ring-4 transition-all duration-300 font-body placeholder:text-[#141318]/30`}
                                    placeholder="987 654 321"
                                />
                                {errors.phone && <p className="text-red-500 text-[11px] mt-1.5 px-1 font-medium">{errors.phone}</p>}
                            </label>
                        </div>

                        {/* University */}
                        <label className="contact-form-item flex flex-col group">
                            <p className="text-[#141318]/70 text-xs font-bold uppercase tracking-widest mb-2 px-1 transition-colors group-focus-within:text-[#365571]" style={{ fontFamily: '"Inter", sans-serif' }}>
                                Universidad / Carrera <span className="text-[#141318]/30 lowercase tracking-normal">(Opcional)</span>
                            </p>
                            <input
                                name="university"
                                type="text"
                                value={formData.university}
                                onChange={handleChange}
                                className="h-14 w-full bg-[#F2F2F2]/50 border border-[#141318]/5 hover:bg-[#F2F2F2] focus:border-[#365571] focus:ring-4 focus:ring-[#365571]/20 rounded-xl px-5 text-[#141318] text-base outline-none transition-all duration-300 font-body placeholder:text-[#141318]/30"
                                placeholder="Ej: UNJBG - Ingeniería Comercial"
                            />
                        </label>

                        {/* Message */}
                        <label className="contact-form-item flex flex-col group">
                            <p className="text-[#141318]/70 text-xs font-bold uppercase tracking-widest mb-2 px-1 transition-colors group-focus-within:text-[#365571]" style={{ fontFamily: '"Inter", sans-serif' }}>
                                ¿En qué podemos ayudarte? <span className="text-red-500">*</span>
                            </p>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className={`w-full min-h-[140px] resize-none bg-[#F2F2F2]/50 border ${errors.message ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : 'border-[#141318]/5 focus:border-[#365571] focus:ring-[#365571]/20'} hover:bg-[#F2F2F2] rounded-xl p-5 text-[#141318] text-base outline-none focus:ring-4 transition-all duration-300 font-body placeholder:text-[#141318]/30`}
                                placeholder="Cuéntanos brevemente sobre tu tema o el bloqueo que tienes..."
                            />
                            {errors.message && <p className="text-red-500 text-[11px] mt-1.5 px-1 font-medium">{errors.message}</p>}
                        </label>

                        {/* Submit Button */}
                        <div className="contact-form-item pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="relative w-full overflow-hidden group rounded-xl h-14 bg-[#141318] text-white flex items-center justify-center font-bold text-base tracking-wide shadow-[0_10px_30px_-10px_rgba(20,19,24,0.4)] transition-all duration-500 hover:shadow-[0_10px_40px_-5px_rgba(54,85,113,0.4)] active:scale-[0.98] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
                                style={{ fontFamily: '"Inter", sans-serif' }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {isSubmitting ? (
                                        <>
                                            <span className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full" />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            Enviar Consulta
                                            <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">arrow_outward</span>
                                        </>
                                    )}
                                </span>
                                {/* Background hover effect */}
                                {!isSubmitting && (
                                    <div className="absolute inset-0 bg-[#365571] scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-x-100" />
                                )}
                            </button>
                            <p className="text-center text-[11px] text-[#141318]/40 mt-4 font-medium" style={{ fontFamily: '"Inter", sans-serif' }}>
                                Tus datos están seguros con nosotros. Cero SPAM.
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            {/* Removed custom scrollbar styles since we are letting the whole page scroll naturally now */}
        </div>
    );
}
