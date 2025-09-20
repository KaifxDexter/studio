
# Chapter 5: Results and Discussion

This chapter presents the results of the project, showcasing the functionalities of the implemented "Donify" platform through screenshots and discussing their effectiveness.

## 5.1 Homepage and Campaign Discovery

The homepage successfully provides an engaging entry point to the application. The interactive campaign deck allows users to quickly swipe through featured campaigns.

**Figure 5.1: Homepage with Interactive Campaign Deck**
*(Insert screenshot of the homepage here)*

The "All Causes" page provides a grid view of all campaigns, with a dropdown menu to filter by cause. This allows for effective discovery of relevant projects.

**Figure 5.2: All Causes Page with Filtering**
*(Insert screenshot of the causes page here)*

## 5.2 AI-Powered Campaign Creation

The core innovative feature of the project is the AI-powered description generator. As shown below, the user can input basic details, and the AI generates a well-written, persuasive description.

**Figure 5.3: AI Description Generation in Progress**
*(Insert screenshot of the "Create Campaign" page with the title/cause filled out, before clicking "Generate")*

**Figure 5.4: Form Populated with AI-Generated Description**
*(Insert screenshot of the "Create Campaign" page after the description has been generated and populated in the textarea)*

**Discussion:** This feature performed exceptionally well during testing. The generated text was consistently high-quality, relevant, and required minimal editing from the user. It effectively lowers the barrier to creating a high-quality campaign, directly addressing one of the key problem statements.

## 5.3 Campaign Details and Donation Process

The campaign details page successfully consolidates all relevant information for a potential donor. The dynamically generated QR code simplifies the donation process.

**Figure 5.5: Campaign Details Page with QR Code**
*(Insert screenshot of a single campaign page, showing the title, image, full description, and the donation card with the QR code)*

**Discussion:** The use of a UPI QR code is a significant user experience improvement, especially for mobile users in India. It eliminates the need to manually enter payment details, reducing friction and potentially increasing donation conversion rates. The page cleanly presents the campaign's story and its funding progress, providing transparency to the donor.

## 54 User Profile and Campaign Management

The profile page allows users to view the campaigns they have created. From here, they can also edit or delete their campaigns.

**Figure 5.6: User Profile Page with Created Campaigns**
*(Insert screenshot of the profile page showing a list of user-created campaigns, with edit/delete buttons)*

**Figure 5.7: Edit Campaign Dialog**
*(Insert screenshot of the "Edit Campaign" modal dialog)*

**Discussion:** This feature provides essential management capabilities for campaigners. The use of `localStorage` proved to be a simple and effective solution for persisting user-specific data in this proof-of-concept, allowing for a personalized experience without the overhead of a full backend database and authentication system.
