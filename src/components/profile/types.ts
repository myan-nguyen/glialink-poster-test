export type ProfileTag = string;

export type PublicProject = {
  id: string;
  title: string;
  summary: string;
  status: "published" | "draft";
  visibility: "public" | "link" | "private" | "draft";
  lastUpdatedISO: string;
};

export type ResearchProfile = {
  username: string; // used in /people/[username]
  isOwner: boolean;

  name: string;
  title: string; // e.g. "Undergraduate Researcher"
  institution: string;
  department?: string;

  bio: string; // short
  overview: string; // longer overview section

  email: string;
  website?: string;
  location?: string;

  avatarUrl?: string; // placeholder for now
  affiliations: string[];
  tags: ProfileTag[];

  projects: PublicProject[];
};
