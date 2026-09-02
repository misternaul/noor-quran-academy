import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

// Brand icons since Lucide removed them
const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const Youtube = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

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
  const instaSetting = await prisma.setting.findUnique({ where: { key: "social_instagram" } });
  const fbSetting = await prisma.setting.findUnique({ where: { key: "social_facebook" } });
  const ytSetting = await prisma.setting.findUnique({ where: { key: "social_youtube" } });
  
  const currentEmail = emailSetting?.value || "info@noorquranacademy.com";
  const currentPhone = phoneSetting?.value || "+1 (234) 567-8900";
  const currentInsta = instaSetting?.value || "";
  const currentFb = fbSetting?.value || "";
  const currentYt = ytSetting?.value || "";

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
            <div className="flex items-center gap-4 pt-2">
              {currentInsta && (
                <a href={currentInsta} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-accent transition-colors">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              )}
              {currentFb && (
                <a href={currentFb} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-accent transition-colors">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
              )}
              {currentYt && (
                <a href={currentYt} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-accent transition-colors">
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </a>
              )}
            </div>
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
