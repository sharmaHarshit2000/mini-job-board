import { NextRequest, NextResponse } from "next/server";
import { getJobById } from "../../../../data/jobs";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const job = getJobById(params.id);
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }
  return NextResponse.json(job);
}
