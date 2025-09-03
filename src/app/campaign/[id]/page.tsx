import Image from 'next/image';
import { notFound } from 'next/navigation';
import { campaigns } from '@/lib/data';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Target, TrendingUp } from 'lucide-react';

export default function CampaignDetailsPage({ params }: { params: { id: string } }) {
  const campaign = campaigns.find(c => c.id === params.id);

  if (!campaign) {
    notFound();
  }

  const progress = Math.min((campaign.raisedAmount / campaign.targetAmount) * 100, 100);
  const upiUrl = `upi://pay?pa=fundraiser@upi&pn=FundScan&tn=Donation for ${encodeURIComponent(campaign.title)}&tr=${campaign.id}`;
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
            <Image
              src={campaign.imageUrl}
              alt={campaign.title}
              width={800}
              height={500}
              className="w-full h-auto object-cover"
              data-ai-hint="charity event"
              priority
            />
          </Card>
          <div className="prose dark:prose-invert max-w-none text-lg">
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
              <div className="p-4 bg-white/90 rounded-lg inline-block">
                <Image
                  src={qrCodeUrl}
                  alt="Donation QR Code"
                  width={256}
                  height={256}
                  unoptimized // QR code from external API
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
