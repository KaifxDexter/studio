
# Chapter 3: Research Methodology

This chapter outlines the methodology used to develop the "Donify" platform, covering the system architecture, technology stack, and the design of its core components.

## 3.1 System Architecture

The project follows a client-server architecture, leveraging the capabilities of the Next.js framework.

*   **Client-Side (Frontend):** The user interface is built with React components, styled with Tailwind CSS and ShadCN UI. The client-side handles user interactions, form submissions, and rendering of campaign data. It interacts with the backend via API routes.
*   **Server-Side (Backend):** Next.js API routes serve as the backend. These serverless functions handle business logic, such as processing requests for AI-generated descriptions. This architecture is lightweight, scalable, and well-integrated with the frontend.
*   **AI Integration (Genkit):** The AI functionality is encapsulated in "flows" using Google's Genkit. When the user requests an AI-generated description, the frontend sends a request to a dedicated API route. This route then invokes the Genkit flow, which communicates with the Gemini Large Language Model to generate the text and sends it back to the client.
*   **Data Storage:** For this proof-of-concept, a hybrid data storage approach is used. A static list of campaigns is defined in the source code to provide initial content. User-created campaigns and profile information are stored in the browser's `localStorage`. This simplifies development by avoiding the need for a persistent database, while still allowing for dynamic, user-generated content.

## 3.2 Technology Stack

*   **Framework:** Next.js (with App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, ShadCN UI
*   **AI Toolkit:** Genkit
*   **AI Model:** Google Gemini
*   **Forms:** React Hook Form with Zod for validation
*   **Animations:** Framer Motion

## 3.3 System Design Approach

### 3.3.1 AI-Powered Description Generation

The core AI feature is designed as follows:
1.  The user fills out the basic details of their campaign: Title, Cause, and Target Amount.
2.  They click a "Generate with AI" button.
3.  The frontend sends these details to the `/api/generate-description` endpoint.
4.  The API route validates the input and calls the `generateCampaignDescription` function, which is a Genkit flow.
5.  The Genkit flow uses a predefined prompt template, inserting the user's campaign details into a request sent to the Gemini LLM.
6.  The prompt instructs the AI to act as an expert copywriter and generate a compelling description.
7.  The LLM returns a structured JSON object containing the generated description.
8.  The API route sends this description back to the frontend.
9.  The description field in the campaign creation form is automatically populated with the AI-generated text, which the user can then edit or use as is.

A similar flow exists for expanding a short description into a longer, more detailed one, which is used when the campaign is formally submitted.

### 3.3.2 Fraud Detection (Conceptual)

While the full implementation of a machine learning-based fraud detection system is outside the scope of this project's proof-of-concept, the system is designed to accommodate it. The methodology would be:

1.  **Data Collection:** Collect data from campaigns, including text, images, funding goals, and user data.
2.  **Feature Engineering:** Extract features from the data, such as sentiment analysis of the text, historical success rates of the user, etc.
3.  **Model Training:** Train a classification model (e.g., Logistic Regression, Random Forest, or a neural network) to distinguish between legitimate and fraudulent campaigns.
4.  **Integration:** The trained model would be deployed as a service. When a new campaign is created, its data would be sent to the model, which would return a fraud probability score. Campaigns with high scores could be flagged for manual review.

### 3.3.3 UPI QR Code Donations

To simplify donations, the platform generates UPI QR codes dynamically.
1.  The system uses a hardcoded UPI ID for the recipient.
2.  For each campaign, a UPI payment URL is constructed, embedding the campaign title and a unique ID in the transaction notes for tracking purposes.
3.  This URL is then encoded into a QR code image using a public QR code generation API.
4.  The QR code is displayed on the campaign page, allowing users to scan it with any UPI-enabled app to make a donation.
