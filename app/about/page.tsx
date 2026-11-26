export const metadata = { title: "About – JobHub" };

const values = [
  { title: "Simple", text: "Search, apply and track jobs in a few clicks, with no clutter." },
  { title: "Transparent", text: "Clear salary, level and requirements on every listing." },
  { title: "Built for developers", text: "Made by developers who know what a good job post looks like." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">About JobHub</h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">
        JobHub connects talented people with growing companies. We believe finding a job should be
        fast, fair and free for everyone looking for their next step.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {[
          ["23+", "Open positions"],
          ["18+", "Hiring companies"],
          ["100%", "Free for job seekers"],
        ].map(([n, l]) => (
          <div key={l} className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
            <p className="text-3xl font-extrabold text-indigo-600">{n}</p>
            <p className="mt-1 text-sm text-slate-500">{l}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-xl font-semibold text-slate-900">What we stand for</h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="rounded-2xl bg-slate-50 p-6">
            <h3 className="font-semibold text-slate-900">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}