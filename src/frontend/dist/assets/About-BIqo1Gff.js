const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/SectionParticlesBg-Ci3PKFQE.js","assets/index-BxINLDd1.js","assets/index-DZn0NItW.css","assets/react-three-fiber.esm-g7ifoZzl.js","assets/three.module-DUeOZydE.js","assets/FloatingGeoBg-DSBNXYHq.js"])))=>i.map(i=>d[i]);
import { a as createLucideIcon, j as jsxRuntimeExports, r as reactExports, L as Link, _ as __vitePreload } from "./index-BxINLDd1.js";
import { C as Canvas, a as useFrame } from "./react-three-fiber.esm-g7ifoZzl.js";
import { N as Navbar, F as Footer } from "./Navbar-CBcDUy39.js";
import { C as CircleCheckBig } from "./circle-check-big-Bifbbkt1.js";
import { U as Users } from "./users-KQ52asXU.js";
import "./three.module-DUeOZydE.js";
import "./search-BwP7uQVp.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode);
function TorusKnot() {
  const meshRef = reactExports.useRef(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 4e-3;
    meshRef.current.rotation.y += 7e-3;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: meshRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("torusKnotGeometry", { args: [1, 0.32, 120, 16, 2, 3] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshPhongMaterial",
      {
        color: "#0d3a5c",
        emissive: "#0a2d4a",
        specular: "#38C98A",
        shininess: 60,
        wireframe: false,
        transparent: true,
        opacity: 0.75
      }
    )
  ] });
}
function TorusKnotWire() {
  const meshRef = reactExports.useRef(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 4e-3;
    meshRef.current.rotation.y += 7e-3;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: meshRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("torusKnotGeometry", { args: [1, 0.32, 120, 16, 2, 3] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#38C98A", wireframe: true, transparent: true, opacity: 0.28 })
  ] });
}
function FloatingRings() {
  const ring1 = reactExports.useRef(null);
  const ring2 = reactExports.useRef(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.3;
      ring1.current.rotation.z = t * 0.2;
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * 0.25;
      ring2.current.rotation.z = -t * 0.15;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: ring1, position: [0, 0, 0], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [1.6, 0.015, 8, 80] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#38C98A", transparent: true, opacity: 0.18 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: ring2, position: [0, 0, 0], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [2, 0.01, 8, 80] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#5be0a8", transparent: true, opacity: 0.12 })
    ] })
  ] });
}
function About3DAccent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "pointer-events-none absolute right-0 top-0 h-full w-64 hidden md:block",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Canvas,
        {
          camera: { position: [0, 0, 5], fov: 50 },
          dpr: [1, 1.5],
          gl: { antialias: true, alpha: true },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.4 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "directionalLight",
              {
                position: [3, 5, 3],
                intensity: 0.8,
                color: "#38C98A"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "directionalLight",
              {
                position: [-3, -2, -3],
                intensity: 0.3,
                color: "#4fa8d8"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingRings, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TorusKnot, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TorusKnotWire, {})
          ]
        }
      )
    }
  );
}
const SectionParticlesBg = reactExports.lazy(
  () => __vitePreload(() => import("./SectionParticlesBg-Ci3PKFQE.js"), true ? __vite__mapDeps([0,1,2,3,4]) : void 0)
);
const FloatingGeoBg = reactExports.lazy(() => __vitePreload(() => import("./FloatingGeoBg-DSBNXYHq.js"), true ? __vite__mapDeps([5,1,2,3,4]) : void 0));
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
  "Core Web Vitals"
];
const timeline = [
  {
    year: "2015",
    title: "Started in SEO",
    desc: "Began as an in-house SEO specialist for a mid-sized e-commerce brand, achieving 3x traffic growth in 18 months."
  },
  {
    year: "2017",
    title: "Agency Experience",
    desc: "Joined a top digital marketing agency, managing SEO campaigns for 30+ clients across diverse industries."
  },
  {
    year: "2019",
    title: "Google Certifications",
    desc: "Earned certifications in Google Analytics, Google Ads, and completed advanced SEO training programs."
  },
  {
    year: "2021",
    title: "Launched RankPro SEO",
    desc: "Founded RankPro SEO to provide dedicated, results-focused SEO services to growing businesses."
  },
  {
    year: "2026",
    title: "100+ Clients Served",
    desc: "Now serving over 100 businesses globally, with a 98% client retention rate and hundreds of #1 rankings."
  }
];
const values = [
  {
    icon: Target,
    title: "Results First",
    desc: "Every strategy is built around measurable outcomes -- traffic, leads, and revenue."
  },
  {
    icon: CircleCheckBig,
    title: "Transparency",
    desc: "Full reporting, clear communication, and no hidden tactics or confusing jargon."
  },
  {
    icon: Users,
    title: "Partnership",
    desc: "We work as an extension of your team, invested in your long-term success."
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "White-hat methods, continuous learning, and staying ahead of algorithm changes."
  }
];
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-[#0B2A43] py-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(About3DAccent, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-[#38C98A]/20 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-bold text-[#38C98A]", children: "AY" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-extrabold text-white mb-4", children: "Amit Yadav" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#38C98A] font-semibold text-lg mb-4", children: "SEO Expert & Founder of RankPro SEO" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#C7D2E0] text-lg max-w-2xl mx-auto leading-relaxed", children: "With 4+ years of hands-on SEO experience, I've helped hundreds of businesses transform their online visibility and turn search engines into their #1 growth channel." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-white py-16 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionParticlesBg, { color: "#38C98A", count: 50, opacity: 0.12 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-[#0B2A43] mb-4", children: "My Story" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 leading-relaxed mb-4", children: "I got into SEO when most people still thought it was about keyword stuffing. I quickly learned that real SEO is about understanding search intent, building genuine authority, and creating experiences that users and search engines love." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 leading-relaxed mb-4", children: "Over 4+ years, I've worked with e-commerce brands, SaaS companies, local businesses, and everything in between. Each client taught me something new about how search really works." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 leading-relaxed", children: "Today, RankPro SEO combines that deep experience with cutting-edge tools and a team that's as obsessed with results as I am." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: [
          { val: "4+", label: "Yrs Experience" },
          { val: "100+", label: "Clients Helped" },
          { val: "1M+", label: "Keywords Ranked" },
          { val: "98%", label: "Retention Rate" }
        ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-[#F7F9FC] rounded-xl p-5 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-extrabold text-[#38C98A]", children: s.val }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-600 text-sm mt-1", children: s.label })
            ]
          },
          s.label
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-[#F7F9FC] py-16 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingGeoBg, { color: "#0B2A43", count: 8 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-[#0B2A43] text-center mb-10", children: "My Journey" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: timeline.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-none w-16 h-16 rounded-full bg-[#0B2A43] flex items-center justify-center z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#38C98A] font-bold text-xs", children: item.year }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-[#0B2A43] mb-1", children: item.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-sm leading-relaxed", children: item.desc })
            ] })
          ] }, item.year)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-white py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-[#0B2A43] text-center mb-8", children: "Skills & Certifications" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 justify-center mb-10", children: skills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "bg-[#F7F9FC] border border-gray-200 text-[#0B2A43] px-4 py-2 rounded-full text-sm font-medium",
          children: s
        },
        s
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6", children: [
        "Google Analytics Certified",
        "Google Search Console Expert",
        "SEMrush SEO Toolkit Certified"
      ].map((cert) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "border border-gray-100 rounded-xl p-5 flex items-center gap-3 shadow-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-6 h-6 text-[#38C98A] flex-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[#0B2A43] text-sm", children: cert })
          ]
        },
        cert
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-[#0B2A43] py-16 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingGeoBg, { color: "#38C98A", count: 10 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-white text-center mb-10", children: "Mission & Values" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: values.map(({ icon: Icon, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-white/10 rounded-xl p-6 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-8 h-8 text-[#38C98A] mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-white mb-2", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#C7D2E0] text-sm leading-relaxed", children: desc })
            ]
          },
          title
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-white py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-[#0B2A43] mb-4", children: "Let's Work Together" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 mb-6", children: "Ready to take your SEO to the next level?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/contact",
          className: "bg-[#38C98A] hover:bg-[#2db87a] text-white px-8 py-3 rounded-full font-semibold transition-colors",
          children: "Get Your Free Audit"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  About as default
};
