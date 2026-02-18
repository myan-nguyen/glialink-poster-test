import { COPY } from "@/components/landing/COPY";
import SectionShell from "@/components/landing/sections/SectionShell";

export default function ProblemSection() {
  return (
    <SectionShell id="problem" tone="alt">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {COPY.problemHeading}
        </h2>

        <div className="mt-5 space-y-4 text-base leading-relaxed text-[#1A1A2E]/85">
          <p>{COPY.problemP1}</p>
          <p>{COPY.problemP2}</p>
          <p>{COPY.problemP3}</p>
        </div>
      </div>
    </SectionShell>
  );
}
