import cppLogo from '../assets/logos/cpp.svg';
import cssLogo from '../assets/logos/css.svg';
import githubLogo from '../assets/logos/github.svg';
import htmlLogo from '../assets/logos/html.svg';
import nodejsLogo from '../assets/logos/nodejs.svg';
import pythonLogo from '../assets/logos/python.svg';
import reactLogo from '../assets/logos/react.svg';
import jsLogo from '../assets/logos/js.svg';
import vscodeLogo from '../assets/logos/vscode.svg';
import tailwindLogo from '../assets/logos/tailwind.svg';
import linkedinLogo from '../assets/logos/linkedin.svg';
import mailLogo from '../assets/logos/mail.svg';
import resumeLogo from '../assets/logos/resume.png';
import svelteLogo from '../assets/logos/svelte.svg';
import viteLogo from '../assets/logos/vite.svg';
import profilePicture from '../assets/profile/profile.jpg';

// Project images
import finVoiceImg1 from '../assets/projects ss/poject1/p1.png';
import finVoiceImg2 from '../assets/projects ss/poject1/p2.png';
import finVoiceImg3 from '../assets/projects ss/poject1/p3.png';
import finVoiceImg4 from '../assets/projects ss/poject1/p4.png';

import rubiksImg1 from '../assets/projects ss/poject2/rb1.png';
import rubiksImg2 from '../assets/projects ss/poject2/rb2.png';
import rubiksImg3 from '../assets/projects ss/poject2/rb3.png';
import rubiksImg4 from '../assets/projects ss/poject2/rb4.png';

import iacImg1 from '../assets/projects ss/poject3/iac1.png';
import iacImg2 from '../assets/projects ss/poject3/iac2.png';
import iacImg3 from '../assets/projects ss/poject3/iac3.png';

import alumniImg1 from '../assets/projects ss/poject4/iar1.png';
import alumniImg2 from '../assets/projects ss/poject4/iar2.png';
import alumniImg3 from '../assets/projects ss/poject4/iar3.png';
import alumniImg4 from '../assets/projects ss/poject4/iar4.png';
import alumniImg5 from '../assets/projects ss/poject4/iar5.png';

// Project 5 images
import luminaImg1 from '../assets/projects ss/poject5/Screenshot 2026-02-07 114817.png';
import luminaImg2 from '../assets/projects ss/poject5/Screenshot 2026-02-07 131107.png';
import luminaImg3 from '../assets/projects ss/poject5/Screenshot 2026-02-07 131123.png';
import luminaImg4 from '../assets/projects ss/poject5/Screenshot 2026-02-07 131148.png';
import luminaImg5 from '../assets/projects ss/poject5/supabase-schema-vrqbatdytpuflgewhcnk.png';

// Project 6 images
import portImg1 from '../assets/projects ss/project6/Screenshot 2026-02-01 133209.png';
import portImg2 from '../assets/projects ss/project6/Screenshot 2026-02-10 201423.png';
import portImg3 from '../assets/projects ss/project6/Screenshot 2026-02-10 201342.png';

// Technology logos map
export const technologyLogos: Record<string, string> = {
    'React': reactLogo,
    'TypeScript': jsLogo, // Using JS logo as fallback
    'Vite': viteLogo,
    'JavaScript': jsLogo,
    'Svelte': svelteLogo,
    'CSS3': cssLogo,
    'HTML5': htmlLogo,
    'Node.js': nodejsLogo,
    'C++': cppLogo,
    'Python': pythonLogo,
    'GitHub': githubLogo,
    'VS Code': vscodeLogo,
    'Tailwind': tailwindLogo,
};

