/**
 * Learning experience — job simulations, workshops, events and activities.
 * These are NOT employment; `type` is shown as a label on every card.
 *
 * Optional fields: `date` (e.g. "Mar 2025"), `credentialUrl` (certificate link).
 * TODO: add dates and certificate links, and refine descriptions.
 */
export const experienceTypes = {
  simulation: "Job Simulation",
  workshop: "Workshop",
  event: "Technical Event",
  certification: "Certification",
  activity: "Activity",
};

export const experiences = [
  {
    title: "Software Engineering Job Simulation",
    organization: "JPMorgan Chase & Co.",
    platform: "Forage",
    type: "simulation",
    description:
      "Completed a virtual job simulation built around realistic software engineering tasks — setting up a development environment, working within an existing codebase and implementing features.",
    skills: ["Software Engineering", "Codebase Navigation", "Problem Solving"],
  },
  {
    title: "Data Visualisation Job Simulation",
    organization: "Tata Group",
    platform: "Forage",
    type: "simulation",
    description:
      "Framed business questions, chose suitable visuals and built dashboards that communicate insights clearly to leadership.",
    skills: ["Data Visualisation", "Dashboards", "Business Insights"],
  },
  {
    title: "Cyber Job Simulation",
    organization: "Deloitte",
    platform: "Forage",
    type: "simulation",
    description:
      "Investigated a simulated security incident by reviewing web activity logs to identify suspicious behaviour.",
    skills: ["Cybersecurity Basics", "Log Analysis"],
  },
  {
    title: "Google Developer Groups",
    organization: "GDG / GDSC Community",
    type: "activity",
    description:
      "Taking part in Google Developer community sessions on modern development tools, cloud and Android.",
    skills: ["Community", "Developer Tools"],
  },
  {
    title: "Kotlin Workshop",
    organization: "Technical Workshop",
    type: "workshop",
    description:
      "Hands-on introduction to Kotlin syntax, null safety and the basics of Android development.",
    skills: ["Kotlin", "Android Basics"],
  },
  {
    title: "College Technical Events",
    organization: "College Tech Fests & Clubs",
    type: "event",
    description:
      "Participating in technical events, coding activities and project showcases organised at college.",
    skills: ["Teamwork", "Presentation"],
  },
];
