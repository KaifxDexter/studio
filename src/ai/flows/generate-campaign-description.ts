'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating compelling fundraising campaign descriptions using AI.
 *
 * It includes:
 * - `generateCampaignDescription`: An asynchronous function that takes campaign details as input and returns a generated description.
 * - `GenerateCampaignDescriptionInput`: The input type for the `generateCampaignDescription` function.
 * - `GenerateCampaignDescriptionOutput`: The output type for the `generateCampaignDescription` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCampaignDescriptionInputSchema = z.object({
  title: z.string().describe('The title of the fundraising campaign.'),
  cause: z.string().describe('The cause or purpose of the fundraising campaign (e.g., medical, education, disaster relief).'),
  targetAmount: z.number().describe('The target amount to be raised for the campaign.'),
  additionalDetails: z.string().optional().describe('Any additional details or context about the campaign.'),
});
export type GenerateCampaignDescriptionInput = z.infer<typeof GenerateCampaignDescriptionInputSchema>;

const GenerateCampaignDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated campaign description.'),
});
export type GenerateCampaignDescriptionOutput = z.infer<typeof GenerateCampaignDescriptionOutputSchema>;

export async function generateCampaignDescription(
  input: GenerateCampaignDescriptionInput
): Promise<GenerateCampaignDescriptionOutput> {
  return generateCampaignDescriptionFlow(input);
}

const generateCampaignDescriptionPrompt = ai.definePrompt({
  name: 'generateCampaignDescriptionPrompt',
  input: {schema: GenerateCampaignDescriptionInputSchema},
  output: {schema: GenerateCampaignDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in creating compelling fundraising campaign descriptions.

  Given the following information about a fundraising campaign, generate a description that is engaging, persuasive, and likely to attract donations.

  Campaign Title: {{title}}
  Cause: {{cause}}
  Target Amount: {{targetAmount}}
  Additional Details: {{additionalDetails}}

  Write a description that clearly explains the purpose of the campaign, why it is important, and how donations will be used to make a difference. The description should be concise yet emotionally resonant.
  `,
});

const generateCampaignDescriptionFlow = ai.defineFlow(
  {
    name: 'generateCampaignDescriptionFlow',
    inputSchema: GenerateCampaignDescriptionInputSchema,
    outputSchema: GenerateCampaignDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateCampaignDescriptionPrompt(input);
    return output!;
  }
);
