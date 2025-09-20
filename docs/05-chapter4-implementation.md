
# Chapter 4: Implementation

This chapter details the implementation of the "Donify" platform, focusing on the key code structures and components.

## 4.1 Frontend Development

The frontend is built with React and Next.js, with components organized for reusability.

### 4.1.1 Key Components

*   **`src/app/page.tsx` (Homepage):** The main landing page, featuring a hero section, a filterable list of active campaigns displayed in an interactive `CampaignDeck`, and calls to action.
*   **`src/app/create/page.tsx` (Create Campaign Page):** Contains the form for creating a new campaign. It uses `react-hook-form` for state management and `zod` for validation. This is where the "Generate with AI" functionality is initiated.
*   **`src/app/campaign/[id]/page.tsx` (Campaign Details Page):** A dynamic route that displays the full details of a single campaign, including its full description, progress bar, and the QR code for donations.
*   **`src/components/CampaignCard.tsx`:** A reusable component that displays a summary of a campaign. It is used on the homepage, causes page, and profile page. It includes logic for animations and conditional rendering of edit/delete buttons.
*   **`src/components/CampaignDeck.tsx`:** An interactive, swipeable deck of campaign cards used on the homepage, built with `framer-motion` for fluid animations.
*   **`src/hooks/use-campaigns.ts`:** A custom React hook that encapsulates the logic for fetching campaign data. It combines the static data from `src/lib/data.ts` with user-created campaigns from `localStorage`, providing a unified list of campaigns to the rest of the application.

### 4.1.2 Styling

Styling is handled by Tailwind CSS, with a custom theme defined in `src/app/globals.css`. ShadCN UI provides the base components (Buttons, Cards, Inputs, etc.), which are customized to fit the application's aesthetic. A `glass-card` effect (using background blur and transparency) is used throughout the UI to create a modern, layered look.

## 4.2 AI Backend with Genkit

The AI logic is implemented using Genkit flows, which are server-side TypeScript modules.

### 4.2.1 `src/ai/flows/generate-campaign-description.ts`

This file defines the primary AI flow for generating the initial, shorter campaign description.

*   **Input/Output Schemas:** Zod schemas (`GenerateCampaignDescriptionInputSchema`, `GenerateCampaignDescriptionOutputSchema`) are defined to ensure type safety for the data flowing in and out of the AI model.
*   **Prompt Definition:** `ai.definePrompt` is used to create a prompt template. This template instructs the AI model to act as a professional copywriter and uses Handlebars syntax (`{{title}}`, `{{cause}}`) to insert the user's input into the prompt.
*   **Flow Definition:** `ai.defineFlow` wraps the prompt call. It receives the input, calls the prompt, and returns the structured output. This encapsulates the entire AI interaction into a single, reusable function.

### 4.2.2 `src/app/api/generate-description/route.ts`

This is the Next.js API route that connects the frontend to the Genkit flows.

*   It accepts POST requests from the client.
*   It parses the request body and validates it against the appropriate Zod schema.
*   It determines whether to call the short description flow or the long description flow based on the presence of a `shortDescription` field in the request.
*   It calls the corresponding Genkit function (`generateCampaignDescription` or `generateCampaignLongDescription`).
*   It handles the response from the flow, returning the generated description to the client as JSON, or sending an error message if the process fails.

## 43 Data Handling

*   **Static Data:** A base set of campaigns is defined in `src/lib/data.ts`. This ensures the application has content on first load.
*   **Dynamic Data:** User-created campaigns are managed on the client side using `localStorage`. When a user creates a campaign, the new campaign object is added to an array in `localStorage`. The `useCampaigns` hook reads from this `localStorage` key to retrieve user campaigns. This approach simplifies the project by removing the need for a traditional database and authentication system. The user's profile information is handled similarly.
