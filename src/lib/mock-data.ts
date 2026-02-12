import type { Project, ResearcherProfile } from "@/types";

export const mockProfile: ResearcherProfile = {
  name: "Demo Researcher",
  institution: "Demo University",
  contactEmail: "demo@university.edu",
  bio: "This is a placeholder bio. Add your background, methods, and interests.",
  interests: ["Neuroscience", "ML", "Imaging"],
};

export const mockProjects: Project[] = [
  {
    id: "p1",
    title: "Poster-to-Project: Living Research Profile",
    summary: "Turn a static poster or PDF into an editable, shareable project hub.",
    status: "draft",
    visibility: "draft",
    tags: ["posters", "collaboration"],
    lastUpdatedISO: new Date().toISOString(),
    blocks: [
      {
        id: "b1",
        type: "text",
        title: "Problem",
        content: "Posters, abstracts, and publications are disconnected and hard to follow up on.",
        visible: true,
      },
      {
        id: "b2",
        type: "text",
        title: "What we need",
        content: "Collaborators with experience in X, Y; feedback on study design; funding leads.",
        visible: true,
      },
      {
        id: "b3",
        type: "metadata",
        title: "Metadata",
        content: "Stage: early | IRB: pending | Repo: none | Dataset: private",
        visible: true,
      },
    ],
    analytics: { views: 12, contacts: 1, qrScans: 3 },
  },
  {
    id: "p2",
    title: "Published Example Project",
    summary: "A mock published project to test the UI.",
    status: "published",
    visibility: "public",
    tags: ["example"],
    lastUpdatedISO: new Date().toISOString(),
    blocks: [
      { id: "b4", type: "text", title: "Summary", content: "Key summary goes here.", visible: true },
    ],
    analytics: { views: 128, contacts: 7, qrScans: 22 },
  },
];
