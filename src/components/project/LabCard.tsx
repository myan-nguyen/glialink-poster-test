export default function LabCard({
  labName,
  labAffiliation,
}: {
  labName?: string;
  labAffiliation?: string;
}) {
  if (!labName && !labAffiliation) return null;

  return (
    <div className="rounded-2xl border bg-white/70 p-4 shadow-sm backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl border bg-white flex items-center justify-center text-gray-500">
          ⌂
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-gray-900">{labName ?? "Lab"}</div>
          <div className="text-xs text-gray-600">{labAffiliation ?? ""}</div>
        </div>
        <div className="ml-auto text-gray-400">›</div>
      </div>
    </div>
  );
}
