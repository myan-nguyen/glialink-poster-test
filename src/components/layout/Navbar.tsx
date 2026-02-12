"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold">
          Glialink
        </Link>

        <nav className="flex items-center gap-3">
          {status === "authenticated" ? (
            <>
              <Link href="/dashboard" className="text-sm hover:underline">
                Dashboard
              </Link>
              <Link href="/profile" className="text-sm hover:underline">
                Profile
              </Link>
              <Button variant="ghost" onClick={() => signOut({ callbackUrl: "/" })}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth">
                <Button>Sign in</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
