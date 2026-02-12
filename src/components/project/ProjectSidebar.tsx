import TagPills from "./TagPills";
import LabCard from "./LabCard";
import AISynthesis from "./AISynthesis";
import type { ProjectDTO } from "./types";

export default function ProjectSidebar({ project }: { project: ProjectDTO }) {
  const { sidebar, job, parsed } = project;

  return (
    <div className="space-y-4">
      <TagPills seeking={sidebar.seeking} offering={sidebar.offering} />

      <div className="rounded-3xl border bg-white/70 p-5 shadow-sm backdrop-blur">
        <div className="text-2xl font-semibold tracking-tight text-gray-900">
          {sidebar.title ?? "Importing title…"}
        </div>

        <div className="mt-3 text-sm text-gray-600">
          {(sidebar.authors ?? []).length > 0
            ? sidebar.authors!.join(", ")
            : "Extracting authors…"}
        </div>

        <div className="mt-4">
          <LabCard labName={sidebar.labName} labAffiliation={sidebar.labAffiliation} />
        </div>

        {project.status === "IMPORTING" && job ? (
          <div className="mt-4 rounded-2xl border bg-white p-4">
            <div className="text-sm font-semibold text-gray-900">{job.message}</div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full border bg-white">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: `${job.progressPct}%` }}
              />
            </div>
          </div>
        ) : null}
      </div>

      <AISynthesis bullets={sidebar.aiSynthesis} />

      {/* Structured sections you requested */}
      <div className="rounded-2xl border bg-white/70 p-4 shadow-sm backdrop-blur space-y-3">
        <div className="text-sm font-semibold text-gray-900">Research question</div>
        <div className="text-sm text-gray-700">{parsed.researchQuestion ?? "—"}</div>

        <div className="pt-2 border-t">
          <div className="text-sm font-semibold text-gray-900">Methodology</div>
          <div className="text-sm text-gray-700">{parsed.methodology ?? "—"}</div>
        </div>

        <div className="pt-2 border-t">
          <div className="text-sm font-semibold text-gray-900">Results</div>
          <div className="text-sm text-gray-700">{parsed.results ?? "—"}</div>
        </div>

        <div className="pt-2 border-t">
          <div className="text-sm font-semibold text-gray-900">Conclusions</div>
          <div className="text-sm text-gray-700">{parsed.conclusions ?? "—"}</div>
        </div>
      </div>
    </div>
  );
}
