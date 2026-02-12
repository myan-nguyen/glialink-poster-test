export default function ProjectLayout({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_420px]">
        <div className="min-w-0">{left}</div>
        <div className="lg:sticky lg:top-6 h-fit">{right}</div>
      </div>
    </div>
  );
}
