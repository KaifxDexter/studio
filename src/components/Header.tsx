
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useAnimation } from 'framer-motion';
import { HandHeart, Home, PlusCircle, User, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/create', label: 'Create', icon: PlusCircle },
  { href: '/contact', label: 'Contact', icon: Mail },
  { href: '/profile', label: 'Profile', icon: User },
];

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
      className="sticky top-0 z-50 w-full border-b border-white/20 bg-black/10 backdrop-blur-[24px] transition-transform duration-300 ease-in-out"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      initial="visible"
      animate={controls}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="container flex h-16 items-center">
        <div className="flex-1 md:flex-none">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <Logo />
            </Link>
        </div>
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-primary',
                  pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {link.label}
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

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-black/10 backdrop-blur-[24px] border-t border-white/20">
        <nav className="flex h-full items-center justify-around">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex flex-col items-center gap-1 transition-colors hover:text-primary w-full text-center py-2',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <link.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
