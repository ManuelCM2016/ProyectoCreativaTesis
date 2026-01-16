import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatbotWidget from "@/components/shared/ChatbotWidget";

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
      <body className={[playfair.variable, inter.variable, 'antialiased', 'relative'].join(' ')}>
        {/* Subtle Gradient Background Overlay */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background: `linear-gradient(45deg, 
              #E6F4FC 0%, 
              #D4EBFA 20%, 
              #F0F7FB 40%, 
              #E3F0F7 60%, 
              #D1E4EF 80%, 
              #C9DFF0 100%)`,
            opacity: 0.75
          }}
        />

        {/* Content Container */}
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden z-10">
          <Navbar />
          <main className="flex flex-col bg-background-light dark:bg-background-dark">
            {children}
          </main>
          <Footer />
          <ChatbotWidget />
        </div>
      </body>
    </html>
  );
}
