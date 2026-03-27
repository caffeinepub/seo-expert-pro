import { a as createLucideIcon, u as useParams, j as jsxRuntimeExports, L as Link, m as motion, r as reactExports } from "./index-3hJhzIkM.js";
import { B as Badge } from "./badge-D64vrMrJ.js";
import { B as Button } from "./button-B14pF8dn.js";
import { I as Input } from "./input-D9w9txE3.js";
import { C as ChevronLeft, T as Textarea } from "./textarea-CqjvejNI.js";
import { N as Navbar, F as Footer } from "./Navbar-BSKyoClv.js";
import { A as ArrowLeft } from "./arrow-left-DLptqiIZ.js";
import { T as TrendingUp } from "./trending-up-51sWwzDV.js";
import { A as ArrowUp } from "./arrow-up-C_1q88t0.js";
import { C as ChevronRight } from "./chevron-right-B6OaxGgL.js";
import { A as ArrowRight } from "./arrow-right-jBY8o8v4.js";
import { C as CircleCheckBig } from "./circle-check-big-Dpb6hGsL.js";
import "./search-DuWoxYuq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
const cases = [
  {
    slug: "e-commerce-retailer",
    industry: "E-commerce Retailer",
    challenge: "Stuck on page 2-3 for main product keywords, minimal organic revenue. The site had strong products but poor on-page structure, slow load times, and zero backlink strategy.",
    solution: "Complete technical SEO audit, content restructure, and targeted link building campaign. Rewrote product category pages, fixed crawl errors, and built 40+ editorial backlinks over 6 months.",
    before: { traffic: "4,200/mo", rankings: "Page 2-3", leads: "38/mo" },
    after: { traffic: "17,400/mo", rankings: "#1-3", leads: "157/mo" },
    improvement: "+312% Traffic",
    duration: "6 months",
    takeaways: [
      "Technical fixes (crawl errors, page speed) delivered the first ranking jumps within 45 days",
      "Product category page rewrites drove the bulk of traffic improvement in months 3-4",
      "Link building compounded results — the site now earns new backlinks passively from competitors"
    ]
  },
  {
    slug: "saas-platform",
    industry: "SaaS Platform",
    challenge: "Launched product with zero organic visibility, competing against established players with years of domain authority and content libraries already in place.",
    solution: "Keyword gap analysis, blog content strategy, and strategic backlink acquisition. Built 30 long-form comparison and use-case articles targeting mid-funnel searchers.",
    before: { traffic: "820/mo", rankings: "Not ranked", leads: "12/mo" },
    after: {
      traffic: "9,650/mo",
      rankings: "Top 10 for 200+ keywords",
      leads: "94/mo"
    },
    improvement: "+1,076% Traffic",
    duration: "9 months",
    takeaways: [
      "Mid-funnel comparison content (vs. competitor articles) converted at 3× the rate of top-of-funnel posts",
      "A consistent publishing cadence of 3 articles/month was enough to dominate a niche segment",
      "Domain authority grew from 12 to 38 over 9 months — unlocking higher-competition keywords"
    ]
  },
  {
    slug: "local-medical-practice",
    industry: "Local Medical Practice",
    challenge: "Competitors dominating local search and Google Maps for clinic-related searches. The practice had no Google Business Profile optimization and inconsistent citation data.",
    solution: "Google Business Profile optimization, local citation building, review strategy, and localized landing pages for each service offered at the clinic.",
    before: { traffic: "520/mo", rankings: "Position 8-12", leads: "22/mo" },
    after: { traffic: "1,490/mo", rankings: "#1 Google Maps", leads: "81/mo" },
    improvement: "+185% Local Leads",
    duration: "3 months",
    takeaways: [
      "Google Business Profile optimization alone moved rankings from position 8 to the local pack within 30 days",
      "Review generation strategy added 40+ new 5-star reviews, further boosting local trust signals",
      "Localized service pages now rank on page 1 for 15 high-intent search terms"
    ]
  },
  {
    slug: "legal-services-firm",
    industry: "Legal Services Firm",
    challenge: "High competition for lucrative legal keywords with poor domain authority. The firm was invisible online despite having experienced attorneys and strong case results.",
    solution: "Authority building through PR outreach, thought leadership content, and on-page optimization. Secured mentions in legal publications and industry news sites.",
    before: { traffic: "1,100/mo", rankings: "Page 3-5", leads: "8/mo" },
    after: {
      traffic: "6,800/mo",
      rankings: "Page 1 for 45 keywords",
      leads: "67/mo"
    },
    improvement: "+520% Traffic",
    duration: "8 months",
    takeaways: [
      "Two editorial backlinks from authoritative legal publications drove more ranking improvement than 20 directory links",
      "Thought leadership articles written by the firm's attorneys performed best — trust signals matter in YMYL niches",
      "On-page optimization of service pages created a strong internal linking structure that amplified all authority gains"
    ]
  },
  {
    slug: "saas-startup",
    industry: "SaaS Startup",
    challenge: "Post-launch SaaS with zero organic visibility and a CAC of $480 from paid channels alone. The product was excellent — used by 200+ beta customers — but no one could find it through organic search. Every new customer came through expensive paid ads, making growth unsustainable.",
    solution: "Built a comprehensive keyword gap analysis against 8 direct competitors. Created 24 in-depth comparison and use-case articles targeting mid-funnel searchers already evaluating solutions. Acquired 35+ links from SaaS review sites, industry newsletters, and developer blogs. Added programmatic landing pages for high-intent integration-based queries.",
    before: { traffic: "620/mo", rankings: "Not in top 50", leads: "9/mo" },
    after: {
      traffic: "8,950/mo",
      rankings: "Top 10 for 180+ keywords",
      leads: "34/mo"
    },
    improvement: "+280% Organic Leads",
    duration: "8 months",
    takeaways: [
      "Comparison content (vs. [Competitor]) converted at 4x the rate of educational blog posts — customers searching these terms are already in buying mode",
      "Reducing CAC from $480 to $210 by month 8 made the entire SEO investment ROI-positive within the campaign period",
      "Programmatic landing pages for integration keywords ('best CRM for Shopify', 'HubSpot alternative for startups') unlocked an entirely new traffic segment with minimal ongoing work"
    ]
  },
  {
    slug: "law-firm",
    industry: "Law Firm",
    challenge: "Regional law firm with strong local reputation but zero first-page rankings for competitive practice area keywords. Revenue depended entirely on referrals, leaving growth vulnerable to network fluctuations. The website was a digital brochure with no SEO strategy — thin content, no local optimization, and a domain authority of 11.",
    solution: "Developed a topical authority content strategy covering all major practice areas with comprehensive, expert-authored guides. Built local SEO foundation with Google Business Profile optimization, citation cleanup, and localized landing pages per practice area. Secured 28 backlinks from legal publications, local news outlets, and bar association directories over 10 months.",
    before: { traffic: "890/mo", rankings: "Page 4-6", leads: "6/mo" },
    after: {
      traffic: "5,240/mo",
      rankings: "#1 for 25 keywords",
      leads: "23/mo"
    },
    improvement: "+190% Consultation Bookings",
    duration: "10 months",
    takeaways: [
      "Topical authority content — covering every sub-topic of each practice area — was the primary driver of ranking for highly competitive legal terms that had never ranked before",
      "Local pack visibility (Google Maps) drove more phone calls than organic blue links — optimizing the GBP was the fastest, highest-impact win in the campaign",
      "Domain authority grew from 11 to 34 over 10 months, unlocking rankings for city-level competitive keywords that previously felt untouchable"
    ]
  },
  {
    slug: "home-services-company",
    industry: "Home Services Company",
    challenge: "Seasonal business with inconsistent lead flow and no local search presence. Revenue dipped to near zero in off-peak months with no digital marketing strategy.",
    solution: "Local SEO campaign, content hub creation, and Google Business optimization. Built a seasonal content strategy targeting year-round service variations.",
    before: { traffic: "340/mo", rankings: "Not in top 20", leads: "15/mo" },
    after: {
      traffic: "2,870/mo",
      rankings: "Top 3 local pack",
      leads: "112/mo"
    },
    improvement: "+647% Leads",
    duration: "5 months",
    takeaways: [
      "Year-round content strategy reduced seasonal revenue dips by 60% — off-season months now generate steady lead flow",
      "Local pack placement (top 3) generates more leads than the organic listings combined",
      "Service area pages for nearby cities expanded the catchment area by 35% without a physical expansion"
    ]
  }
];
function QuoteForm({ caseStudyTitle }) {
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e) {
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
      date: (/* @__PURE__ */ new Date()).toISOString(),
      timestamp: Date.now()
    };
    const existing = JSON.parse(
      localStorage.getItem("rankpro_contact_submissions") || "[]"
    );
    existing.unshift(entry);
    localStorage.setItem(
      "rankpro_contact_submissions",
      JSON.stringify(existing)
    );
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 600);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.section,
    {
      initial: { opacity: 0, y: 32 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.55, ease: "easeOut" },
      className: "py-20 bg-[#0B2A43]",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.45, delay: 0.1 },
            className: "text-center mb-10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block bg-[#38C98A]/20 text-[#38C98A] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4", children: "Get Similar Results" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl sm:text-4xl font-extrabold text-white mb-3", children: [
                "Interested in results like",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#38C98A]", children: caseStudyTitle }),
                "?"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/65 text-base max-w-xl mx-auto", children: "Tell us about your project and we'll build a custom strategy for your business." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.45, delay: 0.2 },
            className: "bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm",
            "data-ocid": "quote.panel",
            children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.4 },
                className: "text-center py-10",
                "data-ocid": "quote.success_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-[#38C98A]/20 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-8 h-8 text-[#38C98A]" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Thanks! We'll be in touch within 24 hours." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/55 text-sm", children: [
                    "We've received your request inspired by",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#38C98A] font-semibold", children: caseStudyTitle }),
                    "."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setSubmitted(false),
                      className: "mt-6 text-[#38C98A] hover:text-[#2db87a] text-sm font-semibold underline underline-offset-4 transition-colors",
                      children: "Submit another request"
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubmit,
                className: "space-y-5",
                "data-ocid": "quote.panel",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "label",
                        {
                          className: "text-white/80 text-sm font-medium",
                          htmlFor: "cs-quote-name",
                          children: [
                            "Full Name ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#38C98A]", children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "cs-quote-name",
                          name: "name",
                          type: "text",
                          required: true,
                          placeholder: "Amit Sharma",
                          value: form.name,
                          onChange: handleChange,
                          className: "bg-[#0d3352] border-white/15 text-white placeholder:text-white/35 focus:border-[#38C98A] focus:ring-[#38C98A]/30 h-11",
                          "data-ocid": "quote.input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "label",
                        {
                          className: "text-white/80 text-sm font-medium",
                          htmlFor: "cs-quote-email",
                          children: [
                            "Email Address ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#38C98A]", children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "cs-quote-email",
                          name: "email",
                          type: "email",
                          required: true,
                          placeholder: "you@company.com",
                          value: form.email,
                          onChange: handleChange,
                          className: "bg-[#0d3352] border-white/15 text-white placeholder:text-white/35 focus:border-[#38C98A] focus:ring-[#38C98A]/30 h-11",
                          "data-ocid": "quote.input"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        className: "text-white/80 text-sm font-medium",
                        htmlFor: "cs-quote-phone",
                        children: [
                          "Phone Number",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/35 font-normal", children: "(optional)" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "cs-quote-phone",
                        name: "phone",
                        type: "tel",
                        placeholder: "+977 98XXXXXXXX",
                        value: form.phone,
                        onChange: handleChange,
                        className: "bg-[#0d3352] border-white/15 text-white placeholder:text-white/35 focus:border-[#38C98A] focus:ring-[#38C98A]/30 h-11",
                        "data-ocid": "quote.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm font-medium", children: "Inspired By" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-11 bg-white/5 border border-white/10 rounded-md px-3 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#38C98A] font-semibold text-sm", children: caseStudyTitle }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        className: "text-white/80 text-sm font-medium",
                        htmlFor: "cs-quote-message",
                        children: [
                          "Project Details ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#38C98A]", children: "*" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "cs-quote-message",
                        name: "message",
                        required: true,
                        rows: 5,
                        placeholder: "Tell us about your website, current traffic, goals, and how you'd like to achieve similar results...",
                        value: form.message,
                        onChange: handleChange,
                        className: "bg-[#0d3352] border-white/15 text-white placeholder:text-white/35 focus:border-[#38C98A] focus:ring-[#38C98A]/30 resize-none",
                        "data-ocid": "quote.textarea"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      disabled: isSubmitting,
                      className: "w-full bg-[#38C98A] hover:bg-[#2db87a] text-white font-bold h-12 text-base rounded-xl transition-all duration-200 shadow-lg shadow-[#38C98A]/25",
                      "data-ocid": "quote.submit_button",
                      children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                        "Sending..."
                      ] }) : "Get a Free Quote →"
                    }
                  )
                ]
              }
            )
          }
        )
      ] })
    }
  );
}
function CaseStudyDetail() {
  const { id } = useParams({ strict: false });
  const caseStudy = cases.find((c) => c.slug === id);
  const currentIndex = cases.findIndex((c) => c.slug === id);
  const prevCase = currentIndex > 0 ? cases[currentIndex - 1] : null;
  const nextCase = currentIndex < cases.length - 1 ? cases[currentIndex + 1] : null;
  if (!caseStudy) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#F7F9FC]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-40 text-center px-4",
          "data-ocid": "case_study_detail.error_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-6", children: "📊" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-extrabold text-[#0B2A43] mb-4", children: "Case Study Not Found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mb-8", children: "The case study you're looking for doesn't exist or has been moved." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/case-studies",
                className: "inline-flex items-center gap-2 bg-[#38C98A] text-white font-bold px-6 py-3 rounded-full hover:bg-[#2db87a] transition-colors",
                "data-ocid": "case_study_detail.link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                  " Back to All Case Studies"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#F7F9FC]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-[#0B2A43] pt-28 pb-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-96 h-96 rounded-full bg-[#38C98A]/6 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#38C98A]/8 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/case-studies",
                className: "inline-flex items-center gap-2 text-[#C7D2E0]/70 hover:text-[#38C98A] text-sm font-medium mb-8 transition-colors",
                "data-ocid": "case_study_detail.link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                  " Back to All Case Studies"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-[#38C98A]/20 text-[#38C98A] border-[#38C98A]/30 px-3 py-0.5 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3 mr-1" }),
                " ",
                caseStudy.improvement
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-white/10 text-white/80 border-white/20 px-3 py-0.5 text-sm", children: caseStudy.duration })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight", children: caseStudy.industry }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#C7D2E0] text-lg max-w-2xl leading-relaxed", children: "A real-world SEO success story — from the challenge we faced to the strategy we executed and the results we delivered." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.1 },
        className: "grid grid-cols-1 md:grid-cols-2 gap-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F7F9FC] rounded-2xl p-6 border-l-4 border-red-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-[#0B2A43] uppercase tracking-wider mb-3", children: "The Challenge" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 leading-relaxed", children: caseStudy.challenge })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F7F9FC] rounded-2xl p-6 border-l-4 border-[#38C98A]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-[#0B2A43] uppercase tracking-wider mb-3", children: "Our Solution" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 leading-relaxed", children: caseStudy.solution })
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-[#F7F9FC]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-extrabold text-[#0B2A43] mb-2 text-center", children: "Before vs After" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-center mb-10", children: "Measurable results across the three metrics that matter most." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6", children: ["traffic", "rankings", "leads"].map((metric) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#0B2A43] px-4 py-3 text-center text-sm font-bold text-white uppercase tracking-wider", children: metric }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 text-center border-b border-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-400 mb-1 uppercase tracking-wider", children: "Before" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold text-gray-600", children: caseStudy.before[metric] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 text-center bg-[#38C98A]/5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1 text-xs text-[#38C98A] mb-1 uppercase tracking-wider", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "w-3 h-3" }),
                    " After"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-extrabold text-[#0B2A43]", children: caseStudy.after[metric] })
                ] })
              ]
            },
            metric
          )) })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-extrabold text-[#0B2A43] mb-2 text-center", children: "Key Takeaways" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-center mb-10", children: "What made the difference — lessons that apply to your business too." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: caseStudy.takeaways.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-4 bg-[#F7F9FC] rounded-2xl p-5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 rounded-full bg-[#38C98A] text-white text-sm font-bold flex items-center justify-center flex-none", children: i + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 leading-relaxed", children: t })
              ]
            },
            t.slice(0, 40)
          )) })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 bg-[#F7F9FC] border-t border-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      prevCase ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/case-studies/$id",
          params: { id: prevCase.slug },
          className: "flex items-center gap-2 text-[#0B2A43] hover:text-[#38C98A] font-semibold transition-colors group",
          "data-ocid": "case_study_detail.pagination_prev",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5 group-hover:-translate-x-1 transition-transform" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-gray-400 font-normal", children: "Previous" }),
              prevCase.industry
            ] })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
      nextCase ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/case-studies/$id",
          params: { id: nextCase.slug },
          className: "flex items-center gap-2 text-[#0B2A43] hover:text-[#38C98A] font-semibold transition-colors group text-right",
          "data-ocid": "case_study_detail.pagination_next",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-gray-400 font-normal", children: "Next" }),
              nextCase.industry
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteForm, { caseStudyTitle: caseStudy.industry }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-[#38C98A] py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl sm:text-4xl font-extrabold text-white mb-4", children: "Want Results Like These?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/85 text-lg mb-8", children: "Let's build a custom SEO strategy for your business. The audit is free." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/contact",
              className: "inline-flex items-center gap-2 bg-white text-[#0B2A43] hover:bg-gray-50 font-bold px-8 py-4 rounded-full transition-colors text-lg shadow-lg",
              "data-ocid": "case_study_detail.primary_button",
              children: [
                "Get My Free SEO Audit ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" })
              ]
            }
          )
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  CaseStudyDetail as default
};
