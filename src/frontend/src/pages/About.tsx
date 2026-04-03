import { Link } from "@tanstack/react-router";
import { Award, CheckCircle, Target, Users } from "lucide-react";
import { Suspense, lazy } from "react";
import About3DAccent from "../components/About3DAccent";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const SectionParticlesBg = lazy(
  () => import("../components/SectionParticlesBg"),
);
const FloatingGeoBg = lazy(() => import("../components/FloatingGeoBg"));

const skills = [
  "Technical SEO",
  "On-Page Optimization",
  "Link Building",
  "Content Strategy",
  "Keyword Research",
  "Local SEO",
  "Google Analytics",
  "Google Search Console",
  "SEMrush",
  "Ahrefs",
  "Schema Markup",
  "Core Web Vitals",
];

const timeline = [
  {
    year: "2015",
    title: "Started in SEO",
    desc: "Began as an in-house SEO specialist for a mid-sized e-commerce brand, achieving 3x traffic growth in 18 months.",
  },
  {
    year: "2017",
    title: "Agency Experience",
    desc: "Joined a top digital marketing agency, managing SEO campaigns for 30+ clients across diverse industries.",
  },
  {
    year: "2019",
    title: "Google Certifications",
    desc: "Earned certifications in Google Analytics, Google Ads, and completed advanced SEO training programs.",
  },
  {
    year: "2021",
    title: "Launched RankPro SEO",
    desc: "Founded RankPro SEO to provide dedicated, results-focused SEO services to growing businesses.",
  },
  {
    year: "2026",
    title: "100+ Clients Served",
    desc: "Now serving over 100 businesses globally, with a 98% client retention rate and hundreds of #1 rankings.",
  },
];

const values = [
  {
    icon: Target,
    title: "Results First",
    desc: "Every strategy is built around measurable outcomes -- traffic, leads, and revenue.",
  },
  {
    icon: CheckCircle,
    title: "Transparency",
    desc: "Full reporting, clear communication, and no hidden tactics or confusing jargon.",
  },
  {
    icon: Users,
    title: "Partnership",
    desc: "We work as an extension of your team, invested in your long-term success.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "White-hat methods, continuous learning, and staying ahead of algorithm changes.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0B2A43] py-20 relative overflow-hidden">
        <About3DAccent />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-24 h-24 rounded-full bg-[#38C98A]/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-[#38C98A]">AY</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Amit Yadav
          </h1>
          <p className="text-[#38C98A] font-semibold text-lg mb-4">
            SEO Expert & Founder of RankPro SEO
          </p>
          <p className="text-[#C7D2E0] text-lg max-w-2xl mx-auto leading-relaxed">
            With 4+ years of hands-on SEO experience, I've helped hundreds of
            businesses transform their online visibility and turn search engines
            into their #1 growth channel.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-16 relative overflow-hidden">
        <Suspense fallback={null}>
          <SectionParticlesBg color="#38C98A" count={50} opacity={0.12} />
        </Suspense>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-[#0B2A43] mb-4">
                My Story
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                I got into SEO when most people still thought it was about
                keyword stuffing. I quickly learned that real SEO is about
                understanding search intent, building genuine authority, and
                creating experiences that users and search engines love.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Over 4+ years, I've worked with e-commerce brands, SaaS
                companies, local businesses, and everything in between. Each
                client taught me something new about how search really works.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, RankPro SEO combines that deep experience with
                cutting-edge tools and a team that's as obsessed with results as
                I am.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: "4+", label: "Yrs Experience" },
                { val: "100+", label: "Clients Helped" },
                { val: "1M+", label: "Keywords Ranked" },
                { val: "98%", label: "Retention Rate" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-[#F7F9FC] rounded-xl p-5 text-center"
                >
                  <div className="text-3xl font-extrabold text-[#38C98A]">
                    {s.val}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#F7F9FC] py-16 relative overflow-hidden">
        <Suspense fallback={null}>
          <FloatingGeoBg color="#0B2A43" count={8} />
        </Suspense>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl font-bold text-[#0B2A43] text-center mb-10">
            My Journey
          </h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-8">
              {timeline.map((item) => (
                <div key={item.year} className="flex gap-6">
                  <div className="flex-none w-16 h-16 rounded-full bg-[#0B2A43] flex items-center justify-center z-10">
                    <span className="text-[#38C98A] font-bold text-xs">
                      {item.year}
                    </span>
                  </div>
                  <div className="pt-3">
                    <h3 className="font-semibold text-[#0B2A43] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#0B2A43] text-center mb-8">
            Skills & Certifications
          </h2>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {skills.map((s) => (
              <span
                key={s}
                className="bg-[#F7F9FC] border border-gray-200 text-[#0B2A43] px-4 py-2 rounded-full text-sm font-medium"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              "Google Analytics Certified",
              "Google Search Console Expert",
              "SEMrush SEO Toolkit Certified",
            ].map((cert) => (
              <div
                key={cert}
                className="border border-gray-100 rounded-xl p-5 flex items-center gap-3 shadow-sm"
              >
                <CheckCircle className="w-6 h-6 text-[#38C98A] flex-none" />
                <span className="font-medium text-[#0B2A43] text-sm">
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#0B2A43] py-16 relative overflow-hidden">
        <Suspense fallback={null}>
          <FloatingGeoBg color="#38C98A" count={10} />
        </Suspense>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            Mission & Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/10 rounded-xl p-6 text-center"
              >
                <Icon className="w-8 h-8 text-[#38C98A] mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-[#C7D2E0] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 text-center">
        <h2 className="text-2xl font-bold text-[#0B2A43] mb-4">
          Let's Work Together
        </h2>
        <p className="text-gray-500 mb-6">
          Ready to take your SEO to the next level?
        </p>
        <Link
          to="/contact"
          className="bg-[#38C98A] hover:bg-[#2db87a] text-white px-8 py-3 rounded-full font-semibold transition-colors"
          onClick={() => {
            try {
              const entry = {
                action: "CTA Click - Get Your Free Audit",
                page: "About",
                timestamp: Date.now(),
              };
              const existing = JSON.parse(
                localStorage.getItem("rankpro_page_interactions") || "[]",
              );
              existing.unshift(entry);
              localStorage.setItem(
                "rankpro_page_interactions",
                JSON.stringify(existing),
              );
            } catch {
              /* ignore */
            }
          }}
        >
          Get Your Free Audit
        </Link>
      </section>

      <Footer />
    </div>
  );
}
