
'use client';

import { useState } from 'react';
import { CampaignCard } from '@/components/CampaignCard';
import { useCampaigns } from '@/hooks/use-campaigns';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Campaign, CampaignCause } from '@/lib/types';

const campaignCauses: Array<CampaignCause | 'All'> = ['All', 'Medical', 'Education', 'Disaster Relief', 'Personal'];

export default function AllCausesPage() {
  const { campaigns, isLoading } = useCampaigns();
  const [selectedCategory, setSelectedCategory] = useState<CampaignCause | 'All'>('All');

  const filteredCampaigns = selectedCategory === 'All'
    ? campaigns
    : campaigns.filter(campaign => campaign.cause === selectedCategory);
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-white">
          All Active Campaigns
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Find a cause that speaks to you. Every donation makes a difference.
        </p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="aspect-video w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full mt-2" />
            </div>
          ))
        ) : (
          filteredCampaigns.map((campaign, index) => (
            <CampaignCard key={campaign.id} campaign={campaign} animationDirection="none" index={index} />
          ))
        )}
      </div>
    </div>
  );
}
