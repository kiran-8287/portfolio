import { useEffect, useRef } from 'react';

interface FlowParticle {
    x: number;
    y: number;
    px: number;
    py: number;
    speed: number;
}

const HeroFlowField = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const particlesRef = useRef<FlowParticle[]>([]);
    const tRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const hero = canvas.parentElement;
        if (!hero) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const initParticles = () => {
            const count = Math.floor((canvas.width * canvas.height) / 6000);
            particlesRef.current = Array.from({ length: Math.min(count, 220) }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                px: 0,
                py: 0,
                speed: 0.7 + Math.random() * 0.8,
            }));
        };

        const resize = () => {
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
            initParticles();
        };

        const getAngle = (x: number, y: number, t: number) =>
            Math.sin(x * 0.0095 + t * 0.007) * Math.PI * 1.4 +
            Math.cos(y * 0.0095 + t * 0.005) * Math.PI * 0.9 +
            Math.sin((x + y) * 0.0095 * 0.5 + t * 0.004) * Math.PI * 0.5;

        const getColor = (x: number, _y: number, t: number) => {
            const n = Math.sin(x * 0.009 + t * 0.004) * 0.5 + 0.5;
            if (n < 0.4) return 'rgba(83,74,183,0.22)';
            if (n < 0.7) return 'rgba(127,119,221,0.18)';
            return 'rgba(29,158,117,0.18)';
        };

        const draw = () => {
            const t = tRef.current;

            ctx.fillStyle = 'rgba(255,255,255,0.032)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((p) => {
                p.px = p.x;
                p.py = p.y;

                const angle = getAngle(p.x, p.y, t);
                p.x += Math.cos(angle) * p.speed;
                p.y += Math.sin(angle) * p.speed;

                if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
                    p.x = Math.random() * canvas.width;
                    p.y = Math.random() * canvas.height;
                    p.px = p.x;
                    p.py = p.y;
                    return;
                }

                ctx.beginPath();
                ctx.moveTo(p.px, p.py);
                ctx.lineTo(p.x, p.y);
                ctx.strokeStyle = getColor(p.x, p.y, t);
                ctx.lineWidth = 0.85;
                ctx.stroke();
            });

            tRef.current++;
            animRef.current = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener('resize', resize);
        draw();

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="hero-flow-canvas absolute inset-0 h-full w-full"
                aria-hidden="true"
            />
            <div className="hero-flow-vignette pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />
        </>
    );
};

export default HeroFlowField;
