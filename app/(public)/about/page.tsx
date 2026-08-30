import { Metadata } from 'next';
import { About } from '@/components/sections/about';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { CTASection } from '@/components/sections/cta';

export const metadata: Metadata = {
  title: 'About Us | Learn Quran Online with Expert Tutors',
  description: 'Learn about Noor Quran Academy, our mission, and our expert male and female tutors dedicated to teaching Quran online with proper Tajweed.',
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-12">
      <About />
      <WhyChooseUs />
      <CTASection />
    </div>
  );
}
