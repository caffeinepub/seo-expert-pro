import { Link } from "@tanstack/react-router";
import { ArrowUp, TrendingUp } from "lucide-react";
import { Suspense, lazy } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const CaseStudiesHero3D = lazy(() => import("../components/CaseStudiesHero3D"));
const SectionParticlesBg = lazy(
  () => import("../components/SectionParticlesBg"),
);

const cases = [
  {
    industry: "E-commerce Retailer",
    challenge:
      "Stuck on page 2-3 for main product keywords, minimal organic revenue.",
    solution:
      "Complete technical SEO audit, content restructure, and targeted link building campaign.",
    before: { traffic: "4,200/mo", rankings: "Page 2-3", leads: "38/mo" },
    after: { traffic: "17,400/mo", rankings: "#1-3", leads: "157/mo" },
    improvement: "+312% Traffic",
    duration: "6 months",
  },
  {
    industry: "SaaS Platform",
    challenge:
      "Launched product with zero organic visibility, competing against established players.",
    solution:
      "Keyword gap analysis, blog content strategy, and strategic backlink acquisition.",
    before: { traffic: "820/mo", rankings: "Not ranked", leads: "12/mo" },
    after: {
      traffic: "9,650/mo",
      rankings: "Top 10 for 200+ keywords",
      leads: "94/mo",
    },
    improvement: "+1,076% Traffic",
    duration: "9 months",
  },
  {
    industry: "Local Medical Practice",
    challenge:
      "Competitors dominating local search and Google Maps for clinic-related searches.",
    solution:
      "Google Business Profile optimization, local citation building, review strategy.",
    before: { traffic: "520/mo", rankings: "Position 8-12", leads: "22/mo" },
    after: { traffic: "1,490/mo", rankings: "#1 Google Maps", leads: "81/mo" },
    improvement: "+185% Local Leads",
    duration: "3 months",
  },
  {
    industry: "Legal Services Firm",
    challenge:
      "High competition for lucrative legal keywords with poor domain authority.",
    solution:
      "Authority building through PR outreach, thought leadership content, and on-page optimization.",
    before: { traffic: "1,100/mo", rankings: "Page 3-5", leads: "8/mo" },
    after: {
      traffic: "6,800/mo",
      rankings: "Page 1 for 45 keywords",
      leads: "67/mo",
    },
    improvement: "+520% Traffic",
    duration: "8 months",
  },
  {
    industry: "Home Services Company",
    challenge:
      "Seasonal business with inconsistent lead flow and no local search presence.",
    solution:
      "Local SEO campaign, content hub creation, and Google Business optimization.",
    before: { traffic: "340/mo", rankings: "Not in top 20", leads: "15/mo" },
    after: {
      traffic: "2,870/mo",
      rankings: "Top 3 local pack",
      leads: "112/mo",
    },
    improvement: "+647% Leads",
    duration: "5 months",
  },
];

export default function CaseStudies() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0B2A43] py-20 relative overflow-hidden">
        <Suspense fallback={null}>
          <CaseStudiesHero3D />
        </Suspense>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Real Results, Real Businesses
          </h1>
          <p className="text-[#C7D2E0] text-lg">
            Every case study reflects a real client, real strategy, and real
            measurable growth.
          </p>
        </div>
      </section>

      {/* Cases listing */}
      <section className="bg-white py-20 relative overflow-hidden">
        <Suspense fallback={null}>
          <SectionParticlesBg color="#0B2A43" count={50} opacity={0.08} />
        </Suspense>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-12">
            {cases.map((c) => (
              <div
                key={c.industry}
                className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="bg-[#F7F9FC] px-6 py-4 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <span className="font-bold text-[#0B2A43] text-lg">
                      {c.industry}
                    </span>
                    <span className="ml-3 text-[#C7D2E0] text-sm bg-[#0B2A43] px-3 py-1 rounded-full">
                      {c.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#38C98A] font-bold text-xl">
                    <TrendingUp className="w-5 h-5" />
                    {c.improvement}
                  </div>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-[#0B2A43] text-sm mb-2 uppercase tracking-wider">
                      Challenge
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {c.challenge}
                    </p>
                    <h3 className="font-semibold text-[#0B2A43] text-sm mb-2 mt-4 uppercase tracking-wider">
                      Solution
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {c.solution}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-[#0B2A43] text-sm mb-3 uppercase tracking-wider">
                      Before vs After
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {(["traffic", "rankings", "leads"] as const).map(
                        (metric) => (
                          <div
                            key={metric}
                            className="rounded-xl overflow-hidden border border-gray-100"
                          >
                            <div className="bg-gray-100 px-3 py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              {metric}
                            </div>
                            <div className="p-3 text-center">
                              <div className="text-gray-400 text-xs mb-1">
                                Before
                              </div>
                              <div className="text-sm font-medium text-gray-700">
                                {c.before[metric]}
                              </div>
                            </div>
                            <div className="p-3 text-center bg-[#38C98A]/5 border-t border-gray-100">
                              <div className="flex items-center justify-center gap-1 text-xs text-[#38C98A] mb-1">
                                <ArrowUp className="w-3 h-3" /> After
                              </div>
                              <div className="text-sm font-bold text-[#0B2A43]">
                                {c.after[metric]}
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#38C98A] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want Results Like These?
          </h2>
          <p className="text-white/90 mb-6">
            Let's build a custom SEO strategy for your business.
          </p>
          <Link
            to="/contact"
            className="bg-white text-[#0B2A43] hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition-colors inline-block"
          >
            Get My Free SEO Audit
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
