
'use client';

import { CampaignCard } from '@/components/CampaignCard';
import { useCampaigns } from '@/hooks/use-campaigns';

export default function AllCausesPage() {
  const allCampaigns = useCampaigns();
  
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
        {allCampaigns.map((campaign, index) => (
          <CampaignCard key={campaign.id} campaign={campaign} animationDirection="none" index={index} />
        ))}
      </div>
    </div>
  );
}
