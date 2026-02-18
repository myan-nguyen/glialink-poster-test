import { COPY } from "@/components/landing/COPY";
import SectionShell from "@/components/landing/sections/SectionShell";

const items = [
  { title: "PIs and lab leads", body: COPY.whoPi },
  { title: "Postdocs and grad students", body: COPY.whoPostdoc },
  { title: "Conference presenters", body: COPY.whoConference },
];

export default function WhoItsForSection() {
  return (
    <SectionShell>
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {COPY.whoHeading}
        </h2>

        <div className="mt-6 space-y-4">
          {items.map((i) => (
            <div key={i.title} className="rounded-xl border border-black/10 bg-white p-5">
              <div className="text-sm font-semibold">{i.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{i.body}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
