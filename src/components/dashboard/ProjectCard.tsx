import Link from "next/link";
import type { Project } from "@/types";

export default function ProjectCard({ project }: { project: Project }) {
  const isDraft = project.status === "draft";

  return (
    <Link
      href={`/project/${project.id}`}
      className="group rounded-2xl border bg-white/70 p-4 shadow-sm backdrop-blur transition hover:bg-white"
    >
      {/* thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border bg-gradient-to-br from-purple-100/70 via-white to-pink-100/70">
        <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.9)_0,transparent_40%),radial-gradient(circle_at_80%_30%,rgba(236,72,153,0.8)_0,transparent_45%)]" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          {isDraft && (
            <span className="rounded-full border bg-white/80 px-2 py-0.5 text-[11px] font-medium text-gray-800">
              Draft
            </span>
          )}
          <span className="rounded-full border bg-white/80 px-2 py-0.5 text-[11px] text-gray-700">
            {project.visibility}
          </span>
        </div>
      </div>

      <div className="mt-3">
        <div className="line-clamp-1 text-sm font-semibold text-gray-900">{project.title}</div>
        <div className="mt-1 line-clamp-2 text-xs text-gray-600">{project.summary}</div>
        <div className="mt-2 text-[11px] text-gray-500">
          Updated {new Date(project.lastUpdatedISO).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
}
