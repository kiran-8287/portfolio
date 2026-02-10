import { portfolioData, technologyLogos } from './data/portfolio';
import CircularSkills from './components/CircularSkills';
import AboutSection from './components/AboutSection';
import { useEffect, useState } from 'react';
import ContactSection from './components/ContactSection';
import ProjectModal from './components/ProjectModal';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import CustomCursor from './components/CustomCursor';
import MeshBackground from './components/MeshBackground';
import Magnetic from './components/Magnetic';
import { Reveal } from './components/Reveal';
import Preloader from './components/Preloader';
import { AnimatePresence } from 'framer-motion';
import ProjectImage from './components/ProjectImage';

function App() {
  const { experience, education, projects } = portfolioData;

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleViewMore = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  useEffect(() => {
    // Card tilt logic removed
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300 relative">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <CustomCursor />
          <MeshBackground />
          <Navbar />
          <HeroSection />

          <main className="container mx-auto max-w-6xl p-4 md:p-12 space-y-20 md:space-y-32 relative z-10">

            {/* About Section */}
            <AboutSection />

            {/* Experience */}
            <section id="experience" className="scroll-mt-20">
              <Reveal width="100%">
                <h2 className="text-3xl text-center font-bold text-primary mb-10">Work Experience</h2>
              </Reveal>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <Reveal width="100%" key={exp.id}>
                    <div
                      className="portfolio-card spotlight-card rounded-2xl border bg-card/50 backdrop-blur-md text-card-foreground shadow-sm p-6 hover:shadow-xl transition-all duration-300"
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                        e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
                      }}
                    >
                      <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="portfolio-card-icon w-12 h-12 bg-muted rounded flex items-center justify-center text-xs overflow-hidden shrink-0">
                              {exp.image ? <img src={exp.image} alt={exp.title} className="w-full h-full object-contain" /> : "Logo"}
                            </div>
                            <div>
                              <h3 className="font-semibold text-xl">{exp.title}</h3>
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                <p className="text-muted-foreground font-medium">{exp.role}</p>
                                {exp.period && (
                                  <>
                                    <span className="hidden md:inline text-muted-foreground/30">•</span>
                                    <span className="text-xs font-medium text-primary/80 bg-primary/5 px-2 py-0.5 rounded-full">{exp.period}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground whitespace-nowrap md:text-right">
                            {exp.location}
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Education */}
            <section id="education" className="scroll-mt-20">
              <Reveal width="100%">
                <h2 className="text-3xl text-center font-bold text-primary mb-10">Education</h2>
              </Reveal>
              <div className="space-y-6">
                {education.map((edu) => (
                  <Reveal width="100%" key={edu.id}>
                    <div
                      className="portfolio-card spotlight-card rounded-2xl border bg-card/50 backdrop-blur-md text-card-foreground shadow-sm p-6 hover:shadow-xl transition-all duration-300"
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                        e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
                      }}
                    >
                      <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="portfolio-card-icon w-12 h-12 bg-muted rounded flex items-center justify-center text-xs overflow-hidden shrink-0">
                              {edu.image ? <img src={edu.image} alt={edu.institution} className="w-full h-full object-contain" /> : "Logo"}
                            </div>
                            <div>
                              <h3 className="font-semibold text-xl">{edu.institution}</h3>
                              <p className="text-muted-foreground font-medium">{edu.degree}</p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-sm text-muted-foreground">{edu.period}</div>
                            <div className="text-sm text-muted-foreground">{edu.location}</div>
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{edu.details}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>



            {/* Projects */}
            <section id="projects" className="scroll-mt-20">
              <Reveal width="100%">
                <h2 className="text-3xl text-center font-bold text-primary mb-10">Projects</h2>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => {
                  return (
                    <Reveal width="100%" key={project.id}>
                      <div
                        className="project-card spotlight-card h-full rounded-2xl border dark:border-white/20 bg-card/50 backdrop-blur-md text-card-foreground shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                          e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
                        }}
                      >
                        {/* Project Image */}
                        <div className="project-image-container relative h-64 overflow-hidden">
                          <ProjectImage
                            src={project.image}
                            alt={project.name}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 z-20">
                            <div className="flex gap-2">
                              {project.links.github && (
                                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all">
                                  <img
                                    src={technologyLogos['GitHub']}
                                    alt="GitHub"
                                    className="w-5 h-5 invert-0"
                                  />
                                </a>
                              )}
                              {project.links.demo && (
                                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Project Content */}
                        <div className="p-6 flex flex-col flex-grow relative z-10">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold">{project.name}</h3>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/50">{project.category}</span>
                          </div>

                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.technologies.map((tech) => (
                              <span key={tech} className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary/50 text-secondary-foreground border border-border/30">
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="mt-auto">
                            <Magnetic>
                              <button
                                onClick={() => handleViewMore(project)}
                                className="w-full py-2 px-4 rounded-xl font-medium text-sm bg-[#000000] text-white dark:bg-white dark:text-black hover:shadow-lg hover:opacity-90 transition-all border border-black"
                              >
                                Explore Project
                              </button>
                            </Magnetic>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </section>

            {/* Skills */}
            <CircularSkills />

            {/* Contact */}
            <div id="contact">
              <ContactSection />
            </div>

          </main>

          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />

          <Footer />
          <BackToTop />
        </>
      )}
    </div >
  );
}

export default App;
