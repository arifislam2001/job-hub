import Link from "next/link";
import { Job } from "@/lib/jobs";

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

const typeStyles: Record<string, string> = {
  "Full-time": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "Part-time": "bg-amber-50 text-amber-700 ring-amber-600/20",
  Remote: "bg-sky-50 text-sky-700 ring-sky-600/20",
  Internship: "bg-violet-50 text-violet-700 ring-violet-600/20",
};

const posted = (days: number) =>
  days <= 0 ? "Today" : days === 1 ? "1 day ago" : `${days} days ago`;

export default function JobCard({ job }: { job: Job }) {
  return (
    <article className="group relative rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-900/5">
      <div className="flex gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${colorFor(job.company)}`}
        >
          {job.company.slice(0, 2).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/jobs/${job.id}`}
                  className="font-semibold text-slate-900 after:absolute after:inset-0 group-hover:text-indigo-600"
                >
                  {job.title}
                </Link>
                {job.postedDays <= 2 && (
                  <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    New
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-slate-500">
                {job.company} · {job.location}
              </p>
            </div>
            <span className="shrink-0 text-xs text-slate-400">{posted(job.postedDays)}</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <span
              className={`rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${typeStyles[job.type] ?? "bg-slate-50 text-slate-700 ring-slate-300"}`}
            >
              {job.type}
            </span>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
              {job.level} level
            </span>
            {job.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-slate-200 px-2 py-0.5 text-xs text-slate-500"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
            <p className="text-sm font-semibold text-slate-900">{job.salary}</p>
            <span className="text-sm font-medium text-indigo-600">
              View details
              <span className="ml-1 inline-block transition group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}