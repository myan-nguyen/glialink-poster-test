"use client";

import { useEffect, useState } from "react";
import { getProjectById } from "@/lib/storage/projectsStore";
import type { ProjectDraft } from "@/lib/types/project";

export default function ProjectClientPage({ id }: { id: string }) {
  const [project, setProject] = useState<ProjectDraft | null>(null);

  useEffect(() => {
    setProject(getProjectById(id));
  }, [id]);

  if (!project) {
    return (
      <div className="rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur">
        <div className="text-sm font-semibold text-gray-900">Project not found</div>
        <div className="mt-2 text-sm text-gray-600">
          This project doesn’t exist in local storage yet.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-2xl font-semibold tracking-tight text-gray-900">
              {project.title}
            </div>
            <div className="mt-1 text-sm text-gray-600">{project.summary}</div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-full border bg-white/70 px-3 py-1 text-gray-700">
              {project.status}
            </span>
            <span className="rounded-full border bg-white/70 px-3 py-1 text-gray-700">
              {project.visibility}
            </span>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-700">
          <span className="font-medium text-gray-900">Intent:</span> {project.userIntent}
        </div>

        <div className="mt-3 text-xs text-gray-500">{project.rightPanel.metadata}</div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {project.blocks.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border bg-white/70 p-5 shadow-sm backdrop-blur"
            >
              <div className="text-sm font-semibold text-gray-900">{b.title}</div>
              <div className="mt-2 whitespace-pre-wrap text-sm text-gray-700">
                {b.content}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border bg-white/70 p-5 shadow-sm backdrop-blur">
            <div className="text-sm font-semibold text-gray-900">Scientific summary</div>
            <div className="mt-2 text-sm text-gray-700">{project.rightPanel.scientificSummary}</div>
          </div>

          <div className="rounded-2xl border bg-white/70 p-5 shadow-sm backdrop-blur">
            <div className="text-sm font-semibold text-gray-900">General summary</div>
            <div className="mt-2 text-sm text-gray-700">{project.rightPanel.generalSummary}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
