"use client";

import { useEffect, useState } from "react";
import ProjectLayout from "./ProjectLayout";
import DocumentPreviewSkeleton from "./DocumentPreviewSkeleton";
import ProjectSidebar from "./ProjectSidebar";
import type { ProjectDTO } from "./types";

async function fetchProject(id: string): Promise<ProjectDTO> {
  const res = await fetch(`/api/projects/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load project");
  return res.json();
}

export default function ProjectPageClient({ id }: { id: string }) {
  const [project, setProject] = useState<ProjectDTO | null>(null);

  useEffect(() => {
    let alive = true;

    const load = async () => {
      const p = await fetchProject(id);
      if (!alive) return;
      setProject(p);

      // poll while importing
      if (p.status === "IMPORTING") {
        const t = setInterval(async () => {
          const updated = await fetchProject(id);
          if (!alive) return;
          setProject(updated);
          if (updated.status !== "IMPORTING") clearInterval(t);
        }, 800);

        return () => clearInterval(t);
      }
    };

    load();
    return () => {
      alive = false;
    };
  }, [id]);

  if (!project) {
    // initial loading skeleton
    const loadingProject: ProjectDTO = {
      id,
      status: "IMPORTING",
      updatedAtISO: new Date().toISOString(),
      sidebar: {
        seeking: ["Viral Immunologists"],
        offering: ["scRNA-seq Data"],
        title: "Importing…",
        authors: [],
        labName: "Lab",
        labAffiliation: "Institution",
        aiSynthesis: [],
      },
      parsed: {},
      job: { status: "running", progressPct: 15, message: "Loading…" },
    };

    return (
      <ProjectLayout
        left={<DocumentPreviewSkeleton />}
        right={<ProjectSidebar project={loadingProject} />}
      />
    );
  }

  return (
    <ProjectLayout
      left={<DocumentPreviewSkeleton />}
      right={<ProjectSidebar project={project} />}
    />
  );
}
