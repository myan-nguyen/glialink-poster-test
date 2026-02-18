"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import RecommendedRow from "@/components/dashboard/RecommendedRow";
import ProjectsGrid from "@/components/dashboard/ProjectsGrid";
import { mockProjects } from "@/lib/mock-data";

type TopTab = "recent" | "shared-files" | "shared-projects";

export default function DashboardPage() {
  const [tab, setTab] = useState<TopTab>("recent");

  const projects = useMemo(() => mockProjects, []);
  const recent = projects; // for now: use all mock as “recently viewed”

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A2E]">Recents</h1>
          <p className="mt-2 text-base text-[#6B7280]">
            Find projects quickly, keep drafts organized, and discover inspiration.
          </p>
        </div>

        <Link
          href="/create-project"
          className="inline-flex items-center justify-center rounded-md bg-[#6D28D9] px-5 py-3 text-sm font-medium text-white hover:bg-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/40"
        >
          Create project
        </Link>
      </div>

      {/* Recommended / inspiration row */}
      <RecommendedRow />

      {/* Tabs + filters bar (Figma-style) */}
      <div className="flex flex-col gap-3 border-b border-black/10 pb-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab("recent")}
            className={[
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              tab === "recent" ? "bg-[#6D28D9] text-white" : "text-[#6B7280] hover:bg-[#F3E8FF]",
            ].join(" ")}
          >
            Recently viewed
          </button>
          <button
            onClick={() => setTab("shared-files")}
            className={[
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              tab === "shared-files" ? "bg-[#6D28D9] text-white" : "text-[#6B7280] hover:bg-[#F3E8FF]",
            ].join(" ")}
          >
            Shared files
          </button>
          <button
            onClick={() => setTab("shared-projects")}
            className={[
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              tab === "shared-projects" ? "bg-[#6D28D9] text-white" : "text-[#6B7280] hover:bg-[#F3E8FF]",
            ].join(" ")}
          >
            Shared projects
          </button>
        </div>

        {/* Right-side filters (mock UI) */}
        <div className="flex flex-wrap items-center gap-2">
          <select className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-[#1A1A2E] shadow-sm focus:ring-2 focus:ring-[#6D28D9]/40">
            <option>All organizations</option>
            <option>My lab</option>
            <option>My institution</option>
          </select>
          <select className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-[#1A1A2E] shadow-sm focus:ring-2 focus:ring-[#6D28D9]/40">
            <option>All files</option>
            <option>Drafts</option>
            <option>Published</option>
          </select>
          <select className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-[#1A1A2E] shadow-sm focus:ring-2 focus:ring-[#6D28D9]/40">
            <option>Last viewed</option>
            <option>Last updated</option>
            <option>Title</option>
          </select>
          <button className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-[#1A1A2E] shadow-sm hover:bg-[#F3E8FF] transition-colors">
            View
          </button>
        </div>
      </div>

      {/* Projects grid (infinite scroll later) */}
      <ProjectsGrid title={tab === "recent" ? "Recently viewed" : "Coming soon"} projects={recent} />
    </div>
  );
}
