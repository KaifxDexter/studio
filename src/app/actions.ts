'use server';

import { generateCampaignDescription, type GenerateCampaignDescriptionInput } from '@/ai/flows/generate-campaign-description';
import { z } from 'zod';

const AiInputSchema = z.object({
  title: z.string().min(1, 'Title is required to generate a description.'),
  cause: z.string().min(1, 'Cause is required.'),
  targetAmount: z.number().positive('Target amount must be a positive number.'),
  additionalDetails: z.string().optional(),
});

export async function generateDescriptionAction(data: unknown) {
  const validation = AiInputSchema.safeParse(data);
  
  if (!validation.success) {
    return { success: false, error: validation.error.errors.map(e => e.message).join(' ') };
  }

  try {
    const result = await generateCampaignDescription(validation.data as GenerateCampaignDescriptionInput);
    if (result && result.description) {
      return { success: true, description: result.description };
    }
    return { success: false, error: 'AI model did not return a description.' };
  } catch (e) {
    console.error(e);
    return { success: false, error: 'An unexpected error occurred while generating the description.' };
  }
}
