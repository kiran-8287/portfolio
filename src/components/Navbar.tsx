import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GooeyNav from './GooeyNav';

const menuItems = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const sections = ['about', 'experience', 'projects', 'contact'];
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Determine active section
            const scrollPosition = window.scrollY + 200;
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
            if (window.scrollY < 100) {
                setActiveSection('home');
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    const navSurface = isScrolled
        ? 'bg-background/80 backdrop-blur-md border-b py-3 shadow-sm'
        : 'bg-transparent max-md:bg-background/85 max-md:backdrop-blur-md max-md:border-b max-md:border-border/40 py-5 max-md:py-3';

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navSurface}`}>
            <div className="container mx-auto max-w-6xl px-4 flex justify-between items-center">
                <div
                    className="text-xl font-bold cursor-pointer hover:text-primary transition-colors z-50"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    SKV
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <GooeyNav
                        items={[
                            { label: 'About', href: '#about' },
                            { label: 'Experience', href: '#experience' },
                            { label: 'Projects', href: '#projects' },
                            { label: 'Contact', href: '#contact' },
                        ]}
                        initialActiveIndex={-1}
                        onItemClick={(_index, href) => {
                            const id = href.replace('#', '');
                            scrollToSection(id);
                        }}
                    />
                </div>

                {/* Mobile hamburger menu */}
                <div className="md:hidden flex items-center">
                    <button
                        type="button"
                        className="z-50 p-2.5 relative flex h-10 w-10 flex-col items-center justify-center rounded-lg text-foreground hover:bg-foreground/5 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span
                            aria-hidden="true"
                            className={`block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
                        />
                        <span
                            aria-hidden="true"
                            className={`my-1.5 block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`}
                        />
                        <span
                            aria-hidden="true"
                            className={`block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.08, delayChildren: 0.05 }
                            },
                            exit: {
                                opacity: 0,
                                transition: { staggerChildren: 0.05, staggerDirection: -1 }
                            }
                        }}
                        className="fixed inset-0 bg-background/98 backdrop-blur-2xl z-40 md:hidden flex flex-col items-center justify-center space-y-8 px-6"
                    >
                        {/* Decorative background blobs */}
                        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-[#3b82f6]/10 blur-[80px] rounded-full pointer-events-none -z-10" />
                        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#ec4899]/10 blur-[80px] rounded-full pointer-events-none -z-10" />

                        {menuItems.map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <motion.button
                                    key={item.id}
                                    variants={{
                                        hidden: { y: 20, opacity: 0 },
                                        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
                                        exit: { y: -20, opacity: 0 }
                                    }}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`relative text-3xl font-bold tracking-tight transition-all duration-300 ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeDot"
                                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </motion.button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
