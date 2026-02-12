import Link from "next/link";

export default function AboutUsSection() {
  return (
    <section id="who" className="flex min-h-screen snap-start items-center px-4 pt-20">
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-2 md:items-center">
        {/* Left: image placeholders */}
        <div className="relative">
          <div className="absolute -left-6 -top-6 h-40 w-40 rounded-2xl bg-purple-200/40 blur-2xl" />
          <div className="absolute -bottom-8 -right-8 h-44 w-44 rounded-2xl bg-pink-200/35 blur-2xl" />

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/3] rounded-2xl border bg-white/70 shadow-sm backdrop-blur">
                <div className="flex h-full items-center justify-center text-xs text-gray-500">
                  Image placeholder
                </div>
              </div>
              <div className="aspect-[4/3] rounded-2xl border bg-white/70 shadow-sm backdrop-blur">
                <div className="flex h-full items-center justify-center text-xs text-gray-500">
                  Image placeholder
                </div>
              </div>
            </div>
            <div className="aspect-[16/9] rounded-2xl border bg-white/70 shadow-sm backdrop-blur">
              <div className="flex h-full items-center justify-center text-xs text-gray-500">
                Image placeholder
              </div>
            </div>
          </div>
        </div>

        {/* Right: blurb */}
        <div className="space-y-5">
          <div className="inline-flex items-center rounded-full border bg-white/70 px-4 py-2 text-xs text-gray-700 backdrop-blur">
            Who we are
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            Built for researchers who want their work to travel further than a PDF.
          </h2>

          <p className="text-base leading-relaxed text-gray-600">
            Glialink is a calm, structured way to present a research project — without the clutter of a paper
            or the constraints of a poster. Start from your existing artifact, then refine into a living page
            that’s easy to share at conferences and with collaborators.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border bg-white/70 p-4 backdrop-blur">
              <div className="font-medium text-gray-900">Fast to create</div>
              <div className="mt-1 text-sm text-gray-600">
                Generate blocks from a PDF or link — delete what you don’t need.
              </div>
            </div>
            <div className="rounded-xl border bg-white/70 p-4 backdrop-blur">
              <div className="font-medium text-gray-900">Safe to share</div>
              <div className="mt-1 text-sm text-gray-600">
                Draft, private, link-only, or public — you control visibility.
              </div>
            </div>
            <div className="rounded-xl border bg-white/70 p-4 backdrop-blur">
              <div className="font-medium text-gray-900">Easy follow-ups</div>
              <div className="mt-1 text-sm text-gray-600">
                Built-in contact requests so interest turns into action.
              </div>
            </div>
            <div className="rounded-xl border bg-white/70 p-4 backdrop-blur">
              <div className="font-medium text-gray-900">Made for clarity</div>
              <div className="mt-1 text-sm text-gray-600">
                A clean summary panel alongside deeper project sections.
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="#users"
              className="inline-flex items-center justify-center rounded-md border bg-white/70 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-white"
            >
              See who it’s for
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
