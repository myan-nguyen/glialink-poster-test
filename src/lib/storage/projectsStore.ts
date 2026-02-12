import type { ProjectDraft } from "@/lib/types/project";

const KEY = "glialink_projects_v1";

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function loadProjects(): ProjectDraft[] {
  if (typeof window === "undefined") return [];
  return safeParse<ProjectDraft[]>(localStorage.getItem(KEY)) ?? [];
}

export function saveProjects(projects: ProjectDraft[]) {
  localStorage.setItem(KEY, JSON.stringify(projects));
}

export function upsertProject(p: ProjectDraft) {
  const all = loadProjects();
  const idx = all.findIndex((x) => x.id === p.id);
  if (idx >= 0) all[idx] = p;
  else all.unshift(p);
  saveProjects(all);
  return p;
}

export function getProjectById(id: string): ProjectDraft | null {
  return loadProjects().find((p) => p.id === id) ?? null;
}
