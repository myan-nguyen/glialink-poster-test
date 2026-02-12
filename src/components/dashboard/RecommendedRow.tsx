export default function RecommendedRow() {
  const cards = [
    { title: "University course syllabus", subtitle: "Template • Education", tone: "dark" as const },
    { title: "Tree map diagram process", subtitle: "FigJam • Workflow", tone: "green" as const },
    { title: "Learning auto layout", subtitle: "Workshop • UI/UX", tone: "light" as const },
    { title: "Our Blooms", subtitle: "Community • Poster", tone: "pink" as const },
  ];

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900">Recommended resources from Community</div>
        <button className="text-sm text-gray-600 hover:text-gray-900">See more</button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {cards.map((c) => (
          <div
            key={c.title}
            className="min-w-[260px] max-w-[260px] rounded-2xl border bg-white/70 p-4 shadow-sm backdrop-blur"
          >
            <div
              className={[
                "aspect-[16/9] w-full rounded-xl border shadow-sm",
                c.tone === "dark" && "bg-gray-900",
                c.tone === "green" && "bg-emerald-300/60",
                c.tone === "light" && "bg-amber-100",
                c.tone === "pink" && "bg-fuchsia-200/60",
              ].join(" ")}
            />
            <div className="mt-3">
              <div className="text-sm font-semibold text-gray-900">{c.title}</div>
              <div className="mt-1 text-xs text-gray-600">{c.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
