"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function HomeNavbar() {
  const { status } = useSession();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-white/75 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-2xl font-bold tracking-tight">
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

        <div className="flex items-center gap-3">
          <Link
            href="/auth?mode=signup"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            Sign up
          </Link>
          <Link
            href="/auth"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Log in
          </Link>
        </div>
      </div>
    </header>
  );
}
