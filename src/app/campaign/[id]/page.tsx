import { CampaignDetailsClient } from '@/components/CampaignDetailsClient';
import { campaigns as staticCampaigns } from '@/lib/data';

// This function is required for static export with dynamic routes.
// It runs at build time on the server.
export async function generateStaticParams() {
  return staticCampaigns.map((campaign) => ({
    id: campaign.id,
  }));
}

// This is the main page component (a Server Component).
export default function CampaignDetailsPage({ params }: { params: { id: string } }) {
  // It renders the Client Component, which handles all the logic and UI.
  return <CampaignDetailsClient id={params.id} />;
}