export const portfolioData = {
    personal: {
        name: "Sai Kiran Vullengala",
        title: "Data Science Student",
        location: "IIT Palakkad, India",
        email: "saikiranvullengala@gmail.com",
        about: "I am a Data Science student at the Indian Institute of Technology Palakkad, where I specialize in building scalable solutions at the intersection of data and code. My expertise spans from crafting intuitive full-stack web applications with React and Node.js to implementing complex algorithms in C++ and Python. I'm passionate about solving real-world problems through efficient, maintainable code and am constantly exploring new technologies to stay at the forefront of the industry. Currently, I'm focusing on AI integration and high-performance system architecture.",
        aboutSection: {
            title: "About Me",
            description: [
                "I am a results-driven Data Science student at IIT Palakkad with a strong passion for building scalable software solutions. My journey blends rigorous academic coursework with practical, hands-on development experience.",
                "I thrive on solving complex problems—whether through optimizing algorithms, designing intuitive user interfaces, or architecting robust backend systems. My goal is to leverage technology to create impactful applications that bridge the gap between data and real-world utility."
            ],
            stats: [
                { label: "Experience", value: "1+ Years" },
                { label: "Projects", value: "10+" },
                { label: "DSA Problems", value: "220+" }
            ],
            profileImage: profilePicture
        },
        links: {
            github: "https://github.com/kiran-8287",
            linkedin: "https://www.linkedin.com/in/saikiran-vullengala",
            resume: "https://ugsufdqwqaiqbawfsxwp.supabase.co/storage/v1/object/public/user-files/de73d95d-9cf7-42f7-85d4-ff56b022be32/cv/saikiran-resume.pdf-1768322017103.pdf",
            email: "mailto:saikiranvullengala@gmail.com"
        },
        icons: {
            linkedin: linkedinLogo,
            email: mailLogo,
            resume: resumeLogo,
            github: githubLogo
        },
        typingText: [
            "Full-Stack Developer",
            "Data Science Student",
            "Problem Solver",
            "Scalable Systems Builder"
        ],
        badge: {
            label: "Student at IIT Palakkad",
            icon: "https://ugsufdqwqaiqbawfsxwp.supabase.co/storage/v1/object/public/user-files/de73d95d-9cf7-42f7-85d4-ff56b022be32/education/ce284441-0f30-46e1-9af5-3941df059f55-1768322486224.jpg"
        },
        avatar: profilePicture,
    },
    experience: [
        {
            id: "iac",
            title: "Industry Academia Conclave at IIT Palakkad",
            role: "Official Front End Developer",
            location: "Palakkad, India",
            period: "Nov 2024 - Nov 2024",
            description: "Manage the event website and solve problems as they arise. An event that brings together industry leaders, innovators, researchers, and students to interact and explore real-world challenges.",
            image: "https://ugsufdqwqaiqbawfsxwp.supabase.co/storage/v1/object/public/user-files/de73d95d-9cf7-42f7-85d4-ff56b022be32/experience/28eeb76e-82b6-465f-a285-981d2c4d5418-1768322138098.webp"
        },
        {
            id: "iar",
            title: "IAR Cell at IIT Palakkad",
            role: "Tech Team Member",
            location: "Palakkad, India",
            period: "Aug 2024 - Present",
            description: "Developed and maintained the official IAR Cell website to support industry–academia collaboration initiatives. Implemented responsive UI components, improved usability, and resolved real-time issues during updates and events. Contributed to a platform that connects industry partners, researchers, alumni, and students to enable collaborations, internships, and innovation.",
            image: "https://ugsufdqwqaiqbawfsxwp.supabase.co/storage/v1/object/public/user-files/de73d95d-9cf7-42f7-85d4-ff56b022be32/experience/e368b36f-0e7c-4021-9380-65067f6d0232-1768322383157.jpg"
        }
    ],
    education: [
        {
            id: "iit",
            institution: "Indian Institute of Technology, Palakkad",
            degree: "B.Tech in Data Science",
            period: "2024 - 2028",
            location: "Palakkad, India",
            details: "Relevant Coursework: Data Structures & Algorithms, DataBase Management Systems, Object-Oriented Programming (OOP)",
            image: "https://ugsufdqwqaiqbawfsxwp.supabase.co/storage/v1/object/public/user-files/de73d95d-9cf7-42f7-85d4-ff56b022be32/education/ce284441-0f30-46e1-9af5-3941df059f55-1768322486224.jpg"
        },
        {
            id: "sri-chaitanya",
            institution: "Sri Chaitanya College of Education",
            degree: "MPC - Maths, Physics, Chemistry",
            period: "2022 - 2024",
            location: "Hyderabad, India",
            details: "XII Boards: 96.9%",
            image: "https://ugsufdqwqaiqbawfsxwp.supabase.co/storage/v1/object/public/user-files/de73d95d-9cf7-42f7-85d4-ff56b022be32/education/7f0d712f-9dac-4101-a24c-049e841fae3c-1768322517983.png"
        },
        {
            id: "dav",
            institution: "DAV BDL Public School",
            degree: "Secondary School Certificate",
            period: "2012 - 2022",
            location: "Hyderabad, India",
            details: "X Boards: 92% • GeoMap Quiz: Secured 7th rank among all schools participated from Hyderabad",
            image: "https://ugsufdqwqaiqbawfsxwp.supabase.co/storage/v1/object/public/user-files/de73d95d-9cf7-42f7-85d4-ff56b022be32/education/4e9a7cf1-12e3-4a04-95e0-55941768398e-1768322753279.png"
        }
    ],
    skills: [
        { name: "HTML", logo: htmlLogo, category: "Frontend" },
        { name: "CSS", logo: cssLogo, category: "Frontend" },
        { name: "JavaScript", logo: jsLogo, category: "Frontend" },
        { name: "React", logo: reactLogo, category: "Frontend" },
        { name: "Tailwind", logo: tailwindLogo, category: "Frontend" },
        { name: "Python", logo: pythonLogo, category: "Backend" },
        { name: "C++", logo: cppLogo, category: "Languages" },
        { name: "Node.js", logo: nodejsLogo, category: "Backend" },
        { name: "GitHub", logo: githubLogo, category: "Tools" },
        { name: "VS Code", logo: vscodeLogo, category: "Tools" },
    ],
    projects: [
        {
            id: "fin-voice",
            name: "Fin Voice",
            category: "AI & Machine Learning",
            description: "Developed FinVoice, an AI-powered multilingual voice banking assistant enabling users to manage accounts, execute payments, and access market insights via natural language in English, Hindi, or Telugu using Google Gemini Live API integration.",
            fullDescription: "FinVoice is an innovative AI-powered voice banking assistant that revolutionizes how users interact with their financial accounts. Built with React and TypeScript, it leverages Google's Gemini Live API to provide seamless multilingual support across English, Hindi, and Telugu. Users can perform complex banking operations through natural voice commands, including account management, payment execution, and real-time market insights. The application features offline-first architecture using Dexie.js for local data persistence, ensuring smooth performance even with intermittent connectivity.",
            technologies: ["React", "TypeScript", "Vite", "dexie"],
            image: finVoiceImg1,
            images: [finVoiceImg1, finVoiceImg2, finVoiceImg3, finVoiceImg4],
            status: "completed",
            links: {
                github: "https://github.com/kiran-8287/Fin-Voice"
            }
        },
        {
            id: "rubiks",
            name: "Rubiks Cube Solver",
            category: "Web Application",
            description: "Developed an interactive Rubik's Cube solver using React and Vite that validates user-input cube states and generates optimal solving sequences with the cubejs solver running in a Web Worker. Features include step-by-step solutions, keyboard shortcuts, and theme persistence.",
            fullDescription: "An interactive web-based Rubik's Cube solver that brings the classic puzzle to the digital realm. Built with React and Vite, this application allows users to input their cube's current state and receive optimal solving sequences powered by the cubejs algorithm running in a Web Worker for non-blocking performance. The interface features intuitive keyboard shortcuts for quick cube manipulation, step-by-step solution visualization, and persistent theme preferences. The solver validates cube states to ensure solvability and provides detailed move-by-move instructions to help users understand the solving process.",
            technologies: ["JavaScript", "React", "Vite", "cubejs"],
            image: rubiksImg1,
            images: [rubiksImg1, rubiksImg2, rubiksImg3, rubiksImg4],
            status: "completed",
            links: {
                github: "https://github.com/kiran-8287/rubiks-cube-solver",
                demo: "https://rubiks-cube-solver-puce.vercel.app"
            }
        },
        {
            id: "iac-frontend",
            name: "IAC Frontend",
            category: "Event Platform",
            description: "Developed the Industry Academia Conclave (IAC) website, focusing on the interactive picture carousel, gallery components, and various frontend features for seamless user experience.",
            fullDescription: "Directly contributed to the Industry Academia Conclave (IAC) official website. Key responsibilities included developing the dynamic picture gallery and interactive carousel components, along with multiple frontend refinements to enhance the overall event platform. Built with Svelte for peak performance and responsiveness.",
            technologies: ["Svelte", "CSS3", "JavaScript", "HTML5"],
            image: iacImg1,
            images: [iacImg1, iacImg2, iacImg3],
            status: "completed",
            links: {
                github: "https://github.com/kiran-8287/IAC_Frontend",
                demo: "https://iac.iitpkd.ac.in/"
            }
        },
        {
            id: "alumni",
            name: "Alumni Management Platform",
            category: "Full-Stack Application",
            description: "Built key frontend modules for the official Alumni Management Platform (IAR Cell), including the Events page, core sections of the Home page, and the Sign-In interface. The platform supports OTP-based auth, dashboard management, and admin operations.",
            fullDescription: "Played a key role in developing the official Alumni Management Platform for the IAR Cell. My contributions focused on the frontend architecture, specifically building the interactive Events page, essential sections of the Home page, and the secure Sign-In page interface. The broader application features OTP-based authentication, a comprehensive alumni dashboard, and admin tools for data management.",
            technologies: ["React", "HTML5", "JavaScript", "Node.js", "CSS3"],
            image: alumniImg1,
            images: [alumniImg1, alumniImg2, alumniImg3, alumniImg4, alumniImg5],
            status: "completed",
            links: {
                demo: "https://iar.iitpkd.ac.in/",
                githubLinks: [
                    { label: "Auth System", url: "https://github.com/kiran-8287/IAR-OTP" },
                    { label: "Testimonials", url: "https://github.com/kiran-8287/IAR-Testimonials" },
                    { label: "Dashboard", url: "https://github.com/kiran-8287/IAR-Dashboard" },
                    { label: "Profile Page", url: "https://github.com/kiran-8287/IAR-Alumini-Profile-Page" }
                ]
            }
        },
        {
            id: "lumina-crm",
            name: "Lumina CRM",
            category: "Full-Stack Application",
            description: "Lumina CRM is a full-stack client lead management system built to simulate real-world SaaS CRM workflows. It supports end-to-end lead lifecycle tracking, secure JWT-based authentication, and role-protected routes.",
            fullDescription: "Lumina CRM is a full-stack client lead management system built to simulate real-world SaaS CRM workflows. It supports end-to-end lead lifecycle tracking, secure JWT-based authentication, and role-protected routes. The application features lead analytics, activity timelines, and advanced filtering for efficient lead management. The frontend is developed using React and TypeScript, while the backend uses Node.js and Express. PostgreSQL (Supabase) is used for relational data storage with well-structured schemas. The project emphasizes scalable architecture, clean API design, and practical application of database concepts learned through coursework.",
            technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind"],
            image: luminaImg1,
            images: [luminaImg1, luminaImg2, luminaImg3, luminaImg4, luminaImg5],
            status: "completed",
            links: {
                github: "https://github.com/kiran-8287/FUTURE_FS_02",
                video: "https://www.linkedin.com/posts/saikiran-vullengala_postgresql-fullstack-reactjs-activity-7425804491293184001-CA76?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAFNaoGoB-qDVGkOpGqQho3uU5D12E3AfXHY&utm_campaign=copy_link"
            }
        },
        {
            id: "portfolio-v2",
            name: "Portfolio",
            category: "Web Application",
            description: "A modern, interactive developer portfolio built to showcase skills and projects with a focus on smooth animations and responsive layouts.",
            fullDescription: "This project is a modern, interactive developer portfolio built to showcase my skills, projects, and experience in a visually engaging way. It features a sleek UI designed with React, TypeScript, and Tailwind CSS, focusing on smooth animations and responsive layouts. Advanced UI interactions such as glassmorphism, magnetic buttons, and 3D elements enhance user experience. The application supports seamless dark/light theme switching with persistent preferences. Performance is optimized using Vite for fast builds and hot module reloading. The project reflects an emphasis on clean architecture, reusable components, and modern frontend best practices.",
            technologies: ["React", "TypeScript", "Tailwind", "Vite"],
            image: portImg1,
            images: [portImg1, portImg2, portImg3],
            status: "completed",
            links: {
                github: "https://github.com/kiran-8287/FUTURE_FS_01",
                demo: "https://kirann-portfolio.netlify.app/"
            }
        }
    ]
};
