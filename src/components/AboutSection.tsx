import { useState } from 'react';
import { portfolioData } from '../data/portfolio';
import { Reveal } from './Reveal';

const AboutSection = () => {
    const { aboutSection } = portfolioData.personal;
    const [expanded, setExpanded] = useState(false);
    const previewParagraphs = aboutSection.description.slice(0, 2);
    const hiddenParagraphs = aboutSection.description.slice(2);
    const visibleParagraphs = expanded ? aboutSection.description : previewParagraphs;

    return (
        <section id="about" className="scroll-mt-20">
            <Reveal width="100%">
                <h2 className="text-3xl text-center font-bold text-primary mb-10">
                    {aboutSection.title}
                </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Visual Side (Image/Decoration) */}
                <Reveal width="100%">
                    <div className="relative max-w-sm mx-auto">
                        <div className="relative rounded-2xl overflow-hidden aspect-square md:aspect-[4/5]">
                            <img
                                src={aboutSection.profileImage}
                                alt={portfolioData.personal.name}
                                className="w-full h-full object-cover"
                            />

                            
                        </div>
                    </div>
                </Reveal>

                {/* Content Side */}
                <div className="space-y-8">
                    <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                        {visibleParagraphs.map((paragraph, index) => (
                            <Reveal width="100%" key={index}>
                                <p>{paragraph}</p>
                            </Reveal>
                        ))}
                        {hiddenParagraphs.length > 0 && (
                            <Reveal width="100%">
                                <button
                                    type="button"
                                    onClick={() => setExpanded((prev) => !prev)}
                                    className="text-primary font-semibold hover:text-primary/80 transition-all duration-300 inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/45 active:scale-[0.97] text-sm select-none"
                                >
                                    <span>{expanded ? 'Read less' : 'Read more...'}</span>
                                    <span className={`inline-block text-xs transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
                                        ▼
                                    </span>
                                </button>
                            </Reveal>
                        )}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4">
                        {aboutSection.stats.map((stat, index) => (
                            <Reveal width="100%" key={index} delay={0.1 * index}>
                                <div className="p-2.5 sm:p-4 rounded-xl bg-secondary/50 border border-border/50 text-center hover:bg-secondary/80 transition-colors">
                                    <h4 className="text-base sm:text-2xl md:text-3xl font-bold text-primary mb-1">
                                        {stat.value}
                                    </h4>
                                    <span className="text-[9px] sm:text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider block truncate">
                                        {stat.label}
                                    </span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
