"use client";

import { useState } from "react";
import type { Visibility } from "@/types";

export default function SettingsPage() {
  const [defaultVisibility, setDefaultVisibility] = useState<Visibility>("public");
  const [contactEnabled, setContactEnabled] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage visibility defaults and contact preferences. (Prototype)
        </p>
      </div>

      <div className="rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur space-y-6">
        <div className="space-y-2">
          <div className="text-sm font-semibold text-gray-900">Default visibility</div>
          <select
            className="w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-700 shadow-sm"
            value={defaultVisibility}
            onChange={(e) => setDefaultVisibility(e.target.value as Visibility)}
          >
            <option value="draft">Draft (private)</option>
            <option value="private">Private</option>
            <option value="link">Link-only</option>
            <option value="public">Public</option>
          </select>
          <div className="text-xs text-gray-500">
            New projects will start with this visibility.
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border bg-white p-4">
          <div>
            <div className="text-sm font-semibold text-gray-900">Enable contact</div>
            <div className="text-xs text-gray-600">
              Allow people to contact you from projects and your profile.
            </div>
          </div>
          <input
            type="checkbox"
            checked={contactEnabled}
            onChange={(e) => setContactEnabled(e.target.checked)}
            className="h-4 w-4"
          />
        </div>

        <button
          disabled
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white opacity-60"
        >
          Save (disabled in prototype)
        </button>
      </div>
    </div>
  );
}
