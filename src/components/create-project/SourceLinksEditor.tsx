"use client";

import { useState } from "react";

export default function SourceLinksEditor({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const url = draft.trim();
    if (!url) return;
    onChange([...value, url]);
    setDraft("");
  };

  const remove = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-gray-900">Additional links</div>
      <div className="text-sm text-gray-600">
        Lab page, ORCID, personal site, dataset, code repo — anything you want the system to use.
      </div>

      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="w-full rounded-md border bg-white px-3 py-2 text-sm"
          placeholder="https://…"
        />
        <button
          type="button"
          onClick={add}
          className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {value.map((u, i) => (
          <div key={u + i} className="flex items-center justify-between rounded-md border bg-white px-3 py-2">
            <div className="truncate text-sm text-gray-700">{u}</div>
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-sm text-gray-500 hover:text-gray-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
