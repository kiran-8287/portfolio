import { useState, useEffect } from 'react';
import GooeyNav from './GooeyNav';
import StaggeredMenu from './StaggeredMenu';
import type { StaggeredMenuItem } from './StaggeredMenu';

const menuItems = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
];

const staggeredMenuItems: StaggeredMenuItem[] = menuItems.map((item) => ({
    label: item.label,
    ariaLabel: `Go to ${item.label} section`,
    link: `#${item.id}`,
}));

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                            const element = document.getElementById(id);
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                    />
                </div>

                {/* Mobile Staggered Menu */}
                <div className="md:hidden">
                    <StaggeredMenu
                        position="right"
                        items={staggeredMenuItems}
                        displaySocials={false}
                        displayItemNumbering={false}
                        menuButtonColor={isScrolled ? '#000' : '#000'}
                        openMenuButtonColor="#fff"
                        changeMenuColorOnOpen={true}
                        colors={['#B497CF', '#5227FF']}
                        isFixed={true}
                        accentColor="#5227FF"
                        closeOnClickAway={true}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
