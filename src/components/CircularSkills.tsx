import { portfolioData } from '../data/portfolio';

const CircularSkills = () => {
    // Map colors to skill names for the new design
    const skillColors: { [key: string]: string } = {
        "HTML": '#E34F26',
        "CSS": '#1572B6',
        "JavaScript": '#F7DF1E',
        "React": '#61DAFB',
        "Node.js": '#339933',
        "Python": '#3776AB',
        "C++": '#00599C',
        "GitHub": '#181717',
        "VS Code": '#007ACC',
        "Tailwind": '#38B2AC'
    };

    const skills = portfolioData.skills;
    const outerSkills = skills.slice(0, 5);
    const innerSkills = skills.slice(5);

    return (
        <div className="min-h-[50vh] md:min-h-screen bg-background flex items-center justify-center p-4 md:p-8 transition-colors duration-300 overflow-hidden">
            <div className="w-full max-w-4xl">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-6 md:mb-10">
                    Technical Skills
                </h1>

                <div className="relative w-full aspect-square max-w-[300px] md:max-w-lg mx-auto">
                    {/* Outer circle track */}
                    <div className="absolute inset-0 rounded-full border-2 border-border/50"
                        style={{ margin: '10%' }} />

                    {/* Inner circle track */}
                    <div className="absolute inset-0 rounded-full border-2 border-border/50"
                        style={{ margin: '30%' }} />

                    {/* Center hub */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-200 via-yellow-100 to-amber-100 rounded-full border-4 border-border flex items-center justify-center shadow-lg">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-yellow-100 via-yellow-50 to-amber-50 rounded-full animate-pulse" />
                    </div>

                    {/* Outer ring skills */}
                    {outerSkills.map((skill, index) => {
                        const angle = (360 / outerSkills.length) * index;
                        const color = skillColors[skill.name] || '#ffffff';
                        const currentLogo = skill.logo;

                        return (
                            <div
                                key={skill.name}
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    transform: `rotate(${angle}deg)`
                                }}
                            >
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        animation: `rotate 20s linear infinite`
                                    }}
                                >
                                    <div
                                        className="absolute w-10 h-10 md:w-12 md:h-12 transition-transform hover:scale-125 cursor-pointer group pointer-events-auto flex items-center justify-center"
                                        style={{
                                            left: '50%',
                                            top: '10%',
                                            marginLeft: '-1.25rem', // Default for w-10
                                            marginTop: '-1.25rem',
                                            animation: `counterRotate 20s linear infinite`
                                        }}
                                    >
                                        {/* CSS to handle responsive margins */}
                                        <style>{`
                                            @media (min-width: 768px) {
                                                .skill-icon-outer-${index} { margin-left: -1.5rem !important; margin-top: -1.5rem !important; }
                                            }
                                        `}</style>
                                        <div
                                            className={`w-full h-full skill-icon-outer-${index}`}
                                            style={{
                                                transform: `rotate(${-angle}deg)`
                                            }}
                                        >
                                            <div
                                                className="w-full h-full rounded-2xl bg-card border-2 border-border/50 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all group-hover:z-50 relative"
                                                style={{
                                                    borderColor: color + '40'
                                                }}
                                            >
                                                <img
                                                    src={currentLogo}
                                                    alt={skill.name}
                                                    className="w-5 h-5 md:w-6 md:h-6 object-contain drop-shadow-md"
                                                />
                                            </div>
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform group-hover:translate-y-1 z-50">
                                                <span className="text-[10px] md:text-xs font-semibold text-white bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg border border-white/10 uppercase tracking-wider">
                                                    {skill.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Inner ring skills */}
                    {innerSkills.map((skill, index) => {
                        const angle = (360 / innerSkills.length) * index;
                        const color = skillColors[skill.name] || '#ffffff';
                        const currentLogo = skill.logo;

                        return (
                            <div
                                key={skill.name}
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    transform: `rotate(${angle}deg)`
                                }}
                            >
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        animation: `rotateReverse 15s linear infinite`
                                    }}
                                >
                                    <div
                                        className="absolute w-10 h-10 md:w-12 md:h-12 transition-transform hover:scale-125 cursor-pointer group pointer-events-auto flex items-center justify-center"
                                        style={{
                                            left: '50%',
                                            top: '30%',
                                            marginLeft: '-1.25rem',
                                            marginTop: '-1.25rem',
                                            animation: `counterRotateReverse 15s linear infinite`
                                        }}
                                    >
                                        {/* CSS to handle responsive margins */}
                                        <style>{`
                                            @media (min-width: 768px) {
                                                .skill-icon-inner-${index} { margin-left: -1.5rem !important; margin-top: -1.5rem !important; }
                                            }
                                        `}</style>
                                        <div
                                            className={`w-full h-full skill-icon-inner-${index}`}
                                            style={{
                                                transform: `rotate(${-angle}deg)`
                                            }}
                                        >
                                            <div
                                                className="w-full h-full rounded-xl bg-card border-2 border-border/50 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:z-50 relative"
                                                style={{ borderColor: color + '40' }}
                                            >
                                                <img
                                                    src={currentLogo}
                                                    alt={skill.name}
                                                    className="w-5 h-5 md:w-6 md:h-6 object-contain drop-shadow-md"
                                                />
                                            </div>
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform group-hover:translate-y-1 z-50">
                                                <span className="text-[10px] md:text-xs font-semibold text-white bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg border border-white/10 uppercase tracking-wider">
                                                    {skill.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>


            </div>
        </div>
    );
};

export default CircularSkills;