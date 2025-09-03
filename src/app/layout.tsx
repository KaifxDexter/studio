import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

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
         <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-[#0EA5E9] via-[#8B5CF6] to-[#EC4899]">
            <div className="absolute inset-0 bg-[url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4d5eXlzc3OLi4ubm5uVlZWPj4+NjY19fX2JiYl/f39ra2uRkZGZmZlpaWmXl5dvb29xcXGTk5NnZ2c8TV1mAAAAG3RSTlNAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAvEOwtAAAFVklEQVR4XpWWB67c2BUFb3g557T/hRo9/WUMZHlgr4Bg8Z4qQgQJlHI4A8SzFVrapvmTF9O7dmYRFZ60YiBhJRCgh1FYhiLAmdvX0CzTOpNE77ME0Zty/nWWzchDtiqrmQDeuv3powQ5ta2eN0FY0InkqDD73lT9c9lEzwUNqgFHs9SPceML6uA2uUe5gL9P6ANAURrZzVYILEJm2LUNGkUGqQG4GtHlqQPbOKrJGIJzA6AIAeGtBYAEGAlHDzwCcy+iA4wAS2精飘/wAAdWH2+hYAAAARdEVYdENyZWF0aW9uIFRpbWUAMjAyNC0wNS0yNlQxODoxNToxMCswMDowME2ZvewAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzVxteM2AAAAIHRFWHRTb3VyY2UAaHR0cDovL3d3dy50b3B0YWwuY29tL2Rlc2lnbmVycy9zdWJ0bGVwYXR0ZXJucy/SK4S5AAAAIElEQVR42uzNAQEAIAzDMO9f9B7s8nChBEBgyAIE3wMbeQEf3wAAAABJRU5ErkJggg==)] opacity-[0.08]"></div>
         </div>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
