"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import { QuranModel } from "@/components/3d/quran-model";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-sm font-medium text-primary w-fit">
              <span className="flex h-2 w-2 rounded-full bg-accent mr-2"></span>
              ONLINE QURAN EDUCATION
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-[1.15] text-foreground">
              Learn Quran Online with <span className="text-primary relative">
                Qualified Teachers
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="transparent" />
                </svg>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/70 max-w-lg leading-relaxed">
              Learn Quran with Tajweed, Hifz, Arabic and Islamic Studies from the comfort of your home. Personalized 1-on-1 sessions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-md h-14 px-8 shadow-lg shadow-primary/25">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 border-primary text-primary hover:bg-primary/5 group">
                <MessageCircle className="mr-2 h-5 w-5 text-accent group-hover:text-primary transition-colors" />
                Chat on WhatsApp
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-6">
              {[
                "Qualified Teachers", 
                "One-to-One Classes", 
                "Flexible Timings", 
                "Students Worldwide"
              ].map((text, i) => (
                <div key={i} className="flex items-center text-sm font-medium text-foreground/80">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-accent" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* 3D Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full"
          >
            <div className="absolute inset-0 z-10 pointer-events-none rounded-3xl overflow-hidden glass-dark/5" />
            
            {/* Floating Info Cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-10 right-4 md:right-10 z-20 glass bg-white/80 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-white/50"
            >
              <p className="text-sm font-bold text-primary">One-to-One Learning</p>
              <p className="text-xs text-foreground/60">Personalized attention</p>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 left-4 md:left-10 z-20 glass bg-white/80 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-white/50"
            >
              <p className="text-sm font-bold text-primary">Students Worldwide</p>
              <p className="text-xs text-foreground/60">Join our global community</p>
            </motion.div>

            <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-primary">Loading 3D Experience...</div>}>
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                
                <QuranModel />
                
                <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
                <Environment preset="city" />
                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2 + 0.1} minPolarAngle={Math.PI / 2 - 0.1} />
              </Canvas>
            </Suspense>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
