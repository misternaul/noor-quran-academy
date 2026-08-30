import { Metadata } from 'next';
import { Pricing } from '@/components/sections/pricing';
import { CTASection } from '@/components/sections/cta';

export const metadata: Metadata = {
  title: 'Pricing & Plans | Affordable Online Quran Classes',
  description: 'View our flexible and affordable pricing plans for online Quran classes. Choose the best schedule for you and your family to learn Quran online.',
};

export default function PricingPage() {
  return (
    <div className="pt-12 pb-12">
      <Pricing />
      <CTASection />
    </div>
  );
}
