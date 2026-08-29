import { FreeTrialForm } from "@/components/sections/free-trial-form";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-muted/30 py-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-[1px] w-8 bg-accent" />
            <span className="text-accent font-semibold tracking-wider uppercase text-sm">Get in Touch</span>
            <span className="h-[1px] w-8 bg-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Let's Start Your <span className="text-primary">Quran Journey</span>
          </h1>
          <p className="text-lg text-foreground/70">
            Have questions or ready to begin? Reach out to us or book your free trial class directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-border/50 shadow-sm">
              <h3 className="text-2xl font-bold font-serif mb-6">Contact Info</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Email Us</h4>
                    <p className="text-foreground/70 text-sm mt-1">info@noorquranacademy.com</p>
                    <p className="text-foreground/70 text-sm">support@noorquranacademy.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">WhatsApp / Phone</h4>
                    <p className="text-foreground/70 text-sm mt-1">+1 (234) 567-8900</p>
                    <p className="text-foreground/70 text-sm text-accent font-medium mt-1">Available 24/7 on WhatsApp</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Global Presence</h4>
                    <p className="text-foreground/70 text-sm mt-1">Online Classes Worldwide</p>
                    <p className="text-foreground/70 text-sm">Headquarters: London, UK</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary text-white p-8 rounded-2xl shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
              <h3 className="text-2xl font-bold font-serif mb-2 relative z-10">Available Timings</h3>
              <p className="text-primary-foreground/80 text-sm mb-6 relative z-10">
                We operate 24/7 to accommodate students from all time zones across the globe.
              </p>
              <div className="space-y-3 relative z-10">
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="font-medium text-sm">Monday - Friday</span>
                  <span className="text-sm">24 Hours</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span className="font-medium text-sm">Saturday</span>
                  <span className="text-sm">24 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-sm">Sunday</span>
                  <span className="text-sm">24 Hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <FreeTrialForm />
          </div>
        </div>
      </div>
    </main>
  );
}
