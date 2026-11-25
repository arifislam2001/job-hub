import Link from "next/link";
import { notFound } from "next/navigation";
import { getJob } from "@/lib/api";

export default async function JobDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const job = await getJob(id);
    if (!job) notFound();

    return (
        <main className="mx-auto max-w-5xl px-6 py-8">
            <Link href="/" className="text-sm text-blue-600 hover:underline">
                ← Back to jobs
            </Link>

            <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_300px]">
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 font-semibold text-blue-700">
                            {job.company.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{job.title}</h1>
                            <p className="text-slate-500">
                                {job.company} · {job.location}
                            </p>
                        </div>
                    </div>

                    <h2 className="mt-8 font-semibold">About the job</h2>
                    <p className="mt-2 leading-relaxed text-slate-600">{job.description}</p>

                    <h2 className="mt-6 font-semibold">Requirements</h2>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                        {job.requirements.map((r) => (
                            <li key={r}>{r}</li>
                        ))}
                    </ul>

                    <h2 className="mt-6 font-semibold">Skills</h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {job.skills.map((s) => (
                            <span key={s} className="rounded-md bg-slate-100 px-3 py-1 text-sm text-slate-600">
                                {s}
                            </span>
                        ))}
                    </div>
                </div>

                <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
                    <p className="text-sm text-slate-500">Salary</p>
                    <p className="text-xl font-bold">{job.salary}</p>

                    <dl className="mt-5 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <dt className="text-slate-500">Job type</dt>
                            <dd className="font-medium">{job.type}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-slate-500">Level</dt>
                            <dd className="font-medium">{job.level}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-slate-500">Location</dt>
                            <dd className="font-medium">{job.location}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-slate-500">Posted</dt>
                            <dd className="font-medium">{job.postedDays} day(s) ago</dd>
                        </div>
                    </dl>

                    <Link
                        href={`/jobs/${job.id}/apply`}
                        className="mt-6 block w-full rounded-lg bg-blue-600 py-3 text-center font-medium text-white hover:bg-blue-700"
                    >
                        Apply now
                    </Link>
                </aside>
            </div>
        </main>
    );
}