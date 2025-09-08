
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
import { User, Edit, Trash2 } from 'lucide-react';
import type { Campaign, CampaignCause } from '@/lib/types';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  bio: z.string().max(200, { message: 'Bio cannot be more than 200 characters.' }).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const campaignFormSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters.' }),
  targetAmount: z.coerce.number().positive({ message: 'Target amount must be positive.' }),
  cause: z.enum(['Medical', 'Education', 'Disaster Relief', 'Personal']),
  imageUrl: z.string().url({ message: 'Please enter a valid URL.' }),
});

type CampaignFormValues = z.infer<typeof campaignFormSchema>;

const defaultProfile = {
  name: 'Your Name',
  email: 'your.email@example.com',
  bio: 'Passionate about leveraging technology to create positive social impact. Believer in community and kindness.',
};

export default function ProfilePage() {
  const { toast } = useToast();
  const allCampaigns = useCampaigns();
  const [userCampaigns, setUserCampaigns] = useState<Campaign[]>([]);
  const [userDonations] = useState(allCampaigns.slice(2, 4));
  
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isCampaignDialogOpen, setIsCampaignDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState(defaultProfile);

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem('userProfile');
      if (storedProfile) setUserProfile(JSON.parse(storedProfile));
      
      const storedCampaigns = JSON.parse(localStorage.getItem('userCampaigns') || '[]');
      setUserCampaigns(storedCampaigns);

    } catch (error) {
      console.error("Could not load data from localStorage", error);
    }
  }, []);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    values: userProfile,
    enableReinitialize: true,
  });

  const campaignForm = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
  });

  useEffect(() => {
    if (selectedCampaign) {
      campaignForm.reset({
        title: selectedCampaign.title,
        description: selectedCampaign.description,
        targetAmount: selectedCampaign.targetAmount,
        cause: selectedCampaign.cause,
        imageUrl: selectedCampaign.imageUrl,
      });
    }
  }, [selectedCampaign, campaignForm]);

  const saveCampaignsToStorage = (campaigns: Campaign[]) => {
    try {
      localStorage.setItem('userCampaigns', JSON.stringify(campaigns));
    } catch (error) {
      console.error("Could not save campaigns to localStorage", error);
      toast({ title: 'Error', description: 'Could not save campaign changes.', variant: 'destructive' });
    }
  };
  
  const handleProfileSubmit = (data: ProfileFormValues) => {
    const updatedProfile = { ...userProfile, ...data };
    setUserProfile(updatedProfile);
    try {
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      toast({ title: 'Profile Updated', description: 'Your profile information has been saved.' });
    } catch (error) {
      console.error("Could not save user profile to localStorage", error);
      toast({ title: 'Error', description: 'Could not save your profile changes.', variant: 'destructive' });
    }
    setIsProfileDialogOpen(false);
  };

  const handleCampaignSubmit = (data: CampaignFormValues) => {
    if (!selectedCampaign) return;

    const updatedCampaign = { ...selectedCampaign, ...data };
    const updatedCampaigns = userCampaigns.map(c => c.id === updatedCampaign.id ? updatedCampaign : c);

    setUserCampaigns(updatedCampaigns);
    saveCampaignsToStorage(updatedCampaigns);

    toast({ title: 'Campaign Updated', description: 'Your campaign has been successfully updated.' });
    setIsCampaignDialogOpen(false);
    setSelectedCampaign(null);
  };

  const handleEditClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsCampaignDialogOpen(true);
  };

  const handleDeleteClick = (campaignId: string) => {
    setCampaignToDelete(campaignId);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (!campaignToDelete) return;
    
    const updatedCampaigns = userCampaigns.filter(c => c.id !== campaignToDelete);
    setUserCampaigns(updatedCampaigns);
    saveCampaignsToStorage(updatedCampaigns);
    
    toast({ title: 'Campaign Deleted', description: 'Your campaign has been removed.' });
    setIsDeleteDialogOpen(false);
    setCampaignToDelete(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary/50">
          <AvatarImage src="https://picsum.photos/200" alt="User" data-ai-hint="user avatar" />
          <AvatarFallback><User className="h-12 w-12" /></AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-headline font-bold">{userProfile.name}</h1>
          <p className="text-muted-foreground mt-1">{userProfile.email}</p>
          <p className="max-w-xl mt-2">{userProfile.bio}</p>
          <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-4"><Edit className="mr-2 h-4 w-4" />Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] glass-card">
              <DialogHeader><DialogTitle>Edit Profile</DialogTitle><DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription></DialogHeader>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-4 py-4">
                  <FormField control={profileForm.control} name="name" render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={profileForm.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={profileForm.control} name="bio" render={({ field }) => (<FormItem><FormLabel>Bio</FormLabel><FormControl><Textarea className="resize-none" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <DialogFooter><DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose><Button type="submit">Save Changes</Button></DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full md:w-1/2 lg:w-1/3 grid-cols-2 bg-muted/60 backdrop-blur-xl">
          <TabsTrigger value="campaigns">My Campaigns</TabsTrigger>
          <TabsTrigger value="donations">My Donations</TabsTrigger>
        </TabsList>

        {/* My Campaigns Content */}
        <TabsContent value="campaigns" className="mt-6">
          <Card className="glass-card">
            <CardHeader><CardTitle>Campaigns You've Created</CardTitle></CardHeader>
            <CardContent>
              {userCampaigns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userCampaigns.map(campaign => (
                    <CampaignCard key={campaign.id} campaign={campaign} onEdit={handleEditClick} onDelete={handleDeleteClick} />
                  ))}
                </div>
              ) : <p className="text-muted-foreground">You haven't created any campaigns yet.</p>}
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Donations Content */}
        <TabsContent value="donations" className="mt-6">
          <Card className="glass-card">
            <CardHeader><CardTitle>Your Donation History</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {userDonations.length > 0 ? userDonations.map(donation => (
                <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg glass-card">
                  <div><p className="font-semibold">{donation.title}</p><p className="text-sm text-muted-foreground">Donated on {new Date().toLocaleDateString()}</p></div>
                  <p className="font-bold text-lg text-primary">₹500</p>
                </div>
              )) : <p className="text-muted-foreground">You haven't made any donations yet.</p>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Edit Campaign Dialog */}
      <Dialog open={isCampaignDialogOpen} onOpenChange={setIsCampaignDialogOpen}>
        <DialogContent className="sm:max-w-2xl glass-card">
            <DialogHeader><DialogTitle>Edit Campaign</DialogTitle><DialogDescription>Update the details of your campaign.</DialogDescription></DialogHeader>
            <Form {...campaignForm}>
                <form onSubmit={campaignForm.handleSubmit(handleCampaignSubmit)} className="space-y-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
                    <FormField control={campaignForm.control} name="title" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={campaignForm.control} name="description" render={({ field }) => (<FormItem><FormLabel>Short Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={campaignForm.control} name="targetAmount" render={({ field }) => (<FormItem><FormLabel>Target Amount (₹)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={campaignForm.control} name="cause" render={({ field }) => (
                      <FormItem><FormLabel>Cause</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="Medical">Medical</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Disaster Relief">Disaster Relief</SelectItem>
                            <SelectItem value="Personal">Personal</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}/>
                    <FormField control={campaignForm.control} name="imageUrl" render={({ field }) => (<FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <DialogFooter>
                      <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                      <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="glass-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete your campaign.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
