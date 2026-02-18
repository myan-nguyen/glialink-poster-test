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
        "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-[#F3E8FF] text-[#6D28D9]" : "text-[#6B7280] hover:bg-[#F3E8FF] hover:text-[#6D28D9]",
      ].join(" ")}
    >
      <span>{label}</span>
    </Link>
  );
}

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-full w-[280px] shrink-0 border-r border-black/10 bg-white/70 backdrop-blur">
      <div className="flex h-full flex-col p-4">
        {/* Logo */}
        <div className="mb-4 text-lg font-bold tracking-tight text-[#1A1A2E]">Glialink</div>

        {/* Profile quick access */}
        <Link
          href="/profile"
          className="mb-4 flex items-center gap-3 rounded-xl border border-black/10 bg-white/60 p-3 shadow-sm transition hover:bg-[#F3E8FF]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#6D28D9] to-[#7C3AED] text-sm font-semibold text-white">
            MN
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[#1A1A2E]">Myan Nguyen</span>
            <span className="text-xs text-[#6B7280]">Brown University</span>
          </div>
        </Link>

        {/* Search */}
        <div className="rounded-lg border border-black/10 bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#6D28D9]/40">
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#9CA3AF] text-[#1A1A2E]"
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
          <div className="px-3 pb-2 text-xs font-semibold text-[#6B7280]">Workspace</div>
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
            className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-left text-sm text-[#1A1A2E] shadow-sm transition hover:bg-[#F3E8FF]"
          >
            Log out
          </button>
        </div>

        {/* Tip Card */}
        <div className="mt-4 rounded-xl border border-black/10 bg-white/70 p-3 text-xs text-[#6B7280] shadow-sm">
          <div className="font-semibold text-[#1A1A2E]">Tip</div>
          <div className="mt-1">
            Your dashboard will later support shared projects, community browsing, and institution spaces.
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#7C3AED]" />
            <span className="font-medium">Prototype mode</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
