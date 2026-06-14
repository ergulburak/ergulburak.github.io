import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/LangProvider";
import { Navbar } from "@/components/Navbar";
import { CommandPalette } from "@/components/CommandPalette";

// Google Analytics 4 — same property as the previous Jekyll site for continuity.
const GA_ID = "G-3DWR3NTPNX";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "~/burak — blog-centric portfolio",
  description: "A sleek, premium IDE-themed site for Burak Ergül.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <LangProvider>
          <div className="min-h-screen flex flex-col bg-[var(--color-bg-editor)]">
            <Navbar />
            <main className="flex-1 flex flex-col items-center">
              {children}
            </main>
            <CommandPalette />
          </div>
        </LangProvider>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
