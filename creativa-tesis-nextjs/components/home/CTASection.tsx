import Button from '@/components/ui/Button';

export default function CTASection() {
    return (
        <section className="bg-secondary-blue/10 py-16 lg:py-24 dark:bg-slate-900">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto flex max-w-[960px] flex-col overflow-hidden rounded-xl bg-white shadow-xl md:flex-row dark:bg-slate-800">
                    {/* Text Content */}
                    <div className="flex flex-col justify-center gap-6 p-8 md:p-12 md:w-3/5">
                        <div className="flex flex-col gap-2">
                            <h2 className="font-heading text-navy-text text-3xl font-bold md:text-4xl dark:text-white">
                                ¿Tienes dudas sobre tu tema?
                            </h2>
                            <p className="text-slate-600 font-body dark:text-gray-300">
                                Habla ahora mismo con nuestro asistente virtual. Obtén respuestas inmediatas sobre
                                nuestros paquetes, precios y disponibilidad.
                            </p>
                        </div>
                        <Button className="w-fit flex items-center gap-2">
                            <span className="material-symbols-outlined">smart_toy</span>
                            <span>Chatear con Asesor Virtual</span>
                        </Button>
                    </div>

                    {/* Background Image */}
                    <div
                        className="bg-secondary-blue/30 relative min-h-[200px] md:w-2/5 md:min-h-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD8qp7VOPSUc8ZavvyL0sVaF7ApE1-mHQ3Vv0zgT0MXos9Px6-fC6H6IgE8EFw2vYjpB1tsIP93WIkM8FjHshgQaZP89dbXYi6s1KN2LnXCQ9nZ4893dWUvsDq49c1ekE4F83w5j3e2bRZzTWa4747_nNohMyIO4pnzsoDQFPo7WaAoX8isPTUpJzNCvoBW_s-xTy5JlDxiKwPeGsafMUXy4_lipdfCq8ntua3YSNAL8mhJcZurYT7Z811x2PrPUuFO-1pJxDs8G_Y')",
                        }}
                    >
                        <div className="absolute inset-0 bg-navy-text/20"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
