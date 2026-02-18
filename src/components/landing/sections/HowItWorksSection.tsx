import { COPY } from "@/components/landing/COPY";
import SectionShell from "@/components/landing/sections/SectionShell";

const steps = [
  { n: 1, text: COPY.step1 },
  { n: 2, text: COPY.step2 },
  { n: 3, text: COPY.step3 },
];

export default function HowItWorksSection() {
  return (
    <SectionShell tone="alt">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {COPY.howHeading}
        </h2>

        <div className="mt-7 space-y-5">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-4">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-sm font-semibold text-[#6D28D9]">
                {s.n}
              </div>
              <p className="text-base leading-relaxed text-[#1A1A2E]/85">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
