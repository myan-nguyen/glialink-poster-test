export default function DocumentPreviewSkeleton() {
  return (
    <div className="rounded-3xl border bg-white/70 shadow-sm backdrop-blur overflow-hidden">
      <div className="p-8 space-y-6">
        <div className="h-3 w-2/3 rounded bg-gray-900/15" />
        <div className="h-2 w-1/3 rounded bg-gray-900/10" />

        <div className="space-y-3">
          <div className="h-2 w-full rounded bg-gray-900/10" />
          <div className="h-2 w-11/12 rounded bg-gray-900/10" />
          <div className="h-2 w-10/12 rounded bg-gray-900/10" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6">
            <div className="h-2 w-1/2 rounded bg-gray-900/10" />
            <div className="mt-4 h-28 rounded-xl bg-gray-900/5" />
            <div className="mt-3 h-2 w-2/3 rounded bg-gray-900/10" />
          </div>
          <div className="rounded-2xl border bg-white p-6">
            <div className="h-2 w-1/2 rounded bg-gray-900/10" />
            <div className="mt-4 h-28 rounded-xl bg-gray-900/5" />
            <div className="mt-3 h-2 w-2/3 rounded bg-gray-900/10" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-2 w-full rounded bg-gray-900/10" />
          <div className="h-2 w-11/12 rounded bg-gray-900/10" />
          <div className="h-2 w-10/12 rounded bg-gray-900/10" />
        </div>
      </div>
    </div>
  );
}
