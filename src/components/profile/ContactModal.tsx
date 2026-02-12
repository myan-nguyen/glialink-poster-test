"use client";

import { useEffect, useState } from "react";

export default function ContactModal({
  open,
  onClose,
  recipientName,
  recipientEmail,
}: {
  open: boolean;
  onClose: () => void;
  recipientName: string;
  recipientEmail: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) {
      setSent(false);
      setName("");
      setEmail("");
      setMessage("");
    }
  }, [open]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // MOCK: pretend it sent
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg rounded-2xl border bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-semibold text-gray-900">Contact {recipientName}</div>
            <div className="mt-1 text-sm text-gray-600">
              This form will send to <span className="font-mono">{recipientEmail}</span> (mocked).
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md border px-2 py-1 text-sm text-gray-700 hover:bg-gray-50"
          >
            ✕
          </button>
        </div>

        {!sent ? (
          <form onSubmit={submit} className="mt-5 space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Your name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                placeholder="Jane Doe"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Your email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                placeholder="jane@university.edu"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 min-h-[120px] w-full rounded-md border px-3 py-2 text-sm"
                placeholder="What would you like to collaborate on?"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Send (mock)
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-6 rounded-xl border bg-gray-50 p-4">
            <div className="font-medium text-gray-900">Sent!</div>
            <div className="mt-1 text-sm text-gray-600">
              Your message was “sent” to {recipientEmail}. (Mock — wire to email later.)
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={onClose}
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
