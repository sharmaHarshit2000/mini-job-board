"use client";
import { useState, useEffect } from "react";
import { Job } from "../../data/jobs";
import { createOrUpdateJobAction } from "../actions/createOrUpdateJobAction";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface JobFormProps {
  job?: Job;
  onSuccess: (job: Job) => void;
}

export default function JobForm({ job, onSuccess }: JobFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(job?.title || "");
  const [company, setCompany] = useState(job?.company || "");
  const [location, setLocation] = useState(job?.location || "");
  const [description, setDescription] = useState(job?.description || "");
  const [tags, setTags] = useState(job?.tags.join(", ") || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setCompany(job.company);
      setLocation(job.location);
      setDescription(job.description);
      setTags(job.tags.join(", "));
    }
  }, [job]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const savedJob = await createOrUpdateJobAction(formData, job);
      onSuccess(savedJob);

      // Clear form for new job creation
      if (!job) {
        setTitle("");
        setCompany("");
        setLocation("");
        setDescription("");
        setTags("");
      }

      toast.success(`Job ${job ? "updated" : "created"} successfully!`);

      // Redirect to job detail page
      router.push(`/jobs/${savedJob.id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 border rounded mb-6"
    >
      <input
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Job Title"
        required
        className="border p-2"
      />
      <input
        name="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company"
        required
        className="border p-2"
      />
      <input
        name="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        required
        className="border p-2"
      />
      <input
        name="tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
        className="border p-2"
      />
      <textarea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2"
      />
      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-green-500"
        }`}
      >
        {loading ? "Saving…" : job ? "Update Job" : "Create Job"}
      </button>
    </form>
  );
}
