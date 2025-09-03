
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function CursorGradient() {
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-20">
      <motion.div
        className="h-96 w-96 rounded-full"
        style={{
          position: 'absolute',
          left: mousePosition.x,
          top: mousePosition.y,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle at center, hsla(340, 75%, 55%, 0.4) 0%, hsla(210, 100%, 66%, 0.4) 40%, transparent 80%)',
          filter: 'blur(24px)', 
        }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 25,
          mass: 0.5,
        }}
      />
      <div
        className="fixed inset-0 h-full w-full"
        style={{
          background:
            'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: `radial-gradient(circle 192px at ${mousePosition.x}px ${mousePosition.y}px, black 40%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 192px at ${mousePosition.x}px ${mousePosition.y}px, black 40%, transparent 100%)`,
        }}
      />
    </div>
  );
}
