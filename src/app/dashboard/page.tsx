import Link from "next/link";
import { mockProjects } from "@/lib/mock-data";
import Button from "@/components/ui/Button";

export default function DashboardPage() {
  const drafts = mockProjects.filter((p) => p.status === "draft");
  const published = mockProjects.filter((p) => p.status === "published");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Link href="/create-project">
          <Button>Create new project</Button>
        </Link>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Drafts</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {drafts.map((p) => (
            <Link key={p.id} href={`/project/${p.id}`} className="rounded-xl border p-4 hover:bg-gray-50">
              <div className="font-semibold">{p.title}</div>
              <div className="mt-1 text-sm text-gray-600">{p.summary}</div>
              <div className="mt-2 text-xs text-gray-500">Last updated: {new Date(p.lastUpdatedISO).toLocaleString()}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Published</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {published.map((p) => (
            <Link key={p.id} href={`/project/${p.id}`} className="rounded-xl border p-4 hover:bg-gray-50">
              <div className="font-semibold">{p.title}</div>
              <div className="mt-1 text-sm text-gray-600">{p.summary}</div>
              <div className="mt-2 text-xs text-gray-500">Views: {p.analytics.views} • Contacts: {p.analytics.contacts}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
