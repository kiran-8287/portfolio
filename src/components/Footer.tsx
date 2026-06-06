import { portfolioData } from '../data/portfolio';

const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
];

const socialLinks = [
    { label: 'GitHub', urlKey: 'github' as const, iconKey: 'github' as const, external: true },
    { label: 'LinkedIn', urlKey: 'linkedin' as const, iconKey: 'linkedin' as const, external: true },
    { label: 'Email', urlKey: 'email' as const, iconKey: 'email' as const, external: false },
];

const Footer = () => {
    const { personal } = portfolioData;

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="py-12 px-4 mt-20 border-t border-[#E5E5E5] dark:border-border bg-muted/30">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold mb-1">{personal.name}</h3>
                        <p className="text-sm text-muted-foreground">{personal.title}</p>
                    </div>

                    <nav className="flex flex-wrap items-center justify-center text-sm text-muted-foreground">
                        {navLinks.map((link, index) => (
                            <span key={link.id} className="inline-flex items-center">
                                {index > 0 && (
                                    <span className="mx-2.5 text-muted-foreground/40 select-none" aria-hidden="true">
                                        ·
                                    </span>
                                )}
                                <button
                                    type="button"
                                    onClick={() => scrollToSection(link.id)}
                                    className="hover:text-foreground hover:underline underline-offset-4 transition-colors"
                                >
                                    {link.label}
                                </button>
                            </span>
                        ))}
                    </nav>

                    <div className="flex items-center justify-center md:justify-end gap-5">
                        {socialLinks.map(({ label, urlKey, iconKey, external }) => (
                            <a
                                key={label}
                                href={personal.links[urlKey]}
                                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                className="group text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 transition-colors inline-flex items-center gap-2"
                            >
                                {personal.icons[iconKey] && (
                                    <img
                                        src={personal.icons[iconKey]}
                                        alt=""
                                        aria-hidden="true"
                                        className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity"
                                    />
                                )}
                                {label}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-[#E5E5E5] dark:border-border text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} {personal.name}. All rights reserved.</p>
                    <p className="mt-2 text-xs">
                        Built with React, Tailwind CSS, and Passion
                        <span className="mx-1.5 text-muted-foreground/50">·</span>
                        <a
                            href={`mailto:${personal.email}`}
                            className="hover:text-foreground hover:underline underline-offset-4 transition-colors"
                        >
                            {personal.email}
                        </a>
                    </p>
                    <p className="mt-3 text-[11px] text-muted-foreground/60">
                        No bugs were harmed in the making of this portfolio.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
