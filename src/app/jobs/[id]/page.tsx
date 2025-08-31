'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useAdmin } from '../../context/AdminProvider';
import { Job } from '../../../data/jobs';

export default function JobDetail() {
  const { isAdmin } = useAdmin();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams(); 
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  const id = params?.id; // safe access

  useEffect(() => {
    if (!id) return;
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) throw new Error('Job not found');
        const data: Job = await res.json();
        setJob(data);
      } catch {
        setJob(null);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!job)
    return (
      <div
        className="p-6 max-w-3xl mx-auto rounded-lg shadow-lg border"
        style={{
          borderColor: 'var(--border-color)',
          background: 'var(--background)',
          color: 'var(--foreground)',
        }}
      >
        <p className="text-center">Job not found</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );

  const base = isAdmin ? '/admin' : '/';
  const query = searchParams.toString();
  const backHref = query ? `${base}?${query}` : base;

  return (
    <div
      className="p-6 max-w-3xl mx-auto rounded-lg shadow-lg border"
      style={{
        borderColor: 'var(--border-color)',
        background: 'var(--background)',
        color: 'var(--foreground)',
      }}
    >
      <button
        onClick={() => router.push(backHref)}
        className="flex items-center mb-4 text-blue-600 hover:underline"
      >
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
      <p className="opacity-80 mb-4">
        {job.company} – {job.location}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {job.tags.map(tag => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full font-medium text-sm"
            style={{
              background: 'var(--tag-bg)',
              color: 'var(--tag-text)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mb-4">{job.description}</p>
      <p className="text-sm text-gray-500">
        Posted at: {new Date(job.postedAt).toLocaleString()}
      </p>
    </div>
  );
}
