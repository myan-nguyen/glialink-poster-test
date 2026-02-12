"use client";

import { signIn } from "next-auth/react";
import Button from "@/components/ui/Button";

export default function AuthPage() {
  return (
    <div className="mx-auto mt-12 max-w-md">
      <div className="rounded-2xl border p-6 shadow-sm">
        <h1 className="text-xl font-semibold">Sign in</h1>
        <p className="mt-1 text-sm text-gray-600">
          Researcher accounts only for now.
        </p>

        <div className="mt-6 space-y-3">
          <Button className="w-full" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
            Continue with Google
          </Button>

          <Button className="w-full" variant="ghost" disabled>
            Continue with Email (coming soon)
          </Button>

          <p className="pt-2 text-xs text-gray-500">
            We’ll add email sign-in after SMTP is configured.
          </p>
        </div>
      </div>
    </div>
  );
}
