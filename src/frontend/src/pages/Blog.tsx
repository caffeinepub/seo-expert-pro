import { Link } from "@tanstack/react-router";
import { Clock, Tag } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { BlogPost } from "../backend";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useBackend } from "../hooks/useBackend";

const POST_CONTENT: Record<string, string> = {
  "10 On-Page SEO Techniques That Actually Work in 2026": `On-page SEO is still the foundation of every top-ranking page. While algorithms evolve constantly, the core principles of relevance and user experience have never mattered more. In 2026, Google's systems are smarter—but so are the tactics that work.

## 1. Optimize Title Tags for Click-Through Rate

Keep your title tag under 60 characters and front-load your primary keyword. Add a compelling modifier—words like "Guide", "Checklist", or "2026"—to stand out in search results. A/B test your titles using Google Search Console's performance data to improve CTR over time.

## 2. Write Meta Descriptions That Sell the Click

Meta descriptions don't directly influence rankings, but they dramatically affect click-through rates. Aim for 150–155 characters. Include your target keyword naturally, communicate the benefit clearly, and end with a soft CTA like "Learn how →" or "See the full guide".

## 3. Master Heading Hierarchy (H1–H3)

Your H1 should match or closely mirror your title tag and appear only once per page. Use H2 headings for main sections and H3 for sub-points. This structure helps Googlebot understand your content architecture and improves accessibility for screen readers.

## 4. Use Semantic Keywords and LSI Terms

Google's NLP engine (MUM/BERT) understands synonyms, related concepts, and semantic context. Don't just repeat your main keyword—use related phrases naturally. Tools like Clearscope, MarketMuse, or even Google's "Related Searches" can reveal the semantic terms that top-ranking content includes.

## 5. Optimize Images with Alt Text and File Names

Every image should have a descriptive alt attribute that includes your keyword where relevant. Rename files before uploading: "seo-audit-checklist-2026.webp" beats "IMG_4021.jpg". Compress images to WebP or AVIF format and serve them via a CDN for maximum speed.

## 6. Build a Strong Internal Linking Strategy

Use the hub-and-spoke model: create a comprehensive "pillar" page for each core topic, then link from supporting cluster posts back to it. Internal links pass PageRank, help users navigate, and signal topical authority to search engines. Audit your internal links quarterly.

## 7. Hit Core Web Vitals Benchmarks

Google's page experience signals are real ranking factors. Target: LCP under 2.5 seconds, INP under 200ms, and CLS under 0.1. Use PageSpeed Insights and the Chrome User Experience Report (CrUX) to identify real-world performance issues—not just lab results.

## 8. Embrace Mobile-First Indexing

Googlebot primarily crawls and indexes the mobile version of your site. Ensure your mobile pages have the same content, structured data, and metadata as desktop. Use responsive design, touch-friendly tap targets (48px minimum), and test with Google's Mobile-Friendly Test tool.

## 9. Implement Schema Markup Strategically

Structured data doesn't guarantee rich results, but it significantly increases eligibility. For blog posts, use Article schema. For FAQ sections, add FAQPage schema to capture expandable results. For how-to guides, HowTo schema can earn step-by-step rich snippets in SERP.

## 10. Refresh Content Regularly

Content freshness is a ranking signal, especially for time-sensitive topics. Update statistics, add new sections, remove outdated advice, and change the published date—but only when substantive changes are made. A content calendar with quarterly review cycles keeps your site competitive year-round.`,

  "How to Build High-Quality Backlinks (Without Spamming)": `Backlinks remain one of Google's top three ranking factors. But the era of mass link-buying and automated outreach is over. Today, sustainable SEO authority is built through genuine relationships, original content, and ethical outreach.

## Guest Posting the Right Way

Guest posting still works—when done strategically. Target sites with a Domain Authority above 40, real traffic, and topical relevance to your niche. Pitch unique angles: don't rehash what's already published. Write genuinely helpful content, include one or two contextual links back to your site, and build a long-term relationship with the editor.

## Digital PR and Data-Driven Content

Journalists and bloggers love citing original data. Commission a survey, analyze publicly available datasets, or publish industry benchmarks that don't exist elsewhere. Distribute the findings through Help A Reporter Out (HARO), press releases to niche publications, and direct journalist outreach. A single well-placed study can earn dozens of high-authority links.

## Broken Link Building

Use Ahrefs Site Explorer or Screaming Frog to find pages in your niche that return 404 errors but still have inbound links. Create a better replacement page on your site, then reach out to the linking domains and suggest they update the broken link to yours. The success rate is higher than cold outreach because you're solving an actual problem for the webmaster.

## Resource Page Link Building

Search for resource pages in your niche: "keyword + intitle:resources" or "keyword + useful links". These curated lists are actively maintained and their owners are usually receptive to adding genuinely helpful new resources. Craft a brief, personal email that explains exactly where your resource fits their list.

## The Skyscraper Technique

Brian Dean's proven framework: find top-ranking content for a keyword, create something significantly better (more comprehensive, better formatted, more current), then reach out to everyone linking to the original. You're not just copying—you're genuinely adding value to the internet.

## Link Reclamation

Sometimes brands mention you without linking. Set up Google Alerts and Mention.com for your brand name, personal name, and key products. When you find unlinked mentions, send a friendly email asking the author to add a link. It's the easiest link you'll ever earn.

## Building Linkable Assets

Create tools, calculators, interactive infographics, or original research that people naturally want to reference. A free SEO audit tool, a content length calculator, or an industry salary survey can passively attract links for years without active outreach.

## What to Avoid

- Private Blog Networks (PBNs): Google's Spam Brain detects link patterns from low-quality networks and issues manual penalties
- Paid link schemes: violates Google's Webmaster Guidelines and risks site-wide demotion
- Exact-match anchor text over-optimization: a natural backlink profile has a mix of branded, naked URL, and contextual anchors`,

  "The Complete Technical SEO Checklist for 2026": `Technical SEO is the infrastructure that makes everything else work. Even the best content strategy fails if search engines can't crawl, understand, and index your pages correctly. This checklist covers everything you need to audit and maintain in 2026.

## Crawlability and Indexability

- **robots.txt**: Ensure you're not accidentally blocking important pages or CSS/JS resources. Test with Google Search Console's robots.txt tester.
- **XML Sitemap**: Include only canonical, indexable URLs. Submit to Google Search Console and Bing Webmaster Tools. Auto-generate and keep it updated as new content publishes.
- **Crawl Budget**: Large sites should monitor crawl budget via GSC's Coverage report and server logs. Reduce crawl waste by fixing redirect chains, removing duplicate content, and blocking parameterized URLs that don't add value.

## Site Architecture

Flat architecture wins: every important page should be reachable within 3 clicks from the homepage. Deep URL structures bury PageRank. Eliminate orphan pages—pages with no internal links pointing to them won't get crawled regularly.

## Page Speed and Core Web Vitals

- Optimize Time to First Byte (TTFB) with server-side caching, CDN delivery, and efficient database queries
- Remove render-blocking JavaScript and CSS from the critical path
- Implement lazy loading for images and non-critical scripts
- Serve images in WebP or AVIF formats
- Use font-display: swap to prevent invisible text during font load

## Mobile Optimization

Google uses mobile-first indexing. Your mobile version must have identical content, structured data, and meta tags as desktop. Ensure tap targets are at least 48x48px and fonts are readable without zooming (minimum 16px body text).

## HTTPS and Security

All pages must be served over HTTPS. Mixed content warnings (HTTP assets on HTTPS pages) are a ranking risk. Renew SSL certificates before expiry and ensure all internal links, canonical URLs, and sitemaps reference HTTPS versions.

## Structured Data (JSON-LD)

Implement schema markup in JSON-LD format (Google's preferred method). Key schemas: Article, FAQ, HowTo, LocalBusiness, Product, BreadcrumbList. Validate using Google's Rich Results Test. Fix validation errors—invalid markup is ignored by search engines.

## International SEO

For multilingual sites, implement hreflang tags correctly. Each language/region URL should have a self-referencing hreflang plus references to all alternate versions. Errors in hreflang implementation are common and cause significant ranking problems in international markets.

## JavaScript SEO

Googlebot renders JavaScript, but with a delay. Critical content should not depend solely on client-side rendering for indexation. Use Server-Side Rendering (SSR) or Static Site Generation (SSG) for content pages. Test with the URL Inspection tool in GSC to see what Googlebot actually sees.

## Log File Analysis

Server log files reveal exactly which pages Googlebot crawls, how often, and which return errors. Tools like Screaming Frog Log Analyzer or Splunk can process these logs. Identifying crawl anomalies—pages crawled too frequently or not at all—helps optimize crawl efficiency.`,

  "Keyword Research: Finding Hidden Opportunities": `Great SEO starts with great keyword research. Most competitors target the obvious high-volume terms and ignore the goldmine of long-tail, intent-matched keywords that drive qualified traffic. Here's the systematic approach that separates great SEO from average.

## Start with Seed Keywords

Begin with broad terms that define your business or niche. For an SEO agency, seeds might be "SEO services", "improve Google rankings", or "organic traffic". These aren't targets—they're starting points for expansion.

## Expand with Google's Own Data

Google tells you what people search for if you know where to look:
- **Google Autocomplete**: type your seed keyword and examine the suggestions—these are real searches people are making
- **People Also Ask (PAA)**: a goldmine of question-based keywords perfect for FAQ content
- **Related Searches**: found at the bottom of SERPs, these reveal semantic clusters around your topic

## Professional Keyword Tools

- **Ahrefs Keywords Explorer**: best for difficulty scores, traffic estimates, and SERP history
- **SEMrush Keyword Magic Tool**: excellent for finding keyword gaps and topic clusters
- **Google Keyword Planner**: direct from Google, best for intent signals and seasonal data
- **Ubersuggest / AnswerThePublic**: good for question-based and conversational keywords

## Understanding Search Intent

Every keyword has an intent: Informational ("how to do X"), Navigational ("Brand + login"), Commercial ("best X for Y"), or Transactional ("buy X online"). Mismatching intent is one of the most common SEO mistakes—you can't rank a product page for an informational query.

## Identify Keyword Gaps

Use Ahrefs or SEMrush to compare your domain against 3–5 competitors. Keyword Gap analysis reveals terms your competitors rank for that you don't. These are proven search opportunities that your niche is already being served—you just need a better page.

## Long-Tail Keyword Strategy

Long-tail keywords (3+ words, specific intent) have lower competition, higher conversion rates, and are easier to rank for as a newer site. A page targeting "best SEO tools for small business 2026" will rank faster and convert better than one targeting "SEO tools".

## Topic Cluster Model

Organize keywords into topic clusters: one authoritative pillar page covering a broad topic at high level, supported by multiple cluster pages targeting specific sub-topics. All cluster pages link back to the pillar. This structure signals topical authority to Google.

## SERP Feature Analysis

Before targeting a keyword, analyze the SERP. Who ranks? What format do they use? Is there a featured snippet you can capture? A People Also Ask box? Video results? Shopping results? Understanding the current SERP composition reveals what content format Google rewards for that query.

## Seasonal Trends

Use Google Trends to understand search volume fluctuations throughout the year. Publish content before peak seasons—not during them. A "Christmas gift guide" published in November is too late; October is optimal for SEO-driven holiday traffic.`,

  "Local SEO: How to Rank #1 in Your City": `For businesses that serve local customers, local SEO is the highest-ROI marketing activity available. A well-optimized local presence drives phone calls, walk-ins, and qualified website visits from people actively searching for exactly what you offer.

## Google Business Profile: The Foundation

Your Google Business Profile (formerly Google My Business) is the single most important local ranking factor. Optimization checklist:
- Complete every field: business name, address, phone, hours, website, category, and attributes
- Add high-quality photos weekly—businesses with photos receive 42% more direction requests
- Respond to every review, positive or negative, within 24 hours
- Use the Q&A feature proactively—add your own FAQs before customers ask
- Post weekly updates, offers, or events to signal an active business

## NAP Consistency Across the Web

Your Name, Address, and Phone number must be identical across every directory listing. Even minor variations ("St." vs "Street", old phone numbers) confuse Google and dilute your local authority. Use Moz Local or BrightLocal to audit and correct inconsistencies across the top 50+ directories.

## Building Local Citations

Citations (mentions of your NAP on external sites) are a core local ranking signal. Beyond Google, ensure you're listed on: Yelp, Yellow Pages, BBB, Bing Places, Apple Maps, Facebook, Foursquare, and industry-specific directories. Quality matters more than quantity—a citation on a relevant local directory outweighs ten irrelevant ones.

## Review Generation Strategy

Reviews are the most visible ranking and trust signal in local SEO. Generate more by:
- Asking satisfied customers at the point of service, verbally and via a simple follow-up SMS/email
- Creating a QR code on receipts or table cards that links directly to your Google review page
- Building an automated email sequence that asks for reviews 3–5 days after service completion

## Local Keyword Targeting

Combine service keywords with geographic modifiers: "plumber in [city]", "best Italian restaurant [neighborhood]", "SEO agency [city name]". Include these naturally in page titles, H1 headings, meta descriptions, and the first 100 words of body text.

## Locally-Relevant Content

Create content that speaks directly to your community: "Best SEO Strategies for [City] Businesses", local case studies, coverage of local events, or partnerships with local organizations. This content earns local links and signals geographic relevance to Google.

## Google Maps Ranking Factors

The three pillars of Google Maps rankings:
1. **Proximity**: distance from the searcher to your business (you can't control this)
2. **Relevance**: how well your profile matches the search query (optimize your categories and description)
3. **Prominence**: how well-known your business is online (reviews, citations, backlinks, website authority)

## LocalBusiness Schema Markup

Add JSON-LD LocalBusiness schema to your website with accurate NAP, opening hours, geo-coordinates, and accepted payment methods. While schema alone won't move the needle dramatically, it provides unambiguous signals to Google about your business identity and helps trigger rich results in search.`,
  "E-E-A-T: Google's New Quality Standard Explained": `E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness. Understanding and demonstrating E-E-A-T is the baseline requirement for ranking in competitive niches.

## What Is E-E-A-T?

Google added the first "E" (Experience) in December 2022, expanding the original E-A-T framework:
- **Experience**: First-hand experience with the topic — a review written by someone who actually used the product carries more weight than secondary sources.
- **Expertise**: Deep knowledge in the subject area. Formal credentials help, but demonstrated expertise through quality content counts too.
- **Authoritativeness**: Recognition as a go-to source in the field, built through mentions, citations, and backlinks from authoritative sites.
- **Trustworthiness**: Accurate, transparent, and reliable information. Google considers trustworthiness the most critical E-E-A-T component.

## Why E-E-A-T Matters More Than Ever

With AI-generated content flooding the internet, Google has doubled down on signals that distinguish genuine human expertise from machine-generated fluff. YMYL (Your Money Your Life) topics — health, finance, legal, safety — face the strictest E-E-A-T scrutiny.

## How to Demonstrate E-E-A-T on Your Site

**Author credentials and bios**: Every content page should have a named author with a detailed bio linking to their credentials, social profiles, and other publications.

**First-hand experience signals**: Write from experience. Include original photos, screenshots, data, and case studies that only someone with genuine experience could produce.

**External validation**: Build mentions and citations from authoritative sources. Guest post on recognized publications. Get featured in industry roundups.

**Transparent about section**: A thorough About page with team bios, company history, and contact information signals trustworthiness.

**Accurate, up-to-date content**: Fact-check everything. Cite primary sources. Update content regularly with "last updated" dates.`,

  "Core Web Vitals 2025: What Changed and How to Fix It": `Google's Core Web Vitals directly influence search rankings. In 2024, FID (First Input Delay) was replaced by INP (Interaction to Next Paint), making the performance bar significantly harder to clear.

## The Three Core Web Vitals in 2025

- **Largest Contentful Paint (LCP)**: Loading performance. Target: under 2.5 seconds.
- **Interaction to Next Paint (INP)**: Responsiveness. Target: under 200ms.
- **Cumulative Layout Shift (CLS)**: Visual stability. Target: under 0.1.

## What Changed: FID to INP

FID only measured the delay before the browser starts processing the first interaction. INP measures the entire duration of every interaction throughout the page lifecycle — clicks, taps, keyboard inputs — and reports the worst-case response time.

Common INP culprits: heavy JavaScript on the main thread during interactions, long tasks blocking user input, inefficient event handlers, and expensive third-party scripts.

## How to Fix INP

- Break up long tasks using scheduler.yield() to give the browser time to process interactions
- Defer non-critical JavaScript — analytics, chat widgets, and tracking scripts
- Keep event handlers lean and avoid synchronous operations in click handlers
- Reduce DOM size — large DOMs (5,000+ nodes) slow every interaction

## How to Fix LCP

- Server-side render or prerender your above-the-fold content
- Preload your LCP image with link rel="preload"
- Use a CDN to reduce Time to First Byte
- Convert images to WebP/AVIF with appropriate srcset sizes

## How to Fix CLS

- Always set explicit width and height on images and videos
- Reserve space for ad slots before they load
- Avoid inserting content above existing content dynamically
- Use CSS transform animations instead of layout-triggering properties`,

  "Zero-Click Searches: How to Win Traffic Without the Click": `Over 60% of Google searches now end without a click. Featured snippets, knowledge panels, and AI Overviews capture answers directly in the SERP. This guide shows you how to optimize for position zero and convert SERP visibility into brand authority.

## Understanding the Zero-Click Landscape

Zero-click searches happen when Google serves the answer directly — in a featured snippet, knowledge panel, People Also Ask box, or AI Overview. The queries most likely to produce zero-click results include simple factual questions, definitions, local queries, and calculations.

## How to Win with Featured Snippets (Position Zero)

Featured snippets appear above the first organic result and can triple click-through rate. To earn them:

**Format content to answer questions directly**: For paragraph snippets, provide a concise answer (40-60 words) immediately after the question heading. For list snippets, use properly formatted HTML lists. For table snippets, structure data in clean HTML tables.

**Target question queries**: "What is," "how to," and "why" formats trigger featured snippets most frequently. Use AnswerThePublic or People Also Ask mining to find opportunities.

**Claim snippets from positions 2-10**: You can only earn a featured snippet if you're already ranking in the top 10.

## Optimizing for AI Overviews

To increase your chances of being cited by Google's AI Overviews:
- Publish comprehensive, well-structured content that directly answers common questions
- Use clear headings, bullet points, and numbered lists
- Include original data, research, and expert quotes that AI cannot generate itself
- Ensure content is fresh and regularly updated

## Converting SERP Visibility to Business Value

Even without clicks, zero-click visibility creates brand awareness. Optimize your Google Business Profile for local pack visibility. Implement FAQ, HowTo, and Article schema to increase rich result eligibility. Track impression data in Google Search Console to measure your growing SERP real estate.`,

  "The Complete Guide to Schema Markup for SEO": `Schema markup is the most underutilized SEO tactic in 2025. Correctly implemented structured data dramatically increases your eligibility for rich results — visually enhanced SERP features that consistently earn higher click-through rates.

## What Is Schema Markup?

Schema markup is code that helps search engines understand the meaning and context of your content. It uses a standardized vocabulary from Schema.org — backed by Google, Microsoft, Yahoo, and Yandex. Google recommends JSON-LD format (a script block in the head tag) because it's easy to implement and debug.

## The Schema Types That Drive Real Results

**FAQ Schema**: Adds expandable Q&As beneath your result in the SERP. Dramatically increases visual real estate and CTR for informational content.

**Article Schema**: Marks up blog posts with author, publisher, and date published. Required for news rich results and strengthens E-E-A-T signals.

**LocalBusiness Schema**: Provides structured business information — address, phone, hours, and geo-coordinates. Critical for local SEO accuracy.

**Product Schema**: For e-commerce pages, enables star ratings, price, and availability in search results. Can increase CTR by 20-30%.

**HowTo Schema**: Converts step-by-step content into rich results with numbered steps displayed directly in the SERP.

**BreadcrumbList Schema**: Replaces the URL with a clean breadcrumb path, making your result more descriptive and trustworthy.

## Validation and Testing

Always validate before publishing using Google's Rich Results Test (search.google.com/test/rich-results), Schema Markup Validator (validator.schema.org), and Google Search Console's Rich Results report.

## Common Mistakes to Avoid

- Marking up content not visible on the page (violates guidelines)
- Using incorrect schema types for your content
- Missing required properties from schema.org
- Implementing schema on thin or low-quality pages
- Failing to update schema when page content changes

The ROI from properly implemented schema is consistently one of the highest of any SEO tactic.`,
};

