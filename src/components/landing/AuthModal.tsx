"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AuthModal({
  isOpen,
  onClose,
  mode = "login",
}: {
  isOpen: boolean;
  onClose: () => void;
  mode?: "login" | "signup";
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isAnimating) {
      document.body.style.overflow = "auto";
    }
  }, [isAnimating]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      {/* Backdrop blur */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal - NOT blurred */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`w-full max-w-md transform rounded-2xl border border-black/10 bg-white p-8 shadow-xl transition-transform duration-300 ${
            isAnimating ? "scale-100" : "scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Heading */}
          <h2 className="mt-6 text-2xl font-semibold text-[#1A1A2E]">
            {mode === "login" ? "Welcome back" : "Join Glialink"}
          </h2>

          <p className="mt-2 text-base text-[#6B7280]">
            {mode === "login"
              ? "Sign in to access your research projects"
              : "Create an account to get started"}
          </p>

          {/* Auth button */}
          <div className="mt-8 space-y-4">
            <button
              onClick={() =>
                signIn("google", { callbackUrl: "/dashboard" })
              }
              className="inline-flex w-full items-center justify-center gap-3 rounded-md border border-black/10 bg-white px-5 py-3 text-sm font-medium text-[#1A1A2E] transition-colors hover:bg-black/[0.02] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/40"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-sm text-[#6B7280]">
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={handleClose}
                    className="font-medium text-[#6D28D9] hover:text-[#7C3AED]"
                  >
                    Create one
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={handleClose}
                    className="font-medium text-[#6D28D9] hover:text-[#7C3AED]"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Info text */}
          <p className="mt-6 text-center text-xs text-[#9CA3AF]">
            Researcher accounts only for now. We'll add email sign-in soon.
          </p>
        </div>
      </div>
    </>
  );
}
