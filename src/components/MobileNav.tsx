
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navLinks } from '@/lib/data';

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-black/10 backdrop-blur-[24px] border-t border-white/20 z-50">
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
  );
}
