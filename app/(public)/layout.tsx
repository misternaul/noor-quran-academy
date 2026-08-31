export const revalidate = 60;

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="flex-1 flex flex-col pt-20">
        {children}
      </div>
      <Footer />
    </>
  );
}
