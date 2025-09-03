
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { SocialBubbles } from '@/components/SocialBubbles';

export function Footer() {
  return (
    <footer className="border-t mt-auto pb-16 md:pb-0 border-white/20 bg-black/10 backdrop-blur-[24px]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Logo />
          </div>
          <div className="flex-grow md:flex-grow-0 md:absolute md:left-1/2 md:-translate-x-1/2">
             <SocialBubbles />
          </div>
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>&copy; 2025 Donify. All rights reserved.</p>
            <p>Made by M Kaif Ansari</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