const samplePosts = [
  {
    title: "10 On-Page SEO Techniques That Actually Work in 2026",
    excerpt:
      "Discover the most impactful on-page optimization tactics that search engines reward in 2026. From title tag science to Core Web Vitals, these techniques are tested and proven.",
    tags: ["On-Page SEO", "Best Practices"],
    readTime: 7,
  },
  {
    title: "How to Build High-Quality Backlinks (Without Spamming)",
    excerpt:
      "Ethical link building strategies that boost domain authority and rankings sustainably. Learn guest posting, digital PR, broken link building, and more.",
    tags: ["Off-Page SEO", "Link Building"],
    readTime: 9,
  },
  {
    title: "The Complete Technical SEO Checklist for 2026",
    excerpt:
      "Everything you need to audit and fix your site's technical foundation—from crawlability and Core Web Vitals to JavaScript SEO and structured data.",
    tags: ["Technical SEO"],
    readTime: 12,
  },
  {
    title: "Keyword Research: Finding Hidden Opportunities",
    excerpt:
      "A step-by-step guide to uncovering keywords your competitors are missing. Master search intent, topic clusters, and long-tail strategy.",
    tags: ["Keyword Research"],
    readTime: 8,
  },
  {
    title: "Local SEO: How to Rank #1 in Your City",
    excerpt:
      "Proven tactics to dominate local search results and Google Maps. Optimize your Google Business Profile, build citations, and generate reviews at scale.",
    tags: ["Local SEO"],
    readTime: 6,
  },
  {
    title: "Local SEO Mastery: Rank #1 in Your City in 2026",
    excerpt:
      "A step-by-step guide to dominating local search results, Google Business Profile optimization, building citations, and earning 5-star reviews that convert browsers into buyers.",
    tags: ["Local SEO", "Best Practices"],
    readTime: 9,
    slug: "local-seo-mastery-rank-1-in-your-city-2026",
  },
  {
    title: "SEO Analytics: How to Measure What Actually Matters",
    excerpt:
      "Stop tracking vanity metrics. This guide shows you which SEO KPIs drive real business decisions, how to set up proper GA4 reporting, and how to attribute revenue to organic search.",
    tags: ["Technical SEO", "Best Practices"],
    readTime: 8,
    slug: "seo-analytics-measure-what-matters",
  },
  {
    title: "Content Strategy for SEO: The Complete 2026 Framework",
    excerpt:
      "Build a content strategy that systematically drives organic growth. Topical authority maps, keyword research frameworks, content formats that earn links, and a quarterly refresh system.",
    tags: ["Keyword Research", "Best Practices"],
    readTime: 11,
    slug: "content-strategy-seo-complete-framework-2026",
  },
  {
    title: "E-E-A-T: Google's New Quality Standard Explained",
    excerpt:
      "Google's E-E-A-T framework (Experience, Expertise, Authoritativeness, Trustworthiness) is now the single most important quality signal for ranking in competitive niches. Learn what it means, how Google evaluates it, and exactly what to do to demonstrate genuine E-E-A-T on your site. Includes specific tactics for YMYL (Your Money Your Life) industries.",
    tags: ["Best Practices", "Technical SEO"],
    readTime: 7,
    slug: "eeat-google-quality-standard-explained",
  },
  {
    title: "Core Web Vitals 2025: What Changed and How to Fix It",
    excerpt:
      "Google replaced FID with Interaction to Next Paint (INP) as a Core Web Vital in March 2024, and the thresholds for LCP and CLS have been tightened. Discover which sites are most at risk, how to measure your current INP score, and the most effective technical fixes for each vital — with before-and-after case study data.",
    tags: ["Technical SEO", "Best Practices"],
    readTime: 6,
    slug: "core-web-vitals-2025-changes-fixes",
  },
  {
    title: "Zero-Click Searches: How to Win Traffic Without the Click",
    excerpt:
      "Over 60% of Google searches now end without a click. Featured snippets, knowledge panels, and AI Overviews are capturing answers directly in the SERP. This guide shows you how to optimize for position zero, structure content for AI summaries, and convert SERP visibility into brand authority — even when users never visit your site.",
    tags: ["Keyword Research", "On-Page SEO"],
    readTime: 5,
    slug: "zero-click-searches-win-traffic-without-click",
  },
  {
    title: "The Complete Guide to Schema Markup for SEO",
    excerpt:
      "Schema markup is the most underutilized SEO tactic in 2025. Properly implemented structured data can earn rich snippets, FAQ expansions, star ratings, and event listings directly in search results — dramatically improving click-through rates. This comprehensive guide covers every schema type worth implementing, with copy-paste JSON-LD templates for each.",
    tags: ["Technical SEO", "On-Page SEO"],
    readTime: 9,
    slug: "complete-guide-schema-markup-seo",
  },
];

