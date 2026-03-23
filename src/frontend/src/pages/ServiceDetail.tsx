import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BarChart2,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  FileText,
  Globe,
  MapPin,
  Search,
  Send,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

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
  badge: string;
  intro: string;
  description: string[];
  whoFor: string;
  process: string[];
  pricing: PricingTier[];
}

const services: ServiceData[] = [
  {
    id: "on-page",
    icon: FileText,
    title: "On-Page SEO",
    badge: "Most Requested",
    intro:
      "Optimize every element on your website so Google understands — and ranks — your content above the competition.",
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
        price: "$249",
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
        price: "$499",
        period: "/mo",
        popular: true,
        features: [
          "Up to 15 pages",
          "Content gap analysis",
          "Internal linking strategy",
          "Competitor analysis",
          "Bi-weekly check-ins",
        ],
      },
      {
        name: "Enterprise",
        price: "$999",
        period: "/mo",
        features: [
          "Unlimited pages",
          "Full content rewrite",
          "Schema markup",
          "Priority support",
          "Weekly reporting + calls",
        ],
      },
    ],
  },
  {
    id: "off-page",
    icon: Globe,
    title: "Off-Page SEO",
    badge: "Authority Building",
    intro:
      "Build the backlink profile and online reputation that signals trust to Google and pushes you above competitors.",
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
        price: "$399",
        period: "/mo",
        features: [
          "5–8 quality backlinks/mo",
          "Niche-relevant sites",
          "Monthly report",
        ],
      },
      {
        name: "Growth",
        price: "$799",
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
        name: "Enterprise",
        price: "$1,299",
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
    badge: "Fastest Wins",
    intro:
      "Fix the invisible technical barriers that stop Google from crawling, indexing, and ranking your pages.",
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
        price: "$299",
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
        price: "$599",
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
        name: "Enterprise",
        price: "$1,199",
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
    badge: "Foundation First",
    intro:
      "Find the exact search terms your ideal customers use — and build an SEO strategy that captures them at every stage.",
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
        name: "Enterprise",
        price: "$849",
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
    badge: "High ROI",
    intro:
      "Dominate local search results and Google Maps so nearby customers find you first — and call you.",
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
        name: "Enterprise",
        price: "$999",
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
        data-ocid="service_detail.pricing.button"
      >
        Get Started
      </Link>
    </div>
  );
}

interface QuoteFormProps {
  serviceTitle: string;
}

