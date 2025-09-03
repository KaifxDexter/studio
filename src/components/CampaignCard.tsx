import Link from 'next/link';
import Image from 'next/image';
import type { Campaign } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = Math.min((campaign.raisedAmount / campaign.targetAmount) * 100, 100);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Link href={`/campaign/${campaign.id}`} className="block">
          <Image
            src={campaign.imageUrl}
            alt={campaign.title}
            width={600}
            height={400}
            className="w-full h-48 object-cover"
            data-ai-hint="fundraising event"
          />
        </Link>
        <Badge variant="secondary" className="absolute top-2 right-2">{campaign.cause}</Badge>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-lg font-bold leading-snug mb-2 line-clamp-2 h-[56px]">
          <Link href={`/campaign/${campaign.id}`} className="hover:text-primary transition-colors">
            {campaign.title}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3 h-[60px]">
          {campaign.description}
        </p>
        <div className="mt-4 space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-foreground">
              ${campaign.raisedAmount.toLocaleString()}
            </span>
            <span className="text-muted-foreground">
              of ${campaign.targetAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full font-bold">
          <Link href={`/campaign/${campaign.id}`}>Donate Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
