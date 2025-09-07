import { NextRequest, NextResponse } from 'next/server';
import { generateCampaignDescription, type GenerateCampaignDescriptionInput } from '@/ai/flows/generate-campaign-description';
import { z } from 'zod';

const AiInputSchema = z.object({
  title: z.string().min(1, 'Title is required to generate a description.'),
  cause: z.string().min(1, 'Cause is required.'),
  targetAmount: z.number().positive('Target amount must be a positive number.'),
  additionalDetails: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = AiInputSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ success: false, error: validation.error.errors.map(e => e.message).join(' ') }, { status: 400 });
    }

    const result = await generateCampaignDescription(validation.data as GenerateCampaignDescriptionInput);
    
    if (result && result.description) {
      return NextResponse.json({ success: true, description: result.description });
    }
    
    return NextResponse.json({ success: false, error: 'AI model did not return a description.' }, { status: 500 });
  
  } catch (e) {
    console.error(e);
    // Check if e is an instance of Error to safely access the message property
    const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
    return NextResponse.json({ success: false, error: 'An unexpected error occurred while generating the description.', details: errorMessage }, { status: 500 });
  }
}
