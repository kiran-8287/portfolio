import { useState, useEffect } from 'react';
import { technologyLogos } from '../data/portfolio';

interface Project {
    id: string;
    name: string;
    category: string;
    description: string;
    fullDescription?: string;
    technologies: string[];
    image: string;
    images: string[];
    status: string;
    links: {
        github?: string;
        githubLinks?: { label: string; url: string }[];
        video?: string;
        demo?: string;
    };
}

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            setCurrentImageIndex(0);
            setIsImageLoading(true);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Slight delay to allow animation to clear if needed, but safer to clear immediately
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen || !project) return null;

    const handleNextImage = () => {
        setIsImageLoading(true);
        setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
    };

    const handlePrevImage = () => {
        setIsImageLoading(true);
        setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8" aria-modal="true" role="dialog">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-[95vw] h-[85vh] bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">

                {/* LEFT SIDE: Image Gallery (Dark Background) */}
                <div className="w-full md:w-[65%] h-[40vh] md:h-full bg-black relative flex items-center justify-center p-4">
                    {/* Navigation Buttons */}
                    {project.images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                                className="absolute left-4 z-10 p-2 rounded-full bg-white text-black hover:bg-gray-100 transition-all hover:scale-110 shadow-lg"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                                className="absolute right-4 z-10 p-2 rounded-full bg-white text-black hover:bg-gray-100 transition-all hover:scale-110 shadow-lg"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </>
                    )}

                    {/* Main Image */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        {isImageLoading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                            </div>
                        )}
                        <img
                            src={project.images[currentImageIndex]}
                            alt={project.name}
                            className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                            onLoad={() => setIsImageLoading(false)}
                        />
                    </div>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur text-white text-xs px-3 py-1 rounded-full">
                        {currentImageIndex + 1} / {project.images.length}
                    </div>
                </div>

                {/* RIGHT SIDE: Content (Scrollable) */}
                <div className="w-full md:w-[35%] h-full bg-white text-black border-l border-gray-200 flex flex-col relative">
                    {/* Close Button (Mobile pinned / Desktop standard) */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-muted transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-3">{project.name}</h2>
                            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-secondary text-secondary-foreground">
                                {project.category}
                            </span>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                            <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                                {project.fullDescription || project.description}
                            </div>
                        </div>

                        {/* Links Section */}
                        {(project.links.github || project.links.githubLinks || project.links.demo) && (
                            <div className="flex flex-wrap gap-3">
                                {project.links.github && !project.links.githubLinks && (
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors shadow-sm"
                                    >
                                        <img
                                            src={technologyLogos['GitHub']}
                                            alt="GitHub"
                                            className="w-5 h-5"
                                        />
                                        GitHub
                                    </a>
                                )}
                                {project.links.githubLinks?.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors shadow-sm"
                                    >
                                        <img
                                            src={technologyLogos['GitHub']}
                                            alt="GitHub"
                                            className="w-5 h-5"
                                        />
                                        {link.label}
                                    </a>
                                ))}
                                {project.links.video && (
                                    <a
                                        href={project.links.video}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-medium transition-colors shadow-sm"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Demo Video
                                    </a>
                                )}
                                {project.links.demo && (
                                    <a
                                        href={project.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 font-medium transition-all shadow-sm"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        <span>Live Demo</span>
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Technologies */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map(tech => (
                                    <span key={tech} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50 border border-border text-secondary-foreground text-sm font-medium">
                                        {technologyLogos[tech] && (
                                            <img
                                                src={technologyLogos[tech]}
                                                alt={tech}
                                                className="w-4 h-4 object-contain"
                                            />
                                        )}
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Project Info Table */}
                        <div className="border-t pt-6 mt-auto">
                            <h3 className="text-lg font-semibold mb-4">Project Info</h3>
                            <div className="grid grid-cols-1 gap-y-4">
                                <div className="flex justify-between items-center group">
                                    <span className="text-muted-foreground font-medium">Category</span>
                                    <span className="font-semibold text-foreground">{project.category}</span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <span className="text-muted-foreground font-medium">Images</span>
                                    <span className="font-semibold text-foreground">{project.images.length}</span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <span className="text-muted-foreground font-medium">Status</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(project.status)}`}>
                                        {project.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
