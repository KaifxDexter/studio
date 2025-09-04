
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';
import { CursorGradient } from '@/components/CursorGradient';
import { MobileNav } from '@/components/MobileNav';

export const metadata: Metadata = {
  title: 'Donify - Empower Change, One Scan at a Time',
  description: 'A fundraising platform to support various causes through simple QR code donations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <head>
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased flex flex-col min-h-screen bg-background')}>
         <CursorGradient />
        <Header />
        <main className="flex-grow pb-20 md:pb-0">{children}</main>
        <Footer />
        <Toaster />
        <MobileNav />
      </body>
    </html>
  );
}
