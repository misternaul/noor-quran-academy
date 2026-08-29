import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { About } from "@/components/sections/about";
import { Courses } from "@/components/sections/courses";
import { Teachers } from "@/components/sections/teachers";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const phoneSetting = await prisma.setting.findUnique({ where: { key: "contact_phone" } });
  const phone = phoneSetting?.value || "+1 (234) 567-8900";
  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}`;

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      <Hero whatsappUrl={whatsappUrl} />
      <TrustStrip />
      <About />
      <Courses />
      <Teachers />
      <WhyChooseUs />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <CTASection whatsappUrl={whatsappUrl} />
    </main>
  );
}
