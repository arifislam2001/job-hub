"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerUser } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";

const input =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [role, setRole] = useState<"seeker" | "company">("seeker");
  const [form, setForm] = useState({ name: "", companyName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.name.trim().length < 3) return setError("Please enter your full name");
    if (role === "company" && !form.companyName.trim()) return setError("Please enter your company name");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError("Please enter a valid email");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");

    try {
      setLoading(true);
      const { token, user } = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        role,
        companyName: role === "company" ? form.companyName : undefined,
      });
      login(token, user);
      router.push(role === "company" ? "/post-job" : "/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const roleBtn = (value: "seeker" | "company", title: string, text: string) => (
    <button
      type="button"
      onClick={() => setRole(value)}
      className={`rounded-xl border p-4 text-left transition ${
        role === value
          ? "border-indigo-500 bg-indigo-50 ring-4 ring-indigo-100"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-0.5 text-xs text-slate-500">{text}</p>
    </button>
  );

  return (
    <main className="mx-auto flex max-w-md flex-col px-6 py-14">
      <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
      <p className="mt-2 text-slate-500">Join JobHub in less than a minute.</p>

      <form onSubmit={submit} className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
        <div className="grid grid-cols-2 gap-3">
          {roleBtn("seeker", "Job seeker", "I want to find a job")}
          {roleBtn("company", "Company", "I want to hire people")}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Full name</label>
          <input name="name" value={form.name} onChange={change} className={input} placeholder="Ariful Islam" />
        </div>

        {role === "company" && (
          <div>
            <label className="mb-1.5 block text-sm font-medium">Company name</label>
            <input name="companyName" value={form.companyName} onChange={change} className={input} placeholder="Acme Tech" />
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-medium">Email</label>
          <input name="email" type="email" value={form.email} onChange={change} className={input} placeholder="you@example.com" />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Password</label>
          <input name="password" type="password" value={form.password} onChange={change} className={input} placeholder="At least 6 characters" />
        </div>

        {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-sm shadow-indigo-600/30 transition hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-indigo-600 hover:underline">
          Log in
        </Link>
      </p>
    </main>
  );
}