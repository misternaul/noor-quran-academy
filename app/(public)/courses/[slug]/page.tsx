import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Video, Users } from "lucide-react";
import { CTASection } from "@/components/sections/cta";

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug }
  });

  if (!course) return { title: "Course Not Found" };

  return {
    title: course.metaTitle || `${course.title} | Noor Quran Academy`,
    description: course.metaDescription || course.description,
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  
  const course = await prisma.course.findUnique({
    where: { slug }
  });

  if (!course) {
    notFound();
  }

  return (
    <>
      <div className="bg-primary/5 pt-32 pb-20 border-b border-primary/10">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <span className="inline-block px-3 py-1 bg-accent/20 text-accent font-semibold text-sm rounded-full mb-6">
            {course.category || "Online Course"}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-6">
            {course.title}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
            {course.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-primary px-8 text-lg w-full sm:w-auto h-14">
              <Link href={`/contact?course=${course.slug}`}>
                Enroll in {course.title} Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white w-full sm:w-auto h-14">
              <Link href="/contact">Book Free Trial</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 prose prose-lg prose-green max-w-none">
              <h2 className="text-3xl font-serif text-primary mb-6">Course Overview</h2>
              {course.content ? (
                <div dangerouslySetInnerHTML={{ __html: course.content.replace(/\n/g, '<br/>') }} />
              ) : (
                <div>
                  <p>In this comprehensive {course.title} course, students will learn through personalized 1-on-1 online sessions. Our expert tutors use interactive methods to ensure complete understanding and steady progress.</p>
                  
                  <h3 className="text-2xl font-serif mt-8 mb-4">What you will learn:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                      <span>Foundational rules and principles</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                      <span>Practical application through regular exercises</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                      <span>One-on-one attention and correction</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                      <span>Progress tracking and regular assessments</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 sticky top-24">
                <h3 className="text-xl font-bold font-serif mb-6">Course Features</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                      <Video className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Format</h4>
                      <p className="text-sm text-gray-600">1-on-1 Live Online</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Duration</h4>
                      <p className="text-sm text-gray-600">Flexible Scheduling</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Age Group</h4>
                      <p className="text-sm text-gray-600">Kids & Adults</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 h-12 text-lg">
                    <Link href={`/contact?course=${course.slug}`}>Enroll Now</Link>
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <CTASection />
    </>
  );
}
