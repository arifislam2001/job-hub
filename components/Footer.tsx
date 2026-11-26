import Link from "next/link";

const columns = [
  {
    title: "Job seekers",
    items: [
      { label: "Browse jobs", href: "/" },
      { label: "Companies", href: "/companies" },
      { label: "Saved jobs", href: "/saved" },
      { label: "My applications", href: "/applications" },
    ],
  },
  {
    title: "Employers",
    items: [
      { label: "Post a job", href: "/post-job" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
              J
            </span>
            <span className="text-lg font-bold tracking-tight">JobHub</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
            Find the right job, or the right candidate. Simple, fast and built for developers.
          </p>
        </div>

        {columns.map((c) => (
          <div key={c.title}>
            <h4 className="text-sm font-semibold text-slate-900">{c.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {c.items.map((i) => (
                <li key={i.label}>
                  <Link href={i.href} className="text-sm text-slate-500 transition hover:text-indigo-600">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-slate-400 sm:flex-row">
          <p>© 2026 JobHub. All rights reserved.</p>
          <p>Built with Next.js, Node.js and MongoDB</p>
        </div>
      </div>
    </footer>
  );
}