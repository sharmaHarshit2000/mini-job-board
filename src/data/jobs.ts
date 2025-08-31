import fs from 'fs';
import path from 'path';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  tags: string[];
  description: string;
  postedAt: string;
}

const filePath = path.join(process.cwd(), 'src/data/jobs.json');

// Read jobs from JSON
function readJobs(): Job[] {
  if (!fs.existsSync(filePath)) return [];
  const json = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(json);
}

// Write jobs to JSON
function writeJobs(jobs: Job[]) {
  fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2));
}

export function getJobs() {
  return readJobs().sort(
    (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  );
}

export function getJobById(id: string) {
  return readJobs().find(j => j.id === id);
}

export function addOrUpdateJob(job: Partial<Job> & { id?: string }) {
  const jobs = readJobs();

  if (job.id) {
    const index = jobs.findIndex(j => j.id === job.id);
    if (index !== -1) {
      jobs[index] = { ...jobs[index], ...job };
      writeJobs(jobs);
      return jobs[index];
    }
  }

  const newJob: Job = {
    id: (jobs.length + 1).toString(),
    title: job.title || '',
    company: job.company || '',
    location: job.location || '',
    description: job.description || '',
    tags: job.tags || [],
    postedAt: new Date().toISOString(),
  };

  jobs.unshift(newJob);
  writeJobs(jobs);

  return newJob;
}
