export function PageSkeleton() {
  return (
    <div className="space-y-8" aria-hidden="true">
      <div className="skeleton h-48 w-full rounded-3xl" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="skeleton h-40" />
        <div className="skeleton h-40" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="skeleton h-32" />
        <div className="skeleton h-32" />
        <div className="skeleton h-32" />
      </div>
    </div>
  );
}
