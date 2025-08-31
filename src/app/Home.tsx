'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import JobList from './components/JobList';
import { Job } from "../data/jobs";
import Loader from './loading';
import SmallLoader from './components/SmallLoader';
import toast from 'react-hot-toast';
import { useAdmin } from './context/AdminProvider';

export default function Home({ initialJobs, initialSearch }: { initialJobs: Job[], initialSearch: string }) {
  const { isAdmin } = useAdmin();
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [search, setSearch] = useState(initialSearch);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const router = useRouter();

  const fetchJobs = async (query = '', showBigLoader = false) => {
    if (showBigLoader) setLoading(true);
    else setSearchLoading(true);
    try {
      const res = await fetch(`/api/jobs?search=${encodeURIComponent(query)}&limit=100`);
      if (!res.ok) throw new Error('Failed to fetch jobs');
      
      const data = await res.json();
      const jobs: Job[] = data.items;
      
setJobs(jobs);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load jobs');
    } finally {
      if (showBigLoader) setLoading(false);
      else setSearchLoading(false);
    }
  };

  // Debounced search 
  useEffect(() => {
    if (isAdmin === null) return;
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      router.replace(`/?${params.toString()}`, { scroll: false });
      fetchJobs(search, false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, isAdmin]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Job Board</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search jobs..."
          className="border p-2 w-full"
        />
        {searchLoading && <SmallLoader />}
      </div>
      {loading ? <Loader /> : <JobList jobs={jobs} />}
    </div>
  );
}
