"use client";

import { useParams } from "next/navigation";
import { mockProjects } from "@/lib/mock-data";
import Button from "@/components/ui/Button";
import AIChat from "@/components/project/AIChat";

export default function ProjectPage() {
  const params = useParams<{ id: string }>();
  const project = mockProjects.find((p) => p.id === params.id);

  if (!project) return <div>Project not found.</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{project.title}</h1>
          <p className="mt-1 text-sm text-gray-600">{project.summary}</p>
          <p className="mt-2 text-xs text-gray-500">
            Last updated: {new Date(project.lastUpdatedISO).toLocaleString()}
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="ghost">Save draft</Button>
          <Button>Publish</Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          {project.blocks
            .filter((b) => b.visible)
            .map((b) => (
              <div key={b.id} className="rounded-xl border p-4">
                <div className="font-semibold">{b.title}</div>
                <div className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{b.content}</div>
              </div>
            ))}
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border p-4">
            <div className="font-semibold">Generated summary (placeholder)</div>
            <p className="mt-2 text-sm text-gray-600">
              This panel will contain the “finalize” summary, metadata, tags, and scientific context.
            </p>
          </div>

          <AIChat />
        </div>
      </div>
    </div>
  );
}
