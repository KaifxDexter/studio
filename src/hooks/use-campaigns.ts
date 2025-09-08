'use client';

import { useState, useEffect } from 'react';
import type { Campaign } from '@/lib/types';
import { campaigns as staticCampaigns } from '@/lib/data';

export function useCampaigns() {
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>(staticCampaigns);

  useEffect(() => {
    // This code runs only on the client, after the component has mounted.
    // This avoids hydration mismatches.
    try {
      const storedCampaigns = JSON.parse(localStorage.getItem('userCampaigns') || '[]');
      // We combine static campaigns with user-created campaigns.
      // A Set is used to prevent duplicate campaigns if the hook runs multiple times.
      const combined = [...staticCampaigns, ...storedCampaigns];
      const uniqueCampaigns = Array.from(new Map(combined.map(c => [c.id, c])).values());
      setAllCampaigns(uniqueCampaigns);
    } catch (error) {
      console.error("Could not load user campaigns from localStorage", error);
      // If there's an error, we gracefully fall back to only static campaigns.
      setAllCampaigns(staticCampaigns);
    }
  }, []);

  return allCampaigns;
}
