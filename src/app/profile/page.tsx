import { mockProfile, mockProjects } from "@/lib/mock-data";

export default function ProfilePage() {
  const published = mockProjects.filter((p) => p.status === "published");

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border p-6">
        <div className="text-2xl font-semibold">{mockProfile.name}</div>
        <div className="mt-1 text-sm text-gray-600">{mockProfile.institution}</div>
        {mockProfile.bio && <div className="mt-3 text-sm text-gray-700">{mockProfile.bio}</div>}

        <div className="mt-4 flex flex-wrap gap-2">
          {mockProfile.interests.map((t) => (
            <span key={t} className="rounded-full border px-3 py-1 text-xs text-gray-700">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Shareable link: <span className="font-mono">/u/demo</span> (placeholder)
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Published projects</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {published.map((p) => (
            <div key={p.id} className="rounded-xl border p-4">
              <div className="font-semibold">{p.title}</div>
              <div className="mt-1 text-sm text-gray-600">{p.summary}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
