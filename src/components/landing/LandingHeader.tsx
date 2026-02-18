"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthModalContext } from "@/components/landing/AuthModalProvider";

export default function LandingHeader() {
  const { openModal } = useContext(AuthModalContext);
  const [isBlurred, setIsBlurred] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    // Listen for modal state changes by checking the backdrop
    const checkModalState = () => {
      const backdrop = document.querySelector('[class*="z-40"]');
      const isOpen = backdrop && backdrop.classList.contains("opacity-100");
      setIsBlurred(!!isOpen);
      // Hide background when modal is open
      if (isOpen) {
        setShowBackground(false);
      }
    };

    // Check scroll position and ProblemSection visibility
    const checkScroll = () => {
      const problemSection = document.querySelector("#problem");
      const backdrop = document.querySelector('[class*="z-40"]');
      const isModalOpen = backdrop && backdrop.classList.contains("opacity-100");
      
      if (problemSection && !isModalOpen) {
        const rect = problemSection.getBoundingClientRect();
        // Show background when problem section is approaching/visible
        setShowBackground(rect.top <= 100);
      }
    };

    checkModalState();
    checkScroll();
    
    const interval = setInterval(checkModalState, 100);
    window.addEventListener("scroll", checkScroll);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 border-b border-black/10 transition-all duration-300 ${
        showBackground ? "bg-white/90 backdrop-blur" : ""
      } ${isBlurred ? "blur-sm" : ""}`}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Glialink
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openModal("signup")}
            className="rounded-md border border-black/10 px-4 py-2 text-sm font-medium text-[#1A1A2E] hover:bg-black/[0.02] focus:outline-none focus:ring-2 focus:ring-black/10"
          >
            Sign up
          </button>
          <button
            onClick={() => openModal("login")}
            className="rounded-md bg-[#6D28D9] px-4 py-2 text-sm font-medium text-white hover:bg-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/40"
          >
            Log in
          </button>
        </div>
      </div>
    </header>
  );
}
