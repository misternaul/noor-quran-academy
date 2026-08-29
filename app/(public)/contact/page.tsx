import { FreeTrialForm } from "@/components/sections/free-trial-form";
import { Mail, Phone, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function ContactPage() {
  const availableHoursSetting = await prisma.setting.findUnique({ where: { key: "available_hours" } });
  const emailSetting = await prisma.setting.findUnique({ where: { key: "contact_email" } });
  const phoneSetting = await prisma.setting.findUnique({ where: { key: "contact_phone" } });

  const availableHours = availableHoursSetting?.value || "Monday - Friday: 9 AM - 5 PM\nSaturday - Sunday: 10 AM - 4 PM";
  const currentEmail = emailSetting?.value || "info@noorquranacademy.com";
  const currentPhone = phoneSetting?.value || "+1 (234) 567-8900";
  const hoursLines = availableHours.split('\n').filter(Boolean);

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
                    <p className="text-foreground/70 text-sm mt-1">{currentEmail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">WhatsApp / Phone</h4>
                    <p className="text-foreground/70 text-sm mt-1">{currentPhone}</p>
                    <p className="text-foreground/70 text-sm text-accent font-medium mt-1">Available on WhatsApp</p>
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
                We operate on the following schedule:
              </p>
              <div className="space-y-3 relative z-10">
                {hoursLines.map((line, index) => {
                  const parts = line.split(":");
                  const day = parts[0];
                  const time = parts.slice(1).join(":");
                  return (
                    <div key={index} className={`flex justify-between ${index !== hoursLines.length - 1 ? 'border-b border-white/20 pb-2' : ''}`}>
                      <span className="font-medium text-sm">{day.trim()}</span>
                      <span className="text-sm">{time ? time.trim() : ""}</span>
                    </div>
                  );
                })}
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
