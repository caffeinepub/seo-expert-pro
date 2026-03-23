import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  CheckCircle,
  ChevronRight,
  FileText,
  Globe,
  MapPin,
  RotateCcw,
  Search,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Services3DHeader from "../components/Services3DHeader";

// ─── Types ──────────────────────────────────────────────────────────────────

interface PricingTier {
  name: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
}

interface ServiceData {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tabLabel: string;
  description: string[];
  whoFor: string;
  process: string[];
  pricing: PricingTier[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const services: ServiceData[] = [
  {
    id: "on-page",
    icon: FileText,
    title: "On-Page SEO",
    tabLabel: "On-Page SEO",
    description: [
      "When someone searches for what you offer, the first thing Google looks at is your page itself. On-page SEO is the practice of optimizing everything on your website — from the words you use to the way your pages are structured — so that search engines can understand your content and rank it appropriately.",
      "I've audited hundreds of websites and the story is almost always the same: strong products or services buried under poorly written title tags, keyword-stuffed paragraphs, or content that simply doesn't answer what the visitor came looking for. On-page SEO fixes all of that.",
      "This isn't about gaming the algorithm. It's about making your website genuinely better for the people visiting it — and when you do that consistently, rankings follow.",
    ],
    whoFor:
      "Businesses that have traffic but low conversion rates. Sites with pages that rank on page 2 or 3 and need a push. Anyone launching a new website who wants to start on the right foot.",
    process: [
      "Full content and structure audit — I review every page for keyword alignment, readability, and search intent match",
      "Optimization roadmap — You get a prioritized list of changes with expected impact",
      "Implementation — I rewrite titles, metas, headers, and body content where needed",
      "Monitoring & reporting — Monthly rank tracking to measure what moved",
    ],
    pricing: [
      {
        name: "Starter",
        price: "$399",
        period: "/mo",
        features: [
          "Up to 5 pages optimized",
          "Keyword research",
          "Title & meta rewrites",
          "Monthly report",
        ],
      },
      {
        name: "Growth",
        price: "$799",
        period: "/mo",
        popular: true,
        features: [
          "Up to 15 pages",
          "Content gap analysis",
          "Internal linking strategy",
          "Bi-weekly check-ins",
        ],
      },
      {
        name: "Authority",
        price: "$1,499",
        period: "/mo",
        features: [
          "Unlimited pages",
          "Full content rewrite",
          "Schema markup",
          "Weekly reporting + calls",
        ],
      },
    ],
  },
  {
    id: "off-page",
    icon: Globe,
    title: "Off-Page SEO",
    tabLabel: "Off-Page SEO",
    description: [
      "Google doesn't just look at your website. It looks at what the rest of the internet says about you. Off-page SEO is about building the kind of reputation online that makes search engines trust you enough to rank you above your competitors.",
      "Links from other websites are the currency of the internet. But not all links are created equal. A single mention in Forbes or an industry publication can do more for your rankings than 200 links from random blogs. My approach focuses on earning links that actually matter — through genuine outreach, digital PR, and content that people want to reference.",
      "I've helped clients go from having zero referring domains to building a portfolio of 100+ high-quality backlinks within a year. The results compound over time, and once you've built real authority, it's very hard for competitors to take that away.",
    ],
    whoFor:
      "Websites stuck on page 2 despite good on-page SEO. Brands in competitive niches where everyone's content looks similar. New businesses that need to establish credibility fast.",
    process: [
      "Backlink profile audit — I analyze your current links, identify toxic ones, and benchmark against top competitors",
      "Link building strategy — Custom roadmap based on your niche, budget, and goals",
      "Outreach and placement — My team reaches out to relevant sites for genuine editorial links",
      "Monthly link report — Full transparency on every link built, with metrics",
    ],
    pricing: [
      {
        name: "Starter",
        price: "$599",
        period: "/mo",
        features: [
          "5–8 quality backlinks/mo",
          "Niche-relevant sites",
          "Monthly report",
        ],
      },
      {
        name: "Growth",
        price: "$1,199",
        period: "/mo",
        popular: true,
        features: [
          "12–18 backlinks/mo",
          "DA 30+ sites",
          "Digital PR inclusion",
          "Bi-weekly updates",
        ],
      },
      {
        name: "Authority",
        price: "$2,299",
        period: "/mo",
        features: [
          "25+ backlinks/mo",
          "DA 50+ targets",
          "Forbes/Inc outreach",
          "Weekly calls + custom reporting",
        ],
      },
    ],
  },
  {
    id: "technical",
    icon: Search,
    title: "Technical SEO",
    tabLabel: "Technical SEO",
    description: [
      "You can have the best content in the world, but if Google can't crawl your website properly, you simply won't rank. Technical SEO is the infrastructure layer of search — and it's often where the biggest, fastest wins hide.",
      "Most websites I audit have issues they don't even know about: pages being accidentally blocked from indexing, duplicate content confusing the algorithm, slow load times killing both rankings and conversions. These aren't glamorous fixes, but they're often the difference between page 1 and page 3.",
      "I approach technical SEO methodically — starting with a full crawl of your site, identifying the issues with the highest impact, and fixing them in order of priority. This is the kind of work that creates a stable, scalable foundation for everything else.",
    ],
    whoFor:
      "Ecommerce sites with thousands of product pages. Businesses that recently migrated or redesigned their website. Any site that has plateaued in rankings despite good content.",
    process: [
      "Technical crawl and audit — Using industry-leading tools to find every issue",
      "Prioritized fix list — Ranked by impact so we tackle what matters most first",
      "Implementation + QA — I fix issues and test across devices and browsers",
      "Ongoing monitoring — Monthly crawls to catch new issues before they impact rankings",
    ],
    pricing: [
      {
        name: "Starter",
        price: "$499",
        period: "/mo",
        features: [
          "Full site audit",
          "Core Web Vitals fixes",
          "Sitemap + robots.txt",
          "Monthly crawl report",
        ],
      },
      {
        name: "Growth",
        price: "$999",
        period: "/mo",
        popular: true,
        features: [
          "JavaScript rendering",
          "Structured data setup",
          "Redirect audits",
          "Priority support",
        ],
      },
      {
        name: "Authority",
        price: "$1,899",
        period: "/mo",
        features: [
          "Enterprise crawl setup",
          "Log file analysis",
          "CDN and server optimization",
          "Weekly technical calls",
        ],
      },
    ],
  },
  {
    id: "keyword-research",
    icon: BarChart2,
    title: "Keyword Research",
    tabLabel: "Keyword Research",
    description: [
      "Most keyword research is done backwards. People pick keywords they think sound right, then try to rank for them. Real keyword research starts with understanding your customers — what they type when they're ready to buy, when they're comparing options, and when they're just starting to explore.",
      "I've spent years building keyword research frameworks that align with the full buyer journey, not just the high-volume terms everyone targets. The result is a strategy that attracts visitors who actually convert, not just traffic that looks good in a dashboard.",
      "Every keyword research engagement I deliver comes with a full map of your content opportunities, organized by intent and priority. It's the foundation every other SEO service is built on — and I treat it that way.",
    ],
    whoFor:
      "Businesses starting a new SEO campaign. Content teams who need direction on what to write. Anyone who has been targeting the wrong keywords and wonders why traffic isn't converting.",
    process: [
      "Business and audience deep-dive — I learn your customers, competitors, and commercial goals",
      "Seed keyword generation — Building out your core topic clusters",
      "Full keyword expansion and filtering — Thousands of terms analyzed, the best ones surfaced",
      "Deliverable — A structured spreadsheet with intent labels, difficulty scores, and content recommendations",
    ],
    pricing: [
      {
        name: "Starter",
        price: "$299",
        period: " one-time",
        features: [
          "Up to 100 keywords",
          "Intent classification",
          "Priority score",
          "Content suggestions",
        ],
      },
      {
        name: "Growth",
        price: "$599",
        period: " one-time",
        popular: true,
        features: [
          "Up to 500 keywords",
          "Full topic cluster map",
          "Competitor gap analysis",
          "CMS-ready format",
        ],
      },
      {
        name: "Authority",
        price: "$999",
        period: " one-time",
        features: [
          "Unlimited keywords",
          "Full funnel mapping",
          "Quarterly refresh",
          "Strategy call included",
        ],
      },
    ],
  },
  {
    id: "local-seo",
    icon: MapPin,
    title: "Local SEO",
    tabLabel: "Local SEO",
    description: [
      "If you run a business that serves customers in a specific city or region, local SEO isn't optional — it's the highest-ROI marketing you can do. When someone searches 'plumber near me' or 'best dentist in Austin,' showing up in those results means phone calls, walk-ins, and booked appointments.",
      "I've helped dozens of local businesses go from invisible to page one in their city. The work involves optimizing your Google Business Profile, building local citations across directories, generating reviews strategically, and making sure your website speaks the language of local search.",
      "Local SEO is also one of the fastest areas to see results. Most of my local clients see measurable movement within 60–90 days — which makes it one of the best investments for businesses that need results now, not in a year.",
    ],
    whoFor:
      "Restaurants, clinics, law firms, contractors, salons, and any business serving a local market. Multi-location businesses that want to dominate each city they operate in.",
    process: [
      "Local presence audit — Google Business Profile, citations, reviews, and on-page local signals",
      "GBP optimization — Complete overhaul of your Google Business Profile for maximum visibility",
      "Citation building — Get listed accurately across 50+ directories",
      "Review strategy + local content — Build social proof and target location-based keywords",
    ],
    pricing: [
      {
        name: "Starter",
        price: "$349",
        period: "/mo",
        features: [
          "GBP optimization",
          "20 citations",
          "Review monitoring",
          "Monthly report",
        ],
      },
      {
        name: "Growth",
        price: "$699",
        period: "/mo",
        popular: true,
        features: [
          "GBP management",
          "50 citations",
          "Review generation campaign",
          "Local keyword targeting",
        ],
      },
      {
        name: "Authority",
        price: "$1,299",
        period: "/mo",
        features: [
          "Multi-location support",
          "Full local content strategy",
          "Competitor conquest",
          "Weekly reporting",
        ],
      },
    ],
  },
];

const faqs = [
  {
    q: "How long does SEO take to show results?",
    a: "Honestly, it depends on where you're starting from. For most businesses, you'll start seeing meaningful movement in 3–6 months. Technical fixes and local SEO can move faster — sometimes within 60 days. Competitive national keywords take longer. I set realistic expectations from day one and show you the data every step of the way.",
  },
  {
    q: "Do I need all these services or just one?",
    a: "Most clients start with one service and expand as they see results. If you're not sure where to begin, I offer a free SEO audit that tells you exactly which area has the biggest opportunity for your specific website.",
  },
  {
    q: "Are your prices fixed or do you offer custom packages?",
    a: "The packages above are starting points. Most of my clients end up with a custom scope that fits their goals and budget. Use the contact form to tell me about your business and I'll put together a proposal that makes sense for you.",
  },
  {
    q: "Do you work with small businesses or only large companies?",
    a: "Both. Some of my favourite projects have been helping small local businesses double their organic traffic within a year. I work with businesses of all sizes — what matters is that you're serious about investing in long-term growth.",
  },
  {
    q: "Will I be locked into a long-term contract?",
    a: "No. I work on a month-to-month basis after an initial 3-month commitment (which is the minimum time needed to see real results). If you're not happy, you can cancel. Simple as that.",
  },
  {
    q: "What makes you different from other SEO agencies?",
    a: "I don't have a team of 50 junior account managers passing your work around. When you hire me, I personally manage your SEO. You get direct communication, transparent reporting, and someone who actually cares about your results — not just billing hours.",
  },
];

// ─── Wizard Step Options ─────────────────────────────────────────────────────

const step1Options = [
  { label: "Get more local customers", value: "local" },
  { label: "Rank for competitive keywords", value: "keywords" },
  { label: "Fix my website's technical issues", value: "technical" },
  { label: "Build my website's authority", value: "authority" },
  { label: "Understand my audience's search habits", value: "research" },
];

const step2Options = [
  { label: "Brand new (under 6 months)", value: "new" },
  { label: "Growing (6 months – 2 years)", value: "growing" },
  { label: "Established (2+ years)", value: "established" },
];

const step3Options = [
  { label: "Under $500/mo", value: "low" },
  { label: "$500–$1,500/mo", value: "mid" },
  { label: "$1,500–$3,000/mo", value: "high" },
  { label: "$3,000+/mo", value: "premium" },
];

function getRecommendation(goal: string): { serviceId: string; name: string } {
  switch (goal) {
    case "local":
      return { serviceId: "local-seo", name: "Local SEO" };
    case "keywords":
      return { serviceId: "keyword-research", name: "Keyword Research" };
    case "technical":
      return { serviceId: "technical", name: "Technical SEO" };
    case "authority":
      return { serviceId: "off-page", name: "Off-Page SEO" };
    default:
      return { serviceId: "on-page", name: "On-Page SEO" };
  }
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function RadioOption({
  label,
  value,
  selected,
  onSelect,
}: {
  label: string;
  value: string;
  selected: boolean;
  onSelect: (v: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
        selected
          ? "border-[#38C98A] bg-[#38C98A]/10 text-[#0B2A43]"
          : "border-gray-200 bg-white text-gray-700 hover:border-[#38C98A]/50 hover:bg-[#38C98A]/5"
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`w-4 h-4 rounded-full border-2 flex-none flex items-center justify-center ${
            selected ? "border-[#38C98A]" : "border-gray-300"
          }`}
        >
          {selected && (
            <span className="w-2 h-2 rounded-full bg-[#38C98A] block" />
          )}
        </span>
        {label}
      </span>
    </button>
  );
}

function ServiceChooser({ onScrollTo }: { onScrollTo: (id: string) => void }) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [stage, setStage] = useState("");
  const [budget, setBudget] = useState("");
  const [done, setDone] = useState(false);

  const reset = () => {
    setStep(1);
    setGoal("");
    setStage("");
    setBudget("");
    setDone(false);
  };

  const next = () => {
    if (step < 3) setStep((s) => s + 1);
    else setDone(true);
  };

  const canNext =
    (step === 1 && goal) || (step === 2 && stage) || (step === 3 && budget);

  const recommendation = goal ? getRecommendation(goal) : null;

  const stepTitles = [
    "What's your main goal?",
    "What's your website stage?",
    "What's your monthly budget?",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-xl mx-auto">
      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <div
          className="h-full bg-[#38C98A] transition-all duration-500"
          style={{ width: done ? "100%" : `${((step - 1) / 3) * 100}%` }}
        />
      </div>

      <div className="p-6 sm:p-8">
        {!done ? (
          <>
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-5">
              {[1, 2, 3].map((s) => (
                <span
                  key={s}
                  className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                    s < step
                      ? "bg-[#38C98A] text-white"
                      : s === step
                        ? "bg-[#0B2A43] text-white"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {s < step ? <CheckCircle className="w-4 h-4" /> : s}
                </span>
              ))}
              <span className="text-xs text-gray-400 ml-1">
                Step {step} of 3
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#0B2A43] mb-4">
              {stepTitles[step - 1]}
            </h3>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                {step === 1 &&
                  step1Options.map((o) => (
                    <RadioOption
                      key={o.value}
                      label={o.label}
                      value={o.value}
                      selected={goal === o.value}
                      onSelect={setGoal}
                    />
                  ))}
                {step === 2 &&
                  step2Options.map((o) => (
                    <RadioOption
                      key={o.value}
                      label={o.label}
                      value={o.value}
                      selected={stage === o.value}
                      onSelect={setStage}
                    />
                  ))}
                {step === 3 &&
                  step3Options.map((o) => (
                    <RadioOption
                      key={o.value}
                      label={o.label}
                      value={o.value}
                      selected={budget === o.value}
                      onSelect={setBudget}
                    />
                  ))}
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={next}
              disabled={!canNext}
              className="mt-6 w-full bg-[#0B2A43] hover:bg-[#0d3354] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
              data-ocid="services.chooser.button"
            >
              {step === 3 ? "See My Recommendation" : "Next Step"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#38C98A]/15 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#38C98A]" />
                </div>
                <p className="text-sm text-gray-500 mb-1">
                  Recommended Service
                </p>
                <h3 className="text-2xl font-bold text-[#0B2A43]">
                  {recommendation?.name}
                </h3>
                <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                  Based on your answers, this is where you'll see the strongest
                  ROI. Click below to see full details, pricing, and what the
                  process looks like.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (recommendation) onScrollTo(recommendation.serviceId);
                }}
                className="w-full bg-[#38C98A] hover:bg-[#2db87a] text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 mb-3"
                data-ocid="services.recommendation.button"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={reset}
                className="w-full border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                data-ocid="services.restart.button"
              >
                <RotateCcw className="w-4 h-4" /> Start Over
              </button>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={`relative rounded-2xl p-6 flex flex-col ${
        tier.popular
          ? "bg-[#0B2A43] text-white shadow-2xl scale-[1.03] border-2 border-[#38C98A]"
          : "bg-white border-2 border-gray-100 text-[#0B2A43]"
      }`}
    >
      {tier.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#38C98A] text-white text-xs font-bold px-4 py-1 rounded-full">
          Most Popular
        </span>
      )}
      <h4
        className={`text-lg font-bold mb-1 ${
          tier.popular ? "text-white" : "text-[#0B2A43]"
        }`}
      >
        {tier.name}
      </h4>
      <div className="flex items-end gap-1 mb-4">
        <span
          className={`text-3xl font-extrabold ${
            tier.popular ? "text-[#38C98A]" : "text-[#0B2A43]"
          }`}
        >
          {tier.price}
        </span>
        <span
          className={`text-sm pb-1 ${
            tier.popular ? "text-white/70" : "text-gray-500"
          }`}
        >
          {tier.period}
        </span>
      </div>
      <ul className="space-y-2 flex-1 mb-6">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 mt-0.5 flex-none text-[#38C98A]" />
            <span
              className={`text-sm ${
                tier.popular ? "text-white/85" : "text-gray-600"
              }`}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>
      <Link
        to="/contact"
        className={`block text-center py-2.5 rounded-xl font-semibold text-sm transition-colors ${
          tier.popular
            ? "bg-[#38C98A] hover:bg-[#2db87a] text-white"
            : "border-2 border-[#0B2A43] hover:bg-[#0B2A43] hover:text-white text-[#0B2A43]"
        }`}
        data-ocid="services.pricing.button"
      >
        Get Started
      </Link>
    </div>
  );
}

function ServiceSection({ service }: { service: ServiceData }) {
  const Icon = service.icon;
  return (
    <section
      id={service.id}
      className="py-20 scroll-mt-28"
      data-ocid={`services.${service.id}.section`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#38C98A]/15 flex items-center justify-center flex-none">
              <Icon className="w-6 h-6 text-[#38C98A]" />
            </div>
            <h2 className="text-3xl font-extrabold text-[#0B2A43]">
              {service.title}
            </h2>
          </div>
          <Link
            to="/services/$id"
            params={{ id: service.id }}
            className="inline-flex items-center gap-1.5 text-[#38C98A] hover:text-[#2db87a] text-sm font-semibold transition-colors border border-[#38C98A]/30 px-4 py-1.5 rounded-full hover:bg-[#38C98A]/5"
            data-ocid={`services.${service.id}.link`}
          >
            View Full Page <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
          <div className="space-y-4">
            {service.description.map((para) => (
              <p
                key={para.slice(0, 40)}
                className="text-gray-600 leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Who it's for + Process */}
          <div className="space-y-6">
            <div className="bg-[#F7F9FC] rounded-2xl p-5 border-l-4 border-[#38C98A]">
              <h3 className="text-sm font-bold text-[#0B2A43] uppercase tracking-wider mb-2">
                Who This Is For
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.whoFor}
              </p>
            </div>

            <div className="bg-[#F7F9FC] rounded-2xl p-5">
              <h3 className="text-sm font-bold text-[#0B2A43] uppercase tracking-wider mb-4">
                Our Process
              </h3>
              <ol className="space-y-3">
                {service.process.map((processStep, idx) => (
                  <li
                    key={processStep.slice(0, 30)}
                    className="flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#0B2A43] text-white text-xs font-bold flex items-center justify-center flex-none mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-gray-600 text-sm leading-relaxed">
                      {processStep}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div>
          <h3 className="text-xl font-bold text-[#0B2A43] mb-6 text-center">
            Pricing
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
            {service.pricing.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Services() {
  const [activeTab, setActiveTab] = useState("on-page");
  const tabBarRef = useRef<HTMLDivElement>(null);

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    for (const s of services) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToService = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveTab(id);
    }
  };

  const scrollToChooser = () => {
    const el = document.getElementById("chooser");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="bg-[#0B2A43] pt-28 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#38C98A]/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#38C98A]/8 blur-3xl" />
        <Services3DHeader />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-[#38C98A]/20 text-[#38C98A] border-[#38C98A]/30 mb-5 px-4 py-1 text-sm">
              <Star className="w-3 h-3 mr-1.5" /> Trusted by 100+ Businesses
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
              SEO Services Designed to{" "}
              <span className="text-[#38C98A]">Grow Your Business</span>
            </h1>
            <p className="text-[#C7D2E0] text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Whether you're a local shop or a scaling ecommerce brand, I offer
              tailored SEO strategies that put you in front of the right people
              at the right time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={scrollToChooser}
                className="bg-[#38C98A] hover:bg-[#2db87a] text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
                data-ocid="services.hero.primary_button"
              >
                View All Services
              </button>
              <Link
                to="/contact"
                className="border-2 border-white/30 hover:border-white text-white font-semibold px-7 py-3.5 rounded-full transition-colors"
                data-ocid="services.hero.secondary_button"
              >
                Get Free Audit
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Service Chooser ── */}
      <section id="chooser" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0B2A43] mb-3">
              Which Service Do I Need?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Answer 3 quick questions and I'll point you to the service that
              will have the biggest impact on your business.
            </p>
          </div>
          <ServiceChooser onScrollTo={scrollToService} />
        </div>
      </section>

      {/* ── Sticky Tab Bar ── */}
      <div
        ref={tabBarRef}
        className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm"
        data-ocid="services.tabs.panel"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-1">
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToService(s.id)}
                className={`flex-none px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === s.id
                    ? "bg-[#38C98A]/15 text-[#38C98A] font-semibold"
                    : "text-gray-600 hover:text-[#0B2A43] hover:bg-gray-50"
                }`}
                data-ocid={`services.${s.id}.tab`}
              >
                {s.tabLabel}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Service Sections ── */}
      <div className="bg-[#F7F9FC]">
        {services.map((s, i) => (
          <div key={s.id} className={i % 2 === 0 ? "bg-[#F7F9FC]" : "bg-white"}>
            <ServiceSection service={s} />
          </div>
        ))}
      </div>

      {/* ── Why Choose RankPro: Comparison Table ── */}
      <section className="py-20 bg-[#0B2A43] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#38C98A]/5 blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#38C98A]/15 text-[#38C98A] px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Why Choose RankPro
            </span>
            <h2 className="text-3xl font-extrabold text-white mb-3">
              RankPro vs. The Alternatives
            </h2>
            <p className="text-[#C7D2E0] max-w-xl mx-auto">
              See how a dedicated SEO expert compares to typical agencies and
              generalist freelancers.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[#C7D2E0] font-semibold px-6 py-4 w-1/3">
                    Feature
                  </th>
                  <th className="text-center px-6 py-4">
                    <span className="inline-block bg-[#38C98A] text-white text-xs font-bold px-3 py-1 rounded-full">
                      RankPro SEO
                    </span>
                  </th>
                  <th className="text-center text-[#C7D2E0] font-semibold px-6 py-4">
                    Typical Agency
                  </th>
                  <th className="text-center text-[#C7D2E0] font-semibold px-6 py-4">
                    Freelancer
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Dedicated Account Manager",
                    rankpro: true,
                    agency: false,
                    freelancer: false,
                  },
                  {
                    feature: "Monthly Reporting & Analytics",
                    rankpro: true,
                    agency: true,
                    freelancer: false,
                  },
                  {
                    feature: "Deep Keyword Research",
                    rankpro: true,
                    agency: true,
                    freelancer: true,
                  },
                  {
                    feature: "Competitor Gap Analysis",
                    rankpro: true,
                    agency: false,
                    freelancer: false,
                  },
                  {
                    feature: "24/7 Support & Communication",
                    rankpro: true,
                    agency: false,
                    freelancer: false,
                  },
                  {
                    feature: "ROI Guarantee Policy",
                    rankpro: true,
                    agency: false,
                    freelancer: false,
                  },
                  {
                    feature: "Technical + Content + Links",
                    rankpro: true,
                    agency: true,
                    freelancer: false,
                  },
                  {
                    feature: "Transparent Pricing",
                    rankpro: true,
                    agency: false,
                    freelancer: true,
                  },
                ].map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/3" : ""}`}
                  >
                    <td className="text-[#C7D2E0] px-6 py-4 font-medium">
                      {row.feature}
                    </td>
                    <td className="text-center px-6 py-4">
                      {row.rankpro ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#38C98A]/20">
                          <svg
                            className="w-4 h-4 text-[#38C98A]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-500/10">
                          <svg
                            className="w-4 h-4 text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </span>
                      )}
                    </td>
                    <td className="text-center px-6 py-4">
                      {row.agency ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#38C98A]/20">
                          <svg
                            className="w-4 h-4 text-[#38C98A]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-500/10">
                          <svg
                            className="w-4 h-4 text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </span>
                      )}
                    </td>
                    <td className="text-center px-6 py-4">
                      {row.freelancer ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#38C98A]/20">
                          <svg
                            className="w-4 h-4 text-[#38C98A]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-500/10">
                          <svg
                            className="w-4 h-4 text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0B2A43] mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500">
              Everything you need to know before getting started.
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="bg-[#F7F9FC] rounded-xl border border-gray-100 px-5 data-[state=open]:border-[#38C98A]/40"
                data-ocid={`services.faq.item.${i + 1}`}
              >
                <AccordionTrigger className="text-left font-semibold text-[#0B2A43] hover:text-[#38C98A] hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-[#38C98A] py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to Rank Higher and Get More Customers?
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
              Let's look at your website together. The audit is free, and
              there's no obligation.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#0B2A43] hover:bg-gray-50 font-bold px-8 py-4 rounded-full transition-colors text-lg shadow-lg"
              data-ocid="services.cta.primary_button"
            >
              Book Your Free SEO Audit <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
