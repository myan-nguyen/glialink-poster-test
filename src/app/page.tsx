import Link from "next/link";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Interactive research project profiles.
        </h1>
        <p className="max-w-2xl text-lg text-gray-600">
          Glialink turns posters and publications into editable, shareable project hubs that make follow-ups and collaboration easier.
        </p>
        <div className="flex gap-3">
          <Link href="/auth">
            <Button>Sign up / Log in</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost">Go to dashboard</Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border p-5">
          <h2 className="font-semibold">Mission</h2>
          <p className="mt-2 text-sm text-gray-600">
            Make research more discoverable, more connected, and easier to act on.
          </p>
        </div>
        <div className="rounded-xl border p-5">
          <h2 className="font-semibold">Who are we?</h2>
          <p className="mt-2 text-sm text-gray-600">
            A team building better ways to share and collaborate on research projects.
          </p>
        </div>
        <div className="rounded-xl border p-5">
          <h2 className="font-semibold">For researchers</h2>
          <p className="mt-2 text-sm text-gray-600">
            Share a living project page instead of a static PDF. Control visibility and contact.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Example use cases</h2>
        <ul className="list-disc pl-6 text-sm text-gray-600">
          <li>Conference QR → project page → real follow-ups</li>
          <li>Recruiting collaborators by “what we need”</li>
          <li>Keeping progress updates in one place</li>
        </ul>
        <p className="text-xs text-gray-500">
          (Replace with real projects with consent when ready.)
        </p>
      </section>
    </div>
  );
}
