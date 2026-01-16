import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white py-12 dark:bg-background-dark dark:border-gray-800">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-4 max-w-sm">
                        <div className="flex items-center gap-2 text-navy-text dark:text-white">
                            <div className="flex items-center justify-center rounded-lg bg-primary-blue/10 p-1.5 text-primary-blue">
                                <span className="material-symbols-outlined text-sm">school</span>
                            </div>
                            <span className="text-lg font-bold font-heading">Creativa Tesis</span>
                        </div>
                        <p className="text-sm text-slate-500 font-body dark:text-gray-400">
                            Asesoría profesional de tesis comprometida con tu éxito académico. Ubicados en el
                            corazón de Tacna, Perú.
                        </p>
                    </div>

                    {/* Explore Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold font-heading text-lg text-navy-text dark:text-white">
                            Explora
                        </h4>
                        <nav className="flex flex-col gap-2 text-sm text-slate-600 font-body dark:text-gray-400">
                            <Link href="/" className="hover:text-primary-blue transition-colors">
                                Inicio
                            </Link>
                            <Link href="/creativa-tesis/quienes-somos" className="hover:text-primary-blue transition-colors">
                                Quiénes Somos
                            </Link>
                            <Link href="/servicios" className="hover:text-primary-blue transition-colors">
                                Servicios
                            </Link>
                            <Link href="/casos-de-exito" className="hover:text-primary-blue transition-colors">
                                Casos de Éxito
                            </Link>
                            <Link href="/blog" className="hover:text-primary-blue transition-colors">
                                Blog y Recursos
                            </Link>
                        </nav>
                    </div>

                    {/* Help Links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold font-heading text-lg text-navy-text dark:text-white">
                            Ayuda
                        </h4>
                        <nav className="flex flex-col gap-2 text-sm text-slate-600 font-body dark:text-gray-400">
                            <Link href="/creativa-tesis/equipo-de-asesores" className="hover:text-primary-blue transition-colors">
                                Equipo de Asesores
                            </Link>
                            <Link
                                href="/calculadoras/cronograma-de-tesis"
                                className="hover:text-primary-blue transition-colors"
                            >
                                Diagnóstico Gratis
                            </Link>
                            <Link href="/contacto" className="hover:text-primary-blue transition-colors">
                                Contacto
                            </Link>
                        </nav>
                    </div>

                    {/* Contact Section */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold font-heading text-lg text-navy-text dark:text-white">
                            Contáctanos
                        </h4>
                        <div className="flex flex-col gap-2 text-sm text-slate-600 font-body dark:text-gray-400">
                            <a href="mailto:contacto@creativatesis.com" className="hover:text-primary-blue flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">mail</span>
                                contacto@creativatesis.com
                            </a>
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">location_on</span>
                                Oficina central: Tacna, Perú
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">badge</span>
                                RUC: 20123456789
                            </span>
                        </div>

                        <h4 className="font-bold font-heading text-lg text-navy-text mt-4 dark:text-white">
                            Síguenos
                        </h4>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-primary-blue hover:text-white dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-primary-blue"
                            >
                                <span className="font-bold text-xs">Fb</span>
                            </a>
                            <a
                                href="#"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-primary-blue hover:text-white dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-primary-blue"
                            >
                                <span className="font-bold text-xs">Ig</span>
                            </a>
                            <a
                                href="#"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-primary-blue hover:text-white dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-primary-blue"
                            >
                                <span className="font-bold text-xs">Wa</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 text-sm text-slate-500 sm:flex-row dark:border-slate-800 dark:text-gray-500">
                    <p>© 2023 Creativa Tesis. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-primary-blue transition-colors">
                            Términos
                        </a>
                        <a href="#" className="hover:text-primary-blue transition-colors">
                            Privacidad
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
