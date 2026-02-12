import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 overflow-hidden bg-white">
      {/* background motifs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-white" />
        <div className="absolute -left-48 top-[-120px] h-[520px] w-[520px] rounded-full bg-purple-200/35 blur-3xl" />
        <div className="absolute -right-48 top-[40px] h-[520px] w-[520px] rounded-full bg-pink-200/30 blur-3xl" />
        <div className="absolute left-1/2 top-[520px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-fuchsia-200/20 blur-3xl" />
      </div>

      {/* Full-width app shell */}
      <div className="flex h-full w-full overflow-hidden">
        {/* Sidebar flush left */}
        <DashboardSidebar />

        {/* Main fills remaining width; only vertical scroll */}
        <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
          {/* Full-bleed content area (no centering max-width) */}
          <div className="w-full px-10 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
