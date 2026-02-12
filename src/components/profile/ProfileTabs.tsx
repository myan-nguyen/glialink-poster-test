"use client";

import { useState } from "react";
import type { ResearchProfile } from "./types";

type Tab = "background" | "affiliations" | "teaching";

export default function ProfileTabs({ profile }: { profile: ResearchProfile }) {
  const [tab, setTab] = useState<Tab>("background");

  const TabBtn = ({ id, label }: { id: Tab; label: string }) => (
    <button
      onClick={() => setTab(id)}
      className={[
        "rounded-full px-3 py-1 text-sm transition",
        tab === id ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-900/5",
      ].join(" ")}
    >
      {label}
    </button>
  );

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 border-b pb-3">
        <TabBtn id="background" label="Background" />
        <TabBtn id="affiliations" label="Affiliations" />
        <TabBtn id="teaching" label="Teaching" />
      </div>

      <div className="rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur">
        {tab === "background" && (
          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-900">Background</div>
            <p className="text-sm text-gray-600">
              (Mock) Degrees, prior labs, key publications, awards, and notable projects can live here.
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              <li>Research interests: {profile.tags.join(", ")}</li>
              <li>Recent focus: building project pages that replace static posters</li>
              <li>Preferred collaborators: labs working on tooling or scientific communication</li>
            </ul>
          </div>
        )}

        {tab === "affiliations" && (
          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-900">Affiliations</div>
            <p className="text-sm text-gray-600">
              (Mock) Show roles across institutions, labs, departments, and consortia.
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              {profile.affiliations.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        )}

        {tab === "teaching" && (
          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-900">Teaching</div>
            <p className="text-sm text-gray-600">
              (Mock) Courses, mentoring, and workshop materials can live here.
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              <li>Office hours / mentoring: by request</li>
              <li>Topics: scientific communication, building research tooling</li>
              <li>Workshops: “From poster to project page” (prototype)</li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
