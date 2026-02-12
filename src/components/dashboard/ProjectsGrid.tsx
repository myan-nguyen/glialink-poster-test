import type { Project } from "@/types";
import ProjectCard from "@/components/dashboard/ProjectCard";

export default function ProjectsGrid({ title, projects }: { title: string; projects: Project[] }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900">{title}</div>
        <div className="text-xs text-gray-500">
          {projects.length} items • infinite scroll later
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {/* Placeholder for infinite loading */}
      <div className="pt-6 text-center text-sm text-gray-500">
        Scroll continues… (wire up infinite load later)
      </div>
    </section>
  );
}
