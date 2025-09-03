import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Edit } from 'lucide-react';
import { campaigns } from '@/lib/data';
import { CampaignCard } from '@/components/CampaignCard';

export default function ProfilePage() {
  const userCampaigns = campaigns.slice(0, 2); 
  const userDonations = campaigns.slice(2, 4);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary/50">
          <AvatarImage src="https://picsum.photos/200" alt="User" data-ai-hint="user avatar" />
          <AvatarFallback>
            <User className="h-12 w-12" />
          </AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-headline font-bold">Jane Doe</h1>
          <p className="text-muted-foreground mt-1">jane.doe@example.com</p>
          <p className="max-w-xl mt-2">Passionate about leveraging technology to create positive social impact. Believer in community and kindness.</p>
          <Button variant="outline" className="mt-4">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full md:w-1/2 lg:w-1/3 grid-cols-2">
          <TabsTrigger value="campaigns">My Campaigns</TabsTrigger>
          <TabsTrigger value="donations">My Donations</TabsTrigger>
        </TabsList>
        <TabsContent value="campaigns" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaigns You've Created</CardTitle>
            </CardHeader>
            <CardContent>
              {userCampaigns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userCampaigns.map(campaign => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">You haven't created any campaigns yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="donations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Donation History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userDonations.length > 0 ? (
                 userDonations.map(donation => (
                  <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">{donation.title}</p>
                      <p className="text-sm text-muted-foreground">Donated on {new Date().toLocaleDateString()}</p>
                    </div>
                    <p className="font-bold text-lg text-primary">$50</p>
                  </div>
                 ))
              ) : (
                <p className="text-muted-foreground">You haven't made any donations yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
