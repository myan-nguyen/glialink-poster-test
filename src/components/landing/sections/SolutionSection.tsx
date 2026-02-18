import { COPY } from "@/components/landing/COPY";
import SectionShell from "@/components/landing/sections/SectionShell";

const cards = [
  { icon: COPY.card1Icon, title: COPY.card1Title, body: COPY.card1Body },
  { icon: COPY.card2Icon, title: COPY.card2Title, body: COPY.card2Body },
  { icon: COPY.card3Icon, title: COPY.card3Title, body: COPY.card3Body },
];

export default function SolutionSection() {
  return (
    <SectionShell>
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {COPY.solutionHeading}
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-black/10 bg-white p-6"
            >
              <div className="text-2xl" aria-hidden>
                {c.icon}
              </div>
              <div className="mt-3 text-base font-semibold">{c.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
