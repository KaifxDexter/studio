import { CampaignDetailsClient } from '@/components/CampaignDetailsClient';

// This is the main page component (a Server Component).
export default function CampaignDetailsPage({ params }: { params: { id: string } }) {
  // It renders the Client Component, which handles all the logic and UI.
  return <CampaignDetailsClient id={params.id} />;
}
