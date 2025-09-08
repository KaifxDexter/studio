'use client';

import { useTransition, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Wand2 } from 'lucide-react';
import type { Campaign } from '@/lib/types';

const formSchema = z.object({
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters.',
  }),
  cause: z.enum(['Medical', 'Education', 'Disaster Relief', 'Personal'], {
    required_error: 'You need to select a campaign cause.',
  }),
  targetAmount: z.coerce
    .number({ invalid_type_error: 'Please enter a valid number.' })
    .positive({ message: 'Target amount must be positive.' }),
  description: z.string().min(20, {
    message: 'Description must be at least 20 characters.',
  }),
  imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }),
});

export default function CreateCampaignPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isAiPending, startAiTransition] = useTransition();
  const [isSubmitPending, startSubmitTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      targetAmount: 1000,
      description: '',
      imageUrl: 'https://picsum.photos/600/400',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startSubmitTransition(async () => {
      try {
        // 1. Generate the long description
        const longDescResponse = await fetch('/api/generate-description', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: values.title, shortDescription: values.description }),
        });
        const longDescResult = await longDescResponse.json();

        if (!longDescResponse.ok || !longDescResult.success) {
            throw new Error(longDescResult.error || 'Failed to generate full description.');
        }
        
        const fullDescription = longDescResult.description;

        // 2. Save the new campaign with both descriptions
        const storedCampaigns = JSON.parse(localStorage.getItem('userCampaigns') || '[]');
        const newCampaign: Campaign = {
          id: `user-${Date.now()}`,
          title: values.title,
          description: values.description,
          fullDescription: fullDescription,
          imageUrl: values.imageUrl,
          targetAmount: values.targetAmount,
          raisedAmount: 0,
          fundraiserName: 'You',
          cause: values.cause,
          aiHint: 'custom campaign',
        };
        
        const updatedCampaigns = [...storedCampaigns, newCampaign];
        localStorage.setItem('userCampaigns', JSON.stringify(updatedCampaigns));

        toast({
          title: 'Campaign Created!',
          description: 'Your campaign has been successfully created and saved.',
        });
        router.push('/causes');

      } catch (error) {
         console.error("Failed to create campaign", error);
         const errorMessage = error instanceof Error ? error.message : 'Could not save your campaign.';
         toast({
          title: 'Creation Failed',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    });
  }
  
  const handleGenerateDescription = () => {
    const { title, cause, targetAmount } = form.getValues();

    if (!title || !cause || !targetAmount) {
      toast({
        title: 'Missing Information',
        description: 'Please provide a title, cause, and target amount to generate a description.',
        variant: 'destructive',
      });
      return;
    }

    startAiTransition(async () => {
      try {
        const response = await fetch('/api/generate-description', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, cause, targetAmount }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          form.setValue('description', result.description);
          toast({
            title: 'Description Generated',
            description: 'The AI has generated a description for your campaign.',
          });
        } else {
          toast({
            title: 'Generation Failed',
            description: result.error || 'Could not generate a description.',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: 'Generation Failed',
          description: 'An unexpected error occurred.',
          variant: 'destructive',
        });
      }
    });
  };
  
  const isPending = isAiPending || isSubmitPending;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-3xl">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Create a New Campaign</CardTitle>
          <CardDescription>Fill in the details below to start your fundraising journey.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campaign Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Help Rebuild the Community Library" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="cause"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cause</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a cause" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Medical">Medical</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Disaster Relief">Disaster Relief</SelectItem>
                          <SelectItem value="Personal">Personal</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="targetAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Amount (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campaign Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormDescription>
                      Use a placeholder from picsum.photos or provide your own image link.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Campaign Description</FormLabel>
                      <Button type="button" variant="ghost" size="sm" onClick={handleGenerateDescription} disabled={isAiPending}>
                        <Wand2 className="mr-2 h-4 w-4" />
                        {isAiPending ? 'Generating...' : 'Generate with AI'}
                      </Button>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Tell a compelling story about your cause..."
                        className="resize-y min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" size="lg" className="w-full font-bold" disabled={isPending}>
                {isSubmitPending ? 'Creating Campaign...' : 'Create Campaign'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
