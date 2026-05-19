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
// Project 3: Fin Voice images
import finVoiceImg1 from '../assets/projects ss/project3/p1.png';
import finVoiceImg2 from '../assets/projects ss/project3/p2.png';
import finVoiceImg3 from '../assets/projects ss/project3/p3.png';
import finVoiceImg4 from '../assets/projects ss/project3/p4.png';
import finVoiceImg5 from '../assets/projects ss/project3/p5.png';
import finVoiceImg6 from '../assets/projects ss/project3/p6.png';
import finVoiceImg7 from '../assets/projects ss/project3/p7.png';

// Project 4: HMS images
import hmsImg1 from '../assets/projects ss/project4/a.png';
import hmsImg2 from '../assets/projects ss/project4/assess patient 1.png';
import hmsImg3 from '../assets/projects ss/project4/bill management.png';
import hmsImg4 from '../assets/projects ss/project4/bills.png';
import hmsImg5 from '../assets/projects ss/project4/diagnosis.png';
import hmsImg6 from '../assets/projects ss/project4/feedback.png';
import hmsImg7 from '../assets/projects ss/project4/lab repors order.png';
import hmsImg8 from '../assets/projects ss/project4/support.png';
import hmsImg9 from '../assets/projects ss/project4/vitals monitor.png';

// Project 9: Rubiks Cube Solver images
import rubiksImg1 from '../assets/projects ss/project9/rb1.png';
import rubiksImg2 from '../assets/projects ss/project9/rb2.png';
import rubiksImg3 from '../assets/projects ss/project9/rb3.png';
import rubiksImg4 from '../assets/projects ss/project9/rb4.png';

// Project 5: IAC Frontend images
import iacImg1 from '../assets/projects ss/project5/iac1.png';
import iacImg2 from '../assets/projects ss/project5/iac2.png';
import iacImg3 from '../assets/projects ss/project5/iac3.png';

// Project 6: Portfolio images
import portImg1 from '../assets/projects ss/project6/Screenshot 2026-02-01 133209.png';
import portImg2 from '../assets/projects ss/project6/Screenshot 2026-02-10 201342.png';
import portImg3 from '../assets/projects ss/project6/Screenshot 2026-02-10 201423.png';

// Project 7: Alumni Management Platform images
import alumniImg1 from '../assets/projects ss/project7/iar1.png';
import alumniImg2 from '../assets/projects ss/project7/iar2.png';
import alumniImg3 from '../assets/projects ss/project7/iar3.png';
import alumniImg4 from '../assets/projects ss/project7/iar4.png';
import alumniImg5 from '../assets/projects ss/project7/iar5.png';

// Project 8: Lumina CRM images
import luminaImg1 from '../assets/projects ss/project8/Screenshot 2026-02-07 114817.png';
import luminaImg2 from '../assets/projects ss/project8/Screenshot 2026-02-07 131107.png';
import luminaImg3 from '../assets/projects ss/project8/Screenshot 2026-02-07 131123.png';
import luminaImg4 from '../assets/projects ss/project8/Screenshot 2026-02-07 131148.png';
import luminaImg5 from '../assets/projects ss/project8/supabase-schema-vrqbatdytpuflgewhcnk.png';

// Project 2: Planora images
import planoraImg1 from '../assets/projects ss/project2/1.png';
import planoraImg2 from '../assets/projects ss/project2/Screenshot 2026-05-19 144429.png';
import planoraImg3 from '../assets/projects ss/project2/Screenshot 2026-05-19 152943.png';
import planoraImg4 from '../assets/projects ss/project2/Screenshot 2026-05-19 153051.png';
import planoraImg5 from '../assets/projects ss/project2/Screenshot 2026-05-19 153119.png';
import planoraImg6 from '../assets/projects ss/project2/Screenshot 2026-05-19 153142.png';

