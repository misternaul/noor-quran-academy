"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { submitInquiry } from "@/lib/actions/inquiry";
import { Button } from "@/components/ui/button";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full bg-primary h-14" disabled={pending}>
      {pending ? "Submitting..." : "Book Free Trial"}
    </Button>
  );
}

type State = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
} | null;

function FreeTrialFormInner({ courses }: { courses: { title: string, slug?: string }[] }) {
  const searchParams = useSearchParams();
  const selectedSlug = searchParams.get('course');
  const defaultCourse = courses.find(c => c.slug === selectedSlug)?.title || "";

  const [state, formAction] = useActionState<State, FormData>(submitInquiry, null);

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
          <select name="course" defaultValue={defaultCourse} className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">Please select...</option>
            {courses.map((c) => (
              <option key={c.title} value={c.title}>{c.title}</option>
            ))}
          </select>
          {state?.errors?.course && <p className="text-red-500 text-sm mt-1">{state.errors.course[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Quran Knowledge Level</label>
          <select name="quranLevel" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
            <option value="">Please select...</option>
            <option value="Beginner">Beginner - Just starting</option>
            <option value="Intermediate">Intermediate - Know basic rules</option>
            <option value="Advanced">Advanced - Looking for certification/ijazah</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Preferred Days</label>
          <input type="text" name="preferredDays" placeholder="e.g. Weekends, Mon-Wed-Fri" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Preferred Time (with Timezone)</label>
          <input type="text" name="preferredTime" placeholder="e.g. 5:00 PM EST" className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Any specific goals or questions? (Optional)</label>
        <textarea name="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"></textarea>
      </div>

      {state?.message && !state.success && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 text-sm">
          {state.message}
        </div>
      )}

      <SubmitButton />
      <p className="text-center text-sm text-gray-500 mt-4">No credit card required. We will contact you via WhatsApp to schedule.</p>
    </form>
  );
}

export function FreeTrialForm({ courses }: { courses: { title: string, slug?: string }[] }) {
  return (
    <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading form...</div>}>
      <FreeTrialFormInner courses={courses} />
    </Suspense>
  );
}
