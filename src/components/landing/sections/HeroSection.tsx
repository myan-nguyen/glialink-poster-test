"use client";

import { COPY } from "@/components/landing/COPY";
import SectionShell from "@/components/landing/sections/SectionShell";
import { useContext } from "react";
import { AuthModalContext } from "@/components/landing/AuthModalProvider";

export default function HeroSection() {
  const { openModal } = useContext(AuthModalContext);

  return (
    <SectionShell>
      <div className="pt-10 sm:pt-14">
        <div className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium tracking-wide text-[#6D28D9]">
          {COPY.heroLabel}
        </div>

        <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {COPY.heroHeadline}
        </h1>

        <p className="mt-4 max-w-3xl text-pretty text-lg leading-relaxed text-[#6B7280]">
          {COPY.heroSubheadline}
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            onClick={() => openModal("login")}
            className="inline-flex items-center justify-center rounded-md bg-[#6D28D9] px-5 py-3 text-sm font-medium text-white hover:bg-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/40"
          >
            {COPY.heroCta}
          </button>

          <a
            href="#problem"
            className="inline-flex items-center justify-center rounded-md border border-black/10 bg-white px-5 py-3 text-sm font-medium hover:bg-black/[0.02] focus:outline-none focus:ring-2 focus:ring-black/10"
          >
            {COPY.heroCtaSecondary}
          </a>

          <span className="text-sm text-[#6B7280]">{COPY.heroCtaSubtext}</span>
        </div>
      </div>
    </SectionShell>
  );
}
