function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-gray-700">
      {children}
    </span>
  );
}

export default function TagPills({
  seeking = [],
  offering = [],
}: {
  seeking?: string[];
  offering?: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {seeking.map((s) => (
        <Pill key={`seek-${s}`}>
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          Seeking: {s}
        </Pill>
      ))}
      {offering.map((o) => (
        <Pill key={`off-${o}`}>
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Offering: {o}
        </Pill>
      ))}
    </div>
  );
}
