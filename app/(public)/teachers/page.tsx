import { Metadata } from 'next';
import { Teachers } from '@/components/sections/teachers';
import { CTASection } from '@/components/sections/cta';

export const metadata: Metadata = {
  title: 'Our Quran Teachers | Expert Male & Female Tutors Online',
  description: 'Meet our qualified, certified online Quran teachers. We offer both male and female tutors to ensure a comfortable learning environment for everyone.',
};

export default function TeachersPage() {
  return (
    <div className="pt-12 pb-12">
      <Teachers />
      <CTASection />
    </div>
  );
}
