import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GooeyNav from './GooeyNav';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
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

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        className="z-50 p-2 relative flex flex-col justify-center items-center"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-[8px] rotate-45' : ''}`} />
                        <div className={`w-6 h-0.5 bg-foreground my-1.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                        <div className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? '-translate-y-[8px] -rotate-45' : ''}`} />
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
