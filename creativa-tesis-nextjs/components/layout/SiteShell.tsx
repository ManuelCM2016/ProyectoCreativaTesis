'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatbotWidget from '@/components/shared/ChatbotWidget';

export default function SiteShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isStudio = pathname?.startsWith('/studio');

    if (isStudio) {
        // En el panel de Sanity: sin Navbar, Footer ni botón flotante
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen w-full flex-col" style={{ isolation: 'isolate' }}>
            <Navbar />
            <main className="flex flex-col bg-background-light dark:bg-background-dark">
                {children}
            </main>
            <Footer />
            <ChatbotWidget />
        </div>
    );
}
