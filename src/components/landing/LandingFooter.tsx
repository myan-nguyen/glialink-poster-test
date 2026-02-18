import { COPY } from "@/components/landing/COPY";

export default function LandingFooter() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-10 text-center text-sm text-[#6B7280]">
        <div className="font-medium text-[#1A1A2E]">{COPY.footerOrg}</div>
        <div className="mt-1">{COPY.footerContact}</div>

        <div className="mt-4 flex items-center justify-center gap-4">
          <a className="hover:text-[#1A1A2E]" href="#" aria-label="LinkedIn">
            LinkedIn
          </a>
          <span aria-hidden>·</span>
          <a className="hover:text-[#1A1A2E]" href="#" aria-label="Twitter">
            Twitter
          </a>
        </div>

        <div className="mt-4">{COPY.footerCopyright}</div>
      </div>
    </footer>
  );
}
