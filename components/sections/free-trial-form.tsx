"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitInquiry } from "@/lib/actions/inquiry";
import { Button } from "@/components/ui/button";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full bg-primary h-14" disabled={pending}>
      {pending ? "Submitting..." : "Book Free Trial"}
    </Button>
  );
}

export function FreeTrialForm() {
  const [state, formAction] = useFormState(submitInquiry, null);

  if (state?.success) {
    return (
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
          ✓
        </div>
        <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Your request has been received.</h3>
        <p className="text-foreground/70 mb-8">
          We will contact you shortly to arrange your free trial class.
        </p>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" onClick={() => window.location.reload()}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form action={formAction} className="bg-white rounded-2xl shadow-xl border border-border/50 p-6 md:p-8">
      <h3 className="text-2xl font-bold mb-6 font-serif">Student Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">Full Name *</label>
          <input type="text" name="name" required className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="John Doe" />
          {state?.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">Age</label>
          <input type="text" name="age" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g. 10 or Adult" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">Parent/Guardian Name</label>
          <input type="text" name="parentGuardian" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="(If student is a child)" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">Country</label>
          <input type="text" name="country" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g. USA, UK" />
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-6 font-serif">Contact Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">WhatsApp Number *</label>
          <input type="text" name="whatsapp" required className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="+1234567890" />
          {state?.errors?.whatsapp && <p className="text-red-500 text-sm mt-1">{state.errors.whatsapp[0]}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">Email Address</label>
          <input type="email" name="email" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="john@example.com" />
          {state?.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>}
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-6 font-serif">Course Preferences</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">Select Course</label>
          <select name="course" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">Please select...</option>
            <option value="Noorani Qaida">Noorani Qaida (Beginners)</option>
            <option value="Quran Reading">Quran Reading</option>
            <option value="Tajweed">Quran with Tajweed</option>
            <option value="Hifz">Hifz-ul-Quran</option>
            <option value="Arabic">Arabic Language</option>
            <option value="Islamic Studies">Islamic Studies</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">Preferred Timing</label>
          <input type="text" name="preferredTime" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g. Weekends Morning" />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-foreground/80 mb-2">Any Message or Special Requirements?</label>
          <textarea name="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Tell us more about what you want to achieve..."></textarea>
        </div>
      </div>

      {state?.message && !state?.success && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
          {state.message}
        </div>
      )}

      <SubmitButton />
    </form>
  );
}
