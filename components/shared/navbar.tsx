"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/#about" },
  { title: "Courses", href: "/#courses" },
  { title: "Pricing", href: "/#pricing" },
  { title: "Contact", href: "/contact" },
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
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-serif text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                Noor
              </span>
              <span className="font-serif text-2xl font-bold text-foreground">
                Academy
              </span>
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
              <Button variant="ghost" size="icon" aria-label="Change language">
                <Globe className="h-5 w-5 text-foreground/80" />
              </Button>
              <Link href="/contact">
                <Button className="bg-primary text-white hover:bg-primary/90">
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