function QuoteForm({ serviceTitle }: QuoteFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const entry = {
      id: `quote-${Date.now()}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      service: serviceTitle,
      message: form.message,
      date: new Date().toISOString(),
    };

    const existing = JSON.parse(
      localStorage.getItem("rankpro_contact_submissions") || "[]",
    );
    existing.unshift(entry);
    localStorage.setItem(
      "rankpro_contact_submissions",
      JSON.stringify(existing),
    );

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 600);
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="py-20 bg-[#0B2A43]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-center mb-10"
        >
          <span className="inline-block bg-[#38C98A]/20 text-[#38C98A] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Free Quote
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Get a Quote for{" "}
            <span className="text-[#38C98A]">{serviceTitle}</span>
          </h2>
          <p className="text-white/65 text-base max-w-xl mx-auto">
            Tell us about your project and we'll get back to you within 24
            hours.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
          data-ocid="quote.panel"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-10"
              data-ocid="quote.success_state"
            >
              <div className="w-16 h-16 rounded-full bg-[#38C98A]/20 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-[#38C98A]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Thanks! We'll be in touch within 24 hours.
              </h3>
              <p className="text-white/55 text-sm">
                We've received your request for{" "}
                <span className="text-[#38C98A] font-semibold">
                  {serviceTitle}
                </span>
                . Expect a reply soon.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 text-[#38C98A] hover:text-[#2db87a] text-sm font-semibold underline underline-offset-4 transition-colors"
              >
                Submit another request
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              data-ocid="quote.panel"
            >
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    className="text-white/80 text-sm font-medium"
                    htmlFor="quote-name"
                  >
                    Full Name <span className="text-[#38C98A]">*</span>
                  </label>
                  <Input
                    id="quote-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Amit Sharma"
                    value={form.name}
                    onChange={handleChange}
                    className="bg-white/8 border-white/15 text-white placeholder:text-white/35 focus:border-[#38C98A] focus:ring-[#38C98A]/30 h-11"
                    data-ocid="quote.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    className="text-white/80 text-sm font-medium"
                    htmlFor="quote-email"
                  >
                    Email Address <span className="text-[#38C98A]">*</span>
                  </label>
                  <Input
                    id="quote-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    className="bg-white/8 border-white/15 text-white placeholder:text-white/35 focus:border-[#38C98A] focus:ring-[#38C98A]/30 h-11"
                    data-ocid="quote.input"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label
                  className="text-white/80 text-sm font-medium"
                  htmlFor="quote-phone"
                >
                  Phone Number{" "}
                  <span className="text-white/35 font-normal">(optional)</span>
                </label>
                <Input
                  id="quote-phone"
                  name="phone"
                  type="tel"
                  placeholder="+977 98XXXXXXXX"
                  value={form.phone}
                  onChange={handleChange}
                  className="bg-white/8 border-white/15 text-white placeholder:text-white/35 focus:border-[#38C98A] focus:ring-[#38C98A]/30 h-11"
                  data-ocid="quote.input"
                />
              </div>

              {/* Hidden service field (visual indicator for user) */}
              <div className="space-y-1.5">
                <p className="text-white/80 text-sm font-medium">
                  Service Interested In
                </p>
                <div className="h-11 bg-white/5 border border-white/10 rounded-md px-3 flex items-center">
                  <span className="text-[#38C98A] font-semibold text-sm">
                    {serviceTitle}
                  </span>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label
                  className="text-white/80 text-sm font-medium"
                  htmlFor="quote-message"
                >
                  Project Details <span className="text-[#38C98A]">*</span>
                </label>
                <Textarea
                  id="quote-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us about your website, goals, current challenges, and anything else that would help us understand your needs..."
                  value={form.message}
                  onChange={handleChange}
                  className="bg-white/8 border-white/15 text-white placeholder:text-white/35 focus:border-[#38C98A] focus:ring-[#38C98A]/30 resize-none"
                  data-ocid="quote.textarea"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#38C98A] hover:bg-[#2db87a] disabled:opacity-70 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2.5 text-base shadow-lg shadow-[#38C98A]/20"
                data-ocid="quote.submit_button"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send My Request
                  </>
                )}
              </button>

              <p className="text-white/35 text-xs text-center">
                No spam. No obligations. We typically respond within a few
                hours.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default function ServiceDetail() {
  const { id } = useParams({ strict: false }) as { id?: string };
  const service = services.find((s) => s.id === id);
  const currentIndex = services.findIndex((s) => s.id === id);
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService =
    currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  if (!service) {
    return (
      <div className="min-h-screen bg-[#F7F9FC]">
        <Navbar />
        <div
          className="flex flex-col items-center justify-center py-40 text-center px-4"
          data-ocid="service_detail.error_state"
        >
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-3xl font-extrabold text-[#0B2A43] mb-4">
            Service Not Found
          </h1>
          <p className="text-gray-500 mb-8">
            The service you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-[#38C98A] text-white font-bold px-6 py-3 rounded-full hover:bg-[#2db87a] transition-colors"
            data-ocid="service_detail.link"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Services
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0B2A43] pt-28 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#38C98A]/6 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#38C98A]/8 blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[#C7D2E0]/70 hover:text-[#38C98A] text-sm font-medium mb-8 transition-colors"
              data-ocid="service_detail.link"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Services
            </Link>

            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-[#38C98A]/20 flex items-center justify-center flex-none">
                <Icon className="w-7 h-7 text-[#38C98A]" />
              </div>
              <div>
                <Badge className="bg-[#38C98A]/20 text-[#38C98A] border-[#38C98A]/30 mb-2 px-3 py-0.5 text-xs">
                  <Star className="w-3 h-3 mr-1" /> {service.badge}
                </Badge>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                  {service.title}
                </h1>
              </div>
            </div>

            <p className="text-[#C7D2E0] text-lg max-w-2xl leading-relaxed">
              {service.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Description */}
            <div className="space-y-5">
              <h2 className="text-2xl font-extrabold text-[#0B2A43] mb-6">
                About This Service
              </h2>
              {service.description.map((para) => (
                <p
                  key={para.slice(0, 40)}
                  className="text-gray-600 leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="space-y-6">
              {/* Who For */}
              <div className="bg-[#F7F9FC] rounded-2xl p-6 border-l-4 border-[#38C98A]">
                <h3 className="text-sm font-bold text-[#0B2A43] uppercase tracking-wider mb-3">
                  Who This Is For
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.whoFor}
                </p>
              </div>

              {/* Process */}
              <div className="bg-[#F7F9FC] rounded-2xl p-6">
                <h3 className="text-sm font-bold text-[#0B2A43] uppercase tracking-wider mb-4">
                  Our Process
                </h3>
                <ol className="space-y-3">
                  {service.process.map((step, idx) => (
                    <li
                      key={step.slice(0, 30)}
                      className="flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#0B2A43] text-white text-xs font-bold flex items-center justify-center flex-none mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-gray-600 text-sm leading-relaxed">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-[#F7F9FC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-extrabold text-[#0B2A43] mb-2 text-center">
              Pricing
            </h2>
            <p className="text-gray-500 text-center mb-10">
              Transparent pricing — no hidden fees, no long-term lock-ins.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
              {service.pricing.map((tier) => (
                <PricingCard key={tier.name} tier={tier} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Get a Quote Form */}
      <QuoteForm serviceTitle={service.title} />

      {/* Prev / Next navigation */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {prevService ? (
              <Link
                to="/services/$id"
                params={{ id: prevService.id }}
                className="flex items-center gap-2 text-[#0B2A43] hover:text-[#38C98A] font-semibold transition-colors group"
                data-ocid="service_detail.pagination_prev"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm">
                  <span className="block text-xs text-gray-400 font-normal">
                    Previous
                  </span>
                  {prevService.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextService ? (
              <Link
                to="/services/$id"
                params={{ id: nextService.id }}
                className="flex items-center gap-2 text-[#0B2A43] hover:text-[#38C98A] font-semibold transition-colors group text-right"
                data-ocid="service_detail.pagination_next"
              >
                <span className="text-sm">
                  <span className="block text-xs text-gray-400 font-normal">
                    Next
                  </span>
                  {nextService.title}
                </span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#38C98A] py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to Get Started with {service.title}?
            </h2>
            <p className="text-white/85 text-lg mb-8">
              Let's talk about your goals. The audit is free and there's no
              obligation.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#0B2A43] hover:bg-gray-50 font-bold px-8 py-4 rounded-full transition-colors text-lg shadow-lg"
              data-ocid="service_detail.primary_button"
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
