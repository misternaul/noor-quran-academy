import { Metadata } from 'next';
import { Courses } from '@/components/sections/courses';
import { CTASection } from '@/components/sections/cta';

export const metadata: Metadata = {
  title: 'Our Courses | Learn Quran, Tajweed, & Arabic Online',
  description: 'Explore our wide range of online courses including Quran Reading, Tajweed, Memorization (Hifz), and Arabic language for kids and adults.',
};

export default function CoursesPage() {
  return (
    <div className="pt-12 pb-12">
      <Courses />
      <CTASection />
    </div>
  );
}
