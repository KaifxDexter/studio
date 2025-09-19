
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CampaignDeck } from '@/components/CampaignDeck';
import { useCampaigns } from '@/hooks/use-campaigns';
import { ArrowRight, Grid3x3 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Campaign, CampaignCause } from '@/lib/types';


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

const headlineText = 'Empower Change, One Scan at a Time'.split(' ');
const campaignCauses: Array<CampaignCause | 'All'> = ['All', 'Medical', 'Education', 'Disaster Relief', 'Personal'];


export default function Home() {
  const { campaigns, isLoading } = useCampaigns();
  const [selectedCategory, setSelectedCategory] = useState<CampaignCause | 'All'>('All');

  const filteredCampaigns = selectedCategory === 'All'
    ? campaigns
    : campaigns.filter(campaign => campaign.cause === selectedCategory);
  
  return (
    <div className="flex flex-col items-center">
      <motion.section 
        className="w-full text-center py-20 lg:py-32"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-white flex flex-wrap justify-center items-center">
            {headlineText.map((word, wordIndex) => (
              <span key={wordIndex} className="mr-3 md:mr-5 whitespace-nowrap">
                {word.split('').map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    className="inline-block"
                    whileHover={{ y: -10, transition: { duration: 0.2, ease: 'easeOut' } }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
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
          
           <div className="flex justify-center mb-8">
              <Select onValueChange={(value) => setSelectedCategory(value as CampaignCause | 'All')} defaultValue={selectedCategory}>
                <SelectTrigger className="w-full md:w-[280px]">
                  <SelectValue placeholder="Filter by cause" />
                </SelectTrigger>
                <SelectContent>
                  {campaignCauses.map(cause => (
                     <SelectItem key={cause} value={cause}>{cause}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
           </div>
           
          {isLoading ? (
             <div className="relative w-full max-w-lg mx-auto h-[520px] flex items-center justify-center">
                <Skeleton className="w-full h-full rounded-lg" />
             </div>
          ) : (
             <CampaignDeck campaigns={filteredCampaigns} />
          )}
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
