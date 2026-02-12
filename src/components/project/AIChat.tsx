"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function AIChat() {
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <div className="font-semibold">Glialink AI (prototype)</div>
        <Button variant="ghost" onClick={() => setOpen((v) => !v)}>
          {open ? "Hide" : "Show"}
        </Button>
      </div>

      {open && (
        <div className="mt-3 space-y-2">
          <div className="rounded-lg bg-gray-50 p-2 text-sm text-gray-700">
            Ask questions about this project here. (No backend yet.)
          </div>
          <input
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="e.g., What’s the key hypothesis?"
          />
          <Button className="w-full" variant="ghost" disabled>
            Send
          </Button>
        </div>
      )}
    </div>
  );
}
