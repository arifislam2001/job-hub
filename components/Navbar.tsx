"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";

const links = [
  { label: "Jobs", href: "/" },
  { label: "Companies", href: "/companies" },
  { label: "Post a job", href: "/post-job" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, ready, logout } = useAuth();

  // "Post a job" শুধু company বা লগআউট ইউজারকে দেখাবে (seeker-কে না)
  const visibleLinks = links.filter(
    (l) => l.href !== "/post-job" || !user || user.role === "company"
  );

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/" || pathname.startsWith("/jobs")
      : pathname.startsWith(href);

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/");
  };

  const initial = user?.name?.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-sm shadow-indigo-500/30">
            J
          </span>
          <span className="text-lg font-bold tracking-tight">JobHub</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {visibleLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                isActive(l.href)
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {ready && user ? (
            <>
              <div className="flex items-center gap-2.5 pr-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                  {initial}
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs capitalize text-slate-500">{user.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Log out
              </button>
            </>
          ) : (
            ready && (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700"
                >
                  Sign up
                </Link>
              </>
            )
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {visibleLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex gap-2">
            {ready && user ? (
              <button
                onClick={handleLogout}
                className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-medium"
              >
                Log out ({user.name})
              </button>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="flex-1 rounded-lg border border-slate-200 py-2.5 text-center text-sm font-medium">
                  Log in
                </Link>
                <Link href="/register" onClick={() => setOpen(false)} className="flex-1 rounded-lg bg-slate-900 py-2.5 text-center text-sm font-medium text-white">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}