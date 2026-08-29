import type { Metadata } from "next";
import { Inter, Playfair_Display, Amiri } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Noor Quran Academy | Learn Quran Online with Qualified Teachers",
  description: "Learn Quran with Tajweed, Hifz, Arabic and Islamic Studies from the comfort of your home. Premium online one-to-one classes for kids and adults worldwide.",
  keywords: ["Online Quran Classes", "Learn Quran Online", "Quran Teacher Online", "Online Quran Academy", "Quran Classes for Kids", "Quran with Tajweed", "Online Hifz Classes"],
};

import { WhatsAppButton } from "@/components/shared/whatsapp-button";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${amiri.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen flex flex-col selection:bg-accent selection:text-white">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
