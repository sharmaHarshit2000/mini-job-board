import { NextRequest, NextResponse } from "next/server";
import { jobs, Job } from "../../../../data/jobs";

let jobList = [...jobs];

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const search = url.searchParams.get("search") || "";
  const tag = url.searchParams.get("tag") || "";

  let filtered = jobList.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (tag ? job.tags.includes(tag) : true)
  );

  return NextResponse.json(filtered);
}

export async function POST(req: NextRequest) {
  const body: Job = await req.json();

  if (!body.title || !body.company || !body.location) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const newJob = {
    ...body,
    id: (jobList.length + 1).toString(),
    postedAt: new Date().toISOString(),
  };
  jobList.push(newJob);

  return NextResponse.json(newJob);
}
