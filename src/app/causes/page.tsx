
'use client';

import { CampaignCard } from '@/components/CampaignCard';
import { useCampaigns } from '@/hooks/use-campaigns';
import { Skeleton } from '@/components/ui/skeleton';

export default function AllCausesPage() {
  const { campaigns, isLoading } = useCampaigns();
  
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
          campaigns.map((campaign, index) => (
            <CampaignCard key={campaign.id} campaign={campaign} animationDirection="none" index={index} />
          ))
        )}
      </div>
    </div>
  );
}
