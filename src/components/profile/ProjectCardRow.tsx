import Link from "next/link";
import type { PublicProject } from "./types";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border bg-white/70 px-2 py-0.5 text-[11px] text-gray-700">
      {children}
    </span>
  );
}

export default function ProjectCardRow({ projects }: { projects: PublicProject[] }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900">Published projects</div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/project/${p.id}`}
            className="group rounded-2xl border bg-white/70 p-4 shadow-sm backdrop-blur transition hover:bg-white"
          >
            <div className="flex items-center gap-2">
              <Badge>{p.status}</Badge>
              <Badge>{p.visibility}</Badge>
            </div>

            <div className="mt-3 line-clamp-1 text-sm font-semibold text-gray-900">
              {p.title}
            </div>
            <div className="mt-1 line-clamp-2 text-sm text-gray-600">{p.summary}</div>

            <div className="mt-3 text-[11px] text-gray-500">
              Updated {new Date(p.lastUpdatedISO).toLocaleDateString()}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
