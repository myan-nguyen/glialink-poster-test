import { mockProjects } from "@/lib/mock-data"
import type { Project } from "@/types"

/**
 * This file simulates API calls.
 * Later we replace implementations with real fetch() calls.
 */

export async function getProjects(): Promise<Project[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProjects), 300)
  })
}

export async function getProjectById(id: string): Promise<Project | null> {
  return new Promise((resolve) => {
    const project = mockProjects.find((p) => p.id === id) || null
    setTimeout(() => resolve(project), 300)
  })
}

export async function createProject(project: Project): Promise<Project> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(project), 300)
  })
}

export async function updateProject(project: Project): Promise<Project> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(project), 300)
  })
}
