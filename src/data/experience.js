/**
 * Learning experience — job simulations, workshops, events and activities.
 * These are NOT employment; `type` is shown as a label on every card.
 *
 * Optional fields: `date` (e.g. "Mar 2025"), `credentialUrl` (certificate link),
 * `certificate` (image in /public/certificates — shown as a thumbnail that opens full size).
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
    date: "May 2026",
    description:
      "Completed practical software engineering tasks — project setup, Kafka integration, H2 database integration, REST API integration and building a REST API controller.",
    skills: ["Kafka", "H2 Database", "REST APIs"],
    certificate: "/certificates/jpmorgan-software-engineering.jpg",
  },
  {
    title: "Data Visualisation: Empowering Business with Effective Insights",
    organization: "Tata Group",
    platform: "Forage",
    type: "simulation",
    date: "May 2026",
    description:
      "Framed the business scenario, chose the right visuals, created effective visuals and communicated insights and analysis to leadership.",
    skills: ["Data Visualisation", "Dashboards", "Business Insights"],
    certificate: "/certificates/tata-data-visualisation.jpg",
  },
  {
    title: "TCS iON Career Edge – Young Professional",
    organization: "Tata Consultancy Services",
    platform: "TCS iON",
    type: "certification",
    date: "May 2026",
    description:
      "Completed a course on workplace readiness — communication, presentation, resume writing, group discussions, interviews, business etiquette, IT foundations and an overview of AI.",
    skills: ["Communication Skills", "Interview Skills", "IT Foundational Skills"],
    certificate: "/certificates/tcs-ion-career-edge.jpg",
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
    title: "Infosys Springboard Workshop",
    organization: "Infosys",
    platform: "Infosys Springboard",
    type: "workshop",
    // TODO: name the workshop topic in the description and list the skills it covered.
    description: "Technical workshop on Infosys Springboard, Infosys's digital learning platform.",
    skills: [],
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
