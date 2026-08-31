import { Star } from "lucide-react";
import { prisma } from "@/lib/prisma";

export async function Testimonials() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" }
  });

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-primary text-white" id="testimonials">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-[1px] w-8 bg-accent" />
            <span className="text-accent font-semibold tracking-wider uppercase text-sm">Testimonials</span>
            <span className="h-[1px] w-8 bg-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
            What Our <span className="text-accent">Students Say</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div 
              key={item.id} 
              className="bg-white/10 rounded-2xl p-8 border border-white/20 backdrop-blur-sm hover:bg-white/15 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500" />
              <div className="flex text-accent mb-4">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-lg italic mb-6 text-white/90">"{item.review}"</p>
              <div>
                <h4 className="font-bold text-white">{item.name}</h4>
                <p className="text-sm text-white/70">
                  {item.role} {item.country && `• ${item.country}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
