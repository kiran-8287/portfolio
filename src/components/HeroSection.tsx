import { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolio';
import Magnetic from './Magnetic';
import HeroCanvas from './HeroCanvas';
import { Reveal } from './Reveal';

const HeroSection = () => {
    const { personal } = portfolioData;
    const [titleIndex, setTitleIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const titles = personal.typingText || ["Full-Stack Developer", "Data Science Student"];

    useEffect(() => {
        const handleTyping = () => {
            const currentTitle = titles[titleIndex];
            if (isDeleting) {
                setDisplayText(currentTitle.substring(0, displayText.length - 1));
                setTypingSpeed(50);
            } else {
                setDisplayText(currentTitle.substring(0, displayText.length + 1));
                setTypingSpeed(150);
            }

            if (!isDeleting && displayText === currentTitle) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && displayText === '') {
                setIsDeleting(false);
                setTitleIndex((prev) => (prev + 1) % titles.length);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, titleIndex, titles, typingSpeed]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-[100vh] flex flex-col items-center justify-center pt-20 pb-12 px-4 overflow-hidden bg-transparent">
            {/* 3D Background */}
            <HeroCanvas />

            {/* Animated Background Mesh Foundation */}
            <div className="mesh-gradient-bg absolute inset-0 -z-10 opacity-50">
                <div className="mesh-ball mesh-1"></div>
                <div className="mesh-ball mesh-2"></div>
                <div className="mesh-ball mesh-3"></div>
            </div>

            <div className="container mx-auto max-w-4xl relative z-10 text-center">
                {/* Status Badge */}
                <div className="mb-6 animate-in fade-in slide-in-from-top duration-1000 delay-100">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                        <span className="relative flex h-2 w-2">
                            <span className="status-dot-pulse absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 dark:text-green-400">
                            Available for new opportunities
                        </span>
                    </div>
                </div>

                {/* Social Proof Badge */}
                {personal.badge && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 mb-8 badge-glow animate-in fade-in slide-in-from-top duration-1000">
                        {personal.badge.icon && (
                            <img
                                src={personal.badge.icon}
                                alt="Badge Icon"
                                className="w-5 h-5 rounded-full object-cover"
                            />
                        )}
                        <span className="text-sm font-medium text-primary">
                            {personal.badge.label}
                        </span>
                    </div>
                )}

                {/* Profile Image with Glow */}
                <div className="hero-profile-container mx-auto mb-10 w-40 h-40 md:w-48 md:h-48 animate-in zoom-in duration-1000">
                    <div className="profile-glow"></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl">
                        {personal.avatar ? (
                            <img
                                src={personal.avatar}
                                alt={personal.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center text-5xl font-bold text-muted-foreground">
                                {personal.name.charAt(0)}
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <Reveal width="100%">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                            Hi, I'm <span className="text-primary">{personal.name}</span> 👋
                        </h1>
                    </Reveal>

                    <Reveal width="100%">
                        <div className="min-h-[3rem] md:min-h-[4rem] flex items-center justify-center">
                            <p className="text-2xl md:text-4xl font-semibold text-muted-foreground">
                                I am a <span className="text-foreground typing-cursor">{displayText}</span>
                            </p>
                        </div>
                    </Reveal>

                    <Reveal width="100%">
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Building scalable solutions at the intersection of data and code
                        </p>
                    </Reveal>

                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        {personal.links.email && (
                            <Magnetic>
                                <a href={personal.links.email} className="inline-flex items-center justify-center text-sm font-medium border border-gray-200 h-10 rounded-full px-4 gap-2 transition-all shadow-sm" style={{ backgroundColor: 'white', color: 'black' }}>
                                    {personal.icons?.email && <img src={personal.icons.email} alt="Email" className="w-4 h-4" />}
                                    Email
                                </a>
                            </Magnetic>
                        )}
                        <Magnetic>
                            <a href={personal.links.resume} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-sm font-medium border border-gray-200 h-10 rounded-full px-4 gap-2 transition-all shadow-sm" style={{ backgroundColor: 'white', color: 'black' }}>
                                {personal.icons?.resume && <img src={personal.icons.resume} alt="Resume" className="w-4 h-4" />}
                                Resume
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a href={personal.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-sm font-medium border border-gray-200 h-10 rounded-full px-4 gap-2 transition-all shadow-sm" style={{ backgroundColor: 'white', color: 'black' }}>
                                {personal.icons?.linkedin && <img src={personal.icons.linkedin} alt="LinkedIn" className="w-4 h-4" />}
                                LinkedIn
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a href={personal.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-sm font-medium border border-gray-200 h-10 rounded-full px-4 gap-2 transition-all shadow-sm" style={{ backgroundColor: 'white', color: 'black' }}>
                                {personal.icons?.github && (
                                    <img
                                        src={personal.icons.github}
                                        alt="GitHub"
                                        className="w-4 h-4 invert-0"
                                    />
                                )}
                                GitHub
                            </a>
                        </Magnetic>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
                        <Magnetic>
                            <button
                                onClick={() => scrollToSection('projects')}
                                className="h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 dark:bg-white dark:text-black dark:hover:bg-gray-100"
                            >
                                View Projects
                            </button>
                        </Magnetic>
                        <Magnetic>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="h-12 px-8 rounded-full bg-background border border-border font-semibold hover:bg-accent hover:text-accent-foreground transition-all shadow-md flex items-center gap-2 dark:bg-white dark:text-black dark:border-white dark:hover:bg-gray-100"
                            >
                                Get In Touch
                            </button>
                        </Magnetic>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default HeroSection;
