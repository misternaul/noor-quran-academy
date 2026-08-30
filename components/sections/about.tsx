"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function About() {
  return (
    <section className="py-24 bg-muted/50 overflow-hidden" id="about">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Beautiful generic image for About section */}
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border-primary/10 shadow-2xl bg-white">
              <img 
                src="/quran-bg.jpg" 
                alt="Learning the Holy Quran"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-multiply" />
            </div>
            
            {/* Decorative dots */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[radial-gradient(#d4af37_2px,transparent_2px)] [background-size:16px_16px] opacity-30 -z-10" />
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[radial-gradient(#0a4d3c_2px,transparent_2px)] [background-size:16px_16px] opacity-20 -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4 mb-2">
              <span className="h-[1px] w-12 bg-accent" />
              <span className="text-accent font-semibold tracking-wider uppercase text-sm">About The Academy</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight">
              Learn Quran. Understand Islam. <span className="text-primary">Transform Your Life.</span>
            </h2>
            
            <div className="space-y-4 text-lg text-foreground/70">
              <p>
                Noor Quran Academy is a premium international online educational platform dedicated to teaching the Holy Quran and Islamic Studies to students of all ages worldwide.
              </p>
              <p>
                We believe that learning the Quran should be accessible, engaging, and personalized. Our one-to-one online classes with highly qualified and experienced teachers ensure that every student receives the attention they need to succeed, whether they are children taking their first steps in reading Arabic or adults mastering Tajweed and Hifz.
              </p>
            </div>
            
            <div className="pt-4">
              <Link href="/contact">
                <Button className="bg-secondary text-white hover:bg-secondary/90 group">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
