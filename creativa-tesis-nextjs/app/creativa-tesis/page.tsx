import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function CreativaTesisPage() {
    return (
        <div className="w-full px-4 md:px-20 py-16 bg-background-light dark:bg-background-dark">
            <div className="max-w-[960px] mx-auto text-center">
                <h1 className="text-navy-text font-heading text-4xl md:text-5xl font-black mb-6 dark:text-white">
                    Bienvenido a Creativa Tesis
                </h1>
                <p className="text-slate-600 font-body text-lg mb-8 max-w-2xl mx-auto dark:text-gray-300">
                    Tu aliado estratégico en investigación académica. Descubre quiénes somos y conoce al equipo
                    que te acompañará en tu camino hacia la titulación.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/creativa-tesis/quienes-somos">
                        <Button>Quiénes Somos</Button>
                    </Link>
                    <Link href="/creativa-tesis/equipo-de-asesores">
                        <Button variant="secondary">Equipo de Asesores</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
