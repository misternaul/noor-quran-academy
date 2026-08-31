import { CheckCircle2, Clock, Globe2, Sparkles, ShieldCheck, Users } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "Qualified & Experienced Teachers", desc: "Learn from certified scholars and expert Huffaz with years of teaching experience." },
  { icon: Users, title: "One-to-One Online Classes", desc: "Get personalized attention with our dedicated 1-on-1 sessions tailored to your pace." },
  { icon: Clock, title: "Flexible Class Timings", desc: "Schedule your classes at any time that suits your daily routine, 24/7." },
  { icon: Users, title: "Classes for Kids & Adults", desc: "Specialized teaching methods designed separately for young learners and adults." },
  { icon: Globe2, title: "Learn From Anywhere", desc: "Take your classes from the comfort of your home, anywhere in the world." },
  { icon: Sparkles, title: "Free Trial Class", desc: "Experience our teaching quality firsthand before making any commitment." },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Why Choose <span className="text-primary">Noor Quran Academy?</span>
          </h2>
          <p className="text-lg text-foreground/70">
            We provide a premium, structured, and engaging learning experience for students globally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="group bg-white p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500" />
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-primary/30">
                <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-foreground/70 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
