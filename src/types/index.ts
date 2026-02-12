export type Visibility = "draft" | "private" | "link" | "public";
export type ProjectStatus = "draft" | "published";

export interface ProjectBlock {
  id: string;
  type: "text" | "image" | "metadata";
  title: string;
  content: string;
  visible: boolean;
}

export interface ProjectAnalytics {
  views: number;
  contacts: number;
  qrScans: number;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  visibility: Visibility;
  tags: string[];
  lastUpdatedISO: string;
  blocks: ProjectBlock[];
  analytics: ProjectAnalytics;
}

export interface ResearcherProfile {
  name: string;
  institution: string;
  contactEmail: string;
  bio?: string;
  interests: string[];
}
