import { cx } from "@/components/landing/ui";

export default function SectionShell({
  id,
  tone = "default",
  children,
}: {
  id?: string;
  tone?: "default" | "alt";
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cx(
        "py-16 sm:py-20",
        tone === "alt" && "bg-[#F3E8FF] -mx-4 px-4"
      )}
    >
      {children}
    </section>
  );
}
