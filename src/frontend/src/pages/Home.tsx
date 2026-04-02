import { Link } from "@tanstack/react-router";
import {
  BarChart2,
  CheckCircle,
  ChevronRight,
  FileText,
  Globe,
  MapPin,
  Search,
  Star,
  TrendingUp,
} from "lucide-react";
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import type { BlogPost, FAQEntry } from "../backend";
import Footer from "../components/Footer";
import Hero3DScene from "../components/Hero3DScene";
import Navbar from "../components/Navbar";
import { useBackend } from "../hooks/useBackend";

const StatsParticles = lazy(() => import("../components/StatsParticles"));
const FloatingGeoBg = lazy(() => import("../components/FloatingGeoBg"));
const SectionParticlesBg = lazy(
  () => import("../components/SectionParticlesBg"),
);
const TestimonialsOrbs3D = lazy(
  () => import("../components/TestimonialsOrbs3D"),
);
const FAQAccent3D = lazy(() => import("../components/FAQAccent3D"));

const services = [
  {
    icon: FileText,
    title: "On-Page SEO",
    desc: "Optimize content, meta tags, and structure for maximum relevance.",
  },
  {
    icon: Globe,
    title: "Off-Page SEO",
    desc: "Build authority with high-quality backlinks and brand mentions.",
  },
  {
    icon: Search,
    title: "Technical SEO",
    desc: "Fix crawlability, speed, and indexing issues at the core.",
  },
  {
    icon: BarChart2,
    title: "Keyword Research",
    desc: "Target the exact terms your ideal customers are searching for.",
  },
  {
    icon: MapPin,
    title: "Local SEO",
    desc: "Dominate local search results and Google Maps listings.",
  },
  {
    icon: TrendingUp,
    title: "SEO Strategy",
    desc: "Custom roadmaps aligned with your business growth goals.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Head of Marketing",
    company: "TechFlow Inc.",
    initials: "SC",
    color: "#38C98A",
    quote:
      "RankPro doubled our organic traffic in just 6 months. We went from 4,200 to over 9,800 monthly visits — and those visitors actually convert. Incredible results that have changed how we budget for marketing.",
    rating: 5,
  },
  {
    name: "James Walker",
    role: "Founder & CEO",
    company: "HomeStyle Co.",
    initials: "JW",
    color: "#38bdf8",
    quote:
      "Our leads from search went up 180% in 8 months. Before RankPro, we were invisible online. Now organic is our biggest lead source. Best investment we've made in the history of the company.",
    rating: 5,
  },
  {
    name: "Maria Lopez",
    role: "Practice Manager",
    company: "MedCare Clinic",
    initials: "ML",
    color: "#a78bfa",
    quote:
      "We went from page 3 to #1 for our main keyword in under 4 months. New patient bookings from search are up 220%. Amit is transparent, communicative, and delivers exactly what he promises.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Partner",
    company: "LegalEdge LLP",
    initials: "DK",
    color: "#fb923c",
    quote:
      "Professional, data-driven, and genuinely cares about results. We now rank page 1 for 45 competitive legal keywords. The ROI has been 8x our monthly retainer. I recommend RankPro to every business owner I meet.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "E-commerce Director",
    company: "NovaBrands",
    initials: "PS",
    color: "#f472b6",
    quote:
      "After 3 months of technical SEO fixes and content optimization, our revenue from organic search jumped by $42,000/month. The team found issues our previous agency had missed for two years. Game-changing work.",
    rating: 5,
  },
  {
    name: "Marcus O'Brien",
    role: "VP of Growth",
    company: "ScaleUp SaaS",
    initials: "MO",
    color: "#34d399",
    quote:
      "Within 6 months of the keyword strategy and content roadmap, we ranked in the top 3 for 200+ target keywords. Our CAC from organic dropped 60% compared to paid channels. Amit is simply the best in the business.",
    rating: 5,
  },
];

