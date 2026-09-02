"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "./mode-toggle";
import { GoogleTranslate } from "./google-translate";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Courses", href: "/courses" },
  { title: "Teachers", href: "/teachers" },
  { title: "Pricing", href: "/pricing" },
  { title: "Blog", href: "/blog" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/90 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <img 
                src="/logo.jpg" 
                alt="Noor Quran Academy Logo" 
                className="w-10 h-10 rounded-full shadow-sm" 
              />
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold text-primary leading-tight">Noor Quran</span>
                <span className="text-[10px] font-semibold text-accent tracking-widest uppercase">Academy</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <GoogleTranslate />
              <ModeToggle />
              <Link href="/contact">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Book Free Trial
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-background md:hidden flex flex-col"
          >
            <div className="p-5 flex items-center justify-between border-b border-border">
              <span className="font-serif text-2xl font-bold text-primary">
                Noor Academy
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <nav className="flex-1 px-6 py-8 flex flex-col gap-6 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-serif font-medium text-foreground hover:text-accent transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </nav>

            <div className="p-6 border-t border-border flex flex-col gap-4 bg-muted/30">
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="flex-1">
                  <GoogleTranslate />
                </div>
                <ModeToggle />
              </div>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button className="w-full h-12 text-lg bg-primary">Book Free Trial</Button>
              </Link>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full h-12 text-lg border-primary text-primary hover:bg-primary hover:text-white">
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
