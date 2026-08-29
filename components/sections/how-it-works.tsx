import { ClipboardList, BookOpen, Clock, PlayCircle } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Register",
    desc: "Submit your basic information to get started.",
    icon: ClipboardList,
  },
  {
    num: "02",
    title: "Choose Course",
    desc: "Select your preferred learning program.",
    icon: BookOpen,
  },
  {
    num: "03",
    title: "Choose Time",
    desc: "Choose a convenient schedule.",
    icon: Clock,
  },
  {
    num: "04",
    title: "Start Learning",
    desc: "Meet your teacher and begin.",
    icon: PlayCircle,
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent to-transparent" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 text-white">
            How It Works
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Start your Quran learning journey in four simple steps.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-accent/30" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-secondary border-4 border-primary flex items-center justify-center mb-6 relative z-10 group-hover:border-accent transition-colors duration-300 shadow-xl">
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-accent text-primary font-bold flex items-center justify-center text-sm">
                    {step.num}
                  </span>
                  <step.icon className="h-10 w-10 text-white group-hover:text-accent transition-colors duration-300" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-primary-foreground/80 text-sm max-w-[200px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
