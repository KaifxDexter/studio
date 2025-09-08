
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CampaignDeck } from '@/components/CampaignDeck';
import { campaigns } from '@/lib/data';
import { ArrowRight, Grid3x3 } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <motion.section 
        className="w-full text-center py-20 lg:py-32"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-white">
            Empower Change, One Scan at a Time
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Donify makes it simple to support causes you care about. Create a campaign or donate instantly with a QR code.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="font-bold">
              <Link href="/create">
                Start a Campaign <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/causes">Browse Causes</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      <motion.section 
        id="campaigns" 
        className="w-full py-16 lg:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">
              Active Campaigns
            </h2>
            <p className="text-muted-foreground mt-2">Swipe through featured causes or view all campaigns.</p>
          </div>
          <CampaignDeck campaigns={campaigns.slice(0, 10)} />
          <div className="text-center mt-12">
             <Button asChild size="lg">
                <Link href="/causes">
                  View All Causes <Grid3x3 className="ml-2" />
                </Link>
             </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
