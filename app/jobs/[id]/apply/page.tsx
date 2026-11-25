import Link from "next/link";
import { notFound } from "next/navigation";
import ApplyForm from "@/components/ApplyForm";
import { getJob } from "@/lib/api";

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) notFound();

  return (
    <main className="mx-auto max-w-2xl px-6 py-8">
      <Link href={`/jobs/${job.id}`} className="text-sm text-blue-600 hover:underline">
        ← Back to job
      </Link>
      <h1 className="mt-4 text-2xl font-bold">Apply for {job.title}</h1>
      <p className="mb-6 text-slate-500">
        {job.company} · {job.location}
      </p>
      <ApplyForm jobId={job.id} jobTitle={job.title} />
    </main>
  );
}