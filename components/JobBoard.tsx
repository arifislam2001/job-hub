"use client";

import { useMemo, useState } from "react";
import JobCard from "./JobCard";
import { Job } from "@/lib/jobs";

const TYPES = ["Full-time", "Part-time", "Remote", "Internship"];
const LEVELS = ["Entry", "Mid", "Senior"];
const POPULAR = ["React", "Node.js", "Next.js", "Figma", "SQL"];

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export default function JobBoard({ jobs }: { jobs: Job[] }) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [sort, setSort] = useState("newest");

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const count = (key: "type" | "level", value: string) =>
    jobs.filter((j) => j[key] === value).length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const loc = location.trim().toLowerCase();
    return jobs
      .filter(
        (j) =>
          (!q || [j.title, j.company, ...j.skills].some((s) => s.toLowerCase().includes(q))) &&
          (!loc || j.location.toLowerCase().includes(loc)) &&
          (types.length === 0 || types.includes(j.type)) &&
          (levels.length === 0 || levels.includes(j.level))
      )
      .sort((a, b) =>
        sort === "title" ? a.title.localeCompare(b.title) : a.postedDays - b.postedDays
      );
  }, [jobs, query, location, types, levels, sort]);

  const clearAll = () => {
    setQuery("");
    setLocation("");
    setTypes([]);
    setLevels([]);
  };

  const hasFilters = query || location || types.length > 0 || levels.length > 0;

  const input =
    "w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

  return (
    <div>
      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
        <div className="grid gap-3 sm:grid-cols-[1fr_240px]">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title, company or skill"
              className={input}
            />
          </div>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <PinIcon />
            </span>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City or Remote"
              className={input}
            />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 px-1">
          <span className="text-xs font-medium text-slate-400">Popular:</span>
          {POPULAR.map((p) => (
            <button
              key={p}
              onClick={() => setQuery(p)}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[250px_1fr]">
        {/* Filters */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Filters</h2>
            {hasFilters && (
              <button onClick={clearAll} className="text-xs font-medium text-indigo-600 hover:underline">
                Clear all
              </button>
            )}
          </div>

          <h3 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Job type
          </h3>
          <div className="space-y-2.5">
            {TYPES.map((t) => (
              <label key={t} className="flex cursor-pointer items-center justify-between text-sm text-slate-700">
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={types.includes(t)}
                    onChange={() => toggle(types, setTypes, t)}
                    className="h-4 w-4 rounded accent-indigo-600"
                  />
                  {t}
                </span>
                <span className="text-xs text-slate-400">{count("type", t)}</span>
              </label>
            ))}
          </div>

          <h3 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Experience level
          </h3>
          <div className="space-y-2.5">
            {LEVELS.map((l) => (
              <label key={l} className="flex cursor-pointer items-center justify-between text-sm text-slate-700">
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={levels.includes(l)}
                    onChange={() => toggle(levels, setLevels, l)}
                    className="h-4 w-4 rounded accent-indigo-600"
                  />
                  {l}
                </span>
                <span className="text-xs text-slate-400">{count("level", l)}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Results */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-900">{filtered.length}</span> of {jobs.length} jobs
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500"
            >
              <option value="newest">Newest first</option>
              <option value="title">Title A–Z</option>
            </select>
          </div>

          <div className="space-y-4">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <p className="text-lg font-semibold">No jobs match your search</p>
              <p className="mt-1 text-sm text-slate-500">
                Try different keywords or clear the filters.
              </p>
              <button
                onClick={clearAll}
                className="mt-5 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}