import { useEffect, useState } from 'react';

export function useTypewriter(
    phrases: string[],
    typeSpeed = 58,
    deleteSpeed = 30,
    pauseMs = 1400
) {
    const [display, setDisplay] = useState('');
    const [phraseIdx, setPhraseIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const [pausing, setPausing] = useState(false);

    useEffect(() => {
        if (phrases.length === 0) return;

        if (pausing) {
            const t = setTimeout(() => {
                setPausing(false);
                setDeleting(true);
            }, pauseMs);
            return () => clearTimeout(t);
        }

        const phrase = phrases[phraseIdx];

        if (!deleting) {
            if (charIdx < phrase.length) {
                const t = setTimeout(() => {
                    setDisplay(phrase.slice(0, charIdx + 1));
                    setCharIdx((c) => c + 1);
                }, typeSpeed);
                return () => clearTimeout(t);
            }

            setPausing(true);
            return;
        }

        if (charIdx > 0) {
            const t = setTimeout(() => {
                setDisplay(phrase.slice(0, charIdx - 1));
                setCharIdx((c) => c - 1);
            }, deleteSpeed);
            return () => clearTimeout(t);
        }

        setDeleting(false);
        setPhraseIdx((i) => (i + 1) % phrases.length);
    }, [charIdx, deleting, pausing, phraseIdx, phrases, typeSpeed, deleteSpeed, pauseMs]);

    return display;
}
