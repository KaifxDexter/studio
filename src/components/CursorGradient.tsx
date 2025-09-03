
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
    <motion.div
      className="pointer-events-none fixed -left-48 -top-48 z-20 h-96 w-96 rounded-full blur-3xl opacity-50"
      style={{
        background:
          'radial-gradient(circle at center, hsla(340, 75%, 55%, 0.4) 0%, hsla(210, 100%, 66%, 0.4) 40%, transparent 80%)',
      }}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 250,
        damping: 25,
        mass: 0.5,
      }}
    />
  );
}
