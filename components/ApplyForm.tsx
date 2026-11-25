"use client";

import Link from "next/link";
import { useState } from "react";
import { applyToJob } from "@/lib/api";

type Errors = Partial<Record<"name" | "email" | "resume" | "cover", string>>;

export default function ApplyForm({
  jobId,
  jobTitle,
}: {
  jobId: string;
  jobTitle: string;
}) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", cover: "" });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    const errs: Errors = {};

    if (form.name.trim().length < 3) errs.name = "Please enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Please enter a valid email";

    if (!file) errs.resume = "Please choose your resume (PDF)";
    else if (file.type !== "application/pdf") errs.resume = "Only PDF files are allowed";
    else if (file.size > 2 * 1024 * 1024) errs.resume = "File must be under 2 MB";

    if (form.cover.trim().length < 20) errs.cover = "Write at least 20 characters";

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const data = new FormData();
    data.append("jobId", jobId);
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("phone", form.phone);
    data.append("cover", form.cover);
    data.append("resume", file as File);

    try {
      setLoading(true);
      await applyToJob(data);
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <p className="text-lg font-semibold text-emerald-800">Application submitted!</p>
        <p className="mt-1 text-sm text-emerald-700">
          Thanks, {form.name}. Your application for {jobTitle} has been sent.
        </p>
        <Link
          href="/"
          className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
        >
          Browse more jobs
        </Link>
      </div>
    );
  }

  const input =
    "w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500";

  return (
    <form
      onSubmit={submit}
      className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6"
    >
      <div>
        <label className="mb-1 block text-sm font-medium">Full name *</label>
        <input name="name" value={form.name} onChange={change} className={input} placeholder="Ariful Islam" />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Email *</label>
          <input name="email" value={form.email} onChange={change} className={input} placeholder="you@example.com" />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Phone</label>
          <input name="phone" value={form.phone} onChange={change} className={input} placeholder="01XXXXXXXXX" />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Resume (PDF) *</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className={input}
        />
        {file && <p className="mt-1 text-xs text-slate-500">Selected: {file.name}</p>}
        {errors.resume && <p className="mt-1 text-xs text-red-600">{errors.resume}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Cover letter *</label>
        <textarea
          name="cover"
          value={form.cover}
          onChange={change}
          rows={5}
          className={input}
          placeholder="Tell us why you are a good fit..."
        />
        {errors.cover && <p className="mt-1 text-xs text-red-600">{errors.cover}</p>}
      </div>

      {serverError && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit application"}
      </button>
    </form>
  );
}