const caseStudies = [
  {
    client: "E-commerce Retailer",
    metric: "+312%",
    label: "Organic Traffic",
    period: "6 months",
  },
  {
    client: "SaaS Startup",
    metric: "+240%",
    label: "Keyword Rankings",
    period: "4 months",
  },
  {
    client: "Local Medical Practice",
    metric: "+185%",
    label: "Local Leads",
    period: "3 months",
  },
];

const marqueeItems = [
  { id: "m0", text: "Link Building" },
  { id: "m1", text: "Content Strategy" },
  { id: "m2", text: "Core Web Vitals" },
  { id: "m3", text: "Local SEO" },
  { id: "m4", text: "Schema Markup" },
  { id: "m5", text: "Competitor Analysis" },
  { id: "m6", text: "Technical SEO" },
  { id: "m7", text: "Keyword Research" },
  { id: "m8", text: "Link Building" },
  { id: "m9", text: "Content Strategy" },
  { id: "m10", text: "Core Web Vitals" },
  { id: "m11", text: "Local SEO" },
  { id: "m12", text: "Schema Markup" },
  { id: "m13", text: "Competitor Analysis" },
  { id: "m14", text: "Technical SEO" },
  { id: "m15", text: "Keyword Research" },
];

const defaultFaqs = [
  {
    question: "How long does SEO take to show results?",
    answer:
      "Most clients see measurable ranking improvements within 90 days for lower-competition keywords. For competitive industries, expect 6–12 months for significant organic growth. SEO compounds over time — the longer you invest, the greater the returns, unlike paid ads that stop the moment your budget runs out.",
  },
  {
    question: "What is technical SEO and why does it matter?",
    answer:
      "Technical SEO is the infrastructure layer of your website — crawlability, indexation, site speed, mobile optimization, structured data, and more. If search engine bots can't properly access or understand your pages, no amount of great content will help you rank. Technical issues are often invisible to site owners but have a dramatic impact on performance.",
  },
  {
    question: "How do you measure SEO success?",
    answer:
      "We track metrics that tie directly to business outcomes: keyword rankings for target terms, organic traffic growth, click-through rates from search results, conversion rates from organic visitors, and ultimately leads and revenue attributable to organic search. Every client gets a monthly report with these KPIs clearly visualized.",
  },
  {
    question: "What is E-E-A-T and how does it affect my rankings?",
    answer:
      "E-E-A-T stands for Experience, Expertise, Authoritativeness, and Trustworthiness — Google's quality evaluation framework. Sites that demonstrate real-world experience and recognized expertise in their field rank higher, especially in health, finance, and legal niches. We build E-E-A-T through author credentials, trust signals, quality backlinks, and content that proves genuine expertise.",
  },
  {
    question: "Do I need SEO if I'm already running paid ads?",
    answer:
      "Yes. Paid ads deliver instant traffic, but stop the moment you stop paying. SEO builds a permanent, compounding asset — once you rank for high-intent keywords, those clicks are free forever. Most high-growth businesses use both: ads for immediate conversions and SEO for long-term, lower-cost customer acquisition.",
  },
  {
    question: "What's included in your monthly SEO reports?",
    answer:
      "Every monthly report includes: keyword rank tracking (with movement indicators), organic traffic trends from Google Analytics, new backlinks acquired, technical issues flagged and fixed, content performance metrics, and a written summary with recommendations for the next month. Reports are delivered by the 5th of each month.",
  },
  {
    question: "Can you guarantee #1 rankings on Google?",
    answer:
      "No ethical SEO professional can guarantee specific rankings — and you should be cautious of anyone who claims they can. What I do guarantee is transparent work, proven methodologies, monthly reporting, and a relentless focus on improving your organic visibility and ROI. My case studies show consistent, measurable growth across diverse industries.",
  },
  {
    question: "What makes your SEO approach different from other agencies?",
    answer:
      "Most agencies use cookie-cutter strategies across all clients. Every campaign I run starts with deep research into your specific market, competitors, and customer journey. I combine technical rigor, content strategy, and genuine link building in a single integrated plan. You get direct access to the expert doing the work — no account managers passing messages.",
  },
];

