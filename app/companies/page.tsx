import Link from "next/link";
import { getJobs } from "@/lib/api";
import type { Job } from "@/lib/jobs";

const logoColors = [
  "bg-indigo-50 text-indigo-700",
  "bg-emerald-50 text-emerald-700",
  "bg-amber-50 text-amber-700",
  "bg-rose-50 text-rose-700",
  "bg-sky-50 text-sky-700",
  "bg-violet-50 text-violet-700",
];

const colorFor = (name: string) =>
  logoColors[[...name].reduce((sum, c) => sum + c.charCodeAt(0), 0) % logoColors.length];

export default async function CompaniesPage() {
  const jobs = await getJobs();

  const grouped = new Map<string, Job[]>();
  jobs.forEach((j) => grouped.set(j.company, [...(grouped.get(j.company) ?? []), j]));

  const companies = [...grouped.entries()]
    .map(([name, list]) => ({
      name,
      jobs: list,
      locations: [...new Set(list.map((j) => j.location))],
    }))
    .sort((a, b) => b.jobs.length - a.jobs.length || a.name.localeCompare(b.name));

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Companies hiring now</h1>
      <p className="mt-2 text-slate-500">
        {companies.length} companies with {jobs.length} open positions.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((c) => (
          <article
            key={c.name}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-900/5"
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold ${colorFor(c.name)}`}>
                {c.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h2 className="truncate font-semibold">{c.name}</h2>
                <p className="truncate text-xs text-slate-500">{c.locations.join(" · ")}</p>
              </div>
            </div>

            <p className="mt-4 text-sm font-medium text-indigo-600">
              {c.jobs.length} open {c.jobs.length === 1 ? "position" : "positions"}
            </p>

            <ul className="mt-3 space-y-2 border-t border-slate-100 pt-3">
              {c.jobs.slice(0, 3).map((j) => (
                <li key={j.id}>
                  <Link href={`/jobs/${j.id}`} className="text-sm text-slate-600 transition hover:text-indigo-600">
                    {j.title}
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
}