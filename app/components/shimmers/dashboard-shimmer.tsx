import { cn } from "~/lib/utils";

export default function DashboardShimmer({ className }: { className?: string }) {
  return (
    <div className={cn("w-full min-h-screen bg-muted animate-pulse", className)}>
      
      {/* 🔹 Top Navbar Skeleton */}
      <header className="lg:sticky lg:top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="flex h-18 items-center justify-between px-5">

          {/* Logo placeholder (desktop) */}
          <div className="hidden lg:block">
            <div className="h-8 w-28 bg-gray-200 rounded-md" />
          </div>

          {/* Mobile profile preview */}
          <div className="lg:hidden flex items-center gap-3">
            <div className="h-[40px] w-[40px] bg-gray-200 rounded-full" />
            <div className="space-y-2">
              <div className="h-3 w-20 bg-gray-200 rounded-md" />
              <div className="h-4 w-24 bg-gray-200 rounded-md" />
            </div>
          </div>

          {/* Right nav */}
          <nav className="flex items-center gap-3">
            <div className="h-[50px] w-[50px] bg-gray-200 rounded-full" />
            <div className="hidden lg:flex items-center gap-2">
              <div className="h-[30px] w-[30px] bg-gray-200 rounded-full" />
              <div className="h-4 w-20 bg-gray-200 rounded-md" />
            </div>
          </nav>
        </div>
      </header>

      {/* 🔹 Page Content */}
      <div className="w-full px-5 pt-6 pb-[88px] lg:pb-10 space-y-10">

        {/* Header Section */}
        <div className="hidden lg:flex justify-between items-center">
          <div className="space-y-3">
            <div className="h-8 w-64 bg-gray-200 rounded-md" />
            <div className="h-4 w-80 bg-gray-200 rounded-md" />
          </div>
          <div className="h-12 w-44 bg-gray-200 rounded-[24px]" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="flex gap-4 overflow-hidden">
          {[1,2,3,4].map((_, i) => (
            <div
              key={i}
              className="min-w-[260px] bg-card border border-border rounded-xl p-6 space-y-6"
            >
              <div className="flex justify-between">
                <div className="h-10 w-10 bg-gray-200 rounded-xl" />
                <div className="h-4 w-16 bg-gray-200 rounded-md" />
              </div>

              <div className="space-y-3">
                <div className="h-4 w-32 bg-gray-200 rounded-md" />
                <div className="h-6 w-40 bg-gray-200 rounded-md" />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Payments Skeleton */}
        <div className="bg-card border border-border rounded-2xl">
          <div className="p-6 border-b border-border">
            <div className="h-6 w-40 bg-gray-200 rounded-md" />
          </div>

          {[1,2].map((_, i) => (
            <div key={i} className="p-6 flex justify-between border-b border-border last:border-none">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded-md" />
                <div className="h-3 w-24 bg-gray-200 rounded-md" />
              </div>

              <div className="space-y-2 text-right">
                <div className="h-4 w-20 bg-gray-200 rounded-md ml-auto" />
                <div className="h-3 w-24 bg-gray-200 rounded-md ml-auto" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom Nav Skeleton (mobile only) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex items-center justify-around h-16">
        {[1,2,3,4].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="h-5 w-5 bg-gray-200 rounded-md" />
            <div className="h-3 w-10 bg-gray-200 rounded-md" />
          </div>
        ))}
      </nav>

    </div>
  );
}