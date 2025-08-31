'use client';
import { Job } from '../../data/jobs';
import Link from 'next/link';

interface JobListProps {
  jobs: Job[];
  onEdit?: (job: Job) => void;
}

export default function JobList({ jobs, onEdit }: JobListProps) {
  if (!jobs.length)
    return <p className="p-4 text-center text-gray-500">No jobs found.</p>;

  return (
    <ul className="space-y-4">
      {jobs.map((job) => (
        <li
          key={job.id}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 p-4 rounded-2xl shadow-sm border transition hover:shadow-md"
          style={{
            borderColor: 'var(--border-color)',
            background: 'var(--background)',
            color: 'var(--foreground)',
          }}
        >
          {/* Job Details */}
          <div className="flex-1">
            <Link href={`/jobs/${job.id}`}>
              <h2 className="text-lg font-semibold hover:underline">{job.title}</h2>
            </Link>
            <p className="text-sm text-gray-500">
              {job.company} • {job.location}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {job.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    background: 'var(--tag-bg)',
                    color: 'var(--tag-text)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {onEdit && (
            <button
              onClick={() => onEdit(job)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Edit
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
