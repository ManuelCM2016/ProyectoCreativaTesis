/**
 * Layout exclusivo para Sanity Studio (/studio/...)
 * Omite Navbar, Footer y ChatbotWidget para que el Studio
 * ocupe toda la pantalla sin interferencias.
 */
export default function StudioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
