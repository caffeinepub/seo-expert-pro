import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface CaseStudy {
  slug: string;
  industry: string;
  challenge: string;
  solution: string;
  before: { traffic: string; rankings: string; leads: string };
  after: { traffic: string; rankings: string; leads: string };
  improvement: string;
  duration: string;
  takeaways: string[];
}

const cases: CaseStudy[] = [
  {
    slug: "e-commerce-retailer",
    industry: "E-commerce Retailer",
    challenge:
      "Stuck on page 2-3 for main product keywords, minimal organic revenue. The site had strong products but poor on-page structure, slow load times, and zero backlink strategy.",
    solution:
      "Complete technical SEO audit, content restructure, and targeted link building campaign. Rewrote product category pages, fixed crawl errors, and built 40+ editorial backlinks over 6 months.",
    before: { traffic: "4,200/mo", rankings: "Page 2-3", leads: "38/mo" },
    after: { traffic: "17,400/mo", rankings: "#1-3", leads: "157/mo" },
    improvement: "+312% Traffic",
    duration: "6 months",
    takeaways: [
      "Technical fixes (crawl errors, page speed) delivered the first ranking jumps within 45 days",
      "Product category page rewrites drove the bulk of traffic improvement in months 3-4",
      "Link building compounded results — the site now earns new backlinks passively from competitors",
    ],
  },
  {
    slug: "saas-platform",
    industry: "SaaS Platform",
    challenge:
      "Launched product with zero organic visibility, competing against established players with years of domain authority and content libraries already in place.",
    solution:
      "Keyword gap analysis, blog content strategy, and strategic backlink acquisition. Built 30 long-form comparison and use-case articles targeting mid-funnel searchers.",
    before: { traffic: "820/mo", rankings: "Not ranked", leads: "12/mo" },
    after: {
      traffic: "9,650/mo",
      rankings: "Top 10 for 200+ keywords",
      leads: "94/mo",
    },
    improvement: "+1,076% Traffic",
    duration: "9 months",
    takeaways: [
      "Mid-funnel comparison content (vs. competitor articles) converted at 3× the rate of top-of-funnel posts",
      "A consistent publishing cadence of 3 articles/month was enough to dominate a niche segment",
      "Domain authority grew from 12 to 38 over 9 months — unlocking higher-competition keywords",
    ],
  },
  {
    slug: "local-medical-practice",
    industry: "Local Medical Practice",
    challenge:
      "Competitors dominating local search and Google Maps for clinic-related searches. The practice had no Google Business Profile optimization and inconsistent citation data.",
    solution:
      "Google Business Profile optimization, local citation building, review strategy, and localized landing pages for each service offered at the clinic.",
    before: { traffic: "520/mo", rankings: "Position 8-12", leads: "22/mo" },
    after: { traffic: "1,490/mo", rankings: "#1 Google Maps", leads: "81/mo" },
    improvement: "+185% Local Leads",
    duration: "3 months",
    takeaways: [
      "Google Business Profile optimization alone moved rankings from position 8 to the local pack within 30 days",
      "Review generation strategy added 40+ new 5-star reviews, further boosting local trust signals",
      "Localized service pages now rank on page 1 for 15 high-intent search terms",
    ],
  },
  {
    slug: "legal-services-firm",
    industry: "Legal Services Firm",
    challenge:
      "High competition for lucrative legal keywords with poor domain authority. The firm was invisible online despite having experienced attorneys and strong case results.",
    solution:
      "Authority building through PR outreach, thought leadership content, and on-page optimization. Secured mentions in legal publications and industry news sites.",
    before: { traffic: "1,100/mo", rankings: "Page 3-5", leads: "8/mo" },
    after: {
      traffic: "6,800/mo",
      rankings: "Page 1 for 45 keywords",
      leads: "67/mo",
    },
    improvement: "+520% Traffic",
    duration: "8 months",
    takeaways: [
      "Two editorial backlinks from authoritative legal publications drove more ranking improvement than 20 directory links",
      "Thought leadership articles written by the firm's attorneys performed best — trust signals matter in YMYL niches",
      "On-page optimization of service pages created a strong internal linking structure that amplified all authority gains",
    ],
  },
  {
    slug: "saas-startup",
    industry: "SaaS Startup",
    challenge:
      "Post-launch SaaS with zero organic visibility and a CAC of $480 from paid channels alone. The product was excellent — used by 200+ beta customers — but no one could find it through organic search. Every new customer came through expensive paid ads, making growth unsustainable.",
    solution:
      "Built a comprehensive keyword gap analysis against 8 direct competitors. Created 24 in-depth comparison and use-case articles targeting mid-funnel searchers already evaluating solutions. Acquired 35+ links from SaaS review sites, industry newsletters, and developer blogs. Added programmatic landing pages for high-intent integration-based queries.",
    before: { traffic: "620/mo", rankings: "Not in top 50", leads: "9/mo" },
    after: {
      traffic: "8,950/mo",
      rankings: "Top 10 for 180+ keywords",
      leads: "34/mo",
    },
    improvement: "+280% Organic Leads",
    duration: "8 months",
    takeaways: [
      "Comparison content (vs. [Competitor]) converted at 4x the rate of educational blog posts — customers searching these terms are already in buying mode",
      "Reducing CAC from $480 to $210 by month 8 made the entire SEO investment ROI-positive within the campaign period",
      "Programmatic landing pages for integration keywords ('best CRM for Shopify', 'HubSpot alternative for startups') unlocked an entirely new traffic segment with minimal ongoing work",
    ],
  },
  {
    slug: "law-firm",
    industry: "Law Firm",
    challenge:
      "Regional law firm with strong local reputation but zero first-page rankings for competitive practice area keywords. Revenue depended entirely on referrals, leaving growth vulnerable to network fluctuations. The website was a digital brochure with no SEO strategy — thin content, no local optimization, and a domain authority of 11.",
    solution:
      "Developed a topical authority content strategy covering all major practice areas with comprehensive, expert-authored guides. Built local SEO foundation with Google Business Profile optimization, citation cleanup, and localized landing pages per practice area. Secured 28 backlinks from legal publications, local news outlets, and bar association directories over 10 months.",
    before: { traffic: "890/mo", rankings: "Page 4-6", leads: "6/mo" },
    after: {
      traffic: "5,240/mo",
      rankings: "#1 for 25 keywords",
      leads: "23/mo",
    },
    improvement: "+190% Consultation Bookings",
    duration: "10 months",
    takeaways: [
      "Topical authority content — covering every sub-topic of each practice area — was the primary driver of ranking for highly competitive legal terms that had never ranked before",
      "Local pack visibility (Google Maps) drove more phone calls than organic blue links — optimizing the GBP was the fastest, highest-impact win in the campaign",
      "Domain authority grew from 11 to 34 over 10 months, unlocking rankings for city-level competitive keywords that previously felt untouchable",
    ],
  },
  {
    slug: "home-services-company",
    industry: "Home Services Company",
    challenge:
      "Seasonal business with inconsistent lead flow and no local search presence. Revenue dipped to near zero in off-peak months with no digital marketing strategy.",
    solution:
      "Local SEO campaign, content hub creation, and Google Business optimization. Built a seasonal content strategy targeting year-round service variations.",
    before: { traffic: "340/mo", rankings: "Not in top 20", leads: "15/mo" },
    after: {
      traffic: "2,870/mo",
      rankings: "Top 3 local pack",
      leads: "112/mo",
    },
    improvement: "+647% Leads",
    duration: "5 months",
    takeaways: [
      "Year-round content strategy reduced seasonal revenue dips by 60% — off-season months now generate steady lead flow",
      "Local pack placement (top 3) generates more leads than the organic listings combined",
      "Service area pages for nearby cities expanded the catchment area by 35% without a physical expansion",
    ],
  },
];

