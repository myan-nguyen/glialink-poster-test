"use client";

import HomeBackground from "@/components/home/HomeBackground";
import HomeNavbar from "@/components/home/HomeNavbar";
import TopSection from "@/components/home/TopSection";
import AboutUsSection from "@/components/home/AboutUsSection";
import UsersSection from "@/components/home/UsersSection";
import FooterSection from "@/components/home/FooterSection";

export default function HomePage() {
  return (
    <div className="relative">
      <HomeBackground />

      {/* Home-only navbar */}
      <HomeNavbar />

      {/* Scroll snapping container */}
      <div className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
        <TopSection />
        <AboutUsSection />
        <UsersSection />
        <FooterSection />
      </div>
    </div>
  );
}
