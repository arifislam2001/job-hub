import { Job } from "@/lib/jobs";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:9000/api/v1";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "seeker" | "company";
  companyName?: string;
};

export type AuthResponse = { token: string; user: AuthUser };

export type NewJob = {
  title: string;
  location: string;
  type: string;
  level: string;
  salary: string;
  skills: string[];
  description: string;
  requirements: string[];
};

export async function getJobs(): Promise<Job[]> {
  const res = await fetch(`${API}/jobs`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load jobs");
  return res.json();
}

export async function getJob(id: string): Promise<Job | null> {
  const res = await fetch(`${API}/jobs/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load job");
  return res.json();
}

export async function applyToJob(data: FormData) {
  const res = await fetch(`${API}/jobs/apply`, { method: "POST", body: data });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.message || "Failed to submit application");
  return body;
}

async function postJson<T>(path: string, body: unknown, token?: string): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data as T;
}

export const registerUser = (body: {
  name: string;
  email: string;
  password: string;
  role: string;
  companyName?: string;
}) => postJson<AuthResponse>("/job-auth/register", body);

export const loginUser = (body: { email: string; password: string }) =>
  postJson<AuthResponse>("/job-auth/login", body);

export const createJob = (body: NewJob, token: string) =>
  postJson<Job>("/jobs", body, token);