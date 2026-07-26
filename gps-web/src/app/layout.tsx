import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ShaderNavyBackground } from "@/components/ui/ShaderNavyBackground";
import { InquiryDrawer } from "@/components/sections/InquiryDrawer";
import { SplashScreen } from "@/components/ui/SplashScreen";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const displayFont = Inter({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Greets Public School | Excellence in Education",
  description: "Educational Efficacy & Holistic Development in the Heart of Kochi. Nurturing excellence, character, and curiosity since 1986.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${displayFont.variable} scroll-smooth antialiased`}>
      <head>
        {/* Core refraction engine loaded before interactions */}
        <Script src="/liquid-glass.js" strategy="beforeInteractive" />
        {/* Floating draggable glass lens overlay */}
        <Script src="/liquid-glass-floating.js" strategy="afterInteractive" />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#080E21] text-white selection:bg-accent/30 overflow-x-hidden relative">
        {/* Animated Splash Screen */}
        <SplashScreen />

        {/* WebGL Animated Shader Canvas */}
        <ShaderNavyBackground />
        
        {/* Navigation & Layout Shell */}
        <Navbar />
        <main className="flex-1 relative z-10 w-full">
          {children}
        </main>
        <Footer />
        
        {/* Global Conversion Funnel */}
        <InquiryDrawer />

        {/* Sticky Floating WhatsApp CTA */}
        <a
          href="https://web.whatsapp.com/send?phone=919562627170&text=Hi%2C%20I%20would%20like%20to%20get%20more%20information"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white shadow-2xl hover:scale-115 transition-all hover:bg-white/10 hover:border-white/20 group"
          aria-label="Contact on WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current text-white/80 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.58 2.023 14.12 1 11.517 1 6.08 1 1.657 5.37 1.654 10.8c-.001 1.674.439 3.313 1.277 4.747L1.99 21.02l4.657-1.866z"/>
            <path d="M17.386 14.39c-.315-.158-1.86-.92-2.15-.992-.288-.072-.498-.108-.707.206-.21.314-.81.992-.992 1.206-.18.214-.36.24-.675.082-.315-.158-1.33-.49-2.53-1.562-.934-.834-1.564-1.864-1.748-2.179-.18-.314-.018-.485.138-.642.14-.14.315-.365.472-.547.158-.18.21-.309.315-.515.105-.206.052-.387-.026-.546-.078-.158-.707-1.702-.97-2.332-.255-.614-.514-.53-.706-.54l-.603-.01c-.21 0-.55.078-.838.394-.288.314-1.1 1.077-1.1 2.628 0 1.551 1.127 3.05 1.284 3.262.158.213 2.218 3.387 5.373 4.747.75.324 1.336.518 1.793.663.754.24 1.44.207 1.983.126.604-.09 1.86-.76 2.122-1.492.263-.732.263-1.359.184-1.492-.078-.133-.288-.21-.603-.368z"/>
          </svg>
        </a>
      </body>
    </html>
  );
}
