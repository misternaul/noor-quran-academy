import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden bg-primary">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
          Start Your Quran Journey Today
        </h2>
        <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
          Book your free trial class and experience personalized online Quran learning with our expert teachers.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-accent text-primary font-bold hover:bg-accent/90 h-14 px-8 shadow-lg">
            Book Free Trial
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 border-white/20 text-white hover:bg-white/10 group">
            <MessageCircle className="mr-2 h-5 w-5 text-accent group-hover:text-white transition-colors" />
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
