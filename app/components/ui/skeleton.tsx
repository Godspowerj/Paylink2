import { cn } from "~/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-gray-100", className)}
      {...props}
    />
  );
}

/* ─── Ready-made skeleton blocks ─── */

function StatCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <Skeleton className="h-9 w-9 rounded-xl mb-3" />
      <Skeleton className="h-3 w-16 mb-2" />
      <Skeleton className="h-6 w-24" />
    </div>
  );
}

function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
  return (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-50">
      <Skeleton className="h-8 w-8 rounded-full shrink-0" />
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className="h-4 flex-1" style={{ maxWidth: `${60 + Math.random() * 80}px` }} />
      ))}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-64 hidden sm:block" />
        </div>
        <Skeleton className="h-10 w-28 rounded-full hidden lg:block" />
      </div>

      {/* Stats */}
      <div className="hidden lg:grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-20 rounded-full" />
        ))}
      </div>

      {/* Table / Cards */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hidden lg:block">
        <Skeleton className="h-10 w-full rounded-none" />
        {Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} />)}
      </div>
      <div className="lg:hidden space-y-2">
        {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );
}

export { Skeleton, StatCardSkeleton, TableRowSkeleton, CardSkeleton, PageSkeleton };
