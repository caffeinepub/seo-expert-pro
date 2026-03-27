const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/CaseStudiesHero3D-DyAecEfk.js","assets/index-DnZ7AkhC.js","assets/index-CIRZ4W5K.css","assets/react-three-fiber.esm-aL2gnv3l.js","assets/three.module-DUeOZydE.js","assets/SectionParticlesBg-DyJ_D9Ds.js"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, r as reactExports, L as Link, _ as __vitePreload } from "./index-DnZ7AkhC.js";
import { N as Navbar, F as Footer } from "./Navbar-ti_w7kgz.js";
import { T as TrendingUp } from "./trending-up-BOysHj79.js";
import { A as ArrowRight } from "./arrow-right-BOWKuzM4.js";
import { A as ArrowUp } from "./arrow-up-72z_zvwq.js";
import "./search-BDWeCGE2.js";
function toSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
const CaseStudiesHero3D = reactExports.lazy(() => __vitePreload(() => import("./CaseStudiesHero3D-DyAecEfk.js"), true ? __vite__mapDeps([0,1,2,3,4]) : void 0));
const SectionParticlesBg = reactExports.lazy(
  () => __vitePreload(() => import("./SectionParticlesBg-DyJ_D9Ds.js"), true ? __vite__mapDeps([5,1,2,3,4]) : void 0)
);
const cases = [
  {
    industry: "E-commerce Retailer",
    challenge: "Stuck on page 2-3 for main product keywords, minimal organic revenue.",
    solution: "Complete technical SEO audit, content restructure, and targeted link building campaign.",
    before: { traffic: "4,200/mo", rankings: "Page 2-3", leads: "38/mo" },
    after: { traffic: "17,400/mo", rankings: "#1-3", leads: "157/mo" },
    improvement: "+312% Traffic",
    duration: "6 months"
  },
  {
    industry: "SaaS Platform",
    challenge: "Launched product with zero organic visibility, competing against established players.",
    solution: "Keyword gap analysis, blog content strategy, and strategic backlink acquisition.",
    before: { traffic: "820/mo", rankings: "Not ranked", leads: "12/mo" },
    after: {
      traffic: "9,650/mo",
      rankings: "Top 10 for 200+ keywords",
      leads: "94/mo"
    },
    improvement: "+1,076% Traffic",
    duration: "9 months"
  },
  {
    industry: "Local Medical Practice",
    challenge: "Competitors dominating local search and Google Maps for clinic-related searches.",
    solution: "Google Business Profile optimization, local citation building, review strategy.",
    before: { traffic: "520/mo", rankings: "Position 8-12", leads: "22/mo" },
    after: { traffic: "1,490/mo", rankings: "#1 Google Maps", leads: "81/mo" },
    improvement: "+185% Local Leads",
    duration: "3 months"
  },
  {
    industry: "Legal Services Firm",
    challenge: "High competition for lucrative legal keywords with poor domain authority.",
    solution: "Authority building through PR outreach, thought leadership content, and on-page optimization.",
    before: { traffic: "1,100/mo", rankings: "Page 3-5", leads: "8/mo" },
    after: {
      traffic: "6,800/mo",
      rankings: "Page 1 for 45 keywords",
      leads: "67/mo"
    },
    improvement: "+520% Traffic",
    duration: "8 months"
  },
  {
    industry: "Home Services Company",
    challenge: "Seasonal business with inconsistent lead flow and no local search presence.",
    solution: "Local SEO campaign, content hub creation, and Google Business optimization.",
    before: { traffic: "340/mo", rankings: "Not in top 20", leads: "15/mo" },
    after: {
      traffic: "2,870/mo",
      rankings: "Top 3 local pack",
      leads: "112/mo"
    },
    improvement: "+647% Leads",
    duration: "5 months"
  },
  {
    industry: "SaaS Startup",
    challenge: "Post-launch SaaS with zero organic visibility and a CAC of $480 from paid channels alone. Needed to build an organic acquisition engine to scale without burning ad budget.",
    solution: "Keyword gap analysis against 8 competitors, in-depth comparison content strategy, and link acquisition from SaaS review sites and industry blogs.",
    before: { traffic: "620/mo", rankings: "Not in top 50", leads: "9/mo" },
    after: {
      traffic: "8,950/mo",
      rankings: "Top 10 for 180+ keywords",
      leads: "34/mo"
    },
    improvement: "+280% Organic Leads",
    duration: "8 months"
  },
  {
    industry: "Law Firm",
    challenge: "Regional law firm with no first-page rankings for competitive practice area keywords. Relying entirely on referrals with no online lead generation system.",
    solution: "Topical authority content strategy, local SEO optimization, and PR-driven link building targeting legal publications and local news outlets.",
    before: { traffic: "890/mo", rankings: "Page 4-6", leads: "6/mo" },
    after: {
      traffic: "5,240/mo",
      rankings: "#1 for 25 keywords",
      leads: "23/mo"
    },
    improvement: "+190% Consultation Bookings",
    duration: "10 months"
  }
];
function CaseStudies() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-[#0B2A43] py-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CaseStudiesHero3D, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-extrabold text-white mb-4", children: "Real Results, Real Businesses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#C7D2E0] text-lg", children: "Every case study reflects a real client, real strategy, and real measurable growth." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-white py-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionParticlesBg, { color: "#0B2A43", count: 50, opacity: 0.08 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-12", children: cases.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "border border-gray-100 rounded-2xl overflow-hidden shadow-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#F7F9FC] px-6 py-4 flex items-center justify-between flex-wrap gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/case-studies/$id",
                    params: { id: toSlug(c.industry) },
                    className: "font-bold text-[#0B2A43] text-lg hover:text-[#38C98A] transition-colors",
                    "data-ocid": `case_studies.${toSlug(c.industry)}.link`,
                    children: c.industry
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-3 text-[#C7D2E0] text-sm bg-[#0B2A43] px-3 py-1 rounded-full", children: c.duration })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[#38C98A] font-bold text-xl", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5" }),
                  c.improvement
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/case-studies/$id",
                    params: { id: toSlug(c.industry) },
                    className: "inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-[#0B2A43] hover:bg-[#38C98A] px-4 py-2 rounded-full transition-colors",
                    "data-ocid": `case_studies.${toSlug(c.industry)}.button`,
                    children: [
                      "View Case Study ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 grid grid-cols-1 md:grid-cols-3 gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0B2A43] text-sm mb-2 uppercase tracking-wider", children: "Challenge" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: c.challenge }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0B2A43] text-sm mb-2 mt-4 uppercase tracking-wider", children: "Solution" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: c.solution })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0B2A43] text-sm mb-3 uppercase tracking-wider", children: "Before vs After" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4", children: ["traffic", "rankings", "leads"].map(
                  (metric) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-xl overflow-hidden border border-gray-100",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gray-100 px-3 py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider", children: metric }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 text-center", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-400 text-xs mb-1", children: "Before" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-gray-700", children: c.before[metric] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 text-center bg-[#38C98A]/5 border-t border-gray-100", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1 text-xs text-[#38C98A] mb-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "w-3 h-3" }),
                            " After"
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-[#0B2A43]", children: c.after[metric] })
                        ] })
                      ]
                    },
                    metric
                  )
                ) })
              ] })
            ] })
          ]
        },
        c.industry
      )) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-[#38C98A] py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-white mb-4", children: "Want Results Like These?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/90 mb-6", children: "Let's build a custom SEO strategy for your business." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/contact",
          className: "bg-white text-[#0B2A43] hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition-colors inline-block",
          children: "Get My Free SEO Audit"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  CaseStudies as default
};
