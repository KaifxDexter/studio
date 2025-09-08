
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useCampaigns } from '@/hooks/use-campaigns';
import type { Campaign } from '@/lib/types';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// This page is now fully dynamic to support campaigns created on the client.
export const dynamic = 'force-dynamic';

function CampaignDetailsClient({ id }: { id: string }) {
  const allCampaigns = useCampaigns();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (allCampaigns.length > 0) {
      const foundCampaign = allCampaigns.find(c => c.id === id);
      setCampaign(foundCampaign || null);
      setIsLoading(false);
    }
  }, [id, allCampaigns]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Skeleton className="h-10 w-1/4 mb-2" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="aspect-video w-full" />
            <div className="mt-8 space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
            </div>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg glass-card">
              <CardHeader>
                <Skeleton className="h-3 w-full mb-2" />
                <div className="flex justify-between items-baseline">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardHeader>
              <CardContent className="text-center">
                 <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
                 <Skeleton className="h-64 w-64 mx-auto" />
                 <Skeleton className="h-4 w-5/6 mx-auto mt-4" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return notFound();
  }

  const progress = Math.min((campaign.raisedAmount / campaign.targetAmount) * 100, 100);
  const upiUrl = `upi://pay?pa=kaifnabeel125@oksbi&pn=Mohd Kaif&tn=Donation for ${encodeURIComponent(campaign.title)}&tr=${campaign.id}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(upiUrl)}&size=256x256&bgcolor=F9E7D9`;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-2 bg-black/50 text-white">{campaign.cause}</Badge>
            <h1 className="text-3xl md:text-5xl font-headline font-bold text-white">
              {campaign.title}
            </h1>
            <div className="flex items-center mt-4 text-muted-foreground">
              <User className="mr-2 h-4 w-4" />
              <span>Organized by {campaign.fundraiserName}</span>
            </div>
          </div>
          <Card className="mb-8 overflow-hidden glass-card">
            <div className="aspect-video overflow-hidden">
              <Image
                src={campaign.imageUrl}
                alt={campaign.title}
                width={800}
                height={500}
                className="w-full h-full object-cover"
                data-ai-hint={campaign.aiHint}
                priority
                unoptimized
              />
            </div>
          </Card>
          <div className="prose dark:prose-invert max-w-none text-base md:text-lg">
            <p>{campaign.fullDescription}</p>
          </div>
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-24 shadow-lg glass-card">
            <CardHeader>
              <div className="space-y-2">
                <Progress value={progress} className="h-3" />
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-bold text-primary">
                    ₹{campaign.raisedAmount.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    raised of ₹{campaign.targetAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <h3 className="text-lg font-semibold mb-4">Donate via any UPI App</h3>
              <div className="p-1 bg-white/90 rounded-lg inline-block qr-code-container">
                <Image
                  src={qrCodeUrl}
                  alt="Donation QR Code"
                  width={256}
                  height={256}
                  className="rounded-md"
                  unoptimized
                />
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Scan the QR code with your favorite payment app to donate instantly.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


export default function CampaignDetailsPage({ params }: { params: { id: string } }) {
  return <CampaignDetailsClient id={params.id} />;
}
