"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import type { ProjectBlock } from "@/types";

const trialBlocks: ProjectBlock[] = [
  { id: "t1", type: "text", title: "Problem", content: "Auto-generated draft. Edit me.", visible: true },
  { id: "t2", type: "text", title: "Approach", content: "Auto-generated draft. Edit me.", visible: true },
  { id: "t3", type: "text", title: "What we need", content: "Auto-generated draft. Edit me.", visible: true },
];

export default function CreateProjectPage() {
  const [mode, setMode] = useState<"start" | "parsing" | "edit">("start");
  const [blocks, setBlocks] = useState<ProjectBlock[]>([]);

  const canContinue = true;

  const startParsing = () => {
    setMode("parsing");
    setTimeout(() => {
      setBlocks(trialBlocks);
      setMode("edit");
    }, 900);
  };

  const removeBlock = (id: string) => setBlocks((prev) => prev.filter((b) => b.id !== id));

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Create Project</h1>

      {mode === "start" && (
        <div className="rounded-2xl border p-6 space-y-4">
          <div className="text-sm text-gray-600">
            Upload a PDF or paste a link. We’ll generate editable blocks. (Prototype: no real parsing yet.)
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border p-4">
              <div className="font-semibold">Upload PDF</div>
              <input className="mt-2 w-full text-sm" type="file" accept="application/pdf" disabled />
              <div className="mt-2 text-xs text-gray-500">(Disabled in prototype)</div>
            </div>

            <div className="rounded-xl border p-4">
              <div className="font-semibold">Paste link</div>
              <input className="mt-2 w-full rounded-md border px-3 py-2 text-sm" placeholder="https://..." />
              <div className="mt-2 text-xs text-gray-500">We’ll scrape later.</div>
            </div>
          </div>

          <Button disabled={!canContinue} onClick={startParsing}>
            Parse & generate blocks
          </Button>
        </div>
      )}

      {mode === "parsing" && (
        <div className="rounded-2xl border p-6">
          <div className="font-semibold">Parsing…</div>
          <div className="mt-2 text-sm text-gray-600">Generating a first draft of your project page.</div>
        </div>
      )}

      {mode === "edit" && (
        <div className="rounded-2xl border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Editable blocks</div>
              <div className="text-sm text-gray-600">Delete blocks you don’t want. Editing is minimal for now.</div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost">Save draft</Button>
              <Button>Publish</Button>
            </div>
          </div>

          <div className="space-y-3">
            {blocks.map((b) => (
              <div key={b.id} className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{b.title}</div>
                  <Button variant="ghost" onClick={() => removeBlock(b.id)}>
                    Delete
                  </Button>
                </div>
                <textarea
                  className="mt-2 w-full rounded-md border px-3 py-2 text-sm"
                  rows={3}
                  defaultValue={b.content}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
