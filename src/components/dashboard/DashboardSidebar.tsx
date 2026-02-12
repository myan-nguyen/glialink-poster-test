"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

function NavItem({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={[
        "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition",
        active ? "bg-gray-900/5 text-gray-900" : "text-gray-700 hover:bg-gray-900/5",
      ].join(" ")}
    >
      <span>{label}</span>
    </Link>
  );
}

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full w-[280px] shrink-0 border-r bg-white/70 backdrop-blur">
      <div className="flex h-full flex-col p-4">
        {/* Logo */}
        <div className="mb-4 text-sm font-semibold tracking-tight">Glialink</div>

        {/* Profile quick access */}
        <Link
          href="/profile"
          className="mb-4 flex items-center gap-3 rounded-xl border bg-white/60 p-3 shadow-sm transition hover:bg-white"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-semibold text-white">
            MN
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Myan Nguyen</span>
            <span className="text-xs text-gray-500">Brown University</span>
          </div>
        </Link>

        {/* Search */}
        <div className="rounded-lg border bg-white px-3 py-2 shadow-sm">
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            placeholder="Search projects..."
          />
        </div>

        {/* Main navigation */}
        <div className="mt-4 space-y-1">
          <NavItem href="/dashboard" label="Recents" active={pathname === "/dashboard"} />
          <NavItem href="/dashboard/community" label="Community" />
        </div>

        {/* Workspace */}
        <div className="mt-6">
          <div className="px-3 pb-2 text-xs font-medium text-gray-500">Workspace</div>
          <div className="space-y-1">
            <NavItem href="/dashboard?tab=drafts" label="Drafts" />
            <NavItem href="/dashboard?tab=all" label="All projects" />
            <NavItem href="/dashboard?tab=trash" label="Trash" />
          </div>
        </div>

        {/* Push bottom section down */}
        <div className="flex-1" />

        {/* Bottom actions */}
        <div className="space-y-2">
          <NavItem href="/settings" label="Settings" active={pathname === "/settings"} />

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full rounded-lg border bg-white px-3 py-2 text-left text-sm text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            Log out
          </button>
        </div>

        {/* Tip Card */}
        <div className="mt-4 rounded-xl border bg-white/70 p-3 text-xs text-gray-600 shadow-sm">
          <div className="font-medium text-gray-900">Tip</div>
          <div className="mt-1">
            Your dashboard will later support shared projects, community browsing, and institution spaces.
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            Prototype mode
          </div>
        </div>
      </div>
    </aside>
  );
}