const TAG_COLORS: Record<string, { bg: string; text: string; glow: string }> = {
  "On-Page SEO": {
    bg: "rgba(56,201,138,0.15)",
    text: "#38C98A",
    glow: "rgba(56,201,138,0.4)",
  },
  "Best Practices": {
    bg: "rgba(56,201,138,0.10)",
    text: "#5be8a8",
    glow: "rgba(91,232,168,0.3)",
  },
  "Off-Page SEO": {
    bg: "rgba(100,180,255,0.15)",
    text: "#64B4FF",
    glow: "rgba(100,180,255,0.4)",
  },
  "Link Building": {
    bg: "rgba(100,180,255,0.10)",
    text: "#7ec8ff",
    glow: "rgba(126,200,255,0.3)",
  },
  "Technical SEO": {
    bg: "rgba(255,160,80,0.15)",
    text: "#FFA050",
    glow: "rgba(255,160,80,0.4)",
  },
  "Keyword Research": {
    bg: "rgba(200,130,255,0.15)",
    text: "#C882FF",
    glow: "rgba(200,130,255,0.4)",
  },
  "Local SEO": {
    bg: "rgba(255,200,60,0.15)",
    text: "#FFC83C",
    glow: "rgba(255,200,60,0.4)",
  },
};

function HeroBlogCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 5;

    // Icosahedrons
    const icoGeo = new THREE.IcosahedronGeometry(0.7, 0);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x38c98a,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const icos: THREE.Mesh[] = [];
    const icoPositions: [number, number, number][] = [
      [-3, 1.5, -1],
      [3, -1, -2],
      [-1.5, -2, -1],
      [4, 2, -3],
      [-4, -1.5, -2],
    ];
    for (const pos of icoPositions) {
      const m = new THREE.Mesh(icoGeo, icoMat.clone());
      m.position.set(...pos);
      m.scale.setScalar(0.4 + Math.random() * 0.5);
      scene.add(m);
      icos.push(m);
    }

    // Torus wireframes
    const torGeo = new THREE.TorusGeometry(0.6, 0.2, 8, 24);
    const torMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const tori: THREE.Mesh[] = [];
    const torPositions: [number, number, number][] = [
      [2.5, 1.5, -2],
      [-2, -1, -1.5],
      [0, 2.5, -3],
    ];
    for (const pos of torPositions) {
      const m = new THREE.Mesh(torGeo, torMat.clone());
      m.position.set(...pos);
      m.scale.setScalar(0.5 + Math.random() * 0.4);
      scene.add(m);
      tori.push(m);
    }

    // Particles
    const partCount = 200;
    const posArr = new Float32Array(partCount * 3);
    for (let i = 0; i < partCount * 3; i++)
      posArr[i] = (Math.random() - 0.5) * 14;
    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
    const partMat = new THREE.PointsMaterial({
      color: 0x38c98a,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    let frame = 0;
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame += 0.005;
      for (let i = 0; i < icos.length; i++) {
        icos[i].rotation.x += 0.004;
        icos[i].rotation.y += 0.006;
        icos[i].position.y += Math.sin(frame + i) * 0.002;
      }
      for (let i = 0; i < tori.length; i++) {
        tori[i].rotation.x += 0.003;
        tori[i].rotation.z += 0.005;
      }
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!canvas) return;
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      icoGeo.dispose();
      torGeo.dispose();
      partGeo.dispose();
      icoMat.dispose();
      torMat.dispose();
      partMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

function FeaturedPostCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 5;

    // Central glowing sphere
    const sphereGeo = new THREE.SphereGeometry(1, 24, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x38c98a,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // Orbiting ring
    const ringGeo = new THREE.TorusGeometry(1.8, 0.03, 6, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.4,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Orbiting particles
    const orbCount = 60;
    const orbPos = new Float32Array(orbCount * 3);
    for (let i = 0; i < orbCount; i++) {
      const angle = (i / orbCount) * Math.PI * 2;
      const radius = 2.2 + (Math.random() - 0.5) * 0.4;
      orbPos[i * 3] = Math.cos(angle) * radius;
      orbPos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      orbPos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const orbGeo = new THREE.BufferGeometry();
    orbGeo.setAttribute("position", new THREE.BufferAttribute(orbPos, 3));
    const orbMat = new THREE.PointsMaterial({
      color: 0x38c98a,
      size: 0.07,
      transparent: true,
      opacity: 0.8,
    });
    const orbs = new THREE.Points(orbGeo, orbMat);
    scene.add(orbs);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      sphere.rotation.y += 0.005;
      sphere.rotation.x += 0.002;
      ring.rotation.z += 0.003;
      orbs.rotation.y += 0.004;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!canvas) return;
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      sphereGeo.dispose();
      ringGeo.dispose();
      orbGeo.dispose();
      sphereMat.dispose();
      ringMat.dispose();
      orbMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);
  const primaryTag = post.tags[0] ?? "SEO";
  const colors = TAG_COLORS[primaryTag] ?? TAG_COLORS["On-Page SEO"];

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 80);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <Link
      ref={cardRef}
      to="/blog/$id"
      params={{ id: post.id.toString() }}
      data-ocid={`blog.item.${index + 1}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        display: "block",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        overflow: "hidden",
        background: "linear-gradient(145deg, #0d2f4b 0%, #0a2038 100%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          `0 8px 40px ${colors.glow}, 0 4px 20px rgba(0,0,0,0.3)`;
        (e.currentTarget as HTMLAnchorElement).style.transform =
          "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 4px 20px rgba(0,0,0,0.3)";
        (e.currentTarget as HTMLAnchorElement).style.transform =
          "translateY(0)";
      }}
    >
      {/* Category header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.bg}, rgba(11,42,67,0.8))`,
          borderBottom: `1px solid ${colors.glow}`,
          padding: "16px 20px 14px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Tag size={14} style={{ color: colors.text, flexShrink: 0 }} />
        <span
          style={{
            color: colors.text,
            fontWeight: 700,
            fontSize: "12px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {primaryTag}
        </span>
        <span
          style={{
            marginLeft: "auto",
            background: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.5)",
            fontSize: "11px",
            padding: "2px 8px",
            borderRadius: "99px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Clock size={10} /> {post.readTime.toString()} min
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "18px 20px 20px" }}>
        <h3
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: 1.4,
            marginBottom: "10px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }}
        >
          {post.title}
        </h3>
        <p
          style={{
            color: "rgba(199,210,224,0.8)",
            fontSize: "14px",
            lineHeight: 1.6,
            marginBottom: "16px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }}
        >
          {post.excerpt}
        </p>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            marginBottom: "14px",
          }}
        >
          {post.tags.map((t) => {
            const tc = TAG_COLORS[t] ?? TAG_COLORS["On-Page SEO"];
            return (
              <span
                key={t}
                style={{
                  background: tc.bg,
                  color: tc.text,
                  fontSize: "11px",
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: "99px",
                  border: `1px solid ${tc.glow}`,
                }}
              >
                {t}
              </span>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "12px",
          }}
        >
          <span
            style={{ color: colors.text, fontSize: "13px", fontWeight: 600 }}
          >
            Read Article →
          </span>
        </div>
      </div>
    </Link>
  );
}

function BlogGridParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 6;

    const shapes: THREE.Mesh[] = [];
    const colors = [0x38c98a, 0x00d4ff, 0x7ec8ff, 0x5be8a8];
    for (let i = 0; i < 12; i++) {
      const geo = new THREE.IcosahedronGeometry(0.15 + Math.random() * 0.1, 0);
      const mat = new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.25 + Math.random() * 0.2,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 4 - 2,
      );
      scene.add(mesh);
      shapes.push(mesh);
    }

    const count = 180;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 22;
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x38c98a,
      size: 0.04,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    let animId: number;
    const speeds = shapes.map(() => ({
      rx: (Math.random() - 0.5) * 0.01,
      ry: (Math.random() - 0.5) * 0.012,
    }));
    const origins = shapes.map((m) => m.position.y);
    let t = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.008;
      shapes.forEach((m, i) => {
        m.rotation.x += speeds[i].rx;
        m.rotation.y += speeds[i].ry;
        m.position.y = origins[i] + Math.sin(t + i) * 0.3;
      });
      particles.rotation.y += 0.0004;
      renderer.render(scene, camera);
    };
    animate();
    const handleResize = () => {
      if (!canvas) return;
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const backend = useBackend();

  const load = useCallback(async () => {
    try {
      let existing = await backend.listBlogPosts();
      if (existing.length === 0) {
        for (const p of samplePosts) {
          const fullContent = POST_CONTENT[p.title] ?? p.excerpt;
          await backend.createBlogPost(
            p.title,
            p.excerpt,
            fullContent,
            p.tags,
            p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            BigInt(p.readTime),
          );
        }
        existing = await backend.listBlogPosts();
      }
      setPosts(existing);
    } catch {
      // show empty state
    } finally {
      setLoading(false);
    }
  }, [backend]);

  useEffect(() => {
    load();
  }, [load]);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div style={{ minHeight: "100vh", background: "#071c2e" }}>
      <style>{}</style>
      <Navbar />

      {/* Hero */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #0B2A43 0%, #071c2e 100%)",
          padding: "100px 0 80px",
        }}
      >
        <HeroBlogCanvas />
        {/* Glow accent */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "300px",
            background:
              "radial-gradient(ellipse, rgba(56,201,138,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 24px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(56,201,138,0.12)",
              border: "1px solid rgba(56,201,138,0.3)",
              borderRadius: "99px",
              padding: "6px 18px",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#38C98A",
                display: "inline-block",
              }}
            />
            <span
              style={{
                color: "#38C98A",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.06em",
              }}
            >
              SEO Knowledge Hub
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              color: "#fff",
              marginBottom: "20px",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Insights &amp; Guides That
            <span style={{ color: "#38C98A", display: "block" }}>
              Actually Move Rankings
            </span>
          </h1>
          <p
            style={{
              color: "rgba(199,210,224,0.85)",
              fontSize: "18px",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            Actionable SEO expertise—from technical deep-dives to content
            strategy—written by practitioners who've ranked hundreds of sites.
          </p>
          {/* Scroll indicator */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "48px",
            }}
          >
            <button
              type="button"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                animation: "blogScrollBounce 2s ease-in-out infinite",
                cursor: "pointer",
                opacity: 0.7,
                background: "none",
                border: "none",
                padding: 0,
              }}
              onClick={() => {
                document
                  .getElementById("blog-content")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span
                style={{
                  color: "rgba(199,210,224,0.7)",
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                }}
              >
                SCROLL
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                role="img"
                aria-label="Scroll down"
                style={{ color: "#38C98A" }}
              >
                <title>Scroll down</title>
                <path
                  d="M12 5v14M5 12l7 7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* SEO Tips & Resources Banner */}
      <section style={{ background: "#0B2A43", padding: "48px 0" }}>
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
        >
          <div
            style={{
              background:
                "linear-gradient(135deg, #0d3352 0%, #0a2440 50%, #072035 100%)",
              border: "1px solid rgba(56,201,138,0.25)",
              borderRadius: "20px",
              padding: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "40px",
                alignItems: "center",
              }}
            >
              <div style={{ flex: "1", minWidth: "280px" }}>
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(56,201,138,0.15)",
                    color: "#38C98A",
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    border: "1px solid rgba(56,201,138,0.3)",
                    marginBottom: "16px",
                  }}
                >
                  SEO Learning Hub
                </div>
                <h2
                  style={{
                    color: "#fff",
                    fontSize: "clamp(22px, 3vw, 30px)",
                    fontWeight: "800",
                    marginBottom: "12px",
                    lineHeight: "1.2",
                  }}
                >
                  Master SEO with Expert Insights
                </h2>
                <p
                  style={{
                    color: "#C7D2E0",
                    fontSize: "15px",
                    lineHeight: "1.7",
                    marginBottom: "0",
                    maxWidth: "480px",
                  }}
                >
                  Dive into our expert articles to learn proven strategies that
                  drive organic traffic, improve rankings, and grow your
                  business online.
                </p>
              </div>
              <div style={{ flex: "1", minWidth: "280px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  {[
                    {
                      icon: "🔍",
                      title: "Keyword Research",
                      desc: "Find terms your customers actually search",
                    },
                    {
                      icon: "📄",
                      title: "On-Page Optimization",
                      desc: "Maximize every page's ranking potential",
                    },
                    {
                      icon: "🔗",
                      title: "Link Building",
                      desc: "Earn authority through quality backlinks",
                    },
                    {
                      icon: "⚙️",
                      title: "Technical SEO",
                      desc: "Fix crawlability, speed & indexing issues",
                    },
                  ].map((tip) => (
                    <div
                      key={tip.title}
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "12px",
                        padding: "16px",
                      }}
                    >
                      <div style={{ fontSize: "24px", marginBottom: "8px" }}>
                        {tip.icon}
                      </div>
                      <div
                        style={{
                          color: "#38C98A",
                          fontWeight: "700",
                          fontSize: "13px",
                          marginBottom: "4px",
                        }}
                      >
                        {tip.title}
                      </div>
                      <div
                        style={{
                          color: "#C7D2E0",
                          fontSize: "12px",
                          lineHeight: "1.5",
                        }}
                      >
                        {tip.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section
        id="blog-content"
        style={{
          padding: "60px 0 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <BlogGridParticles />
        {/* Animated section header */}
        <div
          style={{
            textAlign: "center",
            padding: "0 24px 32px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(56,201,138,0.08)",
              border: "1px solid rgba(56,201,138,0.25)",
              borderRadius: "99px",
              padding: "8px 20px",
              marginBottom: "16px",
              animation: "pulse-glow 2.5s ease-in-out infinite",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#38C98A",
                display: "inline-block",
                animation: "blink 1.2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                color: "#38C98A",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              ALL ARTICLES
            </span>
          </div>
          <div
            style={{
              width: 60,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, #38C98A, transparent)",
              margin: "0 auto",
            }}
          />
        </div>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "24px",
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  style={{
                    background: "linear-gradient(145deg, #0d2f4b, #0a2038)",
                    borderRadius: "16px",
                    height: "260px",
                    animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
                  }}
                />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <>
              {/* Featured post */}
              {featured && (
                <Link
                  to="/blog/$id"
                  params={{ id: featured.id.toString() }}
                  data-ocid="blog.primary_button"
                  style={{
                    display: "block",
                    marginBottom: "48px",
                    borderRadius: "24px",
                    overflow: "hidden",
                    border: "1px solid rgba(56,201,138,0.2)",
                    boxShadow:
                      "0 8px 60px rgba(56,201,138,0.15), 0 4px 30px rgba(0,0,0,0.4)",
                    textDecoration: "none",
                    transition: "box-shadow 0.3s ease, transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 16px 80px rgba(56,201,138,0.25), 0 8px 40px rgba(0,0,0,0.5)";
                    (e.currentTarget as HTMLAnchorElement).style.transform =
                      "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 8px 60px rgba(56,201,138,0.15), 0 4px 30px rgba(0,0,0,0.4)";
                    (e.currentTarget as HTMLAnchorElement).style.transform =
                      "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      minHeight: "320px",
                    }}
                    className="featured-grid"
                  >
                    {/* 3D scene side */}
                    <div
                      style={{
                        position: "relative",
                        background:
                          "linear-gradient(135deg, #0B2A43 0%, #062033 100%)",
                        minHeight: "280px",
                        overflow: "hidden",
                      }}
                    >
                      <FeaturedPostCanvas />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "radial-gradient(ellipse at center, rgba(56,201,138,0.1) 0%, transparent 70%)",
                          pointerEvents: "none",
                        }}
                      />
                    </div>

                    {/* Content side */}
                    <div
                      style={{
                        background:
                          "linear-gradient(145deg, #0d2f4b 0%, #0a2038 100%)",
                        padding: "40px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginBottom: "20px",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            background:
                              "linear-gradient(135deg, #38C98A, #00d4ff)",
                            color: "#071c2e",
                            fontSize: "11px",
                            fontWeight: 800,
                            padding: "4px 14px",
                            borderRadius: "99px",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                          }}
                        >
                          ★ Featured
                        </span>
                        {featured.tags.map((t) => {
                          const tc = TAG_COLORS[t] ?? TAG_COLORS["On-Page SEO"];
                          return (
                            <span
                              key={t}
                              style={{
                                background: tc.bg,
                                color: tc.text,
                                fontSize: "11px",
                                fontWeight: 600,
                                padding: "4px 12px",
                                borderRadius: "99px",
                                border: `1px solid ${tc.glow}`,
                              }}
                            >
                              {t}
                            </span>
                          );
                        })}
                      </div>
                      <h2
                        style={{
                          color: "#fff",
                          fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
                          fontWeight: 800,
                          lineHeight: 1.3,
                          marginBottom: "16px",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {featured.title}
                      </h2>
                      <p
                        style={{
                          color: "rgba(199,210,224,0.85)",
                          fontSize: "15px",
                          lineHeight: 1.7,
                          marginBottom: "28px",
                        }}
                      >
                        {featured.excerpt}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            background:
                              "linear-gradient(135deg, rgba(56,201,138,0.2), rgba(0,212,255,0.1))",
                            border: "1px solid rgba(56,201,138,0.3)",
                            color: "#38C98A",
                            fontWeight: 700,
                            fontSize: "14px",
                            padding: "10px 24px",
                            borderRadius: "10px",
                          }}
                        >
                          Read Full Article →
                        </span>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            color: "rgba(199,210,224,0.5)",
                            fontSize: "13px",
                          }}
                        >
                          <Clock size={13} /> {featured.readTime.toString()} min
                          read
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Rest of posts grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "24px",
                }}
              >
                {rest.map((post, i) => (
                  <BlogCard key={post.id.toString()} post={post} index={i} />
                ))}
              </div>
            </>
          ) : (
            <div
              data-ocid="blog.empty_state"
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "rgba(199,210,224,0.5)",
              }}
            >
              No posts yet. Check back soon!
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section
        style={{
          background: "linear-gradient(135deg, #0B2A43 0%, #071c2e 100%)",
          padding: "80px 24px",
          borderTop: "1px solid rgba(56,201,138,0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            height: "200px",
            background:
              "radial-gradient(ellipse, rgba(56,201,138,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h2
            style={{
              color: "#fff",
              fontSize: "2rem",
              fontWeight: 800,
              marginBottom: "12px",
            }}
          >
            Never Miss an SEO Update
          </h2>
          <p
            style={{
              color: "rgba(199,210,224,0.8)",
              marginBottom: "32px",
              fontSize: "16px",
            }}
          >
            Get the latest strategies, algorithm updates, and case studies
            delivered to your inbox.
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              data-ocid="blog.input"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "10px",
                padding: "12px 18px",
                color: "#fff",
                fontSize: "15px",
                outline: "none",
              }}
            />
            <button
              type="button"
              data-ocid="blog.submit_button"
              style={{
                background: "linear-gradient(135deg, #38C98A, #00d4ff)",
                color: "#071c2e",
                fontWeight: 700,
                fontSize: "14px",
                padding: "12px 24px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .featured-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes blogScrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 rgba(56,201,138,0); }
          50% { box-shadow: 0 0 18px rgba(56,201,138,0.25); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes float-up {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}
