import { BookOpen, Clock, Users, Globe2, Sparkles, ShieldCheck } from "lucide-react";

const trustItems = [
  { icon: Users, label: "One-to-One Learning" },
  { icon: ShieldCheck, label: "Qualified Teachers" },
  { icon: Clock, label: "Flexible Timings" },
  { icon: BookOpen, label: "Kids & Adults" },
  { icon: Globe2, label: "Worldwide" },
  { icon: Sparkles, label: "Free Trial" },
];

export function TrustStrip() {
  return (
    <div className="w-full bg-primary py-8 border-y border-primary/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex overflow-x-auto hide-scrollbar gap-8 md:gap-4 justify-start md:justify-between items-center snap-x">
          {trustItems.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col md:flex-row items-center gap-3 min-w-[120px] md:min-w-0 snap-center text-primary-foreground/90 hover:text-accent transition-colors"
            >
              <item.icon className="h-6 w-6 md:h-5 md:w-5 text-accent" />
              <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
