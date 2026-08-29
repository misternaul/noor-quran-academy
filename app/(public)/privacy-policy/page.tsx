export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl font-bold font-serif mb-8">Privacy Policy</h1>
      <div className="prose prose-lg text-foreground/80 space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
        <p>We collect information that you provide directly to us, including when you book a free trial, fill out a contact form, or communicate with us via WhatsApp or email. The types of information we may collect include your name, email address, phone number, and any other information you choose to provide.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide, maintain, and improve our educational services.</li>
          <li>Communicate with you about classes, schedules, and billing.</li>
          <li>Send you technical notices, updates, and support messages.</li>
          <li>Respond to your comments, questions, and requests.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Information Sharing</h2>
        <p>We do not share your personal information with third parties except as described in this privacy policy or with your consent.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us using the information provided on our Contact page.</p>
      </div>
    </div>
  );
}
