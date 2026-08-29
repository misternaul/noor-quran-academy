import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export async function Pricing() {
  let dbPlans = await prisma.pricingPlan.findMany({
    orderBy: { order: "asc" }
  });

  const plans = dbPlans.map(p => ({
    name: p.name,
    price: p.price,
    period: p.billingPeriod,
    features: p.features.split("\n").map(f => f.trim()).filter(Boolean),
    recommended: p.isRecommended,
  }));

  if (plans.length === 0) {
    return null;
  }

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
                <span className="text-foreground/60 ml-2 block mt-1">{plan.period}</span>
              </div>
              
              <div className="space-y-4 flex-1 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent shrink-0" />
                    <span className="text-foreground/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link href="/contact" className="w-full">
                <Button 
                  variant={plan.recommended ? "default" : "outline"}
                  className={`w-full ${plan.recommended ? 'bg-primary hover:bg-primary/90' : 'border-primary text-primary hover:bg-primary hover:text-white'}`}
                >
                  Start Free Trial
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
