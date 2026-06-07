import { useState, useEffect } from 'react';
import { technologyLogos } from '../data/portfolio';
import GooeyButton from './GooeyButton';

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
            case 'completed': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'in-progress': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            default: return 'bg-muted text-muted-foreground border-border';
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
            <div className="relative w-full max-w-[95vw] h-[85vh] bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300 border border-border/40">
                {/* Global Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-[60] p-2.5 rounded-full text-white bg-black/45 hover:bg-black/60 md:text-foreground md:bg-transparent md:hover:bg-muted border border-white/10 md:border-transparent transition-all active:scale-90 shadow-md md:shadow-none cursor-pointer"
                    aria-label="Close modal"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* LEFT SIDE: Image Gallery (Dark Background) */}
                <div className="w-full md:w-[65%] h-[32vh] md:h-full bg-black relative flex items-center justify-center p-4 shrink-0">
                    {/* Navigation Buttons */}
                    {project.images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                                className="absolute left-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-black hover:scale-105 transition-all shadow-lg active:scale-95 border border-white/20 cursor-pointer"
                                aria-label="Previous image"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                                className="absolute right-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-black hover:scale-105 transition-all shadow-lg active:scale-95 border border-white/20 cursor-pointer"
                                aria-label="Next image"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
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
                <div className="w-full md:w-[35%] flex-1 min-h-0 md:h-full bg-card text-card-foreground border-t md:border-t-0 md:border-l border-border/60 flex flex-col relative">
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
                                    <GooeyButton
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
                                    </GooeyButton>
                                )}
                                {project.links.githubLinks?.map((link, idx) => (
                                    <GooeyButton
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
                                    </GooeyButton>
                                ))}
                                {project.links.video && (
                                    <GooeyButton
                                        href={project.links.video}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-medium transition-colors shadow-sm"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Demo Video
                                    </GooeyButton>
                                )}
                                {project.links.demo && (
                                    <GooeyButton
                                        href={project.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 font-medium transition-all shadow-sm"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        <span>Live Demo</span>
                                    </GooeyButton>
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
