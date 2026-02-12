export default function AISynthesis({ bullets = [] }: { bullets?: string[] }) {
  return (
    <div className="rounded-2xl border bg-white/70 p-4 shadow-sm backdrop-blur">
      <div className="text-xs font-semibold tracking-wide text-gray-500">
        GLIALINK AI SYNTHESIS
      </div>
      <div className="mt-3 space-y-3">
        {bullets.length === 0 ? (
          <div className="text-sm text-gray-600">
            Generating synthesis…
          </div>
        ) : (
          bullets.map((b, i) => (
            <div key={i} className="flex gap-3 text-sm text-gray-700">
              <div className="mt-1 h-4 w-[2px] rounded bg-gray-900/10" />
              <div className="leading-relaxed">{b}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
