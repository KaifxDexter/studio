
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { navLinks } from '@/lib/data';

export function Header() {
  const pathname = usePathname();
  const isAuthenticated = false; // Placeholder for auth logic

  return (
    <header className="sticky top-0 z-50 w-full py-4">
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
                      className="absolute bottom-[-8px] left-0 right-0 h-[2px] bg-primary-foreground nav-underline"
                      layoutId="underline"
                    />
                  )}
                </Link>
              ))}
          </nav>
          
          <div className="flex items-center justify-end space-x-2">
            {isAuthenticated && (
              <Button asChild variant="ghost" size="icon">
                <Link href="/profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
