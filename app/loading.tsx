export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 h-8 w-64 animate-pulse rounded-lg bg-slate-200" />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-slate-200" />
            <div className="flex-1 space-y-3">
              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
              <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}