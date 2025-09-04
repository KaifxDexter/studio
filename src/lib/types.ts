export type CampaignCause = 'Medical' | 'Education' | 'Disaster Relief' | 'Personal';

export interface Campaign {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  imageUrl: string;
  targetAmount: number;
  raisedAmount: number;
  fundraiserName: string;
  cause: CampaignCause;
  aiHint: string;
}
