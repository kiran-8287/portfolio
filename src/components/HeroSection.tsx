import { portfolioData } from '../data/portfolio';
import HeroFlowField from './HeroFlowField';
import { Reveal } from './Reveal';
import { useTypewriter } from '../hooks/useTypewriter';
import GooeyButton from './GooeyButton';

const HeroSection = () => {
    const { personal } = portfolioData;
    const titles = personal.typingText || ['Full-Stack Developer'];
    const displayText = useTypewriter(titles);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-[100vh] flex flex-col items-center justify-center pt-24 pb-12 px-4 overflow-hidden bg-transparent">
            <HeroFlowField />

            <div className="container mx-auto max-w-4xl relative z-10 text-center">
                <div className="mb-6 animate-in fade-in slide-in-from-top duration-1000 delay-100">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(29,158,117,0.08)] border border-[rgba(29,158,117,0.28)] text-[#0F6E56] shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="hero-pill-dot absolute inline-flex h-full w-full rounded-full bg-[#1D9E75] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1D9E75]" />
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                            Available for new opportunities
                        </span>
                    </div>
                </div>

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

                <div className="hero-profile-container mx-auto mb-10 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 animate-in zoom-in duration-1000">
                    <div className="profile-glow" />
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
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">
                            Hi, I'm <span className="text-[#87CEEB]">{personal.name.split(' ').slice(0, 2).join(' ')}</span> 👋
                        </h1>
                    </Reveal>

                    <Reveal width="100%">
                        <div className="min-h-[3.5rem] md:min-h-[4rem] flex items-center justify-center px-2">
                            <p className="font-mono text-xs sm:text-base md:text-xl text-[#0F6E56] tracking-wide">
                                <span className="typing-cursor">{displayText}</span>
                            </p>
                        </div>
                    </Reveal>

                    <Reveal width="100%">
                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Building scalable solutions at the intersection of data and code
                        </p>
                    </Reveal>

                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 pt-4">
                        {personal.links.email && (
                            <GooeyButton href={personal.links.email} className="inline-flex items-center justify-center text-xs sm:text-sm font-medium border border-border h-10 rounded-full px-3.5 sm:px-4 gap-2 transition-all shadow-sm bg-card text-card-foreground hover:bg-muted">
                                {personal.icons?.email && <img src={personal.icons.email} alt="Email" className="w-4 h-4" />}
                                Email
                            </GooeyButton>
                        )}
                        <GooeyButton href={personal.links.resume} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-xs sm:text-sm font-medium border border-border h-10 rounded-full px-3.5 sm:px-4 gap-2 transition-all shadow-sm bg-card text-card-foreground hover:bg-muted">
                            {personal.icons?.resume && <img src={personal.icons.resume} alt="Resume" className="w-4 h-4" />}
                            Resume
                        </GooeyButton>
                        <GooeyButton href={personal.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-xs sm:text-sm font-medium border border-border h-10 rounded-full px-3.5 sm:px-4 gap-2 transition-all shadow-sm bg-card text-card-foreground hover:bg-muted">
                            {personal.icons?.linkedin && <img src={personal.icons.linkedin} alt="LinkedIn" className="w-4 h-4" />}
                            LinkedIn
                        </GooeyButton>
                        <GooeyButton href={personal.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-xs sm:text-sm font-medium border border-border h-10 rounded-full px-3.5 sm:px-4 gap-2 transition-all shadow-sm bg-card text-card-foreground hover:bg-muted">
                            {personal.icons?.github && (
                                <img
                                    src={personal.icons.github}
                                    alt="GitHub"
                                    className="w-4 h-4"
                                />
                            )}
                            GitHub
                        </GooeyButton>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-8">
                        <GooeyButton
                            onClick={() => scrollToSection('projects')}
                            className="h-12 px-6 sm:px-8 rounded-full bg-black text-white font-semibold hover:opacity-90 transition-all shadow-lg"
                        >
                            View Projects →
                        </GooeyButton>
                        <GooeyButton
                            onClick={() => scrollToSection('contact')}
                            className="h-12 px-6 sm:px-8 rounded-full bg-white border border-gray-300 font-semibold hover:bg-gray-50 transition-all shadow-md flex items-center gap-2 text-black"
                        >
                            Get In Touch
                        </GooeyButton>
                    </div>

                    <div className="hero-scroll-hint flex flex-col items-center gap-1 pt-6 opacity-40">
                        <span className="text-base text-[#534AB7]">↓</span>
                        <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">scroll</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
