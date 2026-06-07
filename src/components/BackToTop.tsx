import { useState, useEffect } from 'react';
import GooeyButton from './GooeyButton';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <GooeyButton
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 transform z-40 hover:scale-110 active:scale-95 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
            disabled={!isVisible}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="m18 15-6-6-6 6" />
            </svg>
        </GooeyButton>
    );
};

export default BackToTop;
