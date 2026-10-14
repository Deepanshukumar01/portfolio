import { useState } from "react";
import { projects } from "../data/projects.js";
import SectionHeading from "./SectionHeading.jsx";
import ProjectCard from "./ProjectCard.jsx";
import ProjectModal from "./ProjectModal.jsx";
import Reveal from "./Reveal.jsx";
import "./Projects.css";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          section="projects"
          id="projects-title"
          eyebrow="Projects"
          title="Things I've built"
          lead="Practical projects taken through the full process — understanding the problem, designing the data, building the backend and shipping an interface."
        />

        <ul role="list" className="projects__grid">
          {projects.map((project, index) => (
            <Reveal
              as="li"
              key={project.id}
              className={project.featured ? "projects__item--featured" : ""}
              delay={(index % 2) * 80}
            >
              <ProjectCard project={project} onViewDetails={setSelectedProject} />
            </Reveal>
          ))}
        </ul>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
