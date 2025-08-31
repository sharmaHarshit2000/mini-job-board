import { NextRequest, NextResponse } from "next/server";
import { getJobs, addOrUpdateJob, Job } from "../../../data/jobs";


export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const search = url.searchParams.get("search")?.toLowerCase() ?? "";
  const limit = Math.max(1, Math.min(50, Number(url.searchParams.get("limit") ?? 10)));
  const offset = Math.max(0, Number(url.searchParams.get("offset") ?? 0));

  const filtered = getJobs().filter(j =>
    !search ||
    j.title.toLowerCase().includes(search) ||
    j.company.toLowerCase().includes(search) ||
    j.tags.some(t => t.toLowerCase().includes(search))
  );

  const page = filtered.slice(offset, offset + limit);

  return NextResponse.json({
    total: filtered.length,
    limit,
    offset,
    items: page,
  });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const errors: string[] = [];

  if (!data.title) errors.push("title is required");
  if (!data.company) errors.push("company is required");
  if (!data.location) errors.push("location is required");
  if (!Array.isArray(data.tags)) errors.push("tags must be an array");

  if (errors.length) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const job = addOrUpdateJob(data as Partial<Job>);
  return NextResponse.json(job, { status: 201 });
}
