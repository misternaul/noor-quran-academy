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
  metadataBase: new URL('https://noorquranacademy.com'), // Assuming a domain or they can change it
  title: {
    default: "Online Quran Classes | Learn Quran with Expert Tutors | Noor Quran Academy",
    template: "%s | Noor Quran Academy",
  },
  description: "Join the best Online Quran Classes with certified male and female tutors. Learn Quran reading, Tajweed, Hifz, and Arabic for kids and adults globally.",
  keywords: ["Online Quran Classes", "Learn Quran Online", "Quran Teacher Online", "Online Quran Academy", "Quran Classes for Kids", "Quran with Tajweed", "Online Hifz Classes"],
  openGraph: {
    title: 'Online Quran Classes | Noor Quran Academy',
    description: 'Learn Quran reading, Tajweed, and Hifz online with certified expert tutors. Start your free trial today!',
    type: 'website',
  },
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
