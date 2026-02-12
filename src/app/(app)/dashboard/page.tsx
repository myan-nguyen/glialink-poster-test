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
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Recents</h1>
          <p className="mt-1 text-sm text-gray-600">
            Find projects quickly, keep drafts organized, and discover inspiration.
          </p>
        </div>

        <Link
          href="/create-project"
          className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Create project
        </Link>
      </div>

      {/* Recommended / inspiration row */}
      <RecommendedRow />

      {/* Tabs + filters bar (Figma-style) */}
      <div className="flex flex-col gap-3 border-b pb-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab("recent")}
            className={[
              "rounded-full px-3 py-1 text-sm",
              tab === "recent" ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-900/5",
            ].join(" ")}
          >
            Recently viewed
          </button>
          <button
            onClick={() => setTab("shared-files")}
            className={[
              "rounded-full px-3 py-1 text-sm",
              tab === "shared-files" ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-900/5",
            ].join(" ")}
          >
            Shared files
          </button>
          <button
            onClick={() => setTab("shared-projects")}
            className={[
              "rounded-full px-3 py-1 text-sm",
              tab === "shared-projects" ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-900/5",
            ].join(" ")}
          >
            Shared projects
          </button>
        </div>

        {/* Right-side filters (mock UI) */}
        <div className="flex flex-wrap items-center gap-2">
          <select className="rounded-md border bg-white px-3 py-2 text-sm text-gray-700 shadow-sm">
            <option>All organizations</option>
            <option>My lab</option>
            <option>My institution</option>
          </select>
          <select className="rounded-md border bg-white px-3 py-2 text-sm text-gray-700 shadow-sm">
            <option>All files</option>
            <option>Drafts</option>
            <option>Published</option>
          </select>
          <select className="rounded-md border bg-white px-3 py-2 text-sm text-gray-700 shadow-sm">
            <option>Last viewed</option>
            <option>Last updated</option>
            <option>Title</option>
          </select>
          <button className="rounded-md border bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50">
            View
          </button>
        </div>
      </div>

      {/* Projects grid (infinite scroll later) */}
      <ProjectsGrid title={tab === "recent" ? "Recently viewed" : "Coming soon"} projects={recent} />
    </div>
  );
}
