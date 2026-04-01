import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "700", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Creativa Tesis - Asesoría Profesional en Tacna",
  description:
    "Te guiamos en cada paso para que tu proyecto académico sea eficiente, claro y exitoso. Asesoría profesional de tesis en Tacna, Perú.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="light" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Questrial&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={[playfair.variable, inter.variable, 'antialiased', 'overflow-x-hidden'].join(' ')} suppressHydrationWarning>
        {/* Subtle Gradient Background Overlay */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background: `linear-gradient(45deg, 
              #C1E2F7 0%, 
              #95c2e6 20%, q tq t
              #7AB5DD 40%, 
              #5FA7D4 60%, 
              #4A8FC0 80%, 
              #3D7BA8 100%)`,
            opacity: 102
          }}
        />

        <div className="flex min-h-screen w-full flex-col" style={{ isolation: 'isolate' }}>
          <SiteShell>{children}</SiteShell>
        </div>
      </body>
    </html>
  );
}
