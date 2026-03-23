import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-BxINLDd1.js";
import { W as WebGLRenderer, S as Scene, P as PerspectiveCamera, I as IcosahedronGeometry, M as MeshBasicMaterial, b as Mesh, T as TorusGeometry, c as BufferGeometry, d as BufferAttribute, e as PointsMaterial, f as Points, g as SphereGeometry } from "./three.module-DUeOZydE.js";
import { N as Navbar, F as Footer } from "./Navbar-CBcDUy39.js";
import { u as useBackend } from "./useBackend-okQ5lZf6.js";
import { C as Clock } from "./clock-BROyecDb.js";
import { T as Tag } from "./tag-4SrMzU2-.js";
import "./search-BwP7uQVp.js";
const POST_CONTENT = {
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

Add JSON-LD LocalBusiness schema to your website with accurate NAP, opening hours, geo-coordinates, and accepted payment methods. While schema alone won't move the needle dramatically, it provides unambiguous signals to Google about your business identity and helps trigger rich results in search.`
};
const samplePosts = [
  {
    title: "10 On-Page SEO Techniques That Actually Work in 2026",
    excerpt: "Discover the most impactful on-page optimization tactics that search engines reward in 2026. From title tag science to Core Web Vitals, these techniques are tested and proven.",
    tags: ["On-Page SEO", "Best Practices"],
    readTime: 7
  },
  {
    title: "How to Build High-Quality Backlinks (Without Spamming)",
    excerpt: "Ethical link building strategies that boost domain authority and rankings sustainably. Learn guest posting, digital PR, broken link building, and more.",
    tags: ["Off-Page SEO", "Link Building"],
    readTime: 9
  },
  {
    title: "The Complete Technical SEO Checklist for 2026",
    excerpt: "Everything you need to audit and fix your site's technical foundation—from crawlability and Core Web Vitals to JavaScript SEO and structured data.",
    tags: ["Technical SEO"],
    readTime: 12
  },
  {
    title: "Keyword Research: Finding Hidden Opportunities",
    excerpt: "A step-by-step guide to uncovering keywords your competitors are missing. Master search intent, topic clusters, and long-tail strategy.",
    tags: ["Keyword Research"],
    readTime: 8
  },
  {
    title: "Local SEO: How to Rank #1 in Your City",
    excerpt: "Proven tactics to dominate local search results and Google Maps. Optimize your Google Business Profile, build citations, and generate reviews at scale.",
    tags: ["Local SEO"],
    readTime: 6
  },
  {
    title: "Local SEO Mastery: Rank #1 in Your City in 2026",
    excerpt: "A step-by-step guide to dominating local search results, Google Business Profile optimization, building citations, and earning 5-star reviews that convert browsers into buyers.",
    tags: ["Local SEO", "Best Practices"],
    readTime: 9,
    slug: "local-seo-mastery-rank-1-in-your-city-2026"
  },
  {
    title: "SEO Analytics: How to Measure What Actually Matters",
    excerpt: "Stop tracking vanity metrics. This guide shows you which SEO KPIs drive real business decisions, how to set up proper GA4 reporting, and how to attribute revenue to organic search.",
    tags: ["Technical SEO", "Best Practices"],
    readTime: 8,
    slug: "seo-analytics-measure-what-matters"
  },
  {
    title: "Content Strategy for SEO: The Complete 2026 Framework",
    excerpt: "Build a content strategy that systematically drives organic growth. Topical authority maps, keyword research frameworks, content formats that earn links, and a quarterly refresh system.",
    tags: ["Keyword Research", "Best Practices"],
    readTime: 11,
    slug: "content-strategy-seo-complete-framework-2026"
  }
];
const TAG_COLORS = {
  "On-Page SEO": {
    bg: "rgba(56,201,138,0.15)",
    text: "#38C98A",
    glow: "rgba(56,201,138,0.4)"
  },
  "Best Practices": {
    bg: "rgba(56,201,138,0.10)",
    text: "#5be8a8",
    glow: "rgba(91,232,168,0.3)"
  },
  "Off-Page SEO": {
    bg: "rgba(100,180,255,0.15)",
    text: "#64B4FF",
    glow: "rgba(100,180,255,0.4)"
  },
  "Link Building": {
    bg: "rgba(100,180,255,0.10)",
    text: "#7ec8ff",
    glow: "rgba(126,200,255,0.3)"
  },
  "Technical SEO": {
    bg: "rgba(255,160,80,0.15)",
    text: "#FFA050",
    glow: "rgba(255,160,80,0.4)"
  },
  "Keyword Research": {
    bg: "rgba(200,130,255,0.15)",
    text: "#C882FF",
    glow: "rgba(200,130,255,0.4)"
  },
  "Local SEO": {
    bg: "rgba(255,200,60,0.15)",
    text: "#FFC83C",
    glow: "rgba(255,200,60,0.4)"
  }
};
function HeroBlogCanvas() {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0, 0);
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5;
    const icoGeo = new IcosahedronGeometry(0.7, 0);
    const icoMat = new MeshBasicMaterial({
      color: 3721610,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const icos = [];
    const icoPositions = [
      [-3, 1.5, -1],
      [3, -1, -2],
      [-1.5, -2, -1],
      [4, 2, -3],
      [-4, -1.5, -2]
    ];
    for (const pos of icoPositions) {
      const m = new Mesh(icoGeo, icoMat.clone());
      m.position.set(...pos);
      m.scale.setScalar(0.4 + Math.random() * 0.5);
      scene.add(m);
      icos.push(m);
    }
    const torGeo = new TorusGeometry(0.6, 0.2, 8, 24);
    const torMat = new MeshBasicMaterial({
      color: 54527,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const tori = [];
    const torPositions = [
      [2.5, 1.5, -2],
      [-2, -1, -1.5],
      [0, 2.5, -3]
    ];
    for (const pos of torPositions) {
      const m = new Mesh(torGeo, torMat.clone());
      m.position.set(...pos);
      m.scale.setScalar(0.5 + Math.random() * 0.4);
      scene.add(m);
      tori.push(m);
    }
    const partCount = 200;
    const posArr = new Float32Array(partCount * 3);
    for (let i = 0; i < partCount * 3; i++)
      posArr[i] = (Math.random() - 0.5) * 14;
    const partGeo = new BufferGeometry();
    partGeo.setAttribute("position", new BufferAttribute(posArr, 3));
    const partMat = new PointsMaterial({
      color: 3721610,
      size: 0.06,
      transparent: true,
      opacity: 0.7
    });
    const particles = new Points(partGeo, partMat);
    scene.add(particles);
    let frame = 0;
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame += 5e-3;
      for (let i = 0; i < icos.length; i++) {
        icos[i].rotation.x += 4e-3;
        icos[i].rotation.y += 6e-3;
        icos[i].position.y += Math.sin(frame + i) * 2e-3;
      }
      for (let i = 0; i < tori.length; i++) {
        tori[i].rotation.x += 3e-3;
        tori[i].rotation.z += 5e-3;
      }
      particles.rotation.y += 1e-3;
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none"
      }
    }
  );
}
function FeaturedPostCanvas() {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0, 0);
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      50,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5;
    const sphereGeo = new SphereGeometry(1, 24, 24);
    const sphereMat = new MeshBasicMaterial({
      color: 3721610,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const sphere = new Mesh(sphereGeo, sphereMat);
    scene.add(sphere);
    const ringGeo = new TorusGeometry(1.8, 0.03, 6, 80);
    const ringMat = new MeshBasicMaterial({
      color: 54527,
      transparent: true,
      opacity: 0.4
    });
    const ring = new Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);
    const orbCount = 60;
    const orbPos = new Float32Array(orbCount * 3);
    for (let i = 0; i < orbCount; i++) {
      const angle = i / orbCount * Math.PI * 2;
      const radius = 2.2 + (Math.random() - 0.5) * 0.4;
      orbPos[i * 3] = Math.cos(angle) * radius;
      orbPos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      orbPos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const orbGeo = new BufferGeometry();
    orbGeo.setAttribute("position", new BufferAttribute(orbPos, 3));
    const orbMat = new PointsMaterial({
      color: 3721610,
      size: 0.07,
      transparent: true,
      opacity: 0.8
    });
    const orbs = new Points(orbGeo, orbMat);
    scene.add(orbs);
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      sphere.rotation.y += 5e-3;
      sphere.rotation.x += 2e-3;
      ring.rotation.z += 3e-3;
      orbs.rotation.y += 4e-3;
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none"
      }
    }
  );
}
function BlogCard({ post, index }) {
  const cardRef = reactExports.useRef(null);
  const [visible, setVisible] = reactExports.useState(false);
  const primaryTag = post.tags[0] ?? "SEO";
  const colors = TAG_COLORS[primaryTag] ?? TAG_COLORS["On-Page SEO"];
  reactExports.useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 80);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      ref: cardRef,
      to: "/blog/$id",
      params: { id: post.id.toString() },
      "data-ocid": `blog.item.${index + 1}`,
      style: {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        display: "block",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        overflow: "hidden",
        background: "linear-gradient(145deg, #0d2f4b 0%, #0a2038 100%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        textDecoration: "none"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.boxShadow = `0 8px 40px ${colors.glow}, 0 4px 20px rgba(0,0,0,0.3)`;
        e.currentTarget.style.transform = "translateY(-4px)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
        e.currentTarget.style.transform = "translateY(0)";
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: `linear-gradient(135deg, ${colors.bg}, rgba(11,42,67,0.8))`,
              borderBottom: `1px solid ${colors.glow}`,
              padding: "16px 20px 14px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 14, style: { color: colors.text, flexShrink: 0 } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    color: colors.text,
                    fontWeight: 700,
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase"
                  },
                  children: primaryTag
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  style: {
                    marginLeft: "auto",
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "11px",
                    padding: "2px 8px",
                    borderRadius: "99px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 10 }),
                    " ",
                    post.readTime.toString(),
                    " min"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "18px 20px 20px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              style: {
                color: "#fff",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: 1.4,
                marginBottom: "10px",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
              },
              children: post.title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              style: {
                color: "rgba(199,210,224,0.8)",
                fontSize: "14px",
                lineHeight: 1.6,
                marginBottom: "16px",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
              },
              children: post.excerpt
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                display: "flex",
                gap: "6px",
                flexWrap: "wrap",
                marginBottom: "14px"
              },
              children: post.tags.map((t) => {
                const tc = TAG_COLORS[t] ?? TAG_COLORS["On-Page SEO"];
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      background: tc.bg,
                      color: tc.text,
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: "99px",
                      border: `1px solid ${tc.glow}`
                    },
                    children: t
                  },
                  t
                );
              })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: "12px"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: { color: colors.text, fontSize: "13px", fontWeight: 600 },
                  children: "Read Article →"
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
function BlogGridParticles() {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0, 0);
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6;
    const shapes = [];
    const colors = [3721610, 54527, 8308991, 6023336];
    for (let i = 0; i < 12; i++) {
      const geo = new IcosahedronGeometry(0.15 + Math.random() * 0.1, 0);
      const mat = new MeshBasicMaterial({
        color: colors[i % colors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.25 + Math.random() * 0.2
      });
      const mesh = new Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 4 - 2
      );
      scene.add(mesh);
      shapes.push(mesh);
    }
    const count = 180;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 22;
    const pGeo = new BufferGeometry();
    pGeo.setAttribute("position", new BufferAttribute(pos, 3));
    const pMat = new PointsMaterial({
      color: 3721610,
      size: 0.04,
      transparent: true,
      opacity: 0.4
    });
    const particles = new Points(pGeo, pMat);
    scene.add(particles);
    let animId;
    const speeds = shapes.map(() => ({
      rx: (Math.random() - 0.5) * 0.01,
      ry: (Math.random() - 0.5) * 0.012
    }));
    const origins = shapes.map((m) => m.position.y);
    let t = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 8e-3;
      shapes.forEach((m, i) => {
        m.rotation.x += speeds[i].rx;
        m.rotation.y += speeds[i].ry;
        m.position.y = origins[i] + Math.sin(t + i) * 0.3;
      });
      particles.rotation.y += 4e-4;
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none"
      }
    }
  );
}
function Blog() {
  const [posts, setPosts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const backend = useBackend();
  const load = reactExports.useCallback(async () => {
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
            BigInt(p.readTime)
          );
        }
        existing = await backend.listBlogPosts();
      }
      setPosts(existing);
    } catch {
    } finally {
      setLoading(false);
    }
  }, [backend]);
  reactExports.useEffect(() => {
    load();
  }, [load]);
  const featured = posts[0];
  const rest = posts.slice(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { minHeight: "100vh", background: "#071c2e" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        style: {
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #0B2A43 0%, #071c2e 100%)",
          padding: "100px 0 80px"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HeroBlogCanvas, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "600px",
                height: "300px",
                background: "radial-gradient(ellipse, rgba(56,201,138,0.12) 0%, transparent 70%)",
                pointerEvents: "none"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                maxWidth: "800px",
                margin: "0 auto",
                padding: "0 24px",
                textAlign: "center",
                position: "relative",
                zIndex: 1
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "rgba(56,201,138,0.12)",
                      border: "1px solid rgba(56,201,138,0.3)",
                      borderRadius: "99px",
                      padding: "6px 18px",
                      marginBottom: "24px"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "#38C98A",
                            display: "inline-block"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            color: "#38C98A",
                            fontSize: "13px",
                            fontWeight: 600,
                            letterSpacing: "0.06em"
                          },
                          children: "SEO Knowledge Hub"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "h1",
                  {
                    style: {
                      fontSize: "clamp(2rem, 5vw, 3.5rem)",
                      fontWeight: 900,
                      color: "#fff",
                      marginBottom: "20px",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em"
                    },
                    children: [
                      "Insights & Guides That",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#38C98A", display: "block" }, children: "Actually Move Rankings" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      color: "rgba(199,210,224,0.85)",
                      fontSize: "18px",
                      lineHeight: 1.7,
                      maxWidth: "560px",
                      margin: "0 auto"
                    },
                    children: "Actionable SEO expertise—from technical deep-dives to content strategy—written by practitioners who've ranked hundreds of sites."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "48px"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "6px",
                          animation: "blogScrollBounce 2s ease-in-out infinite",
                          cursor: "pointer",
                          opacity: 0.7,
                          background: "none",
                          border: "none",
                          padding: 0
                        },
                        onClick: () => {
                          var _a;
                          (_a = document.getElementById("blog-content")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: {
                                color: "rgba(199,210,224,0.7)",
                                fontSize: "12px",
                                letterSpacing: "0.08em",
                                fontWeight: 600
                              },
                              children: "SCROLL"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "svg",
                            {
                              width: "24",
                              height: "24",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              role: "img",
                              "aria-label": "Scroll down",
                              style: { color: "#38C98A" },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Scroll down" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "path",
                                  {
                                    d: "M12 5v14M5 12l7 7 7-7",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                  }
                                )
                              ]
                            }
                          )
                        ]
                      }
                    )
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: { background: "#0B2A43", padding: "48px 0" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: { maxWidth: "1200px", margin: "0 auto", padding: "0 24px" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: "linear-gradient(135deg, #0d3352 0%, #0a2440 50%, #072035 100%)",
              border: "1px solid rgba(56,201,138,0.25)",
              borderRadius: "20px",
              padding: "40px"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "40px",
                  alignItems: "center"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: "1", minWidth: "280px" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
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
                          marginBottom: "16px"
                        },
                        children: "SEO Learning Hub"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h2",
                      {
                        style: {
                          color: "#fff",
                          fontSize: "clamp(22px, 3vw, 30px)",
                          fontWeight: "800",
                          marginBottom: "12px",
                          lineHeight: "1.2"
                        },
                        children: "Master SEO with Expert Insights"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        style: {
                          color: "#C7D2E0",
                          fontSize: "15px",
                          lineHeight: "1.7",
                          marginBottom: "0",
                          maxWidth: "480px"
                        },
                        children: "Dive into our expert articles to learn proven strategies that drive organic traffic, improve rankings, and grow your business online."
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: "1", minWidth: "280px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "16px"
                      },
                      children: [
                        {
                          icon: "🔍",
                          title: "Keyword Research",
                          desc: "Find terms your customers actually search"
                        },
                        {
                          icon: "📄",
                          title: "On-Page Optimization",
                          desc: "Maximize every page's ranking potential"
                        },
                        {
                          icon: "🔗",
                          title: "Link Building",
                          desc: "Earn authority through quality backlinks"
                        },
                        {
                          icon: "⚙️",
                          title: "Technical SEO",
                          desc: "Fix crawlability, speed & indexing issues"
                        }
                      ].map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: {
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "12px",
                            padding: "16px"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "24px", marginBottom: "8px" }, children: tip.icon }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  color: "#38C98A",
                                  fontWeight: "700",
                                  fontSize: "13px",
                                  marginBottom: "4px"
                                },
                                children: tip.title
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  color: "#C7D2E0",
                                  fontSize: "12px",
                                  lineHeight: "1.5"
                                },
                                children: tip.desc
                              }
                            )
                          ]
                        },
                        tip.title
                      ))
                    }
                  ) })
                ]
              }
            )
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        id: "blog-content",
        style: {
          padding: "60px 0 80px",
          position: "relative",
          overflow: "hidden"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BlogGridParticles, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                textAlign: "center",
                padding: "0 24px 32px",
                position: "relative",
                zIndex: 1
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "12px",
                      background: "rgba(56,201,138,0.08)",
                      border: "1px solid rgba(56,201,138,0.25)",
                      borderRadius: "99px",
                      padding: "8px 20px",
                      marginBottom: "16px",
                      animation: "pulse-glow 2.5s ease-in-out infinite"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "#38C98A",
                            display: "inline-block",
                            animation: "blink 1.2s ease-in-out infinite"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            color: "#38C98A",
                            fontSize: 13,
                            fontWeight: 700,
                            letterSpacing: "0.08em"
                          },
                          children: "ALL ARTICLES"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      width: 60,
                      height: 2,
                      background: "linear-gradient(90deg, transparent, #38C98A, transparent)",
                      margin: "0 auto"
                    }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 24px",
                position: "relative",
                zIndex: 1
              },
              children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                    gap: "24px"
                  },
                  children: [1, 2, 3, 4, 5, 6].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        background: "linear-gradient(145deg, #0d2f4b, #0a2038)",
                        borderRadius: "16px",
                        height: "260px",
                        animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite"
                      }
                    },
                    n
                  ))
                }
              ) : posts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                featured && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/blog/$id",
                    params: { id: featured.id.toString() },
                    "data-ocid": "blog.primary_button",
                    style: {
                      display: "block",
                      marginBottom: "48px",
                      borderRadius: "24px",
                      overflow: "hidden",
                      border: "1px solid rgba(56,201,138,0.2)",
                      boxShadow: "0 8px 60px rgba(56,201,138,0.15), 0 4px 30px rgba(0,0,0,0.4)",
                      textDecoration: "none",
                      transition: "box-shadow 0.3s ease, transform 0.3s ease"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.boxShadow = "0 16px 80px rgba(56,201,138,0.25), 0 8px 40px rgba(0,0,0,0.5)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.boxShadow = "0 8px 60px rgba(56,201,138,0.15), 0 4px 30px rgba(0,0,0,0.4)";
                      e.currentTarget.style.transform = "translateY(0)";
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          minHeight: "320px"
                        },
                        className: "featured-grid",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              style: {
                                position: "relative",
                                background: "linear-gradient(135deg, #0B2A43 0%, #062033 100%)",
                                minHeight: "280px",
                                overflow: "hidden"
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedPostCanvas, {}),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "div",
                                  {
                                    style: {
                                      position: "absolute",
                                      inset: 0,
                                      background: "radial-gradient(ellipse at center, rgba(56,201,138,0.1) 0%, transparent 70%)",
                                      pointerEvents: "none"
                                    }
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              style: {
                                background: "linear-gradient(145deg, #0d2f4b 0%, #0a2038 100%)",
                                padding: "40px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "div",
                                  {
                                    style: {
                                      display: "flex",
                                      gap: "10px",
                                      marginBottom: "20px",
                                      flexWrap: "wrap"
                                    },
                                    children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          style: {
                                            background: "linear-gradient(135deg, #38C98A, #00d4ff)",
                                            color: "#071c2e",
                                            fontSize: "11px",
                                            fontWeight: 800,
                                            padding: "4px 14px",
                                            borderRadius: "99px",
                                            letterSpacing: "0.08em",
                                            textTransform: "uppercase"
                                          },
                                          children: "★ Featured"
                                        }
                                      ),
                                      featured.tags.map((t) => {
                                        const tc = TAG_COLORS[t] ?? TAG_COLORS["On-Page SEO"];
                                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "span",
                                          {
                                            style: {
                                              background: tc.bg,
                                              color: tc.text,
                                              fontSize: "11px",
                                              fontWeight: 600,
                                              padding: "4px 12px",
                                              borderRadius: "99px",
                                              border: `1px solid ${tc.glow}`
                                            },
                                            children: t
                                          },
                                          t
                                        );
                                      })
                                    ]
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "h2",
                                  {
                                    style: {
                                      color: "#fff",
                                      fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
                                      fontWeight: 800,
                                      lineHeight: 1.3,
                                      marginBottom: "16px",
                                      letterSpacing: "-0.01em"
                                    },
                                    children: featured.title
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "p",
                                  {
                                    style: {
                                      color: "rgba(199,210,224,0.85)",
                                      fontSize: "15px",
                                      lineHeight: 1.7,
                                      marginBottom: "28px"
                                    },
                                    children: featured.excerpt
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "div",
                                  {
                                    style: {
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "16px"
                                    },
                                    children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          style: {
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            background: "linear-gradient(135deg, rgba(56,201,138,0.2), rgba(0,212,255,0.1))",
                                            border: "1px solid rgba(56,201,138,0.3)",
                                            color: "#38C98A",
                                            fontWeight: 700,
                                            fontSize: "14px",
                                            padding: "10px 24px",
                                            borderRadius: "10px"
                                          },
                                          children: "Read Full Article →"
                                        }
                                      ),
                                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                        "span",
                                        {
                                          style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px",
                                            color: "rgba(199,210,224,0.5)",
                                            fontSize: "13px"
                                          },
                                          children: [
                                            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 13 }),
                                            " ",
                                            featured.readTime.toString(),
                                            " min read"
                                          ]
                                        }
                                      )
                                    ]
                                  }
                                )
                              ]
                            }
                          )
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                      gap: "24px"
                    },
                    children: rest.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(BlogCard, { post, index: i }, post.id.toString()))
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-ocid": "blog.empty_state",
                  style: {
                    textAlign: "center",
                    padding: "80px 0",
                    color: "rgba(199,210,224,0.5)"
                  },
                  children: "No posts yet. Check back soon!"
                }
              )
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        style: {
          background: "linear-gradient(135deg, #0B2A43 0%, #071c2e 100%)",
          padding: "80px 24px",
          borderTop: "1px solid rgba(56,201,138,0.1)",
          position: "relative",
          overflow: "hidden"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "500px",
                height: "200px",
                background: "radial-gradient(ellipse, rgba(56,201,138,0.08) 0%, transparent 70%)",
                pointerEvents: "none"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                maxWidth: "640px",
                margin: "0 auto",
                textAlign: "center",
                position: "relative",
                zIndex: 1
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    style: {
                      color: "#fff",
                      fontSize: "2rem",
                      fontWeight: 800,
                      marginBottom: "12px"
                    },
                    children: "Never Miss an SEO Update"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    style: {
                      color: "rgba(199,210,224,0.8)",
                      marginBottom: "32px",
                      fontSize: "16px"
                    },
                    children: "Get the latest strategies, algorithm updates, and case studies delivered to your inbox."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      gap: "12px",
                      maxWidth: "480px",
                      margin: "0 auto"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "email",
                          placeholder: "Your email address",
                          "data-ocid": "blog.input",
                          style: {
                            flex: 1,
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: "10px",
                            padding: "12px 18px",
                            color: "#fff",
                            fontSize: "15px",
                            outline: "none"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          "data-ocid": "blog.submit_button",
                          style: {
                            background: "linear-gradient(135deg, #38C98A, #00d4ff)",
                            color: "#071c2e",
                            fontWeight: 700,
                            fontSize: "14px",
                            padding: "12px 24px",
                            borderRadius: "10px",
                            border: "none",
                            cursor: "pointer",
                            whiteSpace: "nowrap"
                          },
                          children: "Subscribe"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
      ` })
  ] });
}
export {
  Blog as default
};
