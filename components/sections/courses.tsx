import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export async function Courses() {
  const dbCourses = await prisma.course.findMany({
    orderBy: { order: "asc" }
  });

  if (dbCourses.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-background" id="courses">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-[1px] w-8 bg-accent" />
            <span className="text-accent font-semibold tracking-wider uppercase text-sm">Our Curriculum</span>
            <span className="h-[1px] w-8 bg-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Comprehensive <span className="text-primary">Quranic Studies</span>
          </h2>
          <p className="text-lg text-foreground/70">
            From basic reading to advanced memorization, our structured courses guide you at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dbCourses.map((course) => (
            <div 
              key={course.id} 
              className="bg-white rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-serif mb-3 text-foreground">{course.title}</h3>
              {course.category && (
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wide rounded mb-3">
                  {course.category}
                </span>
              )}
              <p className="text-foreground/70 mb-6 leading-relaxed">
                {course.description}
              </p>
              
              <Link href={`/courses/${course.slug || course.id}`} className="block w-full">
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                  Learn More
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
