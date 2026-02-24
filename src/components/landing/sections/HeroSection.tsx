"use client";

import { COPY } from "@/components/landing/COPY";
import { useContext } from "react";
import { AuthModalContext } from "@/components/landing/AuthModalProvider";

export default function HeroSection() {
  const { openModal } = useContext(AuthModalContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Neuron blob decorations */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Center blob */}
        <div className="absolute w-64 h-64 bg-gradient-to-r from-[#6D28D9]/10 to-[#7C3AED]/10 rounded-full blur-3xl"></div>
        
        {/* Top blob */}
        <div className="absolute w-48 h-48 bg-gradient-to-b from-[#6D28D9]/5 to-transparent rounded-full blur-2xl top-20"></div>
        
        {/* Bottom blob */}
        <div className="absolute w-48 h-48 bg-gradient-to-t from-[#7C3AED]/5 to-transparent rounded-full blur-2xl bottom-20"></div>
        
        {/* Left blob */}
        <div className="absolute w-40 h-40 bg-gradient-to-r from-[#6D28D9]/5 to-transparent rounded-full blur-2xl left-0"></div>
        
        {/* Right blob */}
        <div className="absolute w-40 h-40 bg-gradient-to-l from-[#7C3AED]/5 to-transparent rounded-full blur-2xl right-0"></div>
      </div>

      <div className="flex flex-col items-center justify-center text-center relative z-10">
        <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {COPY.heroHeadline}
        </h1>

        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-[#6B7280]">
          {COPY.heroSubheadline}
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
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
    </div>
  );
}
