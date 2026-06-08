import React, { useState, useRef, useCallback } from 'react';
import type { MouseEvent } from 'react';

interface GooeyButtonProps {
  children: React.ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

const GooeyButton: React.FC<GooeyButtonProps> = ({
  children,
  onClick,
  className = '',
  href,
  target,
  rel,
  type = 'button',
  disabled = false,
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const nextId = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInteraction = useCallback((e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = nextId.current++;
      setRipples(prev => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 600);
    }
    onClick?.(e);
  }, [onClick]);

  const buttonContent = (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none animate-[gooey-ripple_0.6s_ease-out_forwards]"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
    </>
  );

  const commonClasses = `relative overflow-hidden ${className}`;

  if (href) {
    return (
      <div ref={containerRef} className={commonClasses}>
        <a
          href={href}
          target={target}
          rel={rel}
          className="block w-full h-full cursor-pointer flex items-center justify-center"
          onClick={handleInteraction}
        >
          {buttonContent}
        </a>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={commonClasses}>
      <button
        type={type}
        disabled={disabled}
        className="w-full h-full cursor-pointer flex items-center justify-center"
        onClick={handleInteraction}
      >
        {buttonContent}
      </button>
    </div>
  );
};

export default GooeyButton;
