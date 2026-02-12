"use client";

import { useState } from "react";
import type { ResearchProfile } from "./types";
import ContactModal from "./ContactModal";
import Link from "next/link";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border bg-white/70 px-3 py-1 text-xs text-gray-700">
      {children}
    </span>
  );
}

export default function ProfileHeader({ profile }: { profile: ResearchProfile }) {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <section className="rounded-3xl border bg-white/70 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* Left identity */}
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-sm flex items-center justify-center font-semibold">
              {profile.name
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("")}
            </div>

            <div className="min-w-0">
              <div className="text-2xl font-semibold tracking-tight text-gray-900">
                {profile.name}
              </div>
              <div className="mt-1 text-sm text-gray-700">{profile.title}</div>
              <div className="mt-1 text-sm text-gray-600">
                {profile.institution}
                {profile.department ? (
                  <span className="text-gray-500"> • {profile.department}</span>
                ) : null}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {profile.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex flex-col gap-2 md:items-end">
            <div className="flex flex-wrap gap-2 md:justify-end">
              {!profile.isOwner && (
                <button
                  onClick={() => setContactOpen(true)}
                  className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Contact
                </button>
              )}

              {profile.isOwner && (
                <>
                  <Link
                    href="/dashboard?tab=drafts"
                    className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                  >
                    View drafts
                  </Link>
                  <button
                    onClick={() => setContactOpen(true)}
                    className="rounded-md border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Test contact modal
                  </button>
                </>
              )}
            </div>

            <div className="text-sm text-gray-600">
              <div>
                <span className="font-medium text-gray-900">Email:</span>{" "}
                <span className="font-mono">{profile.email}</span>
              </div>
              {profile.website && (
                <div>
                  <span className="font-medium text-gray-900">Website:</span>{" "}
                  <span className="font-mono">{profile.website}</span>
                </div>
              )}
              {profile.location && (
                <div>
                  <span className="font-medium text-gray-900">Location:</span>{" "}
                  {profile.location}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Affiliations */}
        <div className="mt-6 border-t pt-5">
          <div className="text-sm font-semibold text-gray-900">Affiliations</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {profile.affiliations.map((a) => (
              <Pill key={a}>{a}</Pill>
            ))}
          </div>
        </div>
      </section>

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        recipientName={profile.name}
        recipientEmail={profile.email}
      />
    </>
  );
}
