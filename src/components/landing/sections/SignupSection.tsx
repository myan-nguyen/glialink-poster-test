"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SectionShell from "@/components/landing/sections/SectionShell";
import { COPY } from "@/components/landing/COPY";
import { readUTM, track } from "@/components/landing/ga";
import { cx } from "@/components/landing/ui";

type FormState = {
  name: string;
  email: string;
  institution: string;
  role: string;
  referral: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export default function SignupSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState<string>("");
  const [started, setStarted] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    institution: "",
    role: "",
    referral: "",
  });

  const utm = useMemo(() => readUTM(), []);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Fire scroll_to_signup when the signup section enters viewport (spec)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const isIn = entries.some((e) => e.isIntersecting);
        if (isIn) track("scroll_to_signup");
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setStatus("submitting");

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          ...utm,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Submission failed");
      }

      track("form_submit");
      setStatus("success");
    } catch (e: any) {
      setStatus("error");
      setErr(e?.message || "Something went wrong.");
    }
  }

  function onFirstFocus() {
    if (started) return;
    setStarted(true);
    track("form_start");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      track("copy_link");
    } catch {
      // ignore
    }
  }

  const inputBase =
    "mt-1 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#6D28D9]/25";

  return (
    <SectionShell id="signup" tone="alt">
      <section ref={sectionRef as any}>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {COPY.signupHeading}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#6B7280]">
            {COPY.signupBody}
          </p>

          <div className="mt-8 rounded-xl border border-black/10 bg-white p-6">
            {status === "success" ? (
              <div>
                <div className="text-base font-semibold text-[#1A1A2E]">
                  {COPY.signupConfirmation}
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={copyLink}
                    className="rounded-md border border-black/10 bg-white px-4 py-2 text-sm font-medium hover:bg-black/[0.02] focus:outline-none focus:ring-2 focus:ring-black/10"
                  >
                    {COPY.copyLinkButton}
                  </button>
                  <a
                    href="#problem"
                    className="rounded-md bg-[#6D28D9] px-4 py-2 text-sm font-medium text-white hover:bg-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/40"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium" htmlFor="name">
                      {COPY.formName}
                    </label>
                    <input
                      id="name"
                      required
                      className={inputBase}
                      value={form.name}
                      onFocus={onFirstFocus}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium" htmlFor="email">
                      {COPY.formEmail}
                    </label>
                    <input
                      id="email"
                      required
                      type="email"
                      className={inputBase}
                      value={form.email}
                      onFocus={onFirstFocus}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium" htmlFor="institution">
                      {COPY.formInstitution}
                    </label>
                    <input
                      id="institution"
                      className={inputBase}
                      value={form.institution}
                      onFocus={onFirstFocus}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, institution: e.target.value }))
                      }
                      autoComplete="organization"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium" htmlFor="role">
                      {COPY.formRole}
                    </label>
                    <select
                      id="role"
                      className={inputBase}
                      value={form.role}
                      onFocus={onFirstFocus}
                      onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                    >
                      <option value="">Select…</option>
                      {COPY.formRoleOptions.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium" htmlFor="referral">
                    {COPY.formReferral}
                  </label>
                  <input
                    id="referral"
                    className={inputBase}
                    value={form.referral}
                    onFocus={onFirstFocus}
                    onChange={(e) => setForm((p) => ({ ...p, referral: e.target.value }))}
                  />
                </div>

                {/* Inline errors with aria-live (spec) */}
                <div aria-live="polite" className="min-h-[20px] text-sm">
                  {status === "error" ? (
                    <span className="text-red-700">{err}</span>
                  ) : (
                    <span className="text-[#6B7280]">
                      We’ll only use this to reach out about early access.
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={cx(
                    "rounded-md bg-[#6D28D9] px-5 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/40",
                    status === "submitting" ? "opacity-70" : "hover:bg-[#7C3AED]"
                  )}
                >
                  {status === "submitting" ? "Submitting…" : COPY.signupCta}
                </button>

                {/* Hidden UTM fields are included server-side too, but keep them visible to code reviewers */}
                <input type="hidden" name="utm_source" value={utm.utm_source} />
                <input type="hidden" name="utm_medium" value={utm.utm_medium} />
                <input type="hidden" name="utm_campaign" value={utm.utm_campaign} />
              </form>
            )}
          </div>
        </div>
      </section>
    </SectionShell>
  );
}
