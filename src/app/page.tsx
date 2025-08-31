export const revalidate = 60;

import Home from "./Home";
import { Job } from "../data/jobs";

export default async function Page({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  const { search = "" } = await searchParams;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs?search=${encodeURIComponent(search)}&limit=100`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error("Failed to fetch jobs");

  const data = await res.json();
  const jobs: Job[] = data.items; 

  return <Home initialJobs={jobs} initialSearch={search} />;
}
