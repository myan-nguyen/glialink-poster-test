import type { ResearchProfile } from "./types";

export const myProfile: ResearchProfile = {
  username: "myan",
  isOwner: true,
  name: "Myan Nguyen",
  title: "Founder/CTO • Research Tools Builder",
  institution: "Brown University",
  department: "Applied Math–Economics (student) • Research engineering",
  bio:
    "Building Glialink — interactive research project profiles that make collaboration easier than PDFs.",
  overview:
    "I’m exploring how to make academic work more discoverable and actionable. Glialink turns posters and publications into structured project pages with clear collaboration asks, visibility controls, and follow-up pathways. I’m especially interested in building developer-friendly tools for research workflows: parsing, summarization, tagging, and shareable “living” profiles for projects and people.",
  email: "myan@example.com",
  website: "https://glialink.example",
  location: "Providence, RI",
  affiliations: ["Brown University", "Glialink (prototype)"],
  tags: [
    "Research tooling",
    "Scientific communication",
    "LLM products",
    "Data pipelines",
    "Web apps",
  ],
  projects: [
    {
      id: "p1",
      title: "Poster-to-Project: Living Research Pages",
      summary:
        "Turn a static poster or PDF into an editable, shareable project hub with blocks + summaries.",
      status: "published",
      visibility: "public",
      lastUpdatedISO: "2026-02-12",
    },
    {
      id: "p2",
      title: "Published Example Project",
      summary: "A mock published project to test the UI and profile linking.",
      status: "published",
      visibility: "public",
      lastUpdatedISO: "2026-02-12",
    },
  ],
};

export const otherProfile: ResearchProfile = {
  username: "salter",
  isOwner: false,
  name: "Salter Arms",
  title: "Co-founder/CEO • Science Communication",
  institution: "Independent / Network Collaborations",
  department: "Science communication + research partnerships",
  bio:
    "Helping researchers present their work clearly and connect with collaborators through better project storytelling.",
  overview:
    "I work at the intersection of research communication and collaboration design — how researchers present work, recruit interest, and build partnerships. I’m excited about formats that compress complexity without losing rigor, and tools that make conference interactions lead to real follow-up.",
  email: "salter@example.com",
  website: "https://example.com",
  location: "Los Angeles, CA",
  affiliations: ["Glialink (prototype)", "Independent"],
  tags: ["Science communication", "Collaboration", "Research strategy"],
  projects: [
    {
      id: "p3",
      title: "Conference Follow-up Toolkit",
      summary:
        "Designing workflows for QR-based follow-up and structured contact requests after poster sessions.",
      status: "published",
      visibility: "public",
      lastUpdatedISO: "2026-02-10",
    },
  ],
};

export const communityPeople: ResearchProfile[] = [otherProfile];
