export default function TermsAndConditions() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl font-bold font-serif mb-8">Terms and Conditions</h1>
      <div className="prose prose-lg text-foreground/80 space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">1. Agreement to Terms</h2>
        <p>By accessing or using Noor Quran Academy's website and services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access the service.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Services and Classes</h2>
        <p>We provide online Quran education services. All classes are conducted via secure online platforms. Scheduling is subject to teacher availability, and cancellations must be made at least 24 hours in advance to be eligible for makeup classes.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Payment Terms</h2>
        <p>Payments for classes are billed on a monthly basis in advance. You can cancel your subscription at any time, but refunds for partially used months are not provided.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Code of Conduct</h2>
        <p>Students and teachers are expected to maintain a respectful and Islamic environment during all sessions. Any inappropriate behavior may result in immediate termination of services without refund.</p>
      </div>
    </div>
  );
}
