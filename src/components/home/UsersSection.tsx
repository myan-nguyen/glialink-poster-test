"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSession } from "next-auth/react";

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function UsersSection() {
  const { status } = useSession();

  const ctaHref = useMemo(() => {
    if (status === "authenticated") return "/dashboard";
    return "/auth";
  }, [status]);

  const cards = [
    {
      title: "Researchers",
      desc: "Share a living project page from a poster or paper, with clear collaboration asks.",
      badge: "Now",
    },
    {
      title: "Labs",
      desc: "Standardize project pages across the lab and make recruiting + handoffs easier.",
      badge: "Next",
    },
    {
      title: "Institutions",
      desc: "Showcase research impact with structured pages instead of scattered PDFs.",
      badge: "Later",
    },
  ];

  return (
    <section id="users" className="flex min-h-screen snap-start items-center px-4 pt-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full border bg-white/70 px-4 py-2 text-xs text-gray-700 backdrop-blur">
            Who uses Glialink
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            Designed for real research workflows.
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Start with researchers. Expand to labs, conferences, and institutions as the product proves value.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur transition hover:bg-white"
            >
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-gray-900">{c.title}</div>
                <span
                  className={cx(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    c.badge === "Now" && "bg-gradient-to-r from-purple-600/15 to-pink-600/15 text-gray-900",
                    c.badge !== "Now" && "bg-gray-900/5 text-gray-800"
                  )}
                >
                  {c.badge}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{c.desc}</p>

              <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                Calm, structured, and shareable
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href={ctaHref}
            className="rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            Get started
          </Link>
        </div>
      </div>
    </section>
  );
}
