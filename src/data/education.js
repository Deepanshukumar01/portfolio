import { profile } from "./profile.js";

/**
 * Education timeline.
 * TODO: replace `institution` with your college name.
 * You can add school entries (Class XII / X) as more objects in `education`.
 */
export const education = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Gautam Buddha University",
    location: "Uttar Pradesh, India",
    period: "2023 – 2027",
    status: "4th Year · Final year",
    score: { label: "CGPA", value: profile.cgpa },
    // TODO: adjust to match your curriculum.
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Web Technologies",
    ],
    milestones: [
      { when: "2023", text: "Started B.Tech CSE — programming fundamentals in C" },
      { when: "2024", text: "Java, OOP and data structures; first web projects" },
      { when: "2025", text: "Backend with Node.js & MySQL; building full-stack projects" },
      { when: "Now", text: "Final year — looking for software development internships" },
      { when: "2027", text: "Expected graduation" },
    ],
  },
];
