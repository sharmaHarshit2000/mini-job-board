'use client';
import { useState, useEffect } from 'react';
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';
import { Job } from '../../data/jobs';
import Loader from '../loading';
import toast from 'react-hot-toast';
import { withAdminProtection } from '../context/withAdminProtection';
import { useRouter } from 'next/navigation';

function AdminPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | undefined>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobs');
        const data = await res.json();
        setJobs(data.items || []);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSuccess = (job: Job) => {
    setEditingJob(undefined);
    setJobs(prev => {
      const index = prev.findIndex(j => j.id === job.id);
      if (index !== -1) {
        const copy = [...prev];
        copy[index] = job;
        return copy.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
      }
      return [job, ...prev].sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
    });

    // Redirect to detail page
    router.push(`/jobs/${job.id}`);
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen p-6 bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <JobForm job={editingJob} onSuccess={handleSuccess} />
      <JobList jobs={jobs} onEdit={setEditingJob} />
    </div>
  );
}

export default withAdminProtection(AdminPage);
