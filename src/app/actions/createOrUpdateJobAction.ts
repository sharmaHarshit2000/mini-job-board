"use server";
import { Job, addOrUpdateJob } from "../../data/jobs";

export async function createOrUpdateJobAction(
  formData: FormData,
  existingJob?: Job
) {
  const title = (formData.get("title") as string) || "";
  const company = (formData.get("company") as string) || "";
  const location = (formData.get("location") as string) || "";
  const description = (formData.get("description") as string) || "";
  const tags =
    (formData.get("tags") as string)?.split(",").map((t) => t.trim()) || [];

  return addOrUpdateJob({
    id: existingJob?.id,
    title,
    company,
    location,
    description,
    tags,
  });
}
