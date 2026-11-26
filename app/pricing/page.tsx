import Link from "next/link";

export const metadata = { title: "Pricing – JobHub" };

const plans = [
  {
    name: "Free",
    price: "৳0",
    note: "For small teams getting started",
    features: ["1 active job post", "Basic applicant list", "Email support"],
    highlight: false,
  },
  {
    name: "Pro",
    price: "৳1,500",
    note: "per month, for growing companies",
    features: ["10 active job posts", "Featured badge on jobs", "Download resumes", "Priority support"],
    highlight: true,
  },
  {
    name: "Business",
    price: "৳5,000",
    note: "per month, for hiring at scale",
    features: ["Unlimited job posts", "Company profile page", "Applicant tracking board", "Dedicated manager"],
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">Simple, honest pricing</h1>
        <p className="mt-2 text-slate-500">Job seekers always use JobHub for free.</p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-2xl border bg-white p-7 ${
              p.highlight
                ? "border-indigo-500 shadow-xl shadow-indigo-900/10 ring-1 ring-indigo-500"
                : "border-slate-200"
            }`}
          >
            {p.highlight && (
              <span className="mb-3 inline-block rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                Most popular
              </span>
            )}
            <h2 className="text-lg font-semibold text-slate-900">{p.name}</h2>
            <p className="mt-3 text-4xl font-extrabold text-slate-900">{p.price}</p>
            <p className="mt-1 text-sm text-slate-500">{p.note}</p>

            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-50 text-xs text-indigo-600">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/register"
              className={`mt-8 block rounded-xl px-5 py-3 text-center text-sm font-semibold transition ${
                p.highlight
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "border border-slate-300 text-slate-800 hover:bg-slate-50"
              }`}
            >
              Get started
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}