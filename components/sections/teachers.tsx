import { User } from "lucide-react";
import { prisma } from "@/lib/prisma";

export async function Teachers() {
  const teachers = await prisma.teacher.findMany({
    orderBy: { order: "asc" }
  });

  if (teachers.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-muted/30" id="teachers">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-[1px] w-8 bg-accent" />
            <span className="text-accent font-semibold tracking-wider uppercase text-sm">Our Teachers</span>
            <span className="h-[1px] w-8 bg-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Expert <span className="text-primary">Quran Tutors</span>
          </h2>
          <p className="text-lg text-foreground/70">
            Learn from qualified male and female teachers with Ijazah and years of online teaching experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm text-center">
              <div className="w-24 h-24 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <User className="w-12 h-12" />
              </div>
              <h3 className="text-lg font-bold font-serif mb-1">{teacher.name}</h3>
              <p className="text-accent font-medium text-sm mb-2">{teacher.qualification}</p>
              {teacher.specialization && (
                <p className="text-foreground/60 text-sm mb-4">{teacher.specialization}</p>
              )}
              {teacher.bio && (
                <p className="text-foreground/80 text-sm italic">"{teacher.bio}"</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