const staticBlogs = [
  {
    title: "10 On-Page SEO Techniques That Actually Work in 2026",
    excerpt:
      "Discover the most impactful on-page optimization tactics that search engines reward.",
  },
  {
    title: "How to Build High-Quality Backlinks (Without Spamming)",
    excerpt:
      "Ethical link building strategies that boost authority and rankings sustainably.",
  },
  {
    title: "The Complete Technical SEO Checklist for 2026",
    excerpt:
      "Everything you need to audit and fix your site's technical foundation.",
  },
];

export default function Home() {
  const [faqs, setFaqs] = useState<FAQEntry[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const backend = useBackend();

  const loadData = useCallback(async () => {
    try {
      setFaqs(await backend.getFAQs());
    } catch {
      /* ignore */
    }
    try {
      setBlogs((await backend.listBlogPosts()).slice(0, 3));
    } catch {
      /* ignore */
    }
  }, [backend]);

  useEffect(() => {
    // Defer backend calls until the browser is idle so they don't block render
    const load = () => {
      loadData();
    };
    if ("requestIdleCallback" in window) {
      const id = (window as Window & typeof globalThis).requestIdleCallback(
        load,
        { timeout: 3000 },
      );
      return () =>
        (window as Window & typeof globalThis).cancelIdleCallback(id);
    }
    const t = setTimeout(load, 3000);
    return () => clearTimeout(t);
  }, [loadData]);

  const displayFaqs = faqs.length > 0 ? faqs.slice(0, 8) : defaultFaqs;

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ── Hero ── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <span className="inline-block bg-[#38C98A]/10 text-[#38C98A] px-4 py-1 rounded-full text-sm font-semibold mb-4">
                #1 Rated SEO Agency
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#0F1720] leading-tight mb-6">
                Grow Your Business with Proven SEO Strategies
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We turn search engines into your most powerful sales channel.
                Data-driven SEO that delivers real rankings, traffic, and
                revenue.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="bg-[#38C98A] hover:bg-[#2db87a] text-white px-7 py-3.5 rounded-full font-semibold text-base transition-colors shadow-lg shadow-green-200"
                >
                  Get Free SEO Audit
                </Link>
                <Link
                  to="/services"
                  className="border-2 border-[#0B2A43] text-[#0B2A43] hover:bg-[#0B2A43] hover:text-white px-7 py-3.5 rounded-full font-semibold text-base transition-colors"
                >
                  Our Services
                </Link>
              </div>
            </div>

            {/* Right: 3D scene — eagerly imported, renders immediately */}
            <div className="flex items-center justify-center">
              <div
                className="relative w-full max-w-lg"
                style={{ height: "clamp(280px, 45vw, 420px)" }}
              >
                <Hero3DScene />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-[#F7F9FC] py-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Suspense fallback={null}>
            <StatsParticles />
          </Suspense>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "100+", label: "Clients Served" },
              { val: "4+", label: "Yrs Experience" },
              { val: "98%", label: "Client Retention" },
              { val: "#1", label: "Rankings Delivered" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-[#0B2A43]">
                  {s.val}
                </div>
                <div className="text-gray-500 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marquee Ticker ── */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 12s linear infinite;
        }
      `}</style>
      <div className="overflow-hidden bg-[#0B2A43] border-y-2 border-[#38C98A] py-3">
        <div className="flex whitespace-nowrap marquee-track">
          {marqueeItems.map(({ id, text }) => (
            <span
              key={id}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white mx-6"
            >
              <span className="text-[#38C98A]">✦</span>
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* ── Services ── */}
      <section className="bg-[#0B2A43] py-20 relative overflow-hidden">
        <Suspense fallback={null}>
          <FloatingGeoBg color="#38C98A" count={12} />
        </Suspense>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl font-bold text-white text-center mb-3">
            Our Services
          </h2>
          <p className="text-[#C7D2E0] text-center mb-12 max-w-xl mx-auto">
            End-to-end SEO solutions tailored to your industry, competition, and
            goals.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-[#38C98A]/15 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#38C98A]" />
                </div>
                <h3 className="font-semibold text-[#0B2A43] mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                <Link
                  to="/services"
                  className="text-[#38C98A] text-sm font-medium mt-3 inline-block hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Studies ── */}
      <section className="bg-white py-20 relative overflow-hidden">
        <Suspense fallback={null}>
          <SectionParticlesBg color="#0B2A43" count={60} opacity={0.15} />
        </Suspense>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl font-bold text-[#0B2A43] text-center mb-3">
            Proven Case Studies
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            Real results for real businesses. No vanity metrics -- only growth
            that matters.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((c) => (
              <div
                key={c.client}
                className="border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl font-extrabold text-[#38C98A] mb-1">
                  {c.metric}
                </div>
                <div className="text-[#0B2A43] font-semibold mb-1">
                  {c.label}
                </div>
                <div className="text-gray-500 text-sm mb-3">
                  {c.client} · {c.period}
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-[#38C98A] h-2 rounded-full"
                    style={{ width: "85%" }}
                  />
                </div>
                <Link
                  to="/case-studies"
                  className="text-[#38C98A] text-sm font-medium mt-4 inline-block hover:underline"
                >
                  View Case Study →
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/case-studies"
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-full text-sm font-semibold transition-colors"
            >
              See All Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0B2A43 0%, #0d3a5c 100%)",
        }}
      >
        <Suspense fallback={null}>
          <TestimonialsOrbs3D />
        </Suspense>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#38C98A]/15 text-[#38C98A] px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Client Success Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="group relative bg-white/10 border border-white/10 rounded-2xl p-6 hover:border-[#38C98A]/60 hover:scale-[1.025] transition-all duration-300"
                style={{
                  boxShadow: "0 0 0 0 rgba(56,201,138,0)",
                }}
              >
                {/* Hover glow overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: "0 0 24px 2px rgba(56,201,138,0.18)" }}
                />

                {/* Header: avatar + name */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: t.color }}
                  >
                    <span className="text-white font-bold text-sm">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">
                      {t.name}
                    </div>
                    <div className="text-white/50 text-xs">
                      {t.role} · {t.company}
                    </div>
                  </div>
                  {/* Stars pushed to right */}
                  <div className="ml-auto flex gap-0.5">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>

                {/* Quote */}
                <p className="text-white/85 text-sm italic leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Company badge */}
                <div className="flex items-center justify-between">
                  <span
                    className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: `${t.color}25`, color: t.color }}
                  >
                    {t.company}
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((d) => (
                      <div
                        key={d}
                        className="w-1 h-1 rounded-full bg-[#38C98A]/40"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Free SEO Audit CTA ── */}
      <FreeAuditSection />

      {/* ── Blog + Lead ── */}
      <section className="bg-[#0B2A43] py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Latest from the Blog
              </h2>
              <div className="space-y-4">
                {blogs.length > 0
                  ? blogs.map((post) => (
                      <Link
                        key={post.id.toString()}
                        to="/blog/$id"
                        params={{ id: post.id.toString() }}
                        className="block bg-white/10 rounded-xl p-5 hover:bg-white/15 transition-colors"
                      >
                        <h3 className="font-semibold text-white text-sm mb-1">
                          {post.title}
                        </h3>
                        <p className="text-[#C7D2E0] text-xs line-clamp-2">
                          {post.excerpt}
                        </p>
                        <span className="text-[#38C98A] text-xs mt-2 inline-block">
                          Read More →
                        </span>
                      </Link>
                    ))
                  : staticBlogs.map((p) => (
                      <Link
                        key={p.title}
                        to="/blog"
                        className="block bg-white/10 rounded-xl p-5 hover:bg-white/15 transition-colors"
                      >
                        <h3 className="font-semibold text-white text-sm mb-1">
                          {p.title}
                        </h3>
                        <p className="text-[#C7D2E0] text-xs">{p.excerpt}</p>
                        <span className="text-[#38C98A] text-xs mt-2 inline-block">
                          Read More →
                        </span>
                      </Link>
                    ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Ready to Grow?
              </h2>
              <p className="text-[#C7D2E0] text-sm mb-6">
                Get your free SEO audit and discover your biggest growth
                opportunities.
              </p>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white py-20 relative overflow-hidden">
        <Suspense fallback={null}>
          <FAQAccent3D />
        </Suspense>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl font-bold text-[#0B2A43] text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {displayFaqs.map((faq, i) => (
              <div
                key={faq.question}
                className="border border-gray-100 rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  className="w-full text-left px-6 py-4 font-semibold text-[#0B2A43] flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.question}
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      openFaq === i ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-[#38C98A] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Dominate Search Results?
          </h2>
          <p className="text-white/90 mb-8">
            Join 100+ businesses that trust RankPro SEO to grow their organic
            presence.
          </p>
          <Link
            to="/contact"
            className="bg-white text-[#0B2A43] hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-base transition-colors inline-block"
          >
            Get Your Free SEO Audit Today
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ── Free Audit Section ──
function FreeAuditSection() {
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      className="py-20 px-4"
      style={{
        background:
          "linear-gradient(135deg, #0a1628 0%, #0d2137 50%, #0a2a2a 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block border border-[#38C98A] text-[#38C98A] text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded mb-6">
          Free Resource
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
          Get Your Free SEO Audit + Checklist
        </h2>
        <p className="text-gray-400 text-base mb-10 max-w-lg mx-auto leading-relaxed">
          Enter your website URL and email — I'll send you a personalized audit
          with actionable quick wins within 24 hours.
        </p>
        {sent ? (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle className="w-12 h-12 text-[#38C98A]" />
            <p className="text-white font-semibold text-lg">
              Your audit request is on its way! Check your inbox within 24
              hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                required
                placeholder="yourdomain.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-5 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#38C98A] transition-colors"
              />
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-5 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#38C98A] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="bg-[#38C98A] hover:bg-[#2db87a] text-white font-bold px-10 py-3.5 rounded-lg text-base transition-colors"
            >
              Send My Audit →
            </button>
          </form>
        )}
        <p className="text-gray-500 text-sm mt-6">
          ✓ 100% free &nbsp;·&nbsp; ✓ No spam &nbsp;·&nbsp; ✓ Delivered in 24hrs
        </p>
      </div>
    </section>
  );
}

// ── Lead Form ──
function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    website: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const backend = useBackend();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await backend.submitContactForm(form.name, form.email, "", form.message);
      setSent(true);
    } catch {
      setSent(true);
    }
  };

  if (sent)
    return (
      <div className="bg-white/10 rounded-xl p-8 text-center">
        <CheckCircle className="w-12 h-12 text-[#38C98A] mx-auto mb-3" />
        <p className="text-white font-semibold">
          We'll be in touch within 24 hours!
        </p>
      </div>
    );

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        required
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#C7D2E0] text-sm focus:outline-none focus:border-[#38C98A]"
      />
      <input
        required
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#C7D2E0] text-sm focus:outline-none focus:border-[#38C98A]"
      />
      <input
        placeholder="Website URL"
        value={form.website}
        onChange={(e) => setForm({ ...form, website: e.target.value })}
        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#C7D2E0] text-sm focus:outline-none focus:border-[#38C98A]"
      />
      <textarea
        placeholder="Tell us about your goals..."
        rows={3}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#C7D2E0] text-sm focus:outline-none focus:border-[#38C98A] resize-none"
      />
      <button
        type="submit"
        className="w-full bg-[#38C98A] hover:bg-[#2db87a] text-white py-3 rounded-lg font-semibold text-sm transition-colors"
      >
        Request Your Free SEO Audit
      </button>
    </form>
  );
}
