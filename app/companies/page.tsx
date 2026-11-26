import { getJobs } from "@/lib/api";

export const metadata = { title: "Companies – JobHub" };

const logoColors = [
  "bg-indigo-50 text-indigo-700",
  "bg-emerald-50 text-emerald-700",
  "bg-amber-50 text-amber-700",
  "bg-rose-50 text-rose-700",
  "bg-sky-50 text-sky-700",
  "bg-violet-50 text-violet-700",
];

const colorFor = (name: string) =>
  logoColors[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % logoColors.length];

export default async function CompaniesPage() {
  let jobs: Awaited<ReturnType<typeof getJobs>> = [];
  try {
    jobs = await getJobs();
  } catch {
    jobs = [];
  }

  const map = new Map<string, { name: string; count: number; locations: string[] }>();
  for (const j of jobs) {
    const c = map.get(j.company) ?? { name: j.company, count: 0, locations: [] };
    c.count += 1;
    if (!c.locations.includes(j.location)) c.locations.push(j.location);
    map.set(j.company, c);
  }
  const companies = Array.from(map.values()).sort((a, b) => b.count - a.count);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Companies hiring now</h1>
      <p className="mt-2 text-slate-500">
        {companies.length} companies with open positions on JobHub.
      </p>

      {companies.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
          No companies yet. Check back soon.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((c) => (
            <div
              key={c.name}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-900/5"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold ${colorFor(c.name)}`}
              >
                {c.name.slice(0, 2).toUpperCase()}
              </div>
              <h2 className="mt-4 font-semibold text-slate-900">{c.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{c.locations.join(", ")}</p>
              <p className="mt-4 text-sm font-medium text-indigo-600">
                {c.count} open {c.count === 1 ? "job" : "jobs"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}