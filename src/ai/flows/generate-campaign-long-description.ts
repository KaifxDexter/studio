'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a full, compelling fundraising campaign description from a short summary.
 *
 * It includes:
 * - `generateCampaignLongDescription`: An asynchronous function that takes a short description and campaign details to generate a full description.
 * - `GenerateCampaignLongDescriptionInput`: The input type for the function.
 * - `GenerateCampaignLongDescriptionOutput`: The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCampaignLongDescriptionInputSchema = z.object({
  title: z.string().describe('The title of the fundraising campaign.'),
  shortDescription: z.string().describe('A brief, one-sentence description of the campaign.'),
});
export type GenerateCampaignLongDescriptionInput = z.infer<typeof GenerateCampaignLongDescriptionInputSchema>;

const GenerateCampaignLongDescriptionOutputSchema = z.object({
  longDescription: z.string().describe('The generated full-length campaign description.'),
});
export type GenerateCampaignLongDescriptionOutput = z.infer<typeof GenerateCampaignLongDescriptionOutputSchema>;


export async function generateCampaignLongDescription(
  input: GenerateCampaignLongDescriptionInput
): Promise<GenerateCampaignLongDescriptionOutput> {
  return generateCampaignLongDescriptionFlow(input);
}


const generateCampaignLongDescriptionPrompt = ai.definePrompt({
  name: 'generateCampaignLongDescriptionPrompt',
  input: {schema: GenerateCampaignLongDescriptionInputSchema},
  output: {schema: GenerateCampaignLongDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in creating compelling fundraising campaign descriptions.

  Given the following information about a fundraising campaign, expand the short description into a full, engaging, and persuasive description of at least 3-4 paragraphs.

  The full description should be emotionally resonant and clearly explain the purpose of the campaign, why it is important, and how donations will make a difference.

  Campaign Title: {{title}}
  Short Description: {{shortDescription}}

  Generate the long description.
  `,
});


const generateCampaignLongDescriptionFlow = ai.defineFlow(
  {
    name: 'generateCampaignLongDescriptionFlow',
    inputSchema: GenerateCampaignLongDescriptionInputSchema,
    outputSchema: GenerateCampaignLongDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateCampaignLongDescriptionPrompt(input);
    return output!;
  }
);
