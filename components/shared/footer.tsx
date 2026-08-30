import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

async function FooterCourses() {
  const courses = await prisma.course.findMany({
    orderBy: { order: "asc" },
    take: 6
  });

  return (
    <>
      {courses.map((course) => (
        <li key={course.id}>
          <Link href={`/courses/${course.slug || course.id}`} className="text-sm hover:text-accent transition-colors">
            {course.title}
          </Link>
        </li>
      ))}
      <li>
        <Link href="/courses" className="text-sm font-semibold text-accent hover:text-white transition-colors">
          View All Courses &rarr;
        </Link>
      </li>
    </>
  );
}

export async function Footer() {
  const emailSetting = await prisma.setting.findUnique({ where: { key: "contact_email" } });
  const phoneSetting = await prisma.setting.findUnique({ where: { key: "contact_phone" } });
  
  const currentEmail = emailSetting?.value || "info@noorquranacademy.com";
  const currentPhone = phoneSetting?.value || "+1 (234) 567-8900";

  return (
    <footer className="bg-dark text-white/80 pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-3">
                <img src="/logo.jpg" alt="Noor Quran Academy Logo" className="w-16 h-16 rounded-full shadow-md border-2 border-accent" />
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold text-accent leading-tight">Noor Quran</span>
                  <span className="font-serif text-lg font-bold text-white tracking-widest uppercase">Academy</span>
                </div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              "Learn Quran. Understand Islam. Live with Guidance." Premium online Quran education for students worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Our Teachers', href: '/teachers' },
                { name: 'Pricing Plans', href: '/pricing' },
                { name: 'Islamic Blog', href: '/blog' },
                { name: 'Contact', href: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Our Courses</h4>
            <ul className="space-y-3">
              <Suspense fallback={<li>Loading...</li>}>
                <FooterCourses />
              </Suspense>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm">{currentEmail}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm">{currentPhone}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm">Online Classes Worldwide</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Noor Quran Academy. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-accent transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
