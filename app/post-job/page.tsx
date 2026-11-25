"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createJob } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";

const input =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

export default function PostJobPage() {
  const router = useRouter();
  const { user, token, ready } = useAuth();
  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "Full-time",
    level: "Entry",
    salary: "",
    skills: "",
    description: "",
    requirements: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  if (!ready) return <main className="mx-auto max-w-2xl px-6 py-14 text-slate-500">Loading...</main>;

  if (!user || !token) {
    return (
      <main className="mx-auto max-w-md px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Log in to post a job</h1>
        <p className="mt-2 text-slate-500">You need a company account to post jobs.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/login" className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700">Log in</Link>
          <Link href="/register" className="rounded-xl border border-slate-200 px-6 py-3 font-medium hover:bg-slate-50">Sign up</Link>
        </div>
      </main>
    );
  }

  if (user.role !== "company") {
    return (
      <main className="mx-auto max-w-md px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Company accounts only</h1>
        <p className="mt-2 text-slate-500">
          Only company accounts can post jobs. Create a company account to continue.
        </p>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700">
          Back to jobs
        </Link>
      </main>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.title.trim().length < 3) return setError("Please enter a job title");
    if (!form.location.trim()) return setError("Please enter a location");
    if (form.description.trim().length < 20) return setError("Description must be at least 20 characters");

    try {
      setLoading(true);
      const job = await createJob(
        {
          title: form.title,
          location: form.location,
          type: form.type,
          level: form.level,
          salary: form.salary,
          skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
          description: form.description,
          requirements: form.requirements.split("\n").map((s) => s.trim()).filter(Boolean),
        },
        token
      );
      router.push(`/jobs/${job.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Post a job</h1>
      <p className="mt-2 text-slate-500">
        Posting as <span className="font-medium text-slate-900">{user.companyName}</span>
      </p>

      <form onSubmit={submit} className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Job title *</label>
          <input name="title" value={form.title} onChange={change} className={input} placeholder="Frontend Developer" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Location *</label>
            <input name="location" value={form.location} onChange={change} className={input} placeholder="Dhaka or Remote" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Salary</label>
            <input name="salary" value={form.salary} onChange={change} className={input} placeholder="৳40k – 60k" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Job type</label>
            <select name="type" value={form.type} onChange={change} className={input}>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Remote</option>
              <option>Internship</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Experience level</label>
            <select name="level" value={form.level} onChange={change} className={input}>
              <option>Entry</option>
              <option>Mid</option>
              <option>Senior</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Skills (comma separated)</label>
          <input name="skills" value={form.skills} onChange={change} className={input} placeholder="React, Tailwind, JavaScript" />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Description *</label>
          <textarea name="description" value={form.description} onChange={change} rows={5} className={input} placeholder="What will the person work on?" />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Requirements (one per line)</label>
          <textarea name="requirements" value={form.requirements} onChange={change} rows={4} className={input} placeholder={"2+ years with React\nGood communication"} />
        </div>

        {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-sm shadow-indigo-600/30 transition hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Publishing..." : "Publish job"}
        </button>
      </form>
    </main>
  );
}