import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import GitHub from "./components/GitHub.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Toaster from "./components/Toaster.jsx";
import SectionRail from "./components/SectionRail.jsx";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="backdrop" aria-hidden="true" />
      <Navbar />
      <SectionRail />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <GitHub />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