// Project 1: Nescafe IITPKD images
import nescafeImg1 from '../assets/projects ss/project1/1.png';
import nescafeImg2 from '../assets/projects ss/project1/2.jpeg';
import nescafeImg3 from '../assets/projects ss/project1/Screenshot 2026-05-19 153527.png';
import nescafeImg4 from '../assets/projects ss/project1/Screenshot 2026-05-19 153615.png';
import nescafeImg5 from '../assets/projects ss/project1/Screenshot 2026-05-19 153900.png';
import nescafeImg6 from '../assets/projects ss/project1/WhatsApp Image 2026-05-19 at 15.42.42.jpeg';
import nescafeImg7 from '../assets/projects ss/project1/WhatsApp Image 2026-05-19 at 15.42.53.jpeg';
import nescafeImg8 from '../assets/projects ss/project1/WhatsApp Image 2026-05-19 at 15.42.59.jpeg';
import nescafeImg9 from '../assets/projects ss/project1/WhatsApp Image 2026-05-19 at 15.43.07.jpeg';

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
            resume: "https://drive.google.com/file/d/19-el8fIOGZWRsVMX40jH2R1nMizYRs1U/view?usp=sharing",
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
            id: "nescafe-iitpkd",
            name: "Nescafe IITPKD",
            category: "Full-Stack Application",
            description: "A production-grade, serverless campus ordering system serving 1500+ users at IIT Palakkad, featuring a zero-trust payment verification pipeline and sub-500ms real-time kitchen status synchronization.",
            fullDescription: "Nescafe IITPKD is a production-ready, serverless, zero-trust ordering platform serving over 1500+ campus users at the Indian Institute of Technology Palakkad. Engineered for peak scalability, high availability, and ironclad transactional security, the system decouples critical business logic from the client to enforce server-side validation rules.\n\nKey Features & Engineering Highlights:\n\n• Secure Payment Lifecycle: Integrates the Razorpay payment gateway with a server-side cryptographic HMAC-SHA256 signature verification pipeline. This prevents client-side transaction tampering and payment spoofing, ensuring all incoming orders are authentic.\n\n• Database Engineering & Concurrency: Built on PostgreSQL with Supabase, leveraging pgSQL Stored Procedures and Transactions to guarantee snapshot consistency. Atomic inventory decrements eliminate product-overselling and double-purchase race conditions, while Row Level Security (RLS) policies secure data isolation.\n\n• ISP-Level Throttling Bypass Proxy: Implemented a custom reverse proxy inside Node.js/Express to tunnel database requests, successfully bypassing carrier-level blocking of standard Supabase domains and maintaining 100% platform uptime.\n\n• Real-Time Kitchen Coordination: Switched from heavy database polling to a WebSocket-based Change Data Capture (CDC) pipeline. Kitchen operators receive instant status updates with sub-500ms latency, vastly accelerating food preparation times.\n\n• High Performance & Architecture: Hosted using a serverless deployment model (Vercel serverless functions) with horizontal scalability. Implemented React lazy loading and query index optimizations, reducing initial page load bundles by 30%.",
            technologies: ["React", "Node.js", "PostgreSQL", "Tailwind", "JavaScript"],
            image: nescafeImg1,
            images: [nescafeImg1, nescafeImg2, nescafeImg3, nescafeImg4, nescafeImg5, nescafeImg6, nescafeImg7, nescafeImg8, nescafeImg9],
            status: "completed",
            links: {
                github: "https://github.com/kiran-8287/nescafe-iitpkd",
                demo: "https://nescafeiitpkd.vercel.app/"
            }
        },
        {
            id: "planora",
            name: "Planora",
            category: "Web Application",
            description: "An ultra-premium, high-fidelity 2D/3D interior design and spatial architecture prototyping SaaS engine built with React 18 and Node.js Express, featuring a pseudo-3D isometric mode, laser tape measurements, and Figma-style auto-align.",
            fullDescription: "Planora is an ultra-premium, high-fidelity 2D/3D interior design and spatial architecture prototyping SaaS engine built from scratch with React 18 and Node.js Express. Designed to meet the sleek aesthetic and functional bars of Planner5D, SketchUp, and Figma, Planora combines rigorous spatial blueprinting coordinate math with an incredibly fun, tactile, and responsive user experience.\n\nKey Features & Engineering Highlights:\n\n• Pseudo-3D Isometric Mode ('Let's Warp Dimensions'): Skews the flat room coordinate frame into a professional isometric viewing plane using hardware-accelerated CSS 3D translation matrices. Placed blocks automatically cast realistic side-shadow elevations and drop-borders based on their physical depths, with elevation controls (in cm) for ceiling/wall items, and auto-fading guidelines in 3D mode.\n\n• The 'Laser' Tape Measure Tool: Click-and-drag vector ruler that projects a dashed measuring line snapping to grid cells and calculates real-world walkway distances with a floating metric bubble tag.\n\n• Group-Slicing Bill of Materials & Cost Segregator: Expandable translucent cost-estimation drawer showing a unified budget dashboard, room-by-room segmented inventory lists, and live cost editors that recalculate grand totals instantly.\n\n• Dedicated 'Saved Designs' Sidebar Tab: Unified persistence hub loading floor layouts from local JSON databases, featuring preloaded furnished templates (Living room, Bed space, Kids room, Office) and double-tab categories.\n\n• Premium Mechanical Grid Snapping: Figma-style 8-handle transform bounding box, snap rotation at 15-degree increments, dynamic border scale rulers (meter/100px ticks), and keyboard nudge hotkeys (Arrow Keys for 1px, Shift+Arrow for 20px).\n\n• LAN & Public Tunnel Exposure: Fully configured to bind natively to host 0.0.0.0, enabling remote local network testing (e.g. tablet touch testing) or public sharing using secure ngrok tunnels.",
            technologies: ["React", "TypeScript", "Vite", "Node.js", "CSS3"],
            image: planoraImg1,
            images: [planoraImg1, planoraImg2, planoraImg3, planoraImg4, planoraImg5, planoraImg6],
            status: "completed",
            links: {
                github: "https://github.com/kiran-8287/planora"
            }
        },
        {
            id: "fin-voice",
            name: "Fin Voice",
            category: "AI & Machine Learning",
            description: "Developed FinVoice, an AI-powered multilingual voice banking assistant enabling users to manage accounts, execute payments, and access market insights via natural language in English, Hindi, or Telugu using Google Gemini Live API integration.",
            fullDescription: "FinVoice is an innovative AI-powered voice banking assistant that revolutionizes how users interact with their financial accounts. Built with React and TypeScript, it leverages Google's Gemini Live API to provide seamless multilingual support across English, Hindi, and Telugu. Users can perform complex banking operations through natural voice commands, including account management, payment execution, and real-time market insights. The application features offline-first architecture using Dexie.js for local data persistence, ensuring smooth performance even with intermittent connectivity.",
            technologies: ["React", "TypeScript", "Vite", "dexie"],
            image: finVoiceImg1,
            images: [finVoiceImg1, finVoiceImg2, finVoiceImg3, finVoiceImg4, finVoiceImg5, finVoiceImg6, finVoiceImg7],
            status: "completed",
            links: {
                github: "https://github.com/kiran-8287/Fin-Voice"
            }
        },
        {
            id: "aarogya-hms",
            name: "Aarogya HMS",
            category: "Full-Stack Application",
            description: "A production-grade, full-stack Hospital Management System developed as a DBMS course semester project. It digitizes the patient journey from triage to discharge, featuring automated clinical billing triggers and real-time overbooking protection locks.",
            fullDescription: "Aarogya HMS is a production-grade, full-stack Hospital Management System built from scratch as our Database Management Systems (DBMS) course semester project. Decoupling critical business logic from the client, the application enforces transactional integrity and strict constraints directly at the PostgreSQL database level.\n\nKey Features & Engineering Highlights:\n\n• Advanced DBMS Architecture: Pushed the boundaries of PostgreSQL with automated financial aggregators (`trg_calculate_bill` and `fn_generate_bill`) calculating room rentals, diagnostics, and consultation charges instantly upon patient discharge. Transaction-level atomic triggers (`trg_prevent_double_booking`) eliminate overlapping appointments, and table triggers update bed occupancy stats in real-time.\n\n• Multi-Actor Clinical Workflow: Coordinated role-specific portals for Admins (revenue analytics, bed control, staff rosters), Doctors & Nurses (triage intake, vitals entry, precise ICD-based diagnostic records, and digital prescriptions), and Patients (secure passcode login, clinical summary downloads, printable CSS-isolated bills, and staff feedback forms).\n\n• UI/UX and Analytics Engine: Designed a high-fidelity glassmorphic clinical command center using React 19, Zustand, and custom CSS. Employs responsive data visualizers powered by Recharts to display interactive patient intake trends and daily financial updates.\n\n• Domain-Driven Security: Enforces secure authentication and authorization via JSON Web Tokens (JWT) with strict Role-Based Access Control (RBAC) across all protected REST API routes.",
            technologies: ["React", "Node.js", "PostgreSQL", "Tailwind", "JavaScript"],
            image: hmsImg1,
            images: [hmsImg1, hmsImg2, hmsImg3, hmsImg4, hmsImg5, hmsImg6, hmsImg7, hmsImg8, hmsImg9],
            status: "completed",
            links: {
                github: "https://github.com/kiran-8287/hospital-management-system"
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
        }
    ]
};
