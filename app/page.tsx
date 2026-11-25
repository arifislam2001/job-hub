import JobBoard from "@/components/JobBoard";
import { getJobs } from "@/lib/api";

export default async function Home() {
  const jobs = await getJobs();
  const companies = new Set(jobs.map((j) => j.company)).size;
  const remote = jobs.filter((j) => j.type === "Remote").length;

  const stats = [
    { value: jobs.length, label: "Open positions" },
    { value: companies, label: "Hiring companies" },
    { value: remote, label: "Remote roles" },
  ];

  return (
    <main>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(99,102,241,0.4),transparent)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-16 sm:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-indigo-100">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {jobs.length} jobs open right now
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            Find work you will love,{" "}
            <span className="bg-linear-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
              build a career you are proud of
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
            Browse openings from growing companies. Search by skill, location
            and experience level, then apply in minutes.
          </p>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
              >
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-slate-300">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative mx-auto -mt-12 max-w-6xl px-6 pb-20">
        <JobBoard jobs={jobs} />
      </div>
    </main>
  );
}