interface QuoteFormProps {
  caseStudyTitle: string;
}

function QuoteForm({ caseStudyTitle }: QuoteFormProps) {
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
      id: `case-quote-${Date.now()}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      source: caseStudyTitle,
      service: `Case Study: ${caseStudyTitle}`,
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-center mb-10"
        >
          <span className="inline-block bg-[#38C98A]/20 text-[#38C98A] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Get Similar Results
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Interested in results like{" "}
            <span className="text-[#38C98A]">{caseStudyTitle}</span>?
          </h2>
          <p className="text-white/65 text-base max-w-xl mx-auto">
            Tell us about your project and we'll build a custom strategy for
            your business.
          </p>
        </motion.div>

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
                We've received your request inspired by{" "}
                <span className="text-[#38C98A] font-semibold">
                  {caseStudyTitle}
                </span>
                .
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    className="text-white/80 text-sm font-medium"
                    htmlFor="cs-quote-name"
                  >
                    Full Name <span className="text-[#38C98A]">*</span>
                  </label>
                  <Input
                    id="cs-quote-name"
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
                    htmlFor="cs-quote-email"
                  >
                    Email Address <span className="text-[#38C98A]">*</span>
                  </label>
                  <Input
                    id="cs-quote-email"
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

              <div className="space-y-1.5">
                <label
                  className="text-white/80 text-sm font-medium"
                  htmlFor="cs-quote-phone"
                >
                  Phone Number{" "}
                  <span className="text-white/35 font-normal">(optional)</span>
                </label>
                <Input
                  id="cs-quote-phone"
                  name="phone"
                  type="tel"
                  placeholder="+977 98XXXXXXXX"
                  value={form.phone}
                  onChange={handleChange}
                  className="bg-white/8 border-white/15 text-white placeholder:text-white/35 focus:border-[#38C98A] focus:ring-[#38C98A]/30 h-11"
                  data-ocid="quote.input"
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-white/80 text-sm font-medium">Inspired By</p>
                <div className="h-11 bg-white/5 border border-white/10 rounded-md px-3 flex items-center">
                  <span className="text-[#38C98A] font-semibold text-sm">
                    {caseStudyTitle}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  className="text-white/80 text-sm font-medium"
                  htmlFor="cs-quote-message"
                >
                  Project Details <span className="text-[#38C98A]">*</span>
                </label>
                <Textarea
                  id="cs-quote-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us about your website, current traffic, goals, and how you'd like to achieve similar results..."
                  value={form.message}
                  onChange={handleChange}
                  className="bg-white/8 border-white/15 text-white placeholder:text-white/35 focus:border-[#38C98A] focus:ring-[#38C98A]/30 resize-none"
                  data-ocid="quote.textarea"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#38C98A] hover:bg-[#2db87a] text-white font-bold h-12 text-base rounded-xl transition-all duration-200 shadow-lg shadow-[#38C98A]/25"
                data-ocid="quote.submit_button"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Get a Free Quote →"
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default function CaseStudyDetail() {
  const { id } = useParams({ strict: false }) as { id?: string };
  const caseStudy = cases.find((c) => c.slug === id);
  const currentIndex = cases.findIndex((c) => c.slug === id);
  const prevCase = currentIndex > 0 ? cases[currentIndex - 1] : null;
  const nextCase =
    currentIndex < cases.length - 1 ? cases[currentIndex + 1] : null;

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-[#F7F9FC]">
        <Navbar />
        <div
          className="flex flex-col items-center justify-center py-40 text-center px-4"
          data-ocid="case_study_detail.error_state"
        >
          <div className="text-6xl mb-6">📊</div>
          <h1 className="text-3xl font-extrabold text-[#0B2A43] mb-4">
            Case Study Not Found
          </h1>
          <p className="text-gray-500 mb-8">
            The case study you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 bg-[#38C98A] text-white font-bold px-6 py-3 rounded-full hover:bg-[#2db87a] transition-colors"
            data-ocid="case_study_detail.link"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Case Studies
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

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
              to="/case-studies"
              className="inline-flex items-center gap-2 text-[#C7D2E0]/70 hover:text-[#38C98A] text-sm font-medium mb-8 transition-colors"
              data-ocid="case_study_detail.link"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Case Studies
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className="bg-[#38C98A]/20 text-[#38C98A] border-[#38C98A]/30 px-3 py-0.5 text-sm">
                <TrendingUp className="w-3 h-3 mr-1" /> {caseStudy.improvement}
              </Badge>
              <Badge className="bg-white/10 text-white/80 border-white/20 px-3 py-0.5 text-sm">
                {caseStudy.duration}
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              {caseStudy.industry}
            </h1>
            <p className="text-[#C7D2E0] text-lg max-w-2xl leading-relaxed">
              A real-world SEO success story — from the challenge we faced to
              the strategy we executed and the results we delivered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-[#F7F9FC] rounded-2xl p-6 border-l-4 border-red-400">
              <h2 className="text-sm font-bold text-[#0B2A43] uppercase tracking-wider mb-3">
                The Challenge
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>
            <div className="bg-[#F7F9FC] rounded-2xl p-6 border-l-4 border-[#38C98A]">
              <h2 className="text-sm font-bold text-[#0B2A43] uppercase tracking-wider mb-3">
                Our Solution
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Before vs After */}
      <section className="py-16 bg-[#F7F9FC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-extrabold text-[#0B2A43] mb-2 text-center">
              Before vs After
            </h2>
            <p className="text-gray-500 text-center mb-10">
              Measurable results across the three metrics that matter most.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {(["traffic", "rankings", "leads"] as const).map((metric) => (
                <div
                  key={metric}
                  className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white"
                >
                  <div className="bg-[#0B2A43] px-4 py-3 text-center text-sm font-bold text-white uppercase tracking-wider">
                    {metric}
                  </div>
                  <div className="p-5 text-center border-b border-gray-100">
                    <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">
                      Before
                    </div>
                    <div className="text-lg font-semibold text-gray-600">
                      {caseStudy.before[metric]}
                    </div>
                  </div>
                  <div className="p-5 text-center bg-[#38C98A]/5">
                    <div className="flex items-center justify-center gap-1 text-xs text-[#38C98A] mb-1 uppercase tracking-wider">
                      <ArrowUp className="w-3 h-3" /> After
                    </div>
                    <div className="text-xl font-extrabold text-[#0B2A43]">
                      {caseStudy.after[metric]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-extrabold text-[#0B2A43] mb-2 text-center">
              Key Takeaways
            </h2>
            <p className="text-gray-500 text-center mb-10">
              What made the difference — lessons that apply to your business
              too.
            </p>
            <div className="space-y-4">
              {caseStudy.takeaways.map((t, i) => (
                <div
                  key={t.slice(0, 40)}
                  className="flex items-start gap-4 bg-[#F7F9FC] rounded-2xl p-5"
                >
                  <span className="w-8 h-8 rounded-full bg-[#38C98A] text-white text-sm font-bold flex items-center justify-center flex-none">
                    {i + 1}
                  </span>
                  <p className="text-gray-600 leading-relaxed">{t}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="py-10 bg-[#F7F9FC] border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {prevCase ? (
              <Link
                to="/case-studies/$id"
                params={{ id: prevCase.slug }}
                className="flex items-center gap-2 text-[#0B2A43] hover:text-[#38C98A] font-semibold transition-colors group"
                data-ocid="case_study_detail.pagination_prev"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm">
                  <span className="block text-xs text-gray-400 font-normal">
                    Previous
                  </span>
                  {prevCase.industry}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextCase ? (
              <Link
                to="/case-studies/$id"
                params={{ id: nextCase.slug }}
                className="flex items-center gap-2 text-[#0B2A43] hover:text-[#38C98A] font-semibold transition-colors group text-right"
                data-ocid="case_study_detail.pagination_next"
              >
                <span className="text-sm">
                  <span className="block text-xs text-gray-400 font-normal">
                    Next
                  </span>
                  {nextCase.industry}
                </span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* Get a Quote Form */}
      <QuoteForm caseStudyTitle={caseStudy.industry} />

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
              Want Results Like These?
            </h2>
            <p className="text-white/85 text-lg mb-8">
              Let's build a custom SEO strategy for your business. The audit is
              free.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#0B2A43] hover:bg-gray-50 font-bold px-8 py-4 rounded-full transition-colors text-lg shadow-lg"
              data-ocid="case_study_detail.primary_button"
            >
              Get My Free SEO Audit <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
