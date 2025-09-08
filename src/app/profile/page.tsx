
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Edit } from 'lucide-react';
import { useCampaigns } from '@/hooks/use-campaigns';
import { CampaignCard } from '@/components/CampaignCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  bio: z.string().max(200, { message: 'Bio cannot be more than 200 characters.' }).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultProfile = {
  name: 'Your Name',
  email: 'your.email@example.com',
  bio: 'Passionate about leveraging technology to create positive social impact. Believer in community and kindness.',
};

export default function ProfilePage() {
  const { toast } = useToast();
  const allCampaigns = useCampaigns();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(defaultProfile);

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem('userProfile');
      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile));
      }
    } catch (error) {
      console.error("Could not load user profile from localStorage", error);
    }
  }, []);
  
  const userCampaigns = allCampaigns.filter(c => c.fundraiserName === 'You');
  const userDonations = allCampaigns.slice(2, 4);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    values: {
      name: userProfile.name,
      email: userProfile.email,
      bio: userProfile.bio,
    },
    // This will re-initialize the form when userProfile changes
    enableReinitialize: true, 
  });

  function onSubmit(data: ProfileFormValues) {
    const updatedProfile = { ...userProfile, name: data.name, email: data.email, bio: data.bio || '' };
    setUserProfile(updatedProfile);
    try {
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been saved.',
      });
    } catch (error) {
      console.error("Could not save user profile to localStorage", error);
      toast({
        title: 'Error',
        description: 'Could not save your profile changes.',
        variant: 'destructive'
      });
    }
    setIsDialogOpen(false);
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary/50">
          <AvatarImage src="https://picsum.photos/200" alt="User" data-ai-hint="user avatar" unoptimized />
          <AvatarFallback>
            <User className="h-12 w-12" />
          </AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-headline font-bold">{userProfile.name}</h1>
          <p className="text-muted-foreground mt-1">{userProfile.email}</p>
          <p className="max-w-xl mt-2">{userProfile.bio}</p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-4">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] glass-card">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us a little about yourself" className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button type="submit">Save Changes</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full md:w-1/2 lg:w-1/3 grid-cols-2 bg-muted/60 backdrop-blur-xl">
          <TabsTrigger value="campaigns">My Campaigns</TabsTrigger>
          <TabsTrigger value="donations">My Donations</TabsTrigger>
        </TabsList>
        <TabsContent value="campaigns" className="mt-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Campaigns You've Created</CardTitle>
            </CardHeader>
            <CardContent>
              {userCampaigns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userCampaigns.map(campaign => (
                    <CampaignCard key={campaign.id} campaign={campaign} animationDirection="none" />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">You haven't created any campaigns yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="donations" className="mt-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Your Donation History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userDonations.length > 0 ? (
                 userDonations.map(donation => (
                  <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg glass-card">
                    <div>
                      <p className="font-semibold">{donation.title}</p>
                      <p className="text-sm text-muted-foreground">Donated on {new Date().toLocaleDateString()}</p>
                    </div>
                    <p className="font-bold text-lg text-primary">₹500</p>
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
