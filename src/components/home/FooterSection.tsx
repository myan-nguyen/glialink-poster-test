"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSession } from "next-auth/react";

export default function FooterSection() {
  const { status } = useSession();

  const ctaHref = useMemo(() => {
    if (status === "authenticated") return "/dashboard";
    return "/auth";
  }, [status]);

  return (
    <section id="company" className="flex min-h-screen snap-start items-center px-4 pt-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="rounded-3xl border bg-white/70 p-8 shadow-sm backdrop-blur md:p-12">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="space-y-3">
              <div className="text-lg font-semibold">Glialink</div>
              <p className="text-sm text-gray-600">
                Interactive research project profiles — built to make collaboration and follow-up effortless.
              </p>
              <div className="text-xs text-gray-500">© {new Date().getFullYear()} Glialink</div>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="font-medium text-gray-900">Product</div>
              <a className="block hover:text-gray-900" href="#mission">
                Mission
              </a>
              <a className="block hover:text-gray-900" href="#who">
                Who we are
              </a>
              <a className="block hover:text-gray-900" href="#users">
                Users
              </a>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="font-medium text-gray-900">Company</div>
              <span className="block text-gray-600">Contact: hello@glialink.example</span>
              <span className="block text-gray-600">Privacy (placeholder)</span>
              <span className="block text-gray-600">Terms (placeholder)</span>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t pt-6 md:flex-row md:items-center">
            <div className="text-xs text-gray-500">
              Calm academic modern • purple/pink accents • full-screen sections
            </div>
            <Link
              href={ctaHref}
              className="rounded-md bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
