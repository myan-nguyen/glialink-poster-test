"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import type { Visibility } from "@/types";

export default function SettingsPage() {
  const [visibility, setVisibility] = useState<Visibility>("public");
  const [contactEnabled, setContactEnabled] = useState(true);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="rounded-2xl border p-6 space-y-4">
        <div>
          <div className="font-semibold">Default visibility</div>
          <select
            className="mt-2 w-full rounded-md border px-3 py-2 text-sm"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as Visibility)}
          >
            <option value="draft">Draft (private)</option>
            <option value="private">Private</option>
            <option value="link">Link-only</option>
            <option value="public">Public</option>
          </select>
        </div>

        <div className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <div className="font-semibold">Enable contact forms</div>
            <div className="text-sm text-gray-600">Allow people to contact you from projects/profile.</div>
          </div>
          <input
            type="checkbox"
            checked={contactEnabled}
            onChange={(e) => setContactEnabled(e.target.checked)}
          />
        </div>

        <Button variant="ghost" disabled>
          Save (prototype)
        </Button>
      </div>
    </div>
  );
}
