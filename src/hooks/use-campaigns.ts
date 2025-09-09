'use client';

import { useState, useEffect } from 'react';
import type { Campaign } from '@/lib/types';
import { campaigns as staticCampaigns } from '@/lib/data';

export function useCampaigns() {
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This code runs only on the client, after the component has mounted.
    // This avoids hydration mismatches by ensuring the server and client
    // both start with an empty array, and data is loaded client-side.
    try {
      const storedCampaigns = JSON.parse(localStorage.getItem('userCampaigns') || '[]');
      // We combine static campaigns with user-created campaigns.
      const combined = [...staticCampaigns, ...storedCampaigns];
      const uniqueCampaigns = Array.from(new Map(combined.map(c => [c.id, c])).values());
      setAllCampaigns(uniqueCampaigns);
    } catch (error) {
      console.error("Could not load user campaigns from localStorage", error);
      // If there's an error, we gracefully fall back to only static campaigns.
      setAllCampaigns(staticCampaigns);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { campaigns: allCampaigns, isLoading };
}
