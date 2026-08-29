import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, BookOpen, Star } from "lucide-react";

export function Hero({ whatsappUrl = "https://wa.me/1234567890" }: { whatsappUrl?: string }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-background">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-accent/5 rounded-bl-full -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-primary/5 rounded-tr-full -z-10" />
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-semibold mb-6 border border-primary/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Premium Online Islamic Education
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
              Master the Quran with <span className="text-primary relative">
                Expert Tutors
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span> <br className="hidden lg:block" /> From Your Home
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Join thousands of students worldwide. Learn Quran reading, Tajweed, and Islamic studies with certified scholars through interactive one-on-one classes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 bg-primary hover:bg-primary/90 text-white text-base">
                  Book Free Trial
                </Button>
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 border-primary text-primary hover:bg-primary/5 group">
                  <MessageCircle className="mr-2 h-5 w-5 text-accent group-hover:text-primary transition-colors" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm font-medium text-foreground/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span>Certified Tutors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span>Flexible Timings</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span>Male & Female Teachers</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
            <div className="relative aspect-square rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 border-[12px] border-white shadow-2xl flex items-center justify-center">
              {/* Subtle dotted background pattern */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(10, 77, 60, 0.5) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
              
              {/* Inner Decorative Circle */}
              <div className="absolute inset-10 border-2 border-primary/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
              
              {/* Central Icon */}
              <BookOpen className="w-1/2 h-1/2 text-primary relative z-10" strokeWidth={1} />
            </div>

            {/* Floating badges */}
            <div className="absolute top-10 -left-6 bg-white p-4 rounded-xl shadow-xl border border-border/50 animate-[bounce_4s_ease-in-out_infinite]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Star className="h-5 w-5 text-accent" fill="currentColor" />
                </div>
                <div>
                  <p className="font-bold text-foreground">4.9/5 Rating</p>
                  <p className="text-xs text-foreground/60">From 500+ Students</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
