"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSession } from "next-auth/react";

export default function HomeNavbar() {
  const { status } = useSession();

  const ctaHref = useMemo(() => {
    if (status === "authenticated") return "/dashboard";
    return "/auth";
  }, [status]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight">
          Glialink
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-gray-700 md:flex">
          <a href="#mission" className="hover:text-gray-900">
            Mission
          </a>
          <a href="#who" className="hover:text-gray-900">
            Who we are
          </a>
          <a href="#users" className="hover:text-gray-900">
            Users
          </a>
          <a href="#company" className="hover:text-gray-900">
            Company
          </a>
        </nav>

        <Link
          href={ctaHref}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Get started
        </Link>
      </div>
    </header>
  );
}
