import React from 'react';
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
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default GooeyButton;
