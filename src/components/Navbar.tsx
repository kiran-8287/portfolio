import { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b py-3 shadow-sm' : 'bg-transparent py-5'
            }`}>
            <div className="container mx-auto max-w-6xl px-4 flex justify-between items-center">
                <div
                    className="text-xl font-bold cursor-pointer hover:text-primary transition-colors z-50"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    SKV
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="flex items-center gap-6 text-sm font-medium">
                        <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">About</button>
                        <button onClick={() => scrollToSection('experience')} className="hover:text-primary transition-colors">Experience</button>
                        <button onClick={() => scrollToSection('projects')} className="hover:text-primary transition-colors">Projects</button>
                        <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Contact</button>
                    </div>

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full border bg-background/50 hover:bg-accent transition-all duration-300"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M22 12h2" /><path d="m4.93 19.07 1.41-1.41" /><path d="m17.66 6.34 1.41-1.41" /></svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full border bg-background/50 hover:bg-accent transition-all duration-300"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M22 12h2" /><path d="m4.93 19.07 1.41-1.41" /><path d="m17.66 6.34 1.41-1.41" /></svg>
                        )}
                    </button>

                    <button
                        className="z-50 p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                        <div className={`w-6 h-0.5 bg-foreground my-1.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                        <div className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 md:hidden flex flex-col items-center justify-center space-y-8"
                    >
                        <button onClick={() => scrollToSection('about')} className="text-2xl font-bold hover:text-primary transition-colors">About</button>
                        <button onClick={() => scrollToSection('experience')} className="text-2xl font-bold hover:text-primary transition-colors">Experience</button>
                        <button onClick={() => scrollToSection('projects')} className="text-2xl font-bold hover:text-primary transition-colors">Projects</button>
                        <button onClick={() => scrollToSection('contact')} className="text-2xl font-bold hover:text-primary transition-colors">Contact</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
