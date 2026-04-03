# SEO Expert Pro – Admin Panel Page-by-Page Data Dashboard

## Current State
- Admin panel at `/admin` has 4 tabs: Overview, Chatbot Data, Contact Submissions, Analytics
- Contact Submissions tab shows data from: Contact page form, ServiceDetail quote forms, CaseStudyDetail quote forms — all stored in `rankpro_contact_submissions` localStorage key
- Chatbot tab shows data from `rankpro_chatbot_logs` localStorage key
- Home page forms (Free SEO Audit section, LeadForm) do NOT save to localStorage — data is silently lost
- No page-source tracking — admin can't tell which page a submission came from
- Blog page has no user interaction that gets tracked
- About page has no tracked user interaction
- No organized per-page view in admin

## Requested Changes (Diff)

### Add
- `source` field to every localStorage submission entry to tag which page/form it came from (e.g. "Home - Free Audit", "Home - Lead Form", "Services - On-Page SEO Quote", "Case Studies - E-Commerce Quote", "Contact Page", etc.)
- Home page Free Audit form: save to `rankpro_contact_submissions` with source="Home - Free SEO Audit"
- Home page Lead Form: save to `rankpro_contact_submissions` with source="Home - Lead Form"
- Blog page: track article read events (title + timestamp) to a new `rankpro_blog_views` localStorage key
- About page: track "Contact Us" CTA clicks to `rankpro_page_interactions` localStorage key
- AdminPanel new tabs structure:
  - **Overview**: total counts per page, recent activity feed
  - **Home Page**: submissions from Home forms (Free Audit + Lead Form)
  - **Services Page**: quote submissions from all service detail pages
  - **Case Studies Page**: quote submissions from all case study detail pages
  - **Blog Page**: blog article view/read tracking
  - **About Page**: CTA click interactions
  - **Contact Page**: contact form submissions
  - **Chatbot**: chatbot conversation logs
  - **Analytics**: charts (keep existing)

### Modify
- `Home.tsx` — FreeAuditSection.handleSubmit: save to localStorage with source tag
- `Home.tsx` — LeadForm.submit: save to localStorage with source tag
- `ServiceDetail.tsx` — handleSubmit: add source tag already exists as `service` field, just ensure consistency
- `CaseStudyDetail.tsx` — handleSubmit: add source tag already exists as `caseStudy` field, ensure consistency
- `Contact.tsx` — submit: add source tag "Contact Page"
- `Blog.tsx`/`BlogPost.tsx` — add article view tracking on open/click
- `About.tsx` — add CTA click tracking
- `AdminPanel.tsx` — complete redesign of tabs to show per-page organized data with source filtering

### Remove
- Old 4-tab layout replaced by 9-tab layout (Overview, Home, Services, Case Studies, Blog, About, Contact, Chatbot, Analytics)

## Implementation Plan
1. Add `saveSubmission(source, data)` utility function used across all pages
2. Update Home page forms to save data to localStorage with correct source tags
3. Update Contact page to add source tag
4. Add blog article view tracking in Blog.tsx and BlogPost.tsx
5. Add About page CTA click tracking
6. Rebuild AdminPanel with new 9-tab layout, each tab filtering submissions by source
7. Overview tab shows per-page counts in card grid + recent activity feed
8. Validate and deploy
