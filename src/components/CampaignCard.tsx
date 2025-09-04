
'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Campaign } from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface CampaignCardProps {
  campaign: Campaign;
  animationDirection: 'left' | 'right';
}

const cardVariants = {
  hidden: (direction: 'left' | 'right') => ({
    opacity: 0,
    x: direction === 'left' ? -200 : 200,
    rotate: direction === 'left' ? -8 : 8,
  }),
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 15,
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export function CampaignCard({ campaign, animationDirection }: CampaignCardProps) {
  const progress = Math.min((campaign.raisedAmount / campaign.targetAmount) * 100, 100);

  return (
    <motion.div
      variants={cardVariants}
      custom={animationDirection}
      className="h-full"
    >
      <Card className="flex flex-col h-full w-full transition-all duration-300 glass-card overflow-hidden">
        <CardHeader className="p-0">
          <Link href={`/campaign/${campaign.id}`} className="block relative">
            <div className="aspect-video overflow-hidden">
              <Image
                src={campaign.imageUrl}
                alt={campaign.title}
                width={600}
                height={400}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={campaign.aiHint}
              />
            </div>
            <Badge variant="secondary" className="absolute top-2 right-2 bg-black/50 text-white">{campaign.cause}</Badge>
          </Link>
        </CardHeader>
        <div className="p-4 flex flex-col flex-grow">
          <CardTitle className="text-lg font-bold leading-snug mb-2">
            <Link href={`/campaign/${campaign.id}`} className="hover:text-primary transition-colors">
              {campaign.title}
            </Link>
          </CardTitle>
          <CardContent className="p-0 flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-3 h-[60px]">
              {campaign.description}
            </p>
            <div className="mt-4 space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-foreground">
                  ₹{campaign.raisedAmount.toLocaleString()}
                </span>
                <span className="text-muted-foreground">
                  of ₹{campaign.targetAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </div>
        <CardFooter className="p-4 pt-0">
          <Button asChild className="w-full font-bold">
            <Link href={`/campaign/${campaign.id}`}>Donate Now</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
