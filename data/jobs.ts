export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  tags: string[];
  description: string;
  postedAt: string; // ISO date string
}

export const jobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    tags: ["React", "TypeScript", "CSS"],
    description: "Build modern web apps using React and TypeScript.",
    postedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Backend Developer",
    company: "DevSolutions",
    location: "New York",
    tags: ["Node.js", "Express", "MongoDB"],
    description: "Develop REST APIs and manage databases.",
    postedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Fullstack Developer",
    company: "StackMasters",
    location: "Remote",
    tags: ["React", "Node.js", "TypeScript"],
    description: "Work on frontend and backend features using modern stacks.",
    postedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "UI/UX Designer",
    company: "Creative Labs",
    location: "San Francisco",
    tags: ["Figma", "Adobe XD", "CSS"],
    description: "Design user-friendly interfaces and experiences.",
    postedAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "CloudOps",
    location: "London",
    tags: ["AWS", "Docker", "Kubernetes"],
    description: "Manage cloud infrastructure and CI/CD pipelines.",
    postedAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Mobile App Developer",
    company: "Appify",
    location: "Berlin",
    tags: ["React Native", "iOS", "Android"],
    description: "Build cross-platform mobile applications.",
    postedAt: new Date().toISOString(),
  },
  {
    id: "7",
    title: "QA Engineer",
    company: "TestPro",
    location: "Remote",
    tags: ["Automation", "Selenium", "Jest"],
    description: "Ensure software quality with automated testing.",
    postedAt: new Date().toISOString(),
  },
  {
    id: "8",
    title: "Data Scientist",
    company: "DataMinds",
    location: "New York",
    tags: ["Python", "Machine Learning", "Pandas"],
    description: "Analyze data and build predictive models.",
    postedAt: new Date().toISOString(),
  },
  {
    id: "9",
    title: "Product Manager",
    company: "InnovateX",
    location: "Remote",
    tags: ["Agile", "Scrum", "Roadmap"],
    description: "Define product strategy and roadmap.",
    postedAt: new Date().toISOString(),
  },
  {
    id: "10",
    title: "Cloud Engineer",
    company: "SkyNet",
    location: "Toronto",
    tags: ["Azure", "Terraform", "CI/CD"],
    description: "Deploy and maintain cloud infrastructure.",
    postedAt: new Date().toISOString(),
  },
  {
    id: "11",
    title: "Frontend Designer",
    company: "PixelPerfect",
    location: "Remote",
    tags: ["HTML", "CSS", "JavaScript"],
    description: "Implement responsive and interactive UIs.",
    postedAt: new Date().toISOString(),
  },
  {
    id: "12",
    title: "Backend Architect",
    company: "CodeBase",
    location: "San Francisco",
    tags: ["Node.js", "Microservices", "MongoDB"],
    description: "Design and optimize backend systems.",
    postedAt: new Date().toISOString(),
  },
];
