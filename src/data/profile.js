/**
 * Personal details, links and site-wide settings.
 * Every value marked TODO is a placeholder you need to replace.
 */
export const profile = {
  name: "Deepanshu Kumar",
  firstName: "Deepanshu",
  initials: "DK",
  role: "Computer Science Student & Aspiring Software Developer",
  intro:
    "I build practical web applications and software projects while continuously improving my problem-solving and development skills.",
  location: "Delhi NCR , India",
  availability: "Open to internships",
  degree: "B.Tech CSE",
  currentYear: "4th Year",
  cgpa: "8.8",
  graduationYear: 2027,

  email: "deepanshukumar8705@gmail.com",

  // Shown in the contact section. `phoneHref` is the dialable form (with country code).
  phone: "+91 7579847908",
  phoneHref: "+917579847908",

  // Place your resume at /public/resume.pdf — it is served from the site root.
  resumeUrl: "/resume.pdf",

  // TODO: /profile.svg is a placeholder cartoon avatar — add your photo to /public
  // (e.g. /public/profile.jpg) and set "/profile.jpg".
  // While null, the hero shows the about.js code card instead.
  photo: "/profile.svg",

  githubUsername: "Deepanshukumar01",

  // TODO: optional — paste a form endpoint (e.g. Formspree: https://formspree.io/f/xxxxxxx)
  // to receive messages directly. While empty, the form opens the visitor's email app instead.
  contactFormEndpoint: "",
};

export const socialLinks = {
  github: "https://github.com/Deepanshukumar01",
  linkedin: "https://www.linkedin.com/in/deepanshukumar0001/",
};

/** Page sections in order — also used for the numbered section headings. */
export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];
