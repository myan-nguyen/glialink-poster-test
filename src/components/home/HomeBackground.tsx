export default function HomeBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* base */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-white" />

      {/* faint grid for academic/technical feel */}
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(17,24,39,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,24,39,0.35)_1px,transparent_1px)] [background-size:56px_56px]" />

      {/* purple/pink ambient blobs */}
      <div className="absolute -left-40 top-[-120px] h-[520px] w-[520px] rounded-full bg-purple-300/35 blur-3xl" />
      <div className="absolute -right-40 top-[40px] h-[520px] w-[520px] rounded-full bg-pink-300/30 blur-3xl" />
      <div className="absolute left-1/2 top-[520px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-fuchsia-200/20 blur-3xl" />
    </div>
  );
}
