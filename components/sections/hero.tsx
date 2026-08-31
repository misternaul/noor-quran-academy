"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Hero({ whatsappUrl = "https://wa.me/1234567890" }: { whatsappUrl?: string }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      {/* Background Decorative Glowing Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-accent/10 rounded-full blur-[80px] md:blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] -z-10 animate-pulse" style={{ animationDuration: '10s' }} />
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <div className="flex-1 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-semibold mb-6 border border-primary/10 shadow-sm backdrop-blur-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
              </span>
              Premium Online Islamic Education
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-6"
            >
              Master the Quran with <span className="text-primary relative inline-block">
                Expert Tutors
                <svg className="absolute w-full h-3 -bottom-2 left-0 text-accent opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span> <br className="hidden lg:block" /> From Your Home
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Join thousands of students worldwide. Learn Quran reading, Tajweed, and Islamic studies with certified scholars through interactive one-on-one classes.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 bg-primary hover:bg-primary/90 text-white text-base shadow-lg hover:shadow-primary/25 transition-all group">
                  Book Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground group bg-transparent transition-all shadow-sm hover:shadow-md">
                  <MessageCircle className="mr-2 h-5 w-5 text-accent group-hover:text-primary-foreground transition-colors" />
                  Chat on WhatsApp
                </Button>
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm font-medium text-foreground/80"
            >
              <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>Certified Tutors</span>
              </div>
              <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>Flexible Timings</span>
              </div>
              <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>Male & Female Teachers</span>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 w-full max-w-lg lg:max-w-none relative group"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-3xl translate-x-4 translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-background group-hover:border-primary/20 transition-colors duration-500">
              <img 
                src="/quran-bg.jpg" 
                alt="Online Quran Learning" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-primary/10 to-transparent pointer-events-none opacity-60" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
