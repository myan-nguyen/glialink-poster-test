import type { Metadata } from "next";
import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/sections/HeroSection";
import ProblemSection from "@/components/landing/sections/ProblemSection";
import SolutionSection from "@/components/landing/sections/SolutionSection";
import HowItWorksSection from "@/components/landing/sections/HowItWorksSection";
import WhoItsForSection from "@/components/landing/sections/WhoItsForSection";
import LandingFooter from "@/components/landing/LandingFooter";
import GA4 from "@/components/landing/GA4";
import AuthModalProvider from "@/components/landing/AuthModalProvider";

export const metadata: Metadata = {
  title: "Glialink — Shareable Project Pages for Researchers",
  description:
    "Turn your posters, papers, and abstracts into structured, shareable project pages. Built for academic researchers, conferences, and collaboration.",
  openGraph: {
    title: "Glialink — Shareable Project Pages for Researchers",
    description:
      "Turn your research into a clean, structured project page you can share at conferences, on LinkedIn, or by email.",
    type: "website",
    url: "https://glialink.com",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function Page() {
  return (
    <AuthModalProvider>
      <div className="min-h-screen bg-white text-[#1A1A2E]">
        {/* GA4: lazy / afterInteractive */}
        <GA4 />

        <LandingHeader />

        <main className="mx-auto px-4">
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <HowItWorksSection />
          <WhoItsForSection />
        </main>

        <LandingFooter />
      </div>
    </AuthModalProvider>
  );
}
