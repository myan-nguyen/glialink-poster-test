"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SourceLinksEditor from "@/components/create-project/SourceLinksEditor";

export default function CreateProjectPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [pubLink, setPubLink] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  const [intent, setIntent] = useState("");
  const [pdf, setPdf] = useState<File | null>(null);

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string>("");

  async function onCreate() {
    setErr("");
    setBusy(true);

    try {
      // 1) create project
      const createRes = await fetch("/api/projects", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          researcherName: name,
          researcherInstitution: institution,
          publicationUrl: pubLink,
          sourceUrls: links,
          intent,
        }),
      });

      if (!createRes.ok) throw new Error("Failed to create project");
      const { projectId } = await createRes.json();

      // 2) upload pdf (optional)
      if (pdf) {
        const fd = new FormData();
        fd.append("file", pdf);

        const upRes = await fetch(`/api/projects/${projectId}/upload`, {
          method: "POST",
          body: fd,
        });
        if (!upRes.ok) throw new Error("Failed to upload PDF");
      }

      // 3) start import job
      const importRes = await fetch(`/api/projects/${projectId}/import`, { method: "POST" });
      if (!importRes.ok) throw new Error("Failed to start import");

      router.push(`/project/${projectId}`);
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  const canSubmit = name.trim() && institution.trim() && pubLink.trim();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Create project</h1>
        <p className="mt-1 text-sm text-gray-600">
          Provide your links/PDF — we’ll synthesize a structured project page.
        </p>
      </div>

      <div className="rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <div className="text-sm font-semibold text-gray-900">Your name</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
              placeholder="First Last"
            />
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900">Institution</div>
            <input
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
              placeholder="Brown University"
            />
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-gray-900">Publication link</div>
          <div className="text-sm text-gray-600">Required. We will use this as the primary source.</div>
          <input
            value={pubLink}
            onChange={(e) => setPubLink(e.target.value)}
            className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
            placeholder="https://…"
          />
        </div>

        <SourceLinksEditor value={links} onChange={setLinks} />

        <div>
          <div className="text-sm font-semibold text-gray-900">Optional PDF upload</div>
          <input
            type="file"
            accept="application/pdf"
            disabled={busy}
            onChange={(e) => setPdf(e.target.files?.[0] ?? null)}
            className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm"
          />
          <div className="mt-1 text-xs text-gray-500">
            If you upload a PDF, we’ll also extract content from it.
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-gray-900">Intentions</div>
          <div className="text-sm text-gray-600">
            What do you want this project page to accomplish? (1–3 sentences)
          </div>
          <textarea
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            className="mt-2 min-h-[110px] w-full rounded-md border bg-white px-3 py-2 text-sm"
            placeholder="Recruit collaborators, clarify narrative, share at conferences…"
          />
        </div>

        {err ? <div className="text-sm text-red-600">{err}</div> : null}

        <div className="flex justify-end">
          <button
            onClick={onCreate}
            disabled={!canSubmit || busy}
            className={[
              "rounded-md px-5 py-2 text-sm font-medium text-white",
              !canSubmit || busy ? "bg-gray-900/40" : "bg-gray-900 hover:bg-gray-800",
            ].join(" ")}
          >
            {busy ? "Creating…" : "Create & import"}
          </button>
        </div>
      </div>
    </div>
  );
}
