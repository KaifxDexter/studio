'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useAnimation } from 'framer-motion';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { navLinks } from '@/lib/data';

export function Header() {
  const pathname = usePathname();
  const isAuthenticated = false; // Placeholder for auth logic
  const controls = useAnimation();
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY && currentY > 100) {
        // Scrolling down
        controls.start("hidden");
      } else {
        // Scrolling up
        controls.start("visible");
      }
      setLastY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY, controls]);

  return (
    <motion.header
      className="sticky top-0 z-50 w-full transition-transform duration-300 ease-in-out py-4"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-120%" },
      }}
      initial="visible"
      animate={controls}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="container flex h-16 items-center justify-center">
        <div className="flex items-center w-full max-w-4xl px-6 py-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-lg shadow-lg">
          <div className="flex-1 md:flex-none">
              <Link href="/" className="mr-6 flex items-center space-x-2">
                  <Logo />
              </Link>
          </div>
          <nav className="hidden md:flex flex-1 items-center justify-center space-x-8 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative transition-colors hover:text-primary',
                    pathname === link.href ? 'text-primary font-semibold' : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                   {pathname === link.href && (
                    <motion.div
                      className="absolute bottom-[-8px] left-0 right-0 h-[2px] bg-red-500"
                      layoutId="underline"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
          </nav>
          
          <div className="flex items-center justify-end space-x-2">
            {isAuthenticated ? (
              <Button asChild variant="ghost" size="icon">
                <Link href="/profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button asChild variant="ghost">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
