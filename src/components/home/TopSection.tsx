"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function TopSection() {
  const { status } = useSession();
  const router = useRouter();

  const ctaHref = useMemo(() => {
    if (status === "authenticated") return "/dashboard";
    return "/auth";
  }, [status]);

  return (
    <section
      id="mission"
      className="relative flex min-h-screen snap-start items-center justify-center px-4 pt-20"
    >
      {/* Graphics suggestion: abstract “research network” (nodes + edges) + soft blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.18]"
          viewBox="0 0 1200 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1200" y2="700">
              <stop stopColor="#A855F7" stopOpacity="0.7" />
              <stop offset="1" stopColor="#EC4899" stopOpacity="0.55" />
            </linearGradient>
            <filter id="blurGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 0.65 0"
                result="glow"
              />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g stroke="url(#g1)" strokeWidth="1.4" opacity="0.9">
            <path d="M180 140 C 300 80, 420 120, 520 200" />
            <path d="M520 200 C 620 280, 720 260, 820 210" />
            <path d="M820 210 C 930 160, 1040 220, 1080 320" />
            <path d="M300 420 C 420 360, 560 380, 660 470" />
            <path d="M660 470 C 770 560, 920 530, 1040 450" />
            <path d="M520 200 C 470 310, 410 360, 300 420" />
            <path d="M820 210 C 760 320, 710 390, 660 470" />
            <path d="M520 200 C 620 180, 720 160, 820 210" />
          </g>

          <g filter="url(#blurGlow)">
            {[
              [180, 140],
              [520, 200],
              [820, 210],
              [1080, 320],
              [300, 420],
              [660, 470],
              [1040, 450],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="10" fill="url(#g1)" opacity="0.85" />
            ))}
          </g>
        </svg>

        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-300/25 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-300/20 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-xs text-gray-700 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          Turn posters and papers into living project pages
        </div>

        <h1 className="mt-6 text-balance text-5xl font-semibold tracking-tight text-gray-900 md:text-6xl">
          Research, made{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            discoverable
          </span>
          , shareable, and easy to act on.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-gray-600">
          Glialink transforms static PDFs into structured, editable project hubs — with
          visibility controls, contact pathways, and a clean summary view.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={ctaHref}
            className="rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            Get started
          </Link>

          <button
            onClick={() => router.push("#who")}
            className="rounded-md border bg-white/70 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-white"
          >
            Learn more
          </button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500">
          <span className="rounded-full border bg-white/70 px-3 py-1">Link-only sharing</span>
          <span className="rounded-full border bg-white/70 px-3 py-1">Project blocks</span>
          <span className="rounded-full border bg-white/70 px-3 py-1">Conference QR</span>
          <span className="rounded-full border bg-white/70 px-3 py-1">Contact requests</span>
        </div>
      </div>
    </section>
  );
}
