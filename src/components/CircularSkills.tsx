import { useState } from 'react';

const SKILLS = {
    inner: [
        { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', color: '#00599C', note: '230+ LeetCode' },
        { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB', note: 'Data Science' },
        { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#F7DF1E', note: 'ES2023+' },
        { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178C6', note: 'Type-safe dev' },
    ],
    middle: [
        { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB', note: 'v18 & v19' },
        { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933', note: 'Express APIs' },
        { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#38B2AC', note: 'CSS framework' },
        { name: 'Vite', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg', color: '#646CFF', note: 'Build tool' },
        { name: 'Express', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', color: '#000000', note: 'REST APIs' },
    ],
    outer: [
        { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#336791', note: 'Triggers + SQL' },
        { name: 'Supabase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', color: '#3ECF8E', note: 'Realtime + Auth' },
        { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#F05032', note: 'Version control' },
        { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: '#181717', note: 'CI/CD + PRs' },
        { name: 'Vercel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', color: '#000000', note: 'Deployments' },
        { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: '#E34F26', note: 'Semantic HTML' },
        { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: '#1572B6', note: 'Responsive UI' },
    ],
};

type Skill = { name: string; logo: string; color: string; note: string };

interface OrbitRingProps {
    skills: Skill[];
    radiusPct: number;
    duration: number;
    reverse?: boolean;
    iconSize: number;
}

function OrbitRing({ skills, radiusPct, duration, reverse = false, iconSize }: OrbitRingProps) {
    const [hovered, setHovered] = useState<string | null>(null);
    const dir = reverse ? 'reverse' : 'normal';
    const counterDir = reverse ? 'normal' : 'reverse';

    return (
        <>
            {skills.map((skill, i) => {
                const angleDeg = (360 / skills.length) * i;
                const isHovered = hovered === skill.name;

                return (
                    <div
                        key={skill.name}
                        className="absolute inset-0 pointer-events-none"
                        style={{ transform: `rotate(${angleDeg}deg)` }}
                    >
                        <div
                            className="absolute inset-0"
                            style={{
                                animation: `orbitSpin ${duration}s linear infinite`,
                                animationDirection: dir,
                            }}
                        >
                            <div
                                className="absolute pointer-events-auto"
                                style={{
                                    left: '50%',
                                    top: `${radiusPct}%`,
                                    width: iconSize,
                                    height: iconSize,
                                    marginLeft: -iconSize / 2,
                                    marginTop: -iconSize / 2,
                                    animation: `orbitSpin ${duration}s linear infinite`,
                                    animationDirection: counterDir,
                                }}
                                onMouseEnter={() => setHovered(skill.name)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <div
                                    style={{
                                        transform: `rotate(${-angleDeg}deg)`,
                                        width: '100%',
                                        height: '100%',
                                        position: 'relative',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 14,
                                            background: isHovered ? `${skill.color}15` : '#ffffff',
                                            border: `1.5px solid ${isHovered ? `${skill.color}60` : '#e5e5e5'}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: isHovered
                                                ? `0 0 0 3px ${skill.color}20, 0 8px 24px ${skill.color}25`
                                                : '0 2px 8px rgba(0,0,0,0.08)',
                                            transform: isHovered ? 'scale(1.22)' : 'scale(1)',
                                            transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                                            cursor: 'pointer',
                                            zIndex: isHovered ? 50 : 1,
                                            position: 'relative',
                                        }}
                                    >
                                        <img
                                            src={skill.logo}
                                            alt={skill.name}
                                            style={{
                                                width: iconSize * 0.52,
                                                height: iconSize * 0.52,
                                                objectFit: 'contain',
                                            }}
                                        />
                                    </div>

                                    {isHovered && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: 'calc(100% + 8px)',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                background: '#111',
                                                color: '#fff',
                                                borderRadius: 8,
                                                padding: '5px 10px',
                                                fontSize: 11,
                                                whiteSpace: 'nowrap',
                                                pointerEvents: 'none',
                                                zIndex: 100,
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                            }}
                                        >
                                            <div style={{ fontWeight: 600, marginBottom: 1 }}>{skill.name}</div>
                                            <div style={{ opacity: 0.65, fontSize: 10 }}>{skill.note}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

const ORBIT_RADII = {
    outer: 6,
    middle: 23,
    inner: 40,
};

const ORBITS = [
    {
        key: 'outer',
        label: 'Tools & DB',
        color: '#888888',
        radius: ORBIT_RADII.outer,
        skills: SKILLS.outer,
        duration: 40,
        reverse: false,
        iconSize: 40,
    },
    {
        key: 'middle',
        label: 'Frameworks',
        color: '#0F6E56',
        radius: ORBIT_RADII.middle,
        skills: SKILLS.middle,
        duration: 30,
        reverse: true,
        iconSize: 44,
    },
    {
        key: 'inner',
        label: 'Languages',
        color: '#534AB7',
        radius: ORBIT_RADII.inner,
        skills: SKILLS.inner,
        duration: 22,
        reverse: false,
        iconSize: 48,
    },
] as const;

const LEGEND = [
    { label: 'Languages', color: '#534AB7' },
    { label: 'Frameworks', color: '#0F6E56' },
    { label: 'Tools & DB', color: '#888888' },
];

const CircularSkills = () => {
    return (
        <section className="min-h-screen bg-white flex items-center justify-center px-8 py-16 flex-col">
            <div className="text-center mb-10">
                <p className="font-mono text-xs text-gray-400 mb-1.5 tracking-widest">
                    {'// the tools I actually use'}
                </p>
                <h2 className="font-serif text-[clamp(22px,3vw,32px)] font-bold text-gray-900 tracking-tight">
                    My Tech Stack
                </h2>
            </div>

            <div
                className="relative w-[min(520px,90vw)] h-[min(520px,90vw)]"
            >
                {ORBITS.map((orbit) => (
                    <div
                        key={orbit.key}
                        className="absolute rounded-full border border-dashed"
                        style={{
                            inset: `${orbit.radius}%`,
                            borderColor: `${orbit.color}55`,
                        }}
                    />
                ))}

                <div className="skills-orbit-hub absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold text-[#534AB7] font-mono tracking-tight z-10">
                    SKV
                </div>

                {ORBITS.map((orbit) => (
                    <OrbitRing
                        key={orbit.key}
                        skills={orbit.skills}
                        radiusPct={orbit.radius}
                        duration={orbit.duration}
                        reverse={orbit.reverse}
                        iconSize={orbit.iconSize}
                    />
                ))}
            </div>

            <div className="flex gap-6 mt-10 flex-wrap justify-center">
                {LEGEND.map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span
                            className="w-2 h-2 rounded-full inline-block"
                            style={{ background: item.color }}
                        />
                        {item.label}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CircularSkills;
