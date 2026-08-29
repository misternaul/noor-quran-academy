import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "BASIC",
    price: "$35",
    period: "per month",
    features: [
      "2 Classes Per Week",
      "One-to-One Learning",
      "Flexible Timing",
      "Basic Progress Reports",
    ],
    recommended: false,
  },
  {
    name: "STANDARD",
    price: "$50",
    period: "per month",
    features: [
      "3 Classes Per Week",
      "One-to-One Learning",
      "Tajweed Support",
      "Flexible Timing",
      "Monthly Progress Reports",
    ],
    recommended: true,
  },
  {
    name: "PREMIUM",
    price: "$80",
    period: "per month",
    features: [
      "5 Classes Per Week",
      "One-to-One Learning",
      "Tajweed & Hifz Support",
      "Priority Scheduling",
      "Weekly Progress Reports",
    ],
    recommended: false,
  },
];

export function Pricing() {
  return (
    <section className="py-24 bg-background" id="pricing">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-[1px] w-8 bg-accent" />
            <span className="text-accent font-semibold tracking-wider uppercase text-sm">Pricing Plans</span>
            <span className="h-[1px] w-8 bg-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Simple & Transparent <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-lg text-foreground/70">
            Choose the plan that best fits your learning goals and schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div 
              key={i} 
              className={`relative bg-white rounded-2xl p-8 border ${
                plan.recommended 
                  ? "border-accent shadow-xl md:-translate-y-4" 
                  : "border-border/50 shadow-sm"
              } flex flex-col`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider">
                  RECOMMENDED
                </div>
              )}
              
              <h3 className="text-xl font-bold text-center mb-2">{plan.name}</h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-primary">{plan.price}</span>
                <span className="text-foreground/60 ml-2">{plan.period}</span>
              </div>
              
              <div className="space-y-4 flex-1 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent shrink-0" />
                    <span className="text-foreground/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                variant={plan.recommended ? "default" : "outline"}
                className={`w-full ${plan.recommended ? 'bg-primary hover:bg-primary/90' : 'border-primary text-primary hover:bg-primary hover:text-white'}`}
              >
                Start Free Trial
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
