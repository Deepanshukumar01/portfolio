/**
 * Project showcase data. Each object renders one card + its details modal.
 *
 * To add/replace a project, copy an object and edit it:
 * - image: put a screenshot in /public/projects/ (1600×1000 works well) and reference it here.
 * - links.github / links.live: leave "" until available — the button shows as "coming soon".
 * - status: short honest label, e.g. "Completed", "In development", "Prototype".
 * - featured: true renders the wide card layout (use for your strongest project).
 *
 * TODO: the three projects below are starting drafts — rewrite the details
 * with what you actually built, and add the real repository/demo links.
 */
export const projects = [
  {
    id: "campus360",
    title: "Campus360",
    tagline: "A centralized hub for campus life",
    description:
      "A campus-focused web application that brings student services and information — notices, events, timetables and resources — into one centralized platform.",
    problem:
      "Campus information is scattered across notice boards, group chats and separate portals, so students often miss updates.",
    image: "/projects/campus360.svg",
    imageAlt: "Campus360 dashboard preview showing notices, timetable and events panels",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MySQL"],
    status: "In development",
    featured: true,
    links: {
      github: "", // TODO: add repository URL
      live: "", // TODO: add live demo URL
    },
    details: {
      overview:
        "Campus360 is a full-stack web application built to give students one reliable place for the information and services they use every day.",
      problem:
        "Important updates — exam notices, event announcements, timetable changes — are spread across multiple channels. There is no single source of truth, which leads to missed deadlines and repeated questions.",
      solution:
        "A centralized platform with a Node.js/Express backend and a MySQL database that stores and serves campus data, paired with a clean, responsive frontend students can open from any device.",
      features: [
        "Notice board with categories and latest-first ordering",
        "Events listing with dates and venues",
        "Timetable and academic resource sections",
        "REST API built with Express.js",
        "Responsive layout for mobile and desktop",
      ],
      contribution:
        "Designed the database schema, built the Express.js API routes, and implemented the responsive frontend.",
      challenges: [
        "Designing a relational schema flexible enough for different kinds of campus content",
        "Keeping the API structure clean as features were added",
      ],
      future: [
        "Role-based login for students and administrators",
        "Search and filtering across notices and events",
        "Email or push notifications for important updates",
      ],
    },
  },
  {
    id: "spam-call-detection",
    title: "Spam Call Detection System",
    tagline: "Flag suspicious calls before you answer",
    description:
      "A system concept for identifying suspicious or spam calls and giving users a clear response or warning before they pick up.",
    problem:
      "Spam and fraud calls waste time and put users at risk, especially people who can't easily judge an unknown number.",
    image: "/projects/spam-detection.svg",
    imageAlt: "Phone screen preview showing an incoming call flagged as likely spam with a risk score",
    tech: ["Python", "JavaScript", "REST APIs"],
    status: "Prototype",
    featured: false,
    links: {
      github: "", // TODO: add repository URL
      live: "", // TODO: add live demo URL
    },
    details: {
      overview:
        "A prototype that checks an incoming number against known patterns and reports, then returns a simple, understandable verdict to the user.",
      problem:
        "Users receive frequent spam and scam calls and have no quick way to know whether an unknown number is safe to answer.",
      solution:
        "A backend service that evaluates a phone number using a set of rules and reported-number data, exposed through an API that a frontend uses to show a clear warning level.",
      features: [
        "Number lookup through a backend API",
        "Rule-based checks for suspicious patterns",
        "Clear verdicts: Safe, Suspicious or Likely spam",
        "Simple interface for checking a number manually",
      ],
      contribution:
        "Worked on the detection logic, the API design and the user-facing warning interface.",
      challenges: [
        "Deciding which signals are reliable enough to flag a number",
        "Presenting risk clearly without causing unnecessary alarm",
      ],
      future: [
        "Community reporting of spam numbers",
        "Exploring a machine-learning model for classification",
        "A mobile-friendly client",
      ],
    },
  },
  {
    id: "student-management",
    title: "Student Management System",
    tagline: "Academic records, organized",
    description:
      "A practical application for managing student information, academic records and related data with a structured relational database.",
    problem:
      "Maintaining student records in spreadsheets or on paper is slow, error-prone and hard to search.",
    image: "/projects/student-management.svg",
    imageAlt: "Student management table preview with search, student records and summary stats",
    tech: ["Java", "MySQL", "JDBC"],
    status: "Completed",
    featured: false,
    links: {
      github: "", // TODO: add repository URL
      live: "", // TODO: add live demo URL (or remove if it is a desktop app)
    },
    details: {
      overview:
        "A Java application backed by MySQL that handles day-to-day student data management — adding, updating, searching and reporting on records.",
      problem:
        "Manual record keeping makes it hard to find a student's details quickly and leads to duplicate or inconsistent data.",
      solution:
        "A Java application using JDBC to perform CRUD operations on a normalized MySQL database, with input validation to keep records consistent.",
      features: [
        "Add, update, delete and search student records",
        "Course and marks management",
        "Normalized MySQL schema with relationships",
        "Input validation to prevent inconsistent data",
      ],
      contribution:
        "Built the application end to end — schema design, JDBC data-access layer and the application logic.",
      challenges: [
        "Normalizing the schema to avoid duplicate data",
        "Handling database connections and errors cleanly",
      ],
      future: [
        "A web-based interface",
        "Export of reports to PDF or CSV",
        "Authentication for staff accounts",
      ],
    },
  },
];
