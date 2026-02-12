import Link from "next/link";
import { communityPeople } from "@/components/profile/mock";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border bg-white/70 px-2 py-0.5 text-[11px] text-gray-700">
      {children}
    </span>
  );
}

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Community</h1>
        <p className="mt-1 text-sm text-gray-600">
          Explore researchers and projects (mock).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {communityPeople.map((p) => (
          <Link
            key={p.username}
            href={`/people/${p.username}`}
            className="rounded-2xl border bg-white/70 p-5 shadow-sm backdrop-blur transition hover:bg-white"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 font-semibold text-white">
                {p.name
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900">{p.name}</div>
                <div className="text-xs text-gray-600">{p.title}</div>
                <div className="mt-1 text-xs text-gray-500">{p.institution}</div>
              </div>
            </div>

            <div className="mt-3 line-clamp-2 text-sm text-gray-700">{p.bio}</div>

            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.slice(0, 3).map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
              {p.tags.length > 3 ? <Pill>+{p.tags.length - 3}</Pill> : null}
            </div>

            <div className="mt-4 text-xs text-gray-500">
              {p.projects.filter((x) => x.status === "published").length} published projects
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
