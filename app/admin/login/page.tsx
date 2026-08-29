"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAdmin } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-primary" disabled={pending}>
      {pending ? "Signing in..." : "Sign In"}
    </Button>
  );
}

type State = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
} | null;

export default function LoginPage() {
  const [state, formAction] = useActionState<State, FormData>(loginAdmin, null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-primary">
          <Shield className="h-12 w-12" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 font-serif">
          Noor Quran Academy
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Admin Portal Login
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" action={formAction}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  placeholder="Enter administrator password"
                />
              </div>
              {state?.errors?.password && (
                <p className="mt-2 text-sm text-red-600">{state.errors.password[0]}</p>
              )}
            </div>

            {state?.message && !state?.success && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-700">{state.message}</p>
              </div>
            )}

            <div>
              <SubmitButton />
            </div>
          </form>
          
          <div className="mt-6 text-center text-xs text-gray-500">
            Default initial password is: <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">dafulat</span>
          </div>
        </div>
      </div>
    </div>
  );
